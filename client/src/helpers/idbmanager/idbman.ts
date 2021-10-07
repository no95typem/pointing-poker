import {
  genIDBOnUpgradeFunc,
  GenIDBOnUpgradeFuncParams,
} from './idb-onupgradefunc-generator';

import {
  IDBManAddEntryParams,
  IDBManGetEntryParams,
  IDBManRmEntryParams,
  IDBManUpdateEntryParams,
} from './idbman.def';

export class IDBMan {
  private readonly dbName: string;

  private db: IDBDatabase | undefined;

  private operationQueue: Array<() => Promise<unknown>> = [];

  private isWorking = false;

  constructor(dbName: string) {
    this.dbName = dbName;
  }

  private async waitForDB(openRequest: IDBOpenDBRequest): Promise<boolean> {
    return new Promise((resolve, reject) => {
      openRequest.addEventListener('success', e => {
        const req = e.target as IDBOpenDBRequest;
        this.db = req.result;
        this.db.onversionchange = () => {
          // bus notify?
          this.db?.close();
          alert('DB is out of date! Please, reload page!');
        };
        resolve(true);
      });
      openRequest.onerror = () => reject(openRequest.error);
    });
  }

  private async addEntryPromise(params: IDBManAddEntryParams) {
    return new Promise((resolve, reject) => {
      if (this.db) {
        const req = this.db
          .transaction(params.objStoreName, 'readwrite')
          .objectStore(params.objStoreName)
          .add(params.obj);
        req.onerror = () => {
          reject(req.error);
        };
        req.onsuccess = () => {
          resolve(true);
        };
      }
    });
  }

  private async reloadDB(
    version: number,
    paramsForFunc: GenIDBOnUpgradeFuncParams,
  ) {
    return new Promise((resolve, reject) => {
      const asyncFunc = async () => {
        if ((!this.db && version) || version <= 0)
          reject(new Error('No db or wrong version number!'));

        if (this.db) {
          this.db.onversionchange = () => {};
          this.db.close();
        }
        const idbOpenDBRequest = indexedDB.open(this.dbName, version);

        if (!idbOpenDBRequest) throw new Error(`Can't get open request!`);
        else {
          idbOpenDBRequest.onupgradeneeded = genIDBOnUpgradeFunc(paramsForFunc);
          const req = idbOpenDBRequest;
          req.onerror = (e: Event) => {
            alert(
              `Indexed DB open request is denied!
              Contact me at discord, please (no95typem@9889)`,
            );
            reject(e);
            throw new Error(`Can't open IndexedDB: ${e}`);
          };
          req.onblocked = async () => {
            return new Promise(resolveOnBlocked => {
              const chargeCheckOpened = async () => {
                const checkOpened = new Promise((res, rej) => {
                  setTimeout(() => {
                    if (this.db) res(true);
                    else rej(new Error('db is blocked 10 sec already!'));
                  }, 10_000);
                });
                checkOpened
                  .catch(() => chargeCheckOpened())
                  .then(() => resolveOnBlocked(true)); // TODO: Add popup with 'Do you have any other opened tabs? Close it please!'
              };
              chargeCheckOpened();
            });
          };
          const waitFunc = async () => {
            await this.waitForDB(req);
            req.onblocked = () => {};
            resolve(true);
          };
          await waitFunc();
        }
      };
      asyncFunc();
    });
  }

  public addEntry(params: IDBManAddEntryParams): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const asyncFunc = async () => {
        if (!this.db) throw new Error('no opened db!');
        else if (!this.db.objectStoreNames.contains(params.objStoreName)) {
          if (params.paramsIfStoreNotExist) {
            await this.reloadDB(
              this.db.version + 1,
              params.paramsIfStoreNotExist,
            );
          } else
            throw new Error(
              `ObjStore with this name is not exist! But autocreate flag is set to false!`,
            );
        }
        await this.addEntryPromise(params)
          .then(e => resolve(e))
          .catch(error => {
            reject(error);
          });
      };
      this.queueAsyncFunc(asyncFunc);
    });
  }

  public updateEntry(params: IDBManUpdateEntryParams): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const asyncFunc = async () => {
        if (!this.db) throw new Error('no opened db!');
        else {
          let transaction: IDBTransaction;
          try {
            transaction = this.db.transaction(params.objStoreName, 'readwrite');
            const objectStore = transaction.objectStore(params.objStoreName);
            const req = objectStore.get(params.objKey);
            req.onerror = () => {
              reject(req.error);
            };
            req.onsuccess = (e: Event) => {
              const obj = (e.target as IDBRequest).result;

              if (obj === undefined) {
                reject(new Error('requested entry is undefined'));

                return;
              }
              Object.assign(obj, params.newPropObj);
              const reqUpdate = objectStore.put(obj);
              reqUpdate.onerror = () => reject(req.error);
              reqUpdate.onsuccess = () => resolve(true);
            };
          } catch (error) {
            reject(error);
          }
        }
      };
      this.queueAsyncFunc(asyncFunc);
    });
  }

  public rmEntry(params: IDBManRmEntryParams): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const asyncFunc = async () => {
        if (!this.db) throw new Error('no opened db!');
        else {
          try {
            const transaction = this.db.transaction(
              params.objStoreName,
              'readwrite',
            );
            const objectStore = transaction.objectStore(params.objStoreName);
            const req = objectStore.delete(params.objKey);
            req.onerror = () => {
              reject(req.error);
            };
            req.onsuccess = () => {
              resolve(true);
            };
          } catch (error) {
            reject(error);
          }
        }
      };
      this.queueAsyncFunc(asyncFunc);
    });
  }

  public getCursor(objStoreName: string): Promise<IDBRequest> {
    return new Promise((res, rej) => {
      const asyncFunc = async () => {
        if (!this.db) rej(new Error('no opened db!'));
        else {
          try {
            const objectStore = this.db
              .transaction(objStoreName)
              .objectStore(objStoreName);
            const req = objectStore.openCursor();
            res(req);
          } catch (error) {
            rej(error);
          }
        }
      };
      this.queueAsyncFunc(asyncFunc);
    });
  }

  public getEntries(params: IDBManGetEntryParams): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const asyncFunc = async () => {
        if (!this.db) throw new Error('no opened db!');
        else {
          try {
            const objectStore = this.db
              .transaction(params.objStoreName)
              .objectStore(params.objStoreName);
            const req = params.objKey
              ? objectStore.get(params.objKey)
              : objectStore.getAll();
            req.onerror = () => reject(req.error);
            req.onsuccess = e => {
              const objs = (e.target as IDBRequest).result;
              resolve(objs);
            };
          } catch (error) {
            reject(error);
          }
        }
      };
      this.queueAsyncFunc(asyncFunc);
    });
  }

  public async openDB(): Promise<boolean | Error> {
    return new Promise<boolean | Error>((resolve, reject) => {
      const asyncFunc = async () => {
        const idbOpenDBRequest = indexedDB.open(this.dbName);
        this.waitForDB(idbOpenDBRequest)
          .then(() => resolve(true))
          .catch((error: Error) => reject(error));
      };
      this.queueAsyncFunc(asyncFunc);
    });
  }

  public async deleteDB(): Promise<Event> {
    // this.db.transaction("users", "readwrite").objectStore("users").clear();
    return new Promise((resolve, reject) => {
      const asyncFunc = async () => {
        const request = indexedDB.deleteDatabase(this.dbName);
        request.onerror = e => reject(e);
        request.onsuccess = e => resolve(e);
      };
      this.queueAsyncFunc(asyncFunc);
    });
  }

  private async queueAsyncFunc(operation: () => Promise<unknown>) {
    this.operationQueue.push(operation);

    if (!this.isWorking) {
      this.isWorking = true;
      while (this.operationQueue.length > 0) {
        const oper = this.operationQueue.shift();

        if (oper)
          await new Promise(res => {
            oper().finally(() => res(true));
          });
      }
      this.isWorking = false;
    }
  }

  public purge(reopen: boolean): Promise<boolean | Error> {
    return new Promise<boolean | Error>((res, rej) => {
      const asyncFunc = async () => {
        this.db?.close();

        if (this.db) this.db.onversionchange = () => {};
        const request = indexedDB.deleteDatabase(this.dbName);
        request.onblocked = e => rej(e);
        request.onerror = e => rej(e);
        request.onsuccess = async () => {
          if (!reopen) res(true);
          else {
            const opened = await this.openDB();

            if (typeof opened === 'boolean') res(opened);
            else rej(opened);
          }
        };
      };
      this.queueAsyncFunc(asyncFunc);
    });
  }
}

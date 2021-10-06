import { ISettings } from '../../../../shared/types/settings';
import { UserInfo } from '../../../../shared/types/user/user-info';
import { GenIDBOnUpgradeFuncCommands } from '../../helpers/idbmanager/idb-onupgradefunc-generator';
import { IDBMan } from '../../helpers/idbmanager/idbman';
import { IDBManAddEntryParams } from '../../helpers/idbmanager/idbman.def';
import { setSettings } from '../../redux/slices/settings';
import { setFullLocalUserInfo } from '../../redux/slices/userInfo';
import { store } from '../../redux/store';

export const IDBMAN = new IDBMan('no95typem-pointing-poker');

export const STORE_NAME = 'storeMirror';

export const db_key = 'db_key';

const dirtyCreateObjStore = async (): Promise<void> => {
  const addQuery: IDBManAddEntryParams = {
    objStoreName: STORE_NAME,
    obj: { db_key: 'fake' },
    objKey: 'fake',
    paramsIfStoreNotExist: {
      command: GenIDBOnUpgradeFuncCommands.create,
      objStoreName: 'storeMirror',
      keyPath: db_key,
      autoIncrement: true,
    },
  };
  try {
    await IDBMAN.addEntry(addQuery);
  } catch {
    //
  } finally {
    try {
      await IDBMAN.rmEntry({
        objStoreName: STORE_NAME,
        objKey: 'fake',
      });
    } catch {
      //
    }
  }
};

export const initDB = async () => {
  try {
    await IDBMAN.openDB();
    await dirtyCreateObjStore();

    IDBMAN.getEntries({
      objStoreName: STORE_NAME,
      objKey: 'userInfo',
    })
      .then(userInfo => {
        store.dispatch(setFullLocalUserInfo(userInfo as UserInfo));
      })
      .catch(err => console.error(err));

    IDBMAN.getEntries({
      objStoreName: STORE_NAME,
      objKey: 'settings',
    })
      .then(settings => {
        store.dispatch(setSettings(settings as ISettings));
      })
      .catch(err => console.error(err));
  } catch {}
};

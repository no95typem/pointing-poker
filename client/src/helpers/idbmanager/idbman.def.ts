import { GenIDBOnUpgradeFuncParams } from './idb-onupgradefunc-generator';

export interface IDBManAddEntryParams {
  objStoreName: string;
  objKey: string;
  obj: Record<string, unknown>;
  paramsIfStoreNotExist?: GenIDBOnUpgradeFuncParams;
}

export interface IDBManGetEntryParams {
  objStoreName: string;
  objKey: string;
  onlyCheck?: boolean;
}

export interface IDBManUpdateEntryParams {
  objStoreName: string;
  objKey: string;
  newPropObj: Record<string, unknown>;
}

export interface IDBManRmEntryParams {
  objStoreName: string;
  objKey: string;
}

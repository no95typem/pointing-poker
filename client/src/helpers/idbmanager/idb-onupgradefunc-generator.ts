export interface GenIDBOnUpgradeFuncParams {
  command: GenIDBOnUpgradeFuncCommands;
  objStoreName: string;
  keyPath: string | null;
  autoIncrement: boolean;
}

export enum GenIDBOnUpgradeFuncCommands {
  create,
  remove,
}

export function genIDBOnUpgradeFunc(params: GenIDBOnUpgradeFuncParams) {
  return function onupgrade(e: IDBVersionChangeEvent): void {
    const idbreq = e.target as IDBOpenDBRequest;

    if (params.command === GenIDBOnUpgradeFuncCommands.create) {
      idbreq.result.createObjectStore(params.objStoreName, {
        keyPath: params.keyPath,
        autoIncrement: params.autoIncrement,
      });
    }
  };
}

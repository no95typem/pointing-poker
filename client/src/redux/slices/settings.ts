import { ISettings } from './../../../../shared/types/settings';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_SETTINGS_CLIENT } from '../../constants';
import { IDBManAddEntryParams } from '../../helpers/idbmanager/idbman.def';
import { db_key, IDBMAN, STORE_NAME } from '../../modules/App/dbinit';
import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';
import { GenIDBOnUpgradeFuncCommands } from '../../helpers/idbmanager/idb-onupgradefunc-generator';
import { genUniqId } from '../../../../shared/helpers/generators/browser-specific';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: DEFAULT_SETTINGS_CLIENT,
  reducers: {
    setSettings(state, action: PayloadAction<ISettings>) {
      Object.assign(state, action.payload);
    },
  },
});

let saveId: string | undefined;

export const setSettings = createAsyncThunk(
  'settings/setSettings',
  async (settings: ISettings, thunkAPI) => {
    thunkAPI.dispatch(settingsSlice.actions.setSettings(settings));

    try {
      const addQuery: IDBManAddEntryParams = {
        objStoreName: STORE_NAME,
        obj: { ...OBJ_PROCESSOR.deepClone(settings), db_key: 'settings' },
        objKey: 'settings',
        paramsIfStoreNotExist: {
          command: GenIDBOnUpgradeFuncCommands.create,
          objStoreName: STORE_NAME,
          keyPath: db_key,
          autoIncrement: true,
        },
      };

      saveId = genUniqId();
      const memory = saveId;

      IDBMAN.rmEntry({
        objStoreName: STORE_NAME,
        objKey: 'settings',
      })
        .catch()
        .finally(() => {
          if (memory !== saveId) return;
          IDBMAN.addEntry(addQuery).catch();
        });
    } catch {}
  },
);

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  KnownErrorsKey,
  KNOWN_ERRORS_KEYS,
} from '../../../../shared/knownErrorsKeys';
import { KnownLoadKey } from '../../../../shared/knownLoadsKeys';
import { RootState } from '../store';
import { setErrorByKey } from './errors';

const initialState: Partial<Record<KnownLoadKey, NodeJS.Timeout>> = {};

export const loadsSlice = createSlice({
  name: 'loads',
  initialState,
  reducers: {
    setLoadByKey(
      state,
      action: PayloadAction<{
        key: KnownLoadKey;
        timeout?: NodeJS.Timeout;
      }>,
    ) {
      state[action.payload.key] = action.payload.timeout;
    },
    removeLoad(state, action: PayloadAction<KnownLoadKey>) {
      delete state[action.payload];
    },
  },
});

export interface ISetGLoadByKeyArgs {
  loadKey: KnownLoadKey;
  disableWatchdog?: true;
  errorKey?: KnownErrorsKey;
}

export const setGLoadByKey = createAsyncThunk(
  'loads/setGLoadByKey',
  async (args: ISetGLoadByKeyArgs, thunkAPI) => {
    let timeout: NodeJS.Timeout | undefined;

    if (args.disableWatchdog !== true) {
      timeout = setTimeout(() => {
        const state = thunkAPI.getState() as RootState;

        if (state.loads[args.loadKey] === timeout) {
          thunkAPI.dispatch(
            setErrorByKey(args.errorKey || KNOWN_ERRORS_KEYS.UNKNOWN_ERROR),
          );
        }
      }, 30_000);
    }

    thunkAPI.dispatch(
      loadsSlice.actions.setLoadByKey({ key: args.loadKey, timeout }),
    );
  },
);

export const { removeLoad } = loadsSlice.actions;

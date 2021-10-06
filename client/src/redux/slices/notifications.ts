import { AlertStatus } from '@chakra-ui/alert';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member } from '../../../../shared/types/session/member';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SYSTEM_AUDIO } from '../../helpers/SystemAudio';

export interface INotification {
  specialType?: 'new-connection';
  status: AlertStatus;
  text: string;
  needToShow?: boolean;
  addData?: Member;
}

const initialState: Record<number, INotification> = {};

export const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    addNotifRec(state, action: PayloadAction<INotification>) {
      const newRec: Record<string, unknown> = {};
      newRec[Date.now()] = action.payload;
      Object.assign(state, newRec);
    },
    resetEssentials(state) {
      Object.values(state).forEach(v => (v.needToShow = false));
    },
    removeAlertRec(state, action: PayloadAction<number>) {
      delete state[action.payload];
    },
  },
});

export const addNotifRec = createAsyncThunk(
  'notif/addNotifRec',
  async (args: INotification, thunkAPI) => {
    thunkAPI.dispatch(notifSlice.actions.addNotifRec(args));
    SYSTEM_AUDIO.play(args.status);
  },
);

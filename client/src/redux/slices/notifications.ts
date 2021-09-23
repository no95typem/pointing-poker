import { AlertStatus } from '@chakra-ui/alert';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface INotification {
  status: AlertStatus;
  text: string;
  needToShow?: boolean;
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

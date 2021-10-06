import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../../../../shared/types/user/user-info';

const initialState = {
  name: '',
  surname: '',
  jobPosition: '',
  avatarBase64: '',
  avatarBgColor: '#edf2f7',
} as UserInfo;

export const userInfoSlice = createSlice({
  name: 'UserInfo',
  initialState,
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
    changeSurname(state, action) {
      state.surname = action.payload;
    },
    changeJobPosition(state, action) {
      state.jobPosition = action.payload;
    },
    changeAvatarBase64(state, action) {
      state.avatarBase64 = action.payload;
    },
    changeAvatarBgColor(state, action) {
      state.avatarBgColor = action.payload;
    },
    setFullLocalUserInfo(state, action: PayloadAction<UserInfo>) {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  changeName,
  changeSurname,
  changeJobPosition,
  changeAvatarBase64,
  changeAvatarBgColor,
  setFullLocalUserInfo,
} = userInfoSlice.actions;

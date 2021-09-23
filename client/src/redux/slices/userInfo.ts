import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '../../../../shared/types/user/user-info';

const initialState = {
  name: '',
  surname: '',
  jobPosition: '',
  avatarBase64: '',
  avatarBgColor: 'rgb(237, 242, 247)',
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
      console.log(action.payload);
      state.avatarBase64 = action.payload;
    },
    changeAvatarBgColor(state, action) {
      state.avatarBgColor = action.payload;
    },
  },
});

export const {
  changeName,
  changeSurname,
  changeJobPosition,
  changeAvatarBase64,
  changeAvatarBgColor,
} = userInfoSlice.actions;

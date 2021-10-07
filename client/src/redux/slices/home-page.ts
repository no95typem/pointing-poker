import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole, USER_ROLES } from '../../../../shared/types/user/user-role';

const initialState: {
  lobbyURL: string;
  lastUserRole: UserRole;
} = {
  lobbyURL: '',
  lastUserRole: USER_ROLES.PLAYER,
};

export const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setLobbyURL(state, action: PayloadAction<string>) {
      state.lobbyURL = action.payload;
    },
    setUserRole(state, action: PayloadAction<UserRole>) {
      state.lastUserRole = action.payload;
    },
  },
});

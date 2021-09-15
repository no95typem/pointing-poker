import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  lobbyURL: '',
};

export const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setLobbyURL(state, action: PayloadAction<string>) {
      state.lobbyURL = action.payload;
    },
  },
});

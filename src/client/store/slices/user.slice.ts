/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  isLogged: boolean;
  username: string;
  room: string;
}

const initialState: UserState = {
  id: null,
  isLogged: false,
  username: '',
  room: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reqConnect(_state, _action) {},
    socketUpdate(state, action: PayloadAction<{ id: string; connected: boolean }>) {
      state.id = action.payload.id;
    },

    reqLogin(_state, _action) {},
    resLogin(state, action) {
      state.username = action.payload.user.username;
      state.isLogged = action.payload.user.username.length;
      // state.room = action.payload.room;
    },

    reqJoinRoom(_state, _action) {},
    resJoinRoom(state, action) {
      state.room = action.payload.room.room;
    },

    reqLogout(_state, _action) {},
    resLogout(state, _action) {
      state.username = '';
      state.isLogged = false;
      // state.room = '';
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(updateConnection, (state, action) => {
  //     state.id = action.payload.id;
  //   });
  // },
});

export const { reqConnect, socketUpdate, reqLogin, resLogin, reqJoinRoom, resJoinRoom, reqLogout, resLogout } =
  userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';

export interface SocketState {
  id: string;
  connected: boolean;
}

export const socketState: SocketState = {
  id: '',
  connected: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState: socketState,
  reducers: {
    reqConnect(_state, _action) {},

    updateConnection(state, action) {
      console.log('UPDATE_CONNECTION', action);
      state.id = action.payload.id;
      state.connected = action.payload.connected;
    },
  },
});

export const { reqConnect, updateConnection } = socketSlice.actions;

export const socketReducer = socketSlice.reducer;

export const selectSocketId = (state: RootState) => state.socket.id;
export const selectSocketConnected = (state: RootState) => state.socket.connected;

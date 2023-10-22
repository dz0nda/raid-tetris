import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SocketState {
  id: string;
  connected: boolean;
}

const initialState: SocketState = {
  id: '',
  connected: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    updateConnection(state, action: PayloadAction<{ id: string; connected: boolean }>) {
      state.id = action.payload.id;
      state.connected = action.payload.connected;
    },
  },
});

export const { updateConnection } = socketSlice.actions;
export default socketSlice.reducer;

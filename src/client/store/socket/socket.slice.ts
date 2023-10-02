import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//socket client
// import { socketInstance } from '../../../../index';
//constants
// import { appSocketMessages } from '@/js/constants/Constants';

import { initialSocket } from '@/client/middlewares/socketIo';

export const appSocketMessages = {
  connectionStatus: {
    pending: 'connecting',
    fulfilled: 'connected',
    rejected: 'connection failed',
  },
  disconnectionStatus: {
    pending: 'disconnecting',
    fulfilled: 'disconnected',
    rejected: 'disconnection failed',
  },
  messageStatus: {
    pending: 'Sending',
    fulfilled: 'Sent successfully',
    rejected: 'Send failed',
  },
};

const initialState = {
  id: '',
  connected: false,
  connectionStatus: '',
};

export const connectToSocket = createAsyncThunk('connectToSocket', async function () {
  return initialSocket.connect();
});

export const disconnectFromSocket = createAsyncThunk('disconnectFromSocket', async function () {
  return initialSocket.disconnect();
});

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(connectToSocket.pending, (state, _action) => {
      console.log(_action);
      // state.id = action.payload.id;
      // state.connected = action.payload.connected;
      state.connectionStatus = appSocketMessages.connectionStatus.pending;
    });
    builder.addCase(connectToSocket.fulfilled, (state, _action) => {
      console.log(_action);
      state.connectionStatus = appSocketMessages.connectionStatus.fulfilled;
    });
    builder.addCase(connectToSocket.rejected, (state, _action) => {
      console.log(_action);
      state.connectionStatus = appSocketMessages.connectionStatus.rejected;
    });
    builder.addCase(disconnectFromSocket.pending, (state) => {
      state.connectionStatus = appSocketMessages.disconnectionStatus.pending;
    });
    builder.addCase(disconnectFromSocket.fulfilled, (state) => {
      state.connectionStatus = appSocketMessages.disconnectionStatus.fulfilled;
    });
    builder.addCase(disconnectFromSocket.rejected, (state) => {
      state.connectionStatus = appSocketMessages.disconnectionStatus.rejected;
    });
  },
});

export const socketReducer = socketSlice.reducer;

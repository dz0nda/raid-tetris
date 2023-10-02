import { RootState } from '..';

export const selectSocketId = (state: RootState) => state.socket.id;
export const selectSocketConnected = (state: RootState) => state.socket.connected;

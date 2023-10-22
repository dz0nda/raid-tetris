import { RootState } from '..';

export const selectSocketId = (state: RootState) => state.user.id;
export const selectSocketConnected = (state: RootState) => state.user.id;

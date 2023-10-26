import { RootState } from '../index'; // Adjust the path accordingly

export const selectUser = (state: RootState) => state.user;
export const isUserLogged = (state: RootState) => state.user.isLogged;

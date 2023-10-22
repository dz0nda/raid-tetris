import { RootState } from '../index';

export const selectAppChats = (state: RootState) => state.chat.chats;

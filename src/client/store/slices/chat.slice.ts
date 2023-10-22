/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit';

import { Message } from '@/client/components/chat/ChatRoom';
import { chatData } from '@/client/helpers/chatData';

interface ChatState {
  chats: Record<string, Message[]>;
}

const initialState: ChatState = {
  chats: chatData,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    reqChat(_state, _action) {},
    resChat(state, action) {
      state.chats = action.payload.chats;
    },
    updateGameChat(state, action) {
      state.chats[action.payload.room] = action.payload.chat;
    },
  },
});

export const { reqChat, resChat, updateGameChat } = chatSlice.actions;
export default chatSlice.reducer;

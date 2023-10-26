/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit';

interface ChatState {
  chats: Record<string, any[]>;
}

const initialState: ChatState = {
  chats: {
    general: [],
  },
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

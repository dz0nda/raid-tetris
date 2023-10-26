/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  username: string;
  room: string;
  rooms: Record<string, any>;
  chats: Record<string, any[]>;
}

const initialState: AppState = {
  username: '',
  room: '',
  rooms: {},
  chats: {},
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    reqLogin(_state, _action) {},
    resLogin(state, action) {
      // console.log('resLogin', action.payload);
      state.username = action.payload.name;
      state.room = action.payload.room;
    },

    reqLogout(_state, _action) {},

    reqStartGame(_state, _action) {},

    reqOwner(_state, _action) {},

    reqChat(_state, _action) {},
    resChat(state, action) {
      state.chats = action.payload.chats;
    },

    reqMove(_state, _action) {},
    resMove(state, action) {
      state.rooms[state.room].players[action.payload.id] = action.payload.player;
    },

    updateGame(state, action) {
      state.rooms[action.payload.game.room] = action.payload.game;
    },

    updateGameSettings(state, action) {
      state.rooms[state.room].settings = action.payload.settings;
    },

    updateGamePlayers(state, action) {
      state.rooms[state.room].players = action.payload.players;
    },

    updateGameChat(state, action) {
      state.chats[action.payload.room] = action.payload.chat;
    },

    updatePlayer(state, action) {
      state.rooms[state.room].players[action.payload.id] = action.payload.player;
    },
  },
});

export const {
  reqLogin,
  resLogin,
  reqLogout,
  reqStartGame,
  reqOwner,
  reqChat,
  resChat,
  reqMove,
  resMove,
  updateGame,
  updateGameChat,
  updateGamePlayers,
  updateGameSettings,
  updatePlayer,
} = appSlice.actions;

export default appSlice.reducer;

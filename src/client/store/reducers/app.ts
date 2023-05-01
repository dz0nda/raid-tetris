import { createSlice } from '@reduxjs/toolkit';
// import { Game } from '../../types';

import { RootState } from '..';
import { Room } from '@/server/app/room/Room';

export interface AppState {
  username: string;
  room: string;
  rooms: { [key: string]: Room };
  chats: { [key: string]: any };
}

export const appState: AppState = {
  username: '',
  room: '',
  rooms: {},
  chats: {},
};

const appSlice = createSlice({
  name: 'app',
  initialState: appState,
  reducers: {
    reqLogin(_state, _action) {},
    resLogin(state, action) {
      state.username = action.payload.username;
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
      state.rooms[state.room] = action.payload.game;
    },

    updateGameSettings(state, action) {
      state.rooms[state.room].settings = action.payload.settings;
    },

    updateGamePlayers(state, action) {
      state.rooms[state.room].players = action.payload.players;
    },

    updateGameChat(state, action) {
      state.chats[state.room] = action.payload.chat;
    },

    updatePlayer(state, action) {
      state.rooms[state.room].players[action.payload.id] = action.payload.player;
    },
    // resLzogout()
  },
});

// const countRoomsAndPlayers = (rooms: Record<string, { players: Record<string, any> }>): { number; number } =>
//   Object.values(rooms).reduce(
//     ({ roomsAcc, playersAcc }, { players: roomPlayers }) => {
//       return { roomAcc: roomsAcc + 1, playersAcc: playersAcc + Object.values(roomPlayers).length };
//     },
//     { roomsAcc: 0, playersAcc: 0 },
//   );

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

export const appReducer = appSlice.reducer;

export const selectRooms = (state: RootState) => state.app.rooms;
export const selectRoom = (state: RootState) => state.app.rooms[state.app.room];
export const selectRoomOwner = (state: RootState) => state.app.rooms[state.app.room]?.settings.owner;
export const selectAppChats = (state: RootState) => state.app.chats;

export const selectAppInfos = (state: RootState): { roomsAcc: number; playersAcc: number } =>
  Object.values(state.app.rooms).reduce(
    ({ roomsAcc, playersAcc }, { players: roomPlayers }): { roomsAcc: number; playersAcc: number } => {
      return { roomsAcc: roomsAcc + 1, playersAcc: playersAcc + Object.values(roomPlayers).length };
    },
    { roomsAcc: 0, playersAcc: 0 },
  );

export const selectRoomPlayers = (state: RootState) => state.app.rooms[state.app.room]?.players || {};
export const selectPlayer = (state: RootState) => state.app.rooms[state.app.room]?.players[state.socket.id] || {};

// // eslint-disable-next-line default-param-last
// const appReducer = (state = appState, action) => {
//   switch (action.type) {
//     case ev.UPDATE_CONNECTION: {
//       const { id, connected, snackbar } = action.payload;

//       return {
//         ...state,
//         id,
//         connected,
//         isLoading: !connected,
//         snackbar: {
//           message: snackbar.message,
//           variant: snackbar.variant,
//         },
//       };
//     }
//     case ev.UPDATE_LOG: {
//       const { isLoading, snackbar } = action.payload;

//       return {
//         ...state,
//         isLoading,
//         snackbar: {
//           message: snackbar.message,
//           variant: snackbar.variant,
//         },
//       };
//     }
//     case ev.UPDATE_INFOS: {
//       const { nbPlayers, nbGames, games } = action.payload;
//       return {
//         ...state,
//         infos: {
//           nbPlayers,
//           nbGames,
//           games,
//         },
//       };
//     }
//     default:
//       return state;
//   }
// };

// export const reqConnect = (payload) => {
//   console.log('log');

//   return {
//     type: ev.CLIENT_CONNECTING,
//     payload: {
//       host: payload.host,
//       port: payload.port,
//     },
//   };
// };

// export const CLIENT_DISCONNECT = () => ({
//   type: ev.CLIENT_DISCONNECT,
//   payload: {
//     connected: false,
//   },
// });

// export const reqLogin = (payload) => ({
//   type: ev.REQUEST_LOGIN,
//   payload: {
//     name: payload.name,
//     room: payload.room,
//   },
// });

// export const reqLogout = () => ({
//   type: ev.REQUEST_LOGOUT,
// });

// export const actions = { reqConnect, reqLogin, reqLogout };

// export default appReducer;

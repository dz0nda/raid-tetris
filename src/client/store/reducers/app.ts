import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';

export interface AppState {
  id: string | null;
  connected: boolean;
  isLoading: boolean;
  infos: {
    nbPlayers: number;
    nbGames: number;
    games: any[];
  };
  snackbar: {
    message: string;
    variant: string;
  };
}

export const appState: AppState = {
  id: null,
  connected: false,
  isLoading: true,
  infos: {
    nbPlayers: 0,
    nbGames: 0,
    games: [],
  },
  snackbar: {
    message: 'socket: Connection...',
    variant: 'info',
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState: appState,
  reducers: {
    reqConnect(state, action) {},
    reqLogin(state, action) {},
    reqLogout() {},
    updateConnection(state, action) {
      state.id = action.payload.id;
      state.connected = action.payload.connected;
      state.isLoading = !action.payload.connected;
    },

    updateLog(state, action) {
      state.isLoading = action.payload.isLoading;
      state.snackbar.message = action.payload.snackbar.message;
      state.snackbar.variant = action.payload.snackbar.variant;
    },

    updateInfos(state, action) {
      state.infos.nbPlayers = action.payload.nbPlayers;
      state.infos.nbGames = action.payload.nbGames;
      state.infos.games = action.payload.games;
    },
  },
});

export const { reqConnect, reqLogin, reqLogout, updateConnection, updateLog, updateInfos } = appSlice.actions;

export const appReducer = appSlice.reducer;

export const selectAppConnected = (state: RootState) => state.app.connected;
export const selectAppLoading = (state: RootState) => state.app.isLoading;
export const selectAppInfos = (state: RootState) => state.app.infos;

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
//   type: ev.req_LOGIN,
//   payload: {
//     name: payload.name,
//     room: payload.room,
//   },
// });

// export const reqLogout = () => ({
//   type: ev.req_LOGOUT,
// });

// export const actions = { reqConnect, reqLogin, reqLogout };

// export default appReducer;

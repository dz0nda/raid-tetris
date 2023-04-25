import { push } from 'connected-react-router';

import ev from '../../../shared/events';
import { IServerEvent } from './event.interface';

export const resInfos: IServerEvent = {
  action: ev.res_UPDATE_APP_INFOS,

  dispatch: (_, data, dispatch) => {
    console.log(data);
    const { status, payload } = data;
    const { nbPlayers, nbGames, games } = payload;

    if (status === 200) {
      dispatch({
        type: ev.UPDATE_INFOS,
        payload: {
          nbPlayers,
          nbGames,
          games: Object.values(games),
        },
      });
    }
  },
};

export const resLogin: IServerEvent = {
  action: ev.res_LOGIN,

  dispatch: (_, data, dispatch) => {
    // const { status, payload } = data;

    console.log('resLogin:', data);

    // if (status === 200) {
    //   // dispatch({
    //   //   type: ev.UPDATE_LOG,
    //   //   payload: {
    //   //     isLoading: false,
    //   //     snackbar: {
    //   //       message: 'login: Succed',
    //   //       variant: 'success',
    //   //     },
    //   //   },
    //   // });

    //   dispatch(push(`/${payload.room}[${payload.name}]`));
    // } else {
    //   dispatch({
    //     type: ev.UPDATE_LOG,
    //     payload: {
    //       isLoading: false,
    //       snackbar: {
    //         message: `login: Error`,
    //         variant: 'error',
    //       },
    //     },
    //   });

    //   dispatch(push('/'));
    // }
  },
};

export const resLogout: IServerEvent = {
  action: ev.res_LOGOUT,

  dispatch: (_, data, dispatch) => {
    const { status } = data;

    if (status === 200) {
      dispatch({
        type: ev.UPDATE_GAME,
        payload: {
          game: {
            room: '',
            settings: {
              owner: '',
              started: false,
              status: 'STOPPED',
              pieces: [],
              dropTime: 0,
              nbPlayers: 0,
              nbLoosers: 0,
            },
            players: {},
            chat: [],
          },
        },
      });

      dispatch(push('/'));

      dispatch({
        type: ev.UPDATE_LOG,
        payload: {
          isLoading: false,
          snackbar: {
            message: 'logout: Succed',
            variant: 'success',
          },
        },
      });
    } else {
      dispatch({
        type: ev.UPDATE_LOG,
        payload: {
          isLoading: false,
          snackbar: {
            message: 'logout: Failed',
            variant: 'error',
          },
        },
      });
    }
  },
};

export const resStartGame: IServerEvent = {
  action: ev.res_START_GAME,

  dispatch: (_, data, dispatch) => {
    const { status, payload } = data;

    const { message } = payload;

    if (status === 100) {
      dispatch({
        type: ev.UPDATE_LOG,
        payload: {
          isLoading: false,
          snackbar: {
            message,
            variant: 'info',
          },
        },
      });
    }
    if (status === 200) {
      // eslint-disable-next-line no-shadow
      dispatch((dispatch: any, getState: any) => {
        const { id } = getState().app;

        dispatch({
          type: ev.UPDATE_PLAYER,
          payload: {
            player: payload.players[id],
          },
        });
      });
    }
  },
};

export const resUpdateGame: IServerEvent = {
  action: ev.res_UPDATE_GAME,

  dispatch: (_, data, dispatch) => {
    const { status, payload } = data;

    if (status === 200) {
      // eslint-disable-next-line no-shadow
      dispatch((dispatch: any, getState: any) => {
        const { id } = getState().app;

        dispatch({
          type: ev.UPDATE_PLAYER,
          payload: {
            player: payload.game.players[id],
          },
        });

        dispatch({
          type: ev.UPDATE_GAME,
          payload: {
            game: payload.game,
          },
        });
      });
    }
  },
};

export const resUpdateGameChat: IServerEvent = {
  action: ev.res_UPDATE_GAME_CHAT,

  dispatch: (_, data, dispatch) => {
    const { status, payload } = data;

    if (status === 200) {
      dispatch({
        type: ev.UPDATE_GAME_CHAT,
        payload: {
          chat: payload.chat,
        },
      });
    }
  },
};

export const resUpdateGamePlayers: IServerEvent = {
  action: ev.res_UPDATE_GAME_PLAYERS,

  dispatch: (_, data, dispatch) => {
    const { status, payload } = data;

    if (status === 200) {
      dispatch({
        type: ev.UPDATE_GAME_PLAYERS,
        payload: {
          id: payload.id,
          player: payload.player,
        },
      });
    }
  },
};

export const resUpdateGameSettings: IServerEvent = {
  action: ev.res_UPDATE_GAME_SETTINGS,

  dispatch: (_, data, dispatch) => {
    const { payload } = data;

    dispatch({
      type: ev.UPDATE_GAME_SETTINGS,
      payload: { settings: payload.settings },
    });
  },
};

export const resUpdatePlayer: IServerEvent = {
  action: ev.res_UPDATE_PLAYER,

  dispatch: (_, data, dispatch) => {
    const { status, message, payload } = data;

    if (status === 200) {
      dispatch({
        type: ev.UPDATE_PLAYER,
        payload: {
          player: payload.player,
        },
      });
    } else if (status === 500) {
      dispatch({
        type: ev.UPDATE_LOG,
        payload: {
          isLoading: false,
          snackbar: {
            message: `error: ${message}`,
            variant: 'error',
          },
        },
      });
    }
  },
};

export default [
  resInfos,
  resLogin,
  resLogout,
  resStartGame,
  resUpdateGame,
  resUpdateGameChat,
  resUpdateGamePlayers,
  resUpdateGameSettings,
  resUpdatePlayer,
];

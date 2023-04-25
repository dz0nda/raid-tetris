import ev from '../../../shared/events';
import { IClientEvent } from './event.interface';

// export const dispatch = (socket, store, action) => {
//   socket.emit(action.type, {});
// };

export const reqInfos: IClientEvent = {
  action: ev.req_UPDATE_APP_INFOS,

  dispatch: (socket, _, action) => {
    socket.emit(action.type, {});
  },
};

export const reqLogin: IClientEvent = {
  action: 'app/reqLogin',

  dispatch: (socket, store, action) => {
    const { name, room } = action.payload;
    console.log('log');
    // notifications.show({
    //   title: 'Default notification',
    //   message: 'Hey there, your code is awesome! 🤥',
    //   loading: true,
    // });
    // store.dispatch({
    //   type: ev.UPDATE_LOG,
    //   payload: {
    //     isLoading: true,
    //     snackbar: {
    //       message: 'login: Trying to login...',
    //       variant: 'info',
    //     },
    //   },
    // });

    socket.emit(ev.req_LOGIN, {
      name,
      room,
    });
  },
};

export const reqLogout: IClientEvent = {
  action: ev.req_LOGOUT,

  dispatch: (socket, store, action) => {
    const state = store.getState();
    const { name } = state.player;
    const { room } = state.game;

    socket.emit(action.type, {
      name,
      room,
    });
  },
};

export const reqStartGame: IClientEvent = {
  action: ev.req_START_GAME,

  dispatch: (socket, store, action) => {
    const { name } = store.getState().player;
    const { room } = store.getState().game;

    const payload = {
      name,
      room,
    };

    socket.emit(action.type, payload);
  },
};

export const reqUpdateGameChat: IClientEvent = {
  action: ev.req_UPDATE_GAME_CHAT,

  dispatch: (socket, store, action) => {
    const { room } = store.getState().game;
    const { name } = store.getState().player;

    const { message } = action.payload;

    const payload = {
      room,
      name,
      text: message,
    };

    socket.emit(action.type, payload);
  },
};

export const reqUpdateGameOwner: IClientEvent = {
  action: ev.req_UPDATE_GAME_OWNER,

  dispatch: (socket, store, action) => {
    const { name } = store.getState().player;
    const { room } = store.getState().game;

    const payload = {
      name,
      room,
      newOwner: action.payload.newOwner,
    };

    socket.emit(action.type, payload);
  },
};

export const reqUpdatePlayer: IClientEvent = {
  action: ev.req_UPDATE_PLAYER,

  dispatch: (socket, store, action) => {
    const { room } = store.getState().game;
    const { id } = store.getState().app;

    socket.emit(action.type, {
      room,
      name: id,
      keyCode: action.payload.keyCode,
    });
  },
};

export default [reqInfos, reqLogin, reqLogout, reqStartGame, reqUpdateGameChat, reqUpdateGameOwner, reqUpdatePlayer];

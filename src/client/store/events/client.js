import ev from '../../../shared/events';

export const dispatch = (socket, store, action) => {
  socket.emit(action.type, {});
};

export const reqInfos = {
  action: ev.req_UPDATE_APP_INFOS,

  dispatch: (socket, store, action) => {
    socket.emit(action.type, {});
  },
};

export const reqLogin = {
  action: ev.req_LOGIN,

  dispatch: (socket, store, action) => {
    const { name, room } = action.payload;
    console.log('log');
    store.dispatch({
      type: ev.UPDATE_LOG,
      payload: {
        isLoading: true,
        snackbar: {
          message: 'login: Trying to login...',
          variant: 'info',
        },
      },
    });

    socket.emit(action.type, {
      name,
      room,
    });
  },
};

export const reqLogout = {
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

export const reqStartGame = {
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

export const reqUpdateGameChat = {
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

export const reqUpdateGameOwner = {
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

export const reqUpdatePlayer = {
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

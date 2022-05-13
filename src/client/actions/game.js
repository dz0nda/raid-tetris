import ev from '../../shared/events';

export const reqOwner = (payload) => ({
  type: ev.req_UPDATE_GAME_OWNER,
  payload: {
    newOwner: payload.newOwner,
  },
});

export const reqChat = (payload) => ({
  type: ev.req_UPDATE_GAME_CHAT,
  payload: {
    message: payload.message,
  },
});

export const reqStartGame = () => ({
  type: ev.req_START_GAME,
  payload: {},
});

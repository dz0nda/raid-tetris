import ev from '../../shared/events';

export const updatePlayer = (payload) => (dispatch, getState) => {
  const { id } = getState().app;

  dispatch({
    type: ev.UPDATE_PLAYER,
    payload: {
      player: payload.game.players[id],
    },
  });
};

export const reqMove = (payload) => ({
  type: ev.req_UPDATE_PLAYER,
  payload: {
    keyCode: payload.keyCode,
  },
});

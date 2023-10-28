import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  const { status, payload } = data;

  if (status === 200) {
    // eslint-disable-next-line no-shadow
    dispatch((dispatch, getState) => {
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
};

export default {
  action: ev.res_UPDATE_GAME,
  dispatch,
};

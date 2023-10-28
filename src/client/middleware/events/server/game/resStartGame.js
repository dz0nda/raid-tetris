import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
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
    dispatch((dispatch, getState) => {
      const { id } = getState().app;

      dispatch({
        type: ev.UPDATE_PLAYER,
        payload: {
          player: payload.players[id],
        },
      });
    });
  }
};

export default {
  action: ev.res_START_GAME,
  dispatch,
};

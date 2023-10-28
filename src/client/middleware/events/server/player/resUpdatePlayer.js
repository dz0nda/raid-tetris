import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
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
};

export default {
  action: ev.res_UPDATE_PLAYER,
  dispatch,
};

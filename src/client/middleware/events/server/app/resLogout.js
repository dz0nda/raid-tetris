import { push } from 'connected-react-router';
import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  const { status } = data;

  if (status === 200) {
    dispatch({
      type: ev.UPDATE_GAME,
      payload: {
        game : {
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
};

export default {
  action: ev.res_LOGOUT,
  dispatch,
};

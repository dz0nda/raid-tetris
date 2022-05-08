import { push } from 'connected-react-router';

import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  const { status, payload } = data;

  if (status === 200) {
    dispatch({
      type: ev.UPDATE_LOG,
      payload: {
        isLoading: false,
        snackbar: {
          message: 'login: Succed',
          variant: 'success',
        },
      },
    });

    dispatch(push(`/${payload.room}[${payload.name}]`));
  } else {
    dispatch({
      type: ev.UPDATE_LOG,
      payload: {
        isLoading: false,
        snackbar: {
          message: `login: Error`,
          variant: 'error',
        },
      },
    });

    dispatch(push('/'));
  }
};

export default {
  action: ev.res_LOGIN,
  dispatch,
};

// import { useHistory } from 'react-router-dom';
import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  const { status, payload } = data;

  if (status === 200) {
    dispatch({
      type: ev.UPDATE_GAME_CHAT,
      payload: {
        chat: payload.chat,
      },
    });
  }
};

export default {
  action: ev.res_UPDATE_GAME_CHAT,
  dispatch,
};

import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  const { payload } = data;

  dispatch({
    type: ev.UPDATE_GAME_SETTINGS,
    payload: { settings: payload.settings },
  });
};

export default {
  action: ev.res_UPDATE_GAME_SETTINGS,
  dispatch,
};

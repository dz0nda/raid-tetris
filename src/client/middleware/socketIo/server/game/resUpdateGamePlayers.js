// import { useHistory } from 'react-router-dom';
import ev from '../../../../../shared/events';

// eslint-disable-next-line no-shadow
export const dispatch = (action, data, dispatch) => {
  const { status, payload } = data;

  if (status === 200) {
    dispatch({
      type: ev.UPDATE_GAME_PLAYERS,
      payload: {
        id: payload.id,
        player: payload.player,
      },
    });

    // eslint-disable-next-line no-shadow
    // dispatch((dispatch, getState) => {
    //   const { id } = getState().app;

    //   dispatch({
    //     type: ev.UPDATE_PLAYER,
    //     payload: {
    //       player: payload.players[id],
    //     },
    //   });

    //   dispatch({
    //     type: ev.UPDATE_GAME_PLAYERS,
    //     payload: {
    //       players: payload.players,
    //     },
    //   });
    // });
  }
};

export default {
  action: ev.res_UPDATE_GAME_PLAYERS,
  dispatch,
};

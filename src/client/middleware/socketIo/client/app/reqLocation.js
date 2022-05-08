// import { LOCATION_CHANGE } from 'connected-react-router';

// import ev from '../../../../../shared/events';

// export const dispatch = (socket, store, action) => {
//   if (action) {
//     const state = store.getState();
//     const { name } = state.player;
//     const { room } = state.game;

//     if (action.payload.location.pathname === '/' && state.game.room !== '') {
//       socket.emit(ev.req_LOGOUT, {
//         name,
//         room,
//       });
//     }
//   }
// };

// export default {
//   action: LOCATION_CHANGE,
//   dispatch,
// };

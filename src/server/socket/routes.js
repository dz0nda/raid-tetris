import ev from '../../shared/events';

import appController from '../controllers/app';
import gameController from '../controllers/game';
import playerController from '../controllers/player';

const routes = () => [
  {
    event: 'connect',
    handler: appController.connect,
  },
  {
    event: 'disconnect',
    handler: appController.disconnect,
  },
  {
    event: ev.req_LOGIN,
    handler: appController.resLogin,
  },
  {
    event: ev.req_LOGOUT,
    handler: appController.reslogout,
  },
  {
    event: ev.req_START_GAME,
    handler: gameController.resStart,
  },
  {
    event: ev.req_UPDATE_GAME_OWNER,
    handler: gameController.resOwner,
  },
  {
    event: ev.req_UPDATE_GAME_CHAT,
    handler: gameController.resChat,
  },
  {
    event: ev.req_UPDATE_PLAYER,
    handler: playerController.resMove,
  },
];

export default routes;

export const events = {
  /* Socket events */

  SOCKET_CONNECTED: 'connect',
  SOCKET_CONNECTION_ERROR: 'connect_error',
  SOCKET_CONNECTION_TIMEOUT: 'connect_timeout',
  SOCKET_RECONNECTED: 'reconnect',
  SOCKET_RECONNECTION_ATTEMPT: 'reconnect_attempt',
  SOCKET_RECONNECTING: 'reconnecting',
  SOCKET_RECONNECTION_ERROR: 'reconnect_error',
  SOCKET_RECONNECTION_FAILED: 'reconnect_failed',
  SOCKET_DISCONNECTED: 'disconnect',

  /* Router events */
  ROUTER_LOCATION_CHANGE: '@@router/LOCATION_CHANGE',

  /* App events */
  REQUEST_LOGIN_USER: 'user/reqLoginUser',
  RESPONSE_LOGIN_USER: 'server/resLoginUser',

  /* Auth events */
  REQUEST_LOGIN: 'user/reqLogin',
  RESPONSE_LOGIN: 'server/resLogin',

  REQUEST_JOIN_ROOM: 'user/reqJoinRoom',
  RESPONSE_JOIN_ROOM: 'server/resJoinRoom',

  REQUEST_LOGOUT: 'app/reqLogout',
  RESPONSE_LOGOUT: 'server/resLogout',

  /* Room events */
  REQUEST_START_GAME: 'app/reqStartGame',
  RESPONSE_START_GAME: 'server/resStartGame',
  REQUEST_MOVE: 'app/reqMove',
  RESPONSE_MOVE: 'server/resMove',

  REQUEST_UPDATE_GAME: 'app/reqUpdateGame',
  RESPONSE_UPDATE_GAME: 'server/resUpdateGame',
  REQUEST_UPDATE_GAME_OWNER: 'app/reqUpdateGameOwner',
  RESPONSE_UPDATE_GAME_OWNER: 'server/resUpdateGameOwner',
  RESPONSE_UPDATE_GAME_PLAYERS: 'app/resUpdateGamePlayers',
  req_UPDATE_GAME_SETTINGS: 'server/reqUpdateGameSettings',
  RESPONSE_UPDATE_GAME_SETTINGS: 'app/resUpdateGameSettings',
  REQUEST_UPDATE_GAME_CHAT: 'app/reqUpdateGameChat',
  RESPONSE_UPDATE_GAME_CHAT: 'server/resUpdateGameChat',

  /* Game event */

  /* Player events */

  REQUEST_UPDATE_PLAYER: '#UPDATE_PLAYER',
  RESPONSE_UPDATE_PLAYER: '@UPDATE_PLAYER',

  /* App actions */

  UPDATE_CONNECTION: 'UPDATE_CONNECTION',
  UPDATE_LOG: 'UPDATE_LOG',
  UPDATE_INFOS: 'UPDATE_INFOS',

  /* Game actions */

  UPDATE_GAME: 'UPDATE_GAME',
  UPDATE_GAME_SETTINGS: 'UPDATE_GAME_SETTINGS',
  UPDATE_GAME_PLAYERS: 'UPDATE_GAME_PLAYERS',
  UPDATE_GAME_CHAT: 'UPDATE_GAME_CHAT',

  /* Player actions */

  UPDATE_PLAYER: 'UPDATE_PLAYER',
};

export default events;

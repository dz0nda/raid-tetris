import ev from '../../shared/events';

export const emitToAll = (io, event, data) => {
  io.emit(event, data);
};

export const emitToSocket = (socket, event, data) => {
  socket.emit(event, data);
};

export const emitToRoom = (io, room, event, data) => {
  io.in(room).emit(event, data);
};

export const emitToRoomExceptSender = (socket, room, event, data) => {
  socket.to(room).emit(event, data);
};

/* App */

export const resUpdateAppInfos = (io, RedTetris) => {
  emitToAll(io, ev.res_UPDATE_APP_INFOS, {
    status: 200,
    payload: {
      nbPlayers: RedTetris.getNbSockets(),
      nbGames: RedTetris.getNbGames(),
      games: RedTetris.getGames(),
    },
  });
};

export const resUpdateAppLogin = (socket, status, { name, room }) => {
  emitToSocket(socket, ev.res_LOGIN, {
    status,
    payload: { name, room },
  });
};

export const resUpdateAppLogout = (socket, status) => {
  emitToSocket(socket, ev.res_LOGOUT, {
    status,
    payload: {},
  });
};

/* Game */

export const resUpdateGame = (io, Game) => {
  emitToRoom(io, Game.getRoom(), ev.res_UPDATE_GAME, {
    status: 200,
    message: '',
    payload: {
      game: Game,
    },
  });
};

export const resUpdateGameSettings = (io, Game) => {
  emitToRoom(io, Game.getRoom(), ev.res_UPDATE_GAME_SETTINGS, {
    status: 200,
    payload: {
      settings: Game.settings,
    },
  });
};

export const resUpdateGameChat = (io, Game) => {
  emitToRoom(io, Game.getRoom(), ev.res_UPDATE_GAME_CHAT, {
    status: 200,
    payload: {
      chat: Game.getMessages(),
    },
  });
};

export const resUpdateGamePlayers = (io, Game, id) => {
  emitToRoom(io, Game.getRoom(), ev.res_UPDATE_GAME_PLAYERS, {
    status: 200,
    payload: {
      id,
      player: Game.getPlayer(id),
    },
  });
};

export const resUpdateGameStartRoom = (io, Game, status, message) => {
  emitToRoom(io, Game.getRoom(), ev.res_START_GAME, {
    status,
    payload: {
      message,
      players: status === 200 ? Game.getPlayers() : {},
    },
  });
};

/* Player */

export const resUpdatePlayer = (socket, status, message, Player) => {
  emitToSocket(socket, ev.res_UPDATE_PLAYER, {
    status,
    message,
    payload: {
      player: Player,
    },
  });
};

export const resUpdateGameStartPlayer = (socket, message) => {
  emitToSocket(socket, ev.res_START_GAME, {
    status: 100,
    payload: {
      message,
    },
  });
};

export default {
  emitToAll,
  emitToSocket,
  emitToRoom,
  emitToRoomExceptSender,
  resUpdateGame,
  resUpdateGameChat,
};

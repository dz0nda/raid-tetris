import Game from './Game';

export default class IoGame {
  constructor() {
    this.sockets = {};
    this.games = {};
  }

  /* Sockets */

  getSockets() {
    return this.sockets;
  }

  getNbSockets() {
    return Object.keys(this.getSockets()).length;
  }

  getSocket(id) {
    return this.sockets[id];
  }

  getSocketRoom(id) {
    return this.sockets[id].redTetris.room;
  }

  setSocket(socket) {
    this.sockets[socket.id] = socket;
  }

  unsetSocket(id) {
    delete this.sockets[id];
  }

  /* Games */

  getGames() {
    return this.games;
  }

  getGame(room) {
    return this.games[room];
  }

  getNbGames() {
    return Object.keys(this.getGames()).length;
  }

  setGame(room, owner) {
    this.games[room] = new Game(room, owner);
  }

  unsetGame(room) {
    delete this.games[room];
  }

  createGame(room, owner) {
    this.setGame(room, owner);
    return this.getGame(room);
  }

  getCreatedGame(id) {
    if (!this.getSocket(id)) return null;
    return this.getGame(this.getSocketRoom(id));
  }
}

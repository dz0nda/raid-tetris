import Game from './Game';

export default class Socket {
  constructor(socket, name, room) {
    this.socket = socket;
    this.name = name;
    this.room = room;
  }

  getSocket() {
    return this.socket;
  }

  getName() {
    return Object.keys(this.getSockets()).length;
  }

  getRoom(id) {
    return this.sockets[id];
  }

  getSocketRoom(id) {
    return this.sockets[id].redTetris.room;
  }

  setSocket(socket) {
    this.sockets[socket.id] = socket;
  }

  setSocketRoom(id, room, name) {
    this.sockets[id].redTetris = { name, room };
  }

  unsetSocketRoom(id) {
    delete this.sockets[id].room;
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

  getLoggedPlayer(id) {
    return this.getGame(this.getSocketRoom(id)).getPlayer(id);
  }

  getCreatedGame(id) {
    return this.getGame(this.getSocketRoom(id));
  }
}

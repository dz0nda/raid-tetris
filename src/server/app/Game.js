import { v4 as uuidv4 } from 'uuid';
import Piece from './Piece';
import Player from './Player';

export default class Game {
  constructor(room, owner) {
    this.room = room;
    this.settings = {
      owner,
      started: false,
      status: '',
      nbPlayers: 0,
      nbLoosers: 0,
      dropTime: 0,
      pieces: [],
    };
    this.players = {};
    this.chat = [];
  }

  /* Room */

  getRoom() {
    return this.room;
  }

  /* Settings */

  setStarted(started) {
    this.settings.started = started;
  }

  getStarted() {
    return this.settings.started;
  }

  setPiece(piece) {
    this.settings.pieces.push(piece);
  }

  setPiecesNull() {
    this.settings.pieces = [];
  }

  getPieces() {
    return this.settings.pieces;
  }

  setDropTime(dropTime) {
    this.settings.dropTime = dropTime;
  }

  setNbPlayers(nbPlayers) {
    this.settings.nbPlayers = nbPlayers;
  }

  getNbPlayers() {
    return this.settings.nbPlayers;
  }

  setNbLoosers(nbLoosers) {
    this.settings.nbLoosers = nbLoosers;
  }

  getNbLoosers() {
    return this.settings.nbLoosers;
  }

  /* Players */

  setPlayer(id, name) {
    if (this.getStarted() === true) {
      throw new Error('Game is started');
    }

    this.getPlayersAsArray().forEach((player) => {
      if (player.getName() === name) {
        throw new Error('Player already logged with same name');
      }
    });

    this.getPlayers()[id] = new Player(name);
    this.setNbPlayers(this.getNbPlayers() + 1);
    this.setMessage('server', `${name} joined the room`);
  }

  unsetPlayer(id) {
    // console.log('unsetPlayer', id);
    // console.log(this.players);
    if (!this.getPlayer(id)) {
      throw new Error('No player found');
    }

    const name = this.getPlayer(id).getName();

    this.setMessage('server', `${this.getPlayer(id).name} leaved the room`);
    delete this.getPlayers()[id];
    this.setNbPlayers(this.getNbPlayers() - 1);

    if (this.getNbPlayers() && this.isOwner(name)) {
      this.setRandomOwner();
    }
  }

  getPlayers() {
    return this.players;
  }

  getPlayer(id) {
    return this.players[id];
  }

  isEmpty() {
    return Object.keys(this.getPlayers()).length === 0;
  }

  getPlayersAsArray() {
    return Object.values(this.getPlayers());
  }

  /* Owner */

  setOwner(name) {
    this.settings.owner = name;
    this.setMessage('server', `${this.settings.owner} is the new owner`);
  }

  setRandomOwner() {
    const players = Object.values(this.players);
    this.setOwner(players[Math.floor(Math.random() * players.length)].getName());
  }

  setNewOwner(id, newOwner) {
    if (!this.isOwner(this.getPlayer(id).getName())) {
      throw new Error('Not owner');
    }

    if (newOwner === '') this.setRandomOwner();
    else this.setOwner(newOwner);
  }

  getOwner() {
    return this.settings.owner;
  }

  isOwner(name) {
    return this.settings.owner === name;
  }

  /* Chat */

  setMessage(user, text) {
    this.chat.push({
      id: uuidv4(),
      user,
      text,
      date: `${new Date().getHours()}h : ${new Date().getMinutes() < 10 ? '0' : ''}${new Date().getMinutes()}`,
    });
  }

  getMessages() {
    return this.chat;
  }

  /* Game */

  initGameStart(id) {
    if (!this.isOwner(this.getPlayer(id).getName()) || this.getStarted() === true) {
      throw new Error("Can't start the game");
    }

    this.setStarted(true);
    this.setPiecesNull();
    this.setPiece(new Piece());
    this.setPiece(new Piece());
    this.setPiece(new Piece());
    this.setDropTime(1000);
    this.setNbLoosers(0);
    this.setMessage('server', `${this.getOwner()} started the game`);

    this.getPlayersAsArray().forEach((player) => {
      player.initPlayer();
    });
  }

  setGameStart() {
    this.setStarted(true);
    this.setDropTime(1000);
    this.getPlayersAsArray().forEach((player) => {
      player.setStart(this.settings);
    });
  }

  setMove(id, keyCode) {
    let collided = false;

    this.getPlayer(id).setMove(keyCode);

    if (this.getPlayer(id).getCollided()) {
      collided = true;
      this.updateCollision(id);
      this.getPlayer(id).setFlushUpdate();
    }

    if (this.getPlayer(id).getFinish()) {
      this.updateLoose(id);
    }

    return collided;
  }

  updateCollision(id) {
    const lines = this.getPlayer(id).getLines();

    /* Check the nbPiece of player */
    if (!this.getPieces[this.getPlayer(id).getNbPiece() + 3]) {
      this.setPiece(new Piece());
    }

    this.getPlayer(id).setCollision(this.getPieces());

    /* Mallus */
    const mallus = this.getPlayer(id).getLines() - lines;
    if (mallus > 1) {
      Object.entries(this.players).forEach((entry) => {
        if (entry[0] !== id) entry[1].setMallus(mallus - 1);
      });
    }
  }

  updateLoose(id) {
    this.getPlayer(id).setLoose(this.getNbPlayers() - this.getNbLoosers());
    this.setNbLoosers(this.getNbLoosers() + 1);
    if (this.getNbPlayers() === 1) {
      this.setStarted(false);
    } else if (this.getNbLoosers() + 1 === this.getNbPlayers()) {
      this.getPlayersAsArray().forEach((player) => {
        if (player.getFinish() === false) player.setLoose(this.getNbPlayers() - this.getNbLoosers());
      });
      this.setStarted(false);
      this.setNbLoosers(this.getNbLoosers() + 1);
    }
  }
}

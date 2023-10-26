import { Entity } from '../database/entities/Entity';

export class Room extends Entity {
  id: string;
  room: string;
  pass: string | undefined;
  owner: string;
  started: boolean;
  // pieces: Piece[];
  players: Set<string>;

  constructor(id: string, name: string, pass?: string) {
    super();

    this.id = id;
    this.room = name;
    this.pass = pass;
    this.owner = '';
    this.started = false;
    this.players = new Set();
  }

  /**
   * Adds a player to the room.
   *
   * @param playerId - The ID of the player.
   */
  addPlayer(playerId: string): void {
    if (this.players.has(playerId)) {
      throw new Error('Player already in the room.');
    }
    this.players.add(playerId);
  }

  /**
   * Removes a player from the room.
   *
   * @param playerId - The ID of the player.
   */
  removePlayer(playerId: string): void {
    this.players.delete(playerId);
  }

  /**
   * Checks if the room has a player.
   *
   * @param playerId - The ID of the player.
   * @returns True if the player is in the room, otherwise false.
   */
  hasPlayer(playerId: string): boolean {
    return this.players.has(playerId);
  }

  /**
   * Set the owner of the room.
   * The owner is the first player to join the room.
   * If the owner leaves the room, a new owner is randomly selected.
   *
   * @param id - The ID of the player.
   *
   * @returns The owner of the room.
   *
   * @throws Error if the player is not in the room.
   * @throws Error if the player is not the owner of the room.
   *
   */
  setOwner(id: string): string {
    if (this.players.size === 0) {
      this.owner = id;
      return this.owner;
    }

    if (!this.hasPlayer(id) || this.owner !== id) {
      throw new Error('Player is not auhorized.');
    }

    this.owner = id;

    return this.owner;
  }

  // /**
  //  * Start

  /* Room */

  // getRoom() {
  //   return this.room;
  // }

  // /* Settings */

  // setStarted(started: boolean) {
  //   this.settings.started = started;
  // }

  // getStarted() {
  //   return this.settings.started;
  // }

  // setPiece(piece: Piece) {
  //   this.settings.pieces.push(piece);
  // }

  // setPiecesNull() {
  //   this.settings.pieces = [];
  // }

  // getPieces() {
  //   return this.settings.pieces;
  // }

  // getPiece(index: number) {
  //   return this.settings.pieces[index] || null;
  // }

  // setDropTime(dropTime: number) {
  //   this.settings.dropTime = dropTime;
  // }

  // setNbPlayers(nbPlayers: number) {
  //   this.settings.nbPlayers = nbPlayers;
  // }

  // getNbPlayers() {
  //   return this.settings.nbPlayers;
  // }

  // setNbLoosers(nbLoosers: number) {
  //   this.settings.nbLoosers = nbLoosers;
  // }

  // getNbLoosers() {
  //   return this.settings.nbLoosers;
  // }

  // /* Players */

  // setPlayer(id: string, name: string) {
  //   if (this.getStarted() === true) {
  //     throw new Error('Game is started');
  //   }

  //   this.getPlayersAsArray().forEach((player) => {
  //     if (player.getName() === name) {
  //       throw new Error('Player already logged with same name');
  //     }
  //   });

  //   this.getPlayers()[id] = new Player(name);
  //   this.setNbPlayers(this.getNbPlayers() + 1);
  //   this.setMessage('server', `${name} joined the room`);
  // }

  // unsetPlayer(id: string) {
  //   // console.log('unsetPlayer', id);
  //   // console.log(this.players);
  //   if (!this.getPlayer(id)) {
  //     throw new Error('No player found');
  //   }

  //   const name = this.getPlayer(id).getName();

  //   this.setMessage('server', `${this.getPlayer(id).name} leaved the room`);
  //   delete this.getPlayers()[id];
  //   this.setNbPlayers(this.getNbPlayers() - 1);

  //   if (this.getNbPlayers() && this.isOwner(name)) {
  //     this.setRandomOwner();
  //   }
  // }

  // getPlayers() {
  //   return this.players;
  // }

  // getPlayer(id: string) {
  //   return this.players[id];
  // }

  // isEmpty() {
  //   return Object.keys(this.getPlayers()).length === 0;
  // }

  // getPlayersAsArray() {
  //   return Object.values(this.getPlayers());
  // }

  // /* Owner */

  // setOwner(name: string) {
  //   this.settings.owner = name;
  //   this.setMessage('server', `${this.settings.owner} is the new owner`);
  // }

  // setRandomOwner() {
  //   const players = Object.values(this.players);
  //   this.setOwner(players[Math.floor(Math.random() * players.length)].getName());
  // }

  // setNewOwner(id: string, newOwner: string) {
  //   if (!this.isOwner(this.getPlayer(id).getName())) {
  //     throw new Error('Not owner');
  //   }

  //   if (newOwner === '') this.setRandomOwner();
  //   else this.setOwner(newOwner);
  // }

  // getOwner() {
  //   return this.settings.owner;
  // }

  // isOwner(name: string) {
  //   return this.settings.owner === name;
  // }

  // /* Chat */

  // setMessage(user: string, text: string) {
  //   this.chat.push({
  //     id: uuidv4(),
  //     user,
  //     text,
  //     date: `${new Date().getHours()}h : ${new Date().getMinutes() < 10 ? '0' : ''}${new Date().getMinutes()}`,
  //   });
  // }

  // getMessages() {
  //   return this.chat;
  // }

  // /* Game */

  // initGameStart(id: string) {
  //   if (!this.isOwner(this.getPlayer(id).getName()) || this.getStarted() === true) {
  //     throw new Error("Can't start the game");
  //   }

  //   this.setStarted(true);
  //   this.setPiecesNull();
  //   this.setPiece(new Piece());
  //   this.setPiece(new Piece());
  //   this.setPiece(new Piece());
  //   this.setDropTime(1000);
  //   this.setNbLoosers(0);
  //   // this.setMessage('server', `${this.getOwner()} started the game`);

  //   this.getPlayersAsArray().forEach((player) => {
  //     player.initPlayer();
  //   });
  // }

  // setGameStart() {
  //   this.setStarted(true);
  //   this.setDropTime(1000);
  //   this.getPlayersAsArray().forEach((player) => {
  //     player.setStart(this.settings);
  //   });
  // }

  // setMove(id: string, keyCode: number) {
  //   let collided = false;

  //   this.getPlayer(id).setMove(keyCode);

  //   if (this.getPlayer(id).getCollided()) {
  //     collided = true;
  //     this.updateCollision(id);
  //     this.getPlayer(id).setFlushUpdate();
  //   }

  //   if (this.getPlayer(id).getFinish()) {
  //     this.updateLoose(id);
  //   }

  //   return collided;
  // }

  // updateCollision(id: string) {
  //   const lines = this.getPlayer(id).getLines();

  //   /* Check the nbPiece of player */
  //   if (!this.getPiece(this.getPlayer(id).getNbPiece() + 3)) {
  //     this.setPiece(new Piece());
  //   }

  //   this.getPlayer(id).setCollision(this.getPieces());

  //   /* Mallus */
  //   const mallus = this.getPlayer(id).getLines() - lines;
  //   if (mallus > 1) {
  //     Object.entries(this.players).forEach((entry) => {
  //       if (entry[0] !== id) entry[1].setMallus(mallus - 1);
  //     });
  //   }
  // }

  // updateLoose(id: string) {
  //   this.getPlayer(id).setLoose(this.getNbPlayers() - this.getNbLoosers());
  //   this.setNbLoosers(this.getNbLoosers() + 1);
  //   if (this.getNbPlayers() === 1) {
  //     this.setStarted(false);
  //   } else if (this.getNbLoosers() + 1 === this.getNbPlayers()) {
  //     this.getPlayersAsArray().forEach((player) => {
  //       if (player.getFinish() === false) player.setLoose(this.getNbPlayers() - this.getNbLoosers());
  //     });
  //     this.setStarted(false);
  //     this.setNbLoosers(this.getNbLoosers() + 1);
  //   }
  // }
}

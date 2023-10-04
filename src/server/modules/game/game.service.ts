/* eslint-disable max-classes-per-file */

// import Io, { Request } from '@/server/server/Io';

import Game from '@/server/app/Game';
// import { Socket } from 'socket.io-client';

export class GameService {
  game: Game;

  constructor(room: string, owner: string) {
    this.game = new Game();
  }
}

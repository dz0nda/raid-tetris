import { Piece } from '@/server/modules/game/piece.entity';
import Player from '@/server/modules/game/player.entity';

export class Room {
  room: string;
  password: string;
  settings: {
    owner: string;
    started: boolean;
    status: string;
    nbPlayers: number;
    nbLoosers: number;
    dropTime: number;
    pieces: Piece[];
  };
  players: Record<string, Player>;

  constructor(room: string, owner: string, password = '') {
    this.room = room;
    this.password = password;
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
  }
}

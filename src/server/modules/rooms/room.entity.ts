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
  players: { [key: string]: Player };
}

interface Piece {
  type: string;
  color: string;
}

interface Player {
  name: string;
  score: number;
  status: string;
}

export interface Room {
  room: string;
  pass: string;
  private: boolean;
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
}

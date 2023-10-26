import { Stage, createBoard } from '@/shared/game/board';
import { createSlice } from '@reduxjs/toolkit';

export interface PlayerStateClient {
  name: string;
  score: number;
  lines: number;
  mallus: number;
  rank: number;
  stage: Stage;
  level: number;
}

export interface PlayerState {
  players: Record<string, PlayerStateClient>;
}

export const generatePlayers = (n: number) => {
  const players: Record<string, any> = {};

  for (let i = 1; i <= n; i++) {
    const playerKey = `player-${i}`;
    players[playerKey] = {
      name: `player-${i}`,
      score: 0,
      lines: 0,
      mallus: 0,
      rank: 0,
      stage: createBoard(),
      level: 1,
    };
  }

  return players;
};

export const initialState: PlayerState = {
  players: generatePlayers(5),
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    reqMove(_state, _action) {
      // Do nothing
    },
    // resMove(state, action) {
    //   state.[state.room].players[action.payload.id] = action.payload.player;
    // },
    // updatePlayer(state, action) {
    //   state.rooms[state.room].players[action.payload.id] = action.payload.player;
    // },
  },
});

export const { reqMove } = playerSlice.actions;
export default playerSlice.reducer;

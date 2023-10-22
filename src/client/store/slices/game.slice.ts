import { createSlice } from '@reduxjs/toolkit';
import { Room } from '@/server/modules/rooms/room.entity';

interface GameState {
  rooms: Record<string, Room>;
}

const initialState: GameState = {
  rooms: {},
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reqStartGame(_state, _action) {},
    updateGame(state, action) {
      state.rooms[action.payload.game.room] = action.payload.game;
    },
    updateGameSettings(state, action) {
      state.rooms[action.payload.room].settings = action.payload.settings;
    },
    updateGamePlayers(state, action) {
      state.rooms[action.payload.room].players = action.payload.players;
    },
  },
});

export const { reqStartGame, updateGame, updateGameSettings, updateGamePlayers } = gameSlice.actions;
export default gameSlice.reducer;

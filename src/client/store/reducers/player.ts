import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface PlayerState {
  name: string;
  score: number;
  lines: number;
  mallus: number;
  rank: number;
  level: number;
  stage: any[];
  stagePiece: any[];
  piece: any;
  position: { x: number; y: number };
  nbPiece: number;
  loose: boolean;
  win: boolean;
}

export const playerState: PlayerState = {
  name: '',
  score: 0,
  lines: 0,
  mallus: 0,
  rank: 0,
  level: 0,
  stage: Array.from(Array(20), () => new Array(10).fill([0, 'clear'])),
  stagePiece: [
    Array.from(Array(4), () => new Array(4).fill([0, 'clear'])),
    Array.from(Array(4), () => new Array(4).fill([0, 'clear'])),
  ],
  piece: null,
  position: { x: 10 / 2 - 2, y: 0 },
  nbPiece: 0,
  loose: false,
  win: false,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState: playerState,
  reducers: {
    reqMove(_state, _action) {},
    updatePlayer(state, action) {
      state.name = action.payload.player.name;
      state.score = action.payload.player.score;
      state.lines = action.payload.player.lines;
      state.mallus = action.payload.player.mallus;
      state.rank = action.payload.player.rank;
      state.stage = action.payload.player.stage;
      state.stagePiece = action.payload.player.stagePiece;
      state.piece = action.payload.player.piece;
      state.position = action.payload.player.position;
      state.nbPiece = action.payload.player.nbPiece;
      state.loose = action.payload.player.loose;
      state.win = action.payload.player.win;
    },
  },
});

// eslint-disable-next-line default-param-last
// const playerReducer = (state = playerState, action) => {
//   switch (action.type) {
//     case ev.UPDATE_PLAYER: {
//       const { player } = action.payload;

//       return {
//         ...player,
//       };
//     }

//     default:
//       return state;
//   }
// };

export const { reqMove, updatePlayer } = playerSlice.actions;

export const playerReducer = playerSlice.reducer;

// export const selectPlayer = (state: RootState) => state.player;

// export const updatePlayer = (payload) => (dispatch, getState) => {
//   const { id } = getState().app;

//   dispatch({
//     type: ev.UPDATE_PLAYER,
//     payload: {
//       player: payload.game.players[id],
//     },
//   });
// };

// export const reqMove = (payload) => ({
//   type: ev.REQUEST_UPDATE_PLAYER,
//   payload: {
//     keyCode: payload.keyCode,
//   },
// });

// export const actions = { updatePlayer, reqMove };

// export default playerReducer;

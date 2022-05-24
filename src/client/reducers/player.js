import ev from '../../shared/events';

export const playerState = {
  name: '',
  score: 0,
  lines: 0,
  mallus: 0,
  rank: 0,
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

// eslint-disable-next-line default-param-last
const playerReducer = (state = playerState, action) => {
  switch (action.type) {
    case ev.UPDATE_PLAYER: {
      const { player } = action.payload;

      return {
        ...player,
      };
    }

    default:
      return state;
  }
};

export default playerReducer;

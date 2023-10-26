import { BOARD_HEIGHT, BOARD_WIDTH } from './board';

export type Tetromino = {
  shape: number[][];
  color: string;
};

export type Position = {
  x: number;
  y: number;
};

export const TETROMINOES: Tetromino[] = [
  {
    shape: [[1, 1, 1, 1]],
    color: 'cyan',
  },
  {
    shape: [
      [1, 1, 1, 0],
      [1, 0, 0, 0],
    ],
    color: 'blue',
  },
  // ... add other tetrominoes here
];

export const randomTetromino = (): Tetromino => {
  return TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];
};
export const isValidRotation = (tetromino: number[][], pos: Position, board: (string | null)[][]) => {
  for (let y = 0; y < tetromino.length; y++) {
    for (let x = 0; x < tetromino[y].length; x++) {
      if (tetromino[y][x] && (board[y + pos.y] && board[y + pos.y][x + pos.x]) !== null) {
        return false;
      }
      if (tetromino[y][x] && (y + pos.y >= BOARD_HEIGHT || x + pos.x >= BOARD_WIDTH || x + pos.x < 0)) {
        return false;
      }
    }
  }
  return true;
};

export const collides = (tetromino: number[][], pos: Position, board: (string | null)[][]) => {
  for (let y = 0; y < tetromino.length; y++) {
    for (let x = 0; x < tetromino[y].length; x++) {
      if (tetromino[y][x] && (board[y + pos.y] && board[y + pos.y][x + pos.x]) !== null) {
        return true;
      }
      if (tetromino[y][x] && (y + pos.y >= BOARD_HEIGHT || x + pos.x >= BOARD_WIDTH || x + pos.x < 0)) {
        return true;
      }
    }
  }
  return false;
};

// export const checkCollision = (
//   piece: Piece,
//   stage: Stage,
//   { x: moveX, y: moveY }: { x: number; y: number },
//   px: number,
//   py: number,
// ) => {
//   for (let y = 0; y < piece.form.shape.length; y += 1) {
//     for (let x = 0; x < piece.form.shape[y].length; x += 1) {
//       // 1. Check that we're on an actual Tetromino cell
//       if (piece.form.shape[y][x] !== 0) {
//         if (
//           // 2. Check that our move is inside the game areas height (y)
//           // We shouldn't go through the bottom of the play area
//           !stage[y + py + moveY] ||
//           // 3. Check that our move is inside the game areas width (x)
//           !stage[y + py + moveY][x + px + moveX] ||
//           // 4. Check that the cell wer'e moving to isn't set to clear
//           (stage[y + py + moveY][x + px + moveX][1] !== 'clear' &&
//             stage[y + py + moveY][x + px + moveX][1] !== 'shadow')
//         ) {
//           return true;
//         }
//       }
//     }
//   }
//   return false;
// };

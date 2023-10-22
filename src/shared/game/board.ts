import { Position, Tetromino } from './tetromino';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const createBoard = (): (string | null)[][] => {
  return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));
};

export const merge = (board: (string | null)[][], tetromino: Tetromino, pos: Position) => {
  const newBoard = board.map((row) => row.slice());
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x]) {
        newBoard[y + pos.y][x + pos.x] = tetromino.color;
      }
    }
  }
  return newBoard;
};

export const removeFullRows = (board: (string | null)[][]) => {
  return board.filter((row) => !row.every((cell) => cell !== null));
};

export const resetBoard = () => {
  return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));
};

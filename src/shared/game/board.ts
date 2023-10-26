import { Position, Tetromino } from './tetromino';

export type Cell = [number, string, string];
export type Row = Cell[];
export type Stage = Row[]; // (string | null)[][];

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const BOARD_PIECE_WIDTH = 4;
export const BOARD_PIECE_HEIGHT = 4;

export const createBoardOld = (height = BOARD_HEIGHT, width = BOARD_WIDTH): (string | null)[][] => {
  return Array.from({ length: height }, () => Array(width).fill(null));
};
export const createBoard = (height = BOARD_WIDTH, width = BOARD_HEIGHT): Stage => {
  return Array.from({ length: height }, () => Array(width).fill([0, 'clear', 'blank'])); // fill(null));
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

export const calcScore = (_: number, lines: number) => {
  switch (lines) {
    case 1:
      return 40;
    case 2:
      return 100;
    case 3:
      return 300;
    case 4:
      return 1200;
    default:
      return 0;
  }
};

export const calcLevel = (lines: number) => Math.trunc(lines / 10) + 1;

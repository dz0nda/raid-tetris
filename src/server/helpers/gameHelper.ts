import { Piece } from '@/server/modules/game/piece.entity';

export const keys = {
  KDOWN: 40,
  KLEFT: 37,
  KRIGHT: 39,
  KUP: 38,
  KSPACE: 32,
  KENTER: 13,
};

export const allowedKeys = [keys.KDOWN, keys.KLEFT, keys.KRIGHT, keys.KUP, keys.KSPACE];

export type Cell = [number, string, string];
export type Row = Cell[];
export type Stage = Row[];

export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const STAGE_WIDTH_PIECE = 4;
export const STAGE_HEIGHT_PIECE = 4;

export const createStage = (): Stage =>
  Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear', 'blank']));
export const createStagePiece = (): Stage =>
  Array.from(Array(STAGE_HEIGHT_PIECE), () => new Array(STAGE_WIDTH_PIECE).fill([0, 'clear', 'blank']));

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

export const checkCollision = (
  piece: Piece,
  stage: Stage,
  { x: moveX, y: moveY }: { x: number; y: number },
  px: number,
  py: number,
) => {
  for (let y = 0; y < piece.form.shape.length; y += 1) {
    for (let x = 0; x < piece.form.shape[y].length; x += 1) {
      // 1. Check that we're on an actual Tetromino cell
      if (piece.form.shape[y][x] !== 0) {
        if (
          // 2. Check that our move is inside the game areas height (y)
          // We shouldn't go through the bottom of the play area
          !stage[y + py + moveY] ||
          // 3. Check that our move is inside the game areas width (x)
          !stage[y + py + moveY][x + px + moveX] ||
          // 4. Check that the cell wer'e moving to isn't set to clear
          (stage[y + py + moveY][x + px + moveX][1] !== 'clear' &&
            stage[y + py + moveY][x + px + moveX][1] !== 'shadow')
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

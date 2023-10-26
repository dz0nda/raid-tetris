import { Position, Tetromino, collides, isValidRotation } from './tetromino';
import { removeFullRows } from './board';

export const keys = {
  KDOWN: 40,
  KLEFT: 37,
  KRIGHT: 39,
  KUP: 38,
  KSPACE: 32,
  KENTER: 13,
};

export const allowedKeys = [keys.KDOWN, keys.KLEFT, keys.KRIGHT, keys.KUP, keys.KSPACE];

type GameState = {
  board: (string | null)[][];
  currentTetromino: Tetromino | null;
  position: Position;
};

const placeTetrominoOnBoard = (
  board: (string | null)[][],
  tetromino: Tetromino,
  position: Position,
): (string | null)[][] => {
  const newBoard = board.map((row) => row.slice());
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x]) {
        newBoard[y + position.y][x + position.x] = tetromino.color;
      }
    }
  }
  return removeFullRows(newBoard);
};

export const isGameOver = (position: Position): boolean => position.y === 0;

export const handleTick = (gameState: {
  board: (string | null)[][];
  currentTetromino: Tetromino;
  position: Position;
}): { board: (string | null)[][]; currentTetromino: Tetromino | null; position: Position; gameOver: boolean } => {
  const { board, currentTetromino, position } = gameState;
  const newPos = { ...position, y: position.y + 1 };

  if (!collides(currentTetromino.shape, newPos, board)) {
    return { ...gameState, position: newPos, gameOver: false };
  } else {
    const newBoard = placeTetrominoOnBoard(board, currentTetromino, position);
    const gameOver = isGameOver(position);
    return { board: newBoard, currentTetromino: null, position: newPos, gameOver };
  }
};

export const move = (gameState: GameState, { x, y }: Position): GameState => {
  const { board, currentTetromino, position } = gameState;

  if (!collides(currentTetromino!.shape, { x: position.x + x, y: position.y + y }, board)) {
    return {
      ...gameState,
      position: {
        x: position.x + x,
        y: position.y + y,
      },
    };
  } else if (y) {
    // Handle the logic when a collision occurs while moving down
    // For now, I'll just return the passed gameState
    return gameState;
  }
  return gameState;
};

export const rotate = (gameState: GameState): GameState => {
  const { board, currentTetromino, position } = gameState;
  const rotatedTetromino = currentTetromino!.shape
    .map((_, index) => currentTetromino!.shape.map((col) => col[index]))
    .reverse();

  if (isValidRotation(rotatedTetromino, position, board)) {
    return {
      ...gameState,
      currentTetromino: {
        ...currentTetromino!,
        shape: rotatedTetromino,
      },
    };
  }
  return gameState;
};

export const drop = (gameState: GameState): GameState => {
  const { board, currentTetromino, position } = gameState;
  let newY = position.y;
  while (!collides(currentTetromino!.shape, { x: position.x, y: newY + 1 }, board)) {
    newY++;
  }
  return {
    ...gameState,
    position: {
      x: position.x,
      y: newY,
    },
  };
};

export const dispatchKey = (key: string, gameState: GameState) => {
  if (key === 'ArrowUp') {
    rotate(gameState);
  }
  if (key === 'ArrowRight') {
    move(gameState, { x: 1, y: 0 });
  }
  if (key === 'ArrowLeft') {
    move(gameState, { x: -1, y: 0 });
  }
  if (key === 'ArrowDown') {
    move(gameState, { x: 0, y: 1 });
  }
  if (key === ' ') {
    drop(gameState);
  }
};

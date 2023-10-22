import { Center } from '@mantine/core';
import React, { useCallback, useEffect, useState } from 'react';

import { Position, Tetromino, collides, randomTetromino } from '@/shared/game/tetromino';
import { BOARD_WIDTH, createBoard, merge } from '@/shared/game/board';
import { dispatchKey, handleTick } from '@/shared/game/game';

export const Tetris: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[][]>(createBoard());
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino | null>(null);
  const [position, setPosition] = useState<Position>({ x: 5, y: 0 });
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const [tetrominoes, setTetrominoes] = useState<Tetromino[]>([randomTetromino(), randomTetromino()]);

  const resetPlayer = useCallback(() => {
    const [nextTetromino, ...remainingTetrominoes] = tetrominoes;
    setTetrominoes(
      remainingTetrominoes.length < 2
        ? [...remainingTetrominoes, randomTetromino(), randomTetromino()]
        : remainingTetrominoes,
    );
    return {
      pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
      tetromino: nextTetromino.shape,
    };
  }, [tetrominoes]);

  const spawnTetromino = useCallback(() => {
    const [nextTetromino, ...remainingTetrominoes] = tetrominoes;
    setCurrentTetromino(nextTetromino);
    nextTetromino &&
      nextTetromino.shape &&
      nextTetromino.shape.length > 0 &&
      nextTetromino.shape[0].length > 0 &&
      setPosition({ x: BOARD_WIDTH / 2 - Math.ceil(nextTetromino.shape[0].length / 2), y: 0 });
    setTetrominoes(
      remainingTetrominoes.length < 2 ? [...remainingTetrominoes, randomTetromino()] : remainingTetrominoes,
    );
  }, [tetrominoes]);

  const checkCollision = useCallback(
    (tetromino: Tetromino, pos: Position) => {
      return collides(tetromino.shape, pos, board);
    },
    [board],
  );

  useEffect(() => {
    if (!currentTetromino) {
      spawnTetromino();
      return;
    }

    const tick = () => {
      const result = handleTick({ board, currentTetromino, position });
      setBoard(result.board);
      setCurrentTetromino(result.currentTetromino);
      setPosition(result.position);
      if (result.gameOver) {
        setIsGameOver(true);
      }
    };

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [currentTetromino, position, checkCollision, spawnTetromino, board]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => dispatchKey(e.key, { board, currentTetromino, position });

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, currentTetromino, dispatchKey]);

  const displayBoard = currentTetromino ? merge(board, currentTetromino, position) : board;

  return (
    <Center>
      <div>
        {displayBoard.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                style={{
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  border: '1px solid black',
                  margin: '0px',
                  backgroundColor: cell || 'white',
                }}
              />
            ))}
          </div>
        ))}
        {isGameOver && <div>Game Over</div>}
      </div>
    </Center>
  );
};

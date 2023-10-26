import { Piece } from './piece.entity';
import { Entity } from '../database/entities/Entity';

import { BOARD_WIDTH, Stage, createBoard } from '@/shared/game/board';
export class Game extends Entity {
  id;
  score = 0;
  lines = 0;
  mallus = 0;
  stage: Stage = createBoard();
  stagePiece: [Stage, Stage] = [createBoard(), createBoard()];
  piece: Piece | null = null;
  position: { x: number; y: number } = { x: BOARD_WIDTH / 2 - 2, y: 0 };
  positionDown: { x: number; y: number } = { x: BOARD_WIDTH / 2 - 2, y: 0 };
  nbPiece = 0;
  dropTime = 0;
  collided = false;
  level = 1;

  constructor(id: string) {
    super();

    this.id = id;
    this.initGame();
  }

  initGame() {
    this.score = 0;
    this.lines = 0;
    this.mallus = 0;
    // this.rank = 0;
    this.stage = createBoard();
    this.stagePiece = [createBoard(), createBoard()];
    this.piece = null;
    this.position = { x: 10 / 2 - 2, y: 0 };
    this.positionDown = { x: 10 / 2 - 2, y: 0 };
    this.nbPiece = 0;
    this.dropTime = 0;
    this.collided = false;
    this.level = 1;
  }
}

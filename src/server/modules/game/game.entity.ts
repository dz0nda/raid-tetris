import { Piece } from './piece.entity';
import { Entity } from '../database/entities/Entity';

import { STAGE_WIDTH, Stage, createStage, createStagePiece } from '../../helpers/gameHelper';
export default class Game extends Entity {
  score = 0;
  lines = 0;
  mallus = 0;
  stage: Stage = createStage();
  stagePiece: [Stage, Stage] = [createStagePiece(), createStagePiece()];
  piece: Piece | null = null;
  position: { x: number; y: number } = { x: STAGE_WIDTH / 2 - 2, y: 0 };
  positionDown: { x: number; y: number } = { x: STAGE_WIDTH / 2 - 2, y: 0 };
  nbPiece = 0;
  dropTime = 0;
  collided = false;
  level = 1;

  constructor() {
    super();

    this.initGame();
  }

  initGame() {
    this.score = 0;
    this.lines = 0;
    this.mallus = 0;
    // this.rank = 0;
    this.stage = createStage();
    this.stagePiece = [createStagePiece(), createStagePiece()];
    this.piece = null;
    this.position = { x: 10 / 2 - 2, y: 0 };
    this.positionDown = { x: 10 / 2 - 2, y: 0 };
    this.nbPiece = 0;
    this.dropTime = 0;
    this.collided = false;
    this.level = 1;
  }
}

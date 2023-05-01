import { v4 as uuidv4 } from 'uuid';

import { STAGE_WIDTH, Stage, calcScore, createStage, createStagePiece, keys } from '@/server/helpers/gameHelper';

import { Piece } from './Piece';
import Player from './Player';

export interface IPosition {
  x: number;
  y: number;
}

export default class Game {
  stage: Stage = createStage();
  position: IPosition = { x: STAGE_WIDTH / 2 - 2, y: 0 };
  positionDown: IPosition = { x: STAGE_WIDTH / 2 - 2, y: 0 };
  loose = false;
  collided = false;
  piece: Piece | null = null;
  score = 0;
  lines = 0;
  level = 1;

  constructor(stage?: Stage, position?: IPosition, positionDown?: IPosition) {
    this.stage = stage || createStage();
    this.position = position || { x: STAGE_WIDTH / 2 - 2, y: 0 };
    this.positionDown = positionDown || { x: STAGE_WIDTH / 2 - 2, y: 0 };
  }

  /*
   *  Piece drop one line
   */
  dropTetro() {
    if (!this.checkCollision(0, 1)) {
      this.position = { x: this.position.x, y: this.position.y + 1 };
    } else if (this.position.y < 1) {
      this.loose = this.position.y < 1;
    } else {
      this.collided = true;
    }
  }

  /*
   *  Piece move left or right
   */
  moveTetro(dir: number) {
    if (!this.checkCollision(dir, 0)) {
      this.position = { x: this.position.x + dir, y: this.position.y };
    }
  }

  /*
   *  Piece rotate
   */
  moveTetroUp(dir = 1) {
    const pos = this.position.x;
    let offset = 1;

    this.piece?.rotate(dir);
    while (this.checkCollision(0, 0)) {
      this.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.piece?.form.shape[0].length) {
        this.piece?.rotate(-dir);
        this.position.x = pos;
      }
    }
  }

  /*
   *  Piece move down to the bottom of the stage
   */
  moveDownTetro() {
    this.dropTetro();
    while (!this.collided) this.dropTetro();
  }

  /*
   *  Check if collision in the stage
   */
  checkCollision(moveX: number, moveY: number) {
    for (let y = 0; y < this.piece?.form.shape.length; y += 1) {
      for (let x = 0; x < this.piece?.form.shape[y].length; x += 1) {
        if (this.piece?.form.shape[y][x] !== 0) {
          if (
            !this.stage[y + this.position.y + moveY] ||
            !this.stage[y + this.position.y + moveY][x + this.position.x + moveX] ||
            (this.stage[y + this.position.y + moveY][x + this.position.x + moveX][1] !== 'clear' &&
              this.stage[y + this.position.y + moveY][x + this.position.x + moveX][1] !== 'shadow')
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /* Stage update functions */

  setFlushUpdate() {
    this.stage = this.stage.map((row: any) =>
      row.map((cell: any) => (cell[1] === 'clear' ? [0, 'clear', 'blank'] : cell)),
    );

    // Update the shadow
    this.positionDown = { x: this.position.x, y: this.position.y };

    let i = 1;
    while (!this.checkCollision(0, i)) {
      this.positionDown = {
        ...this.positionDown,
        y: (this.positionDown.y += 1),
      };
      i += 1;
    }

    // Update the stage
    this.piece?.form.shape.forEach((row: any, fy: any) => {
      row.forEach((value: any, fx: any) => {
        if (value !== 0) {
          this.stage[fy + this.positionDown.y][fx + this.positionDown.x] = [value, 'clear', 'shadow'];
          this.stage[fy + this.position.y][fx + this.position.x] = [
            value,
            `${this.collided ? 'merged' : 'clear'}`,
            'blank',
          ];
        }
      });
    });
  }

  setUpdateRows() {
    // Pour la hauteur verifie si une ligne est pleine
    let lines = 0;

    this.stage.forEach((row: any) => {
      const isFull = row.every((cell: any) => cell[1] === 'merged');
      if (isFull === true) {
        lines += 1;
        // Check l'index de la ligne pleine;
        const index = this.stage.indexOf(row);
        // Met la ligne a 0
        row.fill([0, 'clear', 'blank']);
        // Supprime la ligne avec l'index et decalle e tableau, il restera non pas 20 de hauteur mais 19
        this.stage.splice(index, 1);
        // Ajoute au debut du tableau un nouveau tableau de 10 a 0
        this.stage.unshift(new Array(STAGE_WIDTH).fill([0, 'clear', 'blank']));
      }
    });

    this.score += calcScore(this.level, lines);
    this.lines += lines;

    return { lines };
  }
}

import { calcScore, keys, createStage, createStagePiece, STAGE_WIDTH } from '../helpers/gameHelper';

export default class Player {
  constructor(name) {
    this.name = name;
    this.initPlayer();
  }

  initPlayer() {
    this.score = 0;
    this.lines = 0;
    this.mallus = 0;
    this.rank = 0;
    this.stage = createStage();
    this.stagePiece = [createStagePiece(), createStagePiece()];
    this.piece = null;
    this.position = { x: 10 / 2 - 2, y: 0 };
    this.positionDown = { x: 10 / 2 - 2, y: 0 };
    this.nbPiece = 0;
    this.dropTime = 0;
    this.collided = false;
    this.loose = false;
    this.win = false;
  }

  getName() {
    return this.name;
  }

  setPiece(piece) {
    this.piece = piece;
  }

  getNbPiece() {
    return this.nbPiece;
  }

  getLines() {
    return this.lines;
  }

  /* Stage */

  setStage(stage) {
    this.stage = stage;
  }

  setStagePiece(index, piece) {
    this.stagePiece[index] = createStagePiece();

    piece.form.shape.forEach((row, fy) => {
      row.forEach((value, fx) => {
        if (value !== 0) {
          this.stagePiece[index][fy][fx] = [value, 'merged', 'blank'];
        }
      });
    });
  }

  getCollided() {
    return this.collided;
  }

  getFinish() {
    return this.loose || this.win;
  }

  setRank(nbLoosers, nbPlayers) {
    this.rank = nbPlayers - nbLoosers;
  }

  /* Game */

  setStart({ pieces, dropTime }) {
    this.initPlayer();
    [this.piece] = pieces;
    this.setStagePiece(0, pieces[this.nbPiece + 1]);
    this.setStagePiece(1, pieces[this.nbPiece + 2]);
    this.dropTime = dropTime;
    this.setFlushUpdate();
  }

  setMove(keyCode) {
    if (this.loose === true || this.win === true) throw new Error("You can't play");

    if (keyCode === keys.KDOWN) this.dropTetro();
    if (keyCode === keys.KLEFT) this.moveTetro(-1);
    if (keyCode === keys.KRIGHT) this.moveTetro(1);
    if (keyCode === keys.KUP) this.moveTetroUp();
    if (keyCode === keys.KSPACE) this.moveDownTetro();

    this.setFlushUpdate();
  }

  setCollision(pieces) {
    this.setFlushUpdate();
    this.setUpdateRows();

    this.collided = false;
    this.nbPiece += 1;
    this.position = { x: 10 / 2 - 2, y: 0 };
    this.piece = pieces[this.nbPiece];
    this.setStagePiece(0, pieces[this.nbPiece + 1]);
    this.setStagePiece(1, pieces[this.nbPiece + 2]);

    while (this.checkCollision(0, 0)) {
      this.loose = true;
      this.piece.form.shape.shift();
    }
  }

  setMallus(lines) {
    let i = lines;

    this.mallus += lines;
    this.setStage(this.stage.slice(lines, 20));
    while (i) {
      this.stage.push(new Array(10).fill(['M', 'mallus']));
      i -= 1;
    }
    this.setFlushUpdate();
  }

  setLoose(rank) {
    this.loose = false;
    this.dropTime = 0;
    this.rank = rank;
    if (this.rank === 1) this.win = true;
    else this.loose = true;
  }

  /* Piece move functions */

  /* keydown */
  dropTetro() {
    if (!this.checkCollision(0, 1)) {
      this.position = { x: this.position.x, y: this.position.y + 1 };
    } else if (this.position.y < 1) {
      this.loose = this.position.y < 1;
    } else {
      this.collided = true;
    }
  }

  /* keyleft or keyright */
  moveTetro(dir) {
    if (!this.checkCollision(dir, 0)) {
      this.position = { x: this.position.x + dir, y: this.position.y };
    }
  }

  /* keyup */
  moveTetroUp(dir) {
    const pos = this.position.x;
    let offset = 1;

    this.piece.rotate(dir);
    while (this.checkCollision(0, 0)) {
      this.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.piece.form.shape[0].length) {
        this.piece.rotate(-dir);
        this.position.x = pos;
      }
    }
  }

  /* space */
  moveDownTetro() {
    this.dropTetro();
    while (!this.collided) this.dropTetro();
  }

  /* Stage update functions */

  setFlushUpdate() {
    this.stage = this.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear', 'blank'] : cell)));

    // Update the shadow
    this.positionDown = { x: this.position.x, y: this.position.y };

    let i = 1;
    while (!this.checkCollision(0, i)) {
      this.positionDown = { ...this.positionDown, y: (this.positionDown.y += 1) };
      i += 1;
    }

    // Update the stage
    this.piece.form.shape.forEach((row, fy) => {
      row.forEach((value, fx) => {
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

    this.stage.forEach((row) => {
      const isFull = row.every((cell) => cell[1] === 'merged');
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

  checkCollision(moveX, moveY) {
    for (let y = 0; y < this.piece.form.shape.length; y += 1) {
      for (let x = 0; x < this.piece.form.shape[y].length; x += 1) {
        if (this.piece.form.shape[y][x] !== 0) {
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
}

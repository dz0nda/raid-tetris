import { keys } from '../helpers/gameHelper';
import Game from './Game2';

export default class Player {
  name: string;
  tetris: Game;
  // score = 0;
  // lines = 0;
  // mallus = 0;
  rank = 0;
  // stage: Stage = createStage();
  // stagePiece: [Stage, Stage] = [createStagePiece(), createStagePiece()];
  // piece: Piece | null = null;
  // position: { x: number; y: number } = { x: STAGE_WIDTH / 2 - 2, y: 0 };
  // positionDown: { x: number; y: number } = { x: STAGE_WIDTH / 2 - 2, y: 0 };
  // nbPiece = 0;
  dropTime = 0;
  // collided = false;
  level = 1;
  loose = false;
  win = false;

  constructor(name: string) {
    this.name = name;
    this.tetris = new Game();
  }

  // getName() {
  //   return this.name;
  // }

  // setPiece(piece: Piece) {
  //   this.piece = piece;
  // }

  // getNbPiece() {
  //   return this.nbPiece;
  // }

  // getLines() {
  //   return this.lines;
  // }

  /* Stage */

  // setStage(stage: Stage) {
  //   this.stage = stage;
  // }

  // setStagePiece(index: number, piece: Piece) {
  //   this.stagePiece[index] = createStagePiece();

  //   piece.form.shape.forEach((row: any, fy: any) => {
  //     row.forEach((value: any, fx: any) => {
  //       if (value !== 0) {
  //         this.stagePiece[index][fy][fx] = [value, 'merged', 'blank'];
  //       }
  //     });
  //   });
  // }

  // getCollided() {
  //   return this.collided;
  // }

  // getFinish() {
  //   return this.loose || this.win;
  // }

  // setRank(nbLoosers: number, nbPlayers: number) {
  //   this.rank = nbPlayers - nbLoosers;
  // }

  /* Game */

  // setStart({ pieces, dropTime }: { pieces: Piece[]; dropTime: number }) {
  //   this.initPlayer();
  //   [this.piece] = pieces;
  //   this.setStagePiece(0, pieces[this.nbPiece + 1]);
  //   this.setStagePiece(1, pieces[this.nbPiece + 2]);
  //   this.dropTime = dropTime;
  //   this.setFlushUpdate();
  // }

  setMove(keyCode: number) {
    // if (this.loose === true || this.win === true) throw new Error("You can't play");

    // if (keyCode === keys.KDOWN) this.dropTetro();
    // if (keyCode === keys.KLEFT) this.moveTetro(-1);
    // if (keyCode === keys.KRIGHT) this.moveTetro(1);
    // if (keyCode === keys.KUP) this.moveTetroUp();
    // if (keyCode === keys.KSPACE) this.moveDownTetro();

    switch (keyCode) {
      case keys.KDOWN:
        this.tetris.dropTetro();
        break;
      case keys.KLEFT:
        this.tetris.moveTetro(-1);
        break;
      case keys.KRIGHT:
        this.tetris.moveTetro(1);
        break;
      case keys.KUP:
        this.tetris.moveTetroUp();
        break;
      case keys.KSPACE:
        this.tetris.moveDownTetro();
        break;
      default:
        break;
    }

    // this.setFlushUpdate();
  }

  // setCollision(pieces: Piece[]) {
  //   this.setFlushUpdate();
  //   this.setUpdateRows();

  //   this.collided = false;
  //   this.nbPiece += 1;
  //   this.position = { x: 10 / 2 - 2, y: 0 };
  //   this.piece = pieces[this.nbPiece];
  //   this.setStagePiece(0, pieces[this.nbPiece + 1]);
  //   this.setStagePiece(1, pieces[this.nbPiece + 2]);

  //   while (this.checkCollision(0, 0)) {
  //     this.loose = true;
  //     this.piece.form.shape.shift();
  //   }
  // }

  // setMallus(lines: number) {
  //   let i = lines;

  //   this.mallus += lines;
  //   this.setStage(this.stage.slice(lines, 20));
  //   while (i) {
  //     this.stage.push(new Array(10).fill(['M', 'mallus']));
  //     i -= 1;
  //   }
  //   this.setFlushUpdate();
  // }

  // setLoose(rank: number) {
  //   this.loose = false;
  //   this.dropTime = 0;
  //   this.rank = rank;
  //   if (this.rank === 1) this.win = true;
  //   else this.loose = true;
  // }
}

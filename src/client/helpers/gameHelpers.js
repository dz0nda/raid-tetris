// // import { flushUpdate, checkCollision } from '../../shared/stage';
// import { keys } from '../constants/keys';

// export const STAGE_WIDTH = 10;
// export const STAGE_HEIGHT = 20;

// export const STAGE_WIDTH_SMALL = 8;
// export const STAGE_HEIGHT_SMALL = 8;

// export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));

// export const calcScore = (level, lines) => {
//   switch (lines) {
//     case 1:
//       return level * 40;
//     case 2:
//       return level * 100;
//     case 3:
//       return level * 300;
//     case 4:
//       return level * 1200;
//     default:
//       return 0;
//   }
// };

// export const calcLevel = (lines) => Math.trunc(lines / 10) + 1;

// export const rotate = (matrix, dir) => {
//   // Make the rows to become cols (transpose)
//   const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]));
//   // Reverse each row to get a rotated matrix

//   if (dir > 0) {
//     const rotated = rotatedTetro.map((row) => row.reverse());

//     return rotated;
//   }
//   const rotated = rotatedTetro.reverse();
//   return rotated;
// };

// export const dropTetro = (stage, piece, position) => {
//   if (!checkCollision(piece, stage, { x: 0, y: 1 }, position.x, position.y)) {
//     return {
//       stage: flushUpdate(piece, stage, position.x, position.y + 1, false),
//       piece,
//       position: { x: position.x, y: position.y + 1 },
//       collided: false,
//       loose: false,
//     };
//   }

//   return {
//     stage: flushUpdate(piece, stage, position.x, position.y, true),
//     piece,
//     position,
//     collided: true,
//     loose: position.y < 1,
//   };
// };

// export const moveTetro = (stage, piece, position, dir) => {
//   if (!checkCollision(piece, stage, { x: dir, y: 0 }, position.x, position.y)) {
//     return {
//       position: { x: position.x + dir, y: position.y },
//       stage: flushUpdate(piece, stage, position.x + dir, position.y, false),
//       piece,
//       collided: false,
//       loose: false,
//     };
//   }

//   return {
//     position,
//     stage: flushUpdate(piece, stage, position.x, position.y, false),
//     piece,
//     collided: false,
//     loose: false,
//   };
// };

// export const moveTetroUp = (stage, piece, position, dir) => {
//   const clonedPiece = JSON.parse(JSON.stringify(piece));
//   clonedPiece.form.shape = rotate(clonedPiece.form.shape, dir);
//   const pos = position.x;
//   let pos2 = position.x;
//   let offset = 1;
//   while (checkCollision(clonedPiece, stage, { x: 0, y: 0 }, position.x, position.y)) {
//     pos2 += offset;
//     offset = -(offset + (offset > 0 ? 1 : -1));
//     if (offset > clonedPiece.form.shape[0].length) {
//       rotate(clonedPiece.form.shape, -dir);
//       pos2 = pos;
//       return {
//         position,
//         stage: flushUpdate(piece, stage, position.x, position.y, false),
//         piece,
//         collided: false,
//         loose: false,
//       };
//     }
//   }
//   return {
//     position: { x: pos2, y: position.y },
//     stage: flushUpdate(clonedPiece, stage, pos2, position.y, false),
//     piece: clonedPiece,
//     collided: false,
//     loose: false,
//   };
// };

// export const moveDownTetro = (stage, piece, position) => {
//   let i = 0;
//   let drop = dropTetro(stage, piece, position);

//   while (!drop.collided) {
//     i += 1;
//     drop = dropTetro(stage, piece, { x: position.x, y: position.y + i });
//   }

//   return {
//     stage: flushUpdate(piece, stage, position.x, position.y + i, true),
//     piece,
//     position: { x: position.x, y: position.y + i },
//     collided: true,
//     loose: drop.loose,
//   };
// };

// export default {
//   [keys.KDOWN]: {
//     keyCode: keys.KDOWN,
//     dir: null,
//     handler: dropTetro,
//   },
//   [keys.KLEFT]: {
//     keyCode: keys.KLEFT,
//     dir: -1,
//     handler: moveTetro,
//   },
//   [keys.KRIGHT]: {
//     keyCode: keys.KRIGHT,
//     dir: 1,
//     handler: moveTetro,
//   },
//   [keys.KUP]: {
//     keyCode: keys.KUP,
//     dir: 1,
//     handler: moveTetroUp,
//   },
//   [keys.KSPACE]: {
//     keyCode: keys.KSPACE,
//     dir: null,
//     handler: moveDownTetro,
//   },
// };

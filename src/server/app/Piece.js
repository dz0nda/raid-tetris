class Piece {
  constructor() {
    const TETROMINOS = {
      0: { shape: [[0]], color: '0, 0, 0' },
      I: {
        shape: [
          [0, 'I', 0, 0],
          [0, 'I', 0, 0],
          [0, 'I', 0, 0],
          [0, 'I', 0, 0],
        ],
        color: '80, 227, 230',
      },
      J: {
        shape: [
          ['J', 0, 0],
          ['J', 'J', 'J'],
          [0, 0, 0],
        ],
        color: '36, 95, 223',
      },
      L: {
        shape: [
          [0, 0, 'L'],
          ['L', 'L', 'L'],
          [0, 0, 0],
        ],
        color: '223, 173, 36',
      },
      O: {
        shape: [
          ['O', 'O'],
          ['O', 'O'],
        ],
        color: '223, 217, 36',
      },
      S: {
        shape: [
          [0, 'S', 'S'],
          ['S', 'S', 0],
          [0, 0, 0],
        ],
        color: '48, 211, 56',
      },
      T: {
        shape: [
          [0, 'T', 0],
          ['T', 'T', 'T'],
          [0, 0, 0],
        ],
        color: '132, 61, 198',
      },
      Z: {
        shape: [
          ['Z', 'Z', 0],
          [0, 'Z', 'Z'],
          [0, 0, 0],
        ],
        color: '227, 78, 78',
      },
    };
    const tetrominos = 'IJLOSTZ';
    const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    this.form = TETROMINOS[randTetromino];
  }

  rotate(dir) {
    // Make the rows to become cols (transpose)
    const rotatedTetro = this.form.shape.map((_, index) => this.form.shape.map((col) => col[index]));

    // Reverse each row to get a rotated matrix
    if (dir > 0) {
      const rotated = rotatedTetro.map((row) => row.reverse());
      this.form.shape = rotated;
    }

    const rotated = rotatedTetro.reverse();
    this.form.shape = rotated;
  }
}

export default Piece;

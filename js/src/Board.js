// interface IBoard {
//   drawBoard: () => void;
//   setCell: SetCell;
//   isFull: () => boolean;
// }

// type SetCell = ([x, y]:[number,number], newValue: 'X' | 'O') => void;

class Board {
  constructor() {
    this._board = Board.makeEmptyBoard();
  }
  static makeEmptyBoard = () => [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
    // new Array(3).fill(new Array(3).fill(''));

   // isFull = () => this._board.every(r => r.every(Boolean));
  isFull = () => !this._board.some(r => r.some(c => c === ''));
  findShapeWithStraightLine = () => {
    if (this._board[0][0] && (
      (this._board[0][0] === this._board[0][1] && this._board[0][1] === this._board[0][2]) ||
      (this._board[0][0] === this._board[1][0] && this._board[1][0] === this._board[2][0]) ||
      (this._board[0][0] === this._board[1][1] && this._board[1][1] === this._board[2][2])
    )) return this._board[0][0];

    if(this._board[1][1] && (
        (this._board[0][1] === this._board[1][1] && this._board[1][1] === this._board[2][1]) ||
        (this._board[1][0] === this._board[1][1] && this._board[1][1] === this._board[1][2])
    )) return  this._board[1][1];
    if (this._board[2][2] && (
        (this._board[0][2] === this._board[1][2] && this._board[1][2] === this._board[2][2]) ||
        (this._board[2][0] === this._board[2][1] && this._board[2][1] === this._board[2][2])
    )) return this._board[2][2];

    return null;
  };

  setCell = ([x, y], newValue) => this._board[x][y] = newValue;
  isCellFull = ([x, y]) => this._board[x][y] !== '';
  isCellValid = cell => cell.every(v => /^[0-2]$/.test(v)) && !this.isCellFull(cell);
  draw = () => { 
    console.log('\n');
    this._board.forEach(r => console.log(r.map(c => c || '-').join(' ')));
    console.log('');
  }
  // draw = () => console.table(this._board);

}

module.exports = Board;

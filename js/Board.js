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
  hasAStraignLine = (shape) => this.setCell
  setCell = ([x, y], newValue) => this._board[x][y] = newValue;
  isCellFull = ([x, y]) => this._board[x][y] !== '';
  draw = () => this._board.forEach(r => console.log(r.map(c => c || '-').join(' ')));
  // draw = () => console.table(this._board);

}

const board = new Board();
board.setCell([0, 2], 'X')
board.setCell([2, 2], 'O')
console.log(board.isFull())
console.log(board.isCellFull([2, 2]))
console.log(board.isCellFull([2, 0]))
board.draw()

module.exports = Board;

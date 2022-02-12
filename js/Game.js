const prompt = require('prompt');

const Player = require('./Player');
const Board = require('./Board');

class Game {
  constructor() {
    this._board = new Board();
  }

  askForNameAndShape() {
    return new Promise(resolve => {
      prompt.start()
      prompt.get(['name', 'shape'], (err, result) => resolve(result))
    })
  }

  async createPlayer(message) {
    console.log('\n' + message);
    let player = null;
    do {
      try {
        const { name, shape } = await this.askForNameAndShape();
        const player = new Player(name, shape);
      } catch(err) {
        console.log(err.message)
      }
    } while (!player)
    return player;
  }

  askPlayerForCell(player) {

  }

  isOver() {

    // returns 1 if player 1 is winner,
    // returns 2 if player 0 is winner,
    // return 0 if a tie
    // checks if Board is full or if Board has a straight line with a specific shape
  }

  async start() {
    this._player1 = await this.createPlayer('Player1');
    this._player2 = await this.createPlayer('Player2');
    // ask player1 for name and shape
    // ask player2 for name and shape

    // promopt player1 and 2 alternatively for choices
    // check winner every time
    
    // endGame
  }
}

const game = new Game();
game.start()

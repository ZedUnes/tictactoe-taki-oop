const prompt = require('prompt');

const Player = require('./Player');
const Board = require('./Board');

class Game {
  static GAME_STATUES = {
    PLAYER_1_WINNER: 1,
    PLAYER_2_WINNER: 2,
    TIE: 0,
    IS_NOT_OVER: -1,
  };

  static ASK_FOR_NAME_PROPS = [
    {
      name: 'name',
      // validator: /^[a-zA-z\s]{2,}$/,
      warning: 'Name must be only letters or spaces, and at least two characters long',
      conform: Player.isName,
    },
    {
      name: 'shape',
      conform: Player.isShape,
      warning: 'Shape must be either "X" or "O"',
    },
  ];

  static ASK_FOR_CELL_PROPS = [
    { name: 'cell', description: 'Enter cell in format "x,y"', warning: 'Invalid choice' },
  ]
  
  constructor() {
    this._board = new Board();
    this._players = [];
    this._playerToPlayNextIdx = 0;
    this._turns = 0;
    this.gameStatus = Game.GAME_STATUES.IS_NOT_OVER;
  }

  async askForNameAndShape() {
    return prompt.get(Game.ASK_FOR_NAME_PROPS);
  }

  async createPlayer(message) {
    console.log('\n' + message);
    let player = null;
    do {
      try {
        const { name, shape } = await this.askForNameAndShape();
        player = new Player(name, shape);
      } catch(err) {
        console.log(err.message)
      }
    } while (!player)
    return player;
  }

  async createPlayers() {
    this._players[0] = await this.createPlayer('Player1');
    this._players[1] = await this.createPlayer('Player2');
  }

  async askPlayerForCell(player) {
    const result = await prompt.get(Game.ASK_FOR_CELL_PROPS.map(prop => ({ 
      ...prop,
      conform: input => this._board.isCellValid(input.split(',').map(v => parseInt(v))),
    })));

    return result.cell.split(',').map(v => parseInt(v));
  }

  async iterateGame() {
    while (this.gameStatus === Game.GAME_STATUES.IS_NOT_OVER) {
      const player = this._players[this._playerToPlayNextIdx];
      console.log(`\n**Turn ${this._turns + 1}`)
      console.log(`*Player ${player.name}`)
      const cell = await this.askPlayerForCell(player);
      this._board.setCell(cell, player.shape);
      this._board.draw();
      this._playerToPlayNextIdx = (this._playerToPlayNextIdx === 0) ? 1 : 0;
      this.updateGameStatus()
    }
  }

  updateGameStatus() {
    const shapeWithStraightLine = this._board.findShapeWithStraightLine();

    if (shapeWithStraightLine) {
      const playerIdx = this._players.findIndex(({ shape }) => shape === shapeWithStraightLine);
      return this.gameStatus = Game.GAME_STATUES[`PLAYER_${playerIdx + 1}_WINNER`];
    }

    if (this._board.isFull()) return this.gameStatus = Game.GAME_STATUES.TIE;
    return this.gameStatus = Game.GAME_STATUES.IS_NOT_OVER;
  }

  printResults() {
    switch (this.gameStatus) {
      case Game.GAME_STATUES.PLAYER_1_WINNER: 
        return console.log(`${this._players[0].name} is Winner !`);
      case Game.GAME_STATUES.PLAYER_2_WINNER: 
        return console.log(`${this._players[1].name} is Winner !`);
      case Game.GAME_STATUES.TIE: 
        return console.log(`No Winner! Game is a tie`);
      default:
        return console.log('Something went wrong');
    }
  }


  async start() {
    await this.createPlayers();
    await this.iterateGame();
    this.printResults();
    // promopt player1 and 2 alternatively for choices
    // check winner every time
    
    // endGame
  }
}

module.exports = Game;

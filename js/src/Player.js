class Player {
  constructor(name, shape) {
    if (!Player.isName(name)) throw new Error('Invalid Player name');
    if (!Player.isShape(shape)) throw new Error('Invalid Player shape');
    this._name = name;
    this._shape = shape;
  }

  static isName(name) {
    return /^[a-zA-z\s]{2,}$/.test(name);
  }

  static isShape(shape) {
    return ['X', 'O'].includes(shape);
  }

  get name() {
    return this._name;
  }
  
  set name(newName) {
    this._name = newName;
  }

  get shape() {
    return this._shape;
  }

  set shape(newShape) {
    this.shape = newShape;
  }
}

module.exports = Player;

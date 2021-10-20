import { TILES } from './tile-data.mjs';

export default class Tile {
  code;
  onColor;
  offColor;
  matrix;

  constructor() {
    this.randomize();
  }

  randomize() {
    let current = TILES[Math.floor(TILES.length * Math.random())];

    this.code = current.code;
    this.onColor = current.onColor;
    this.offColor = current.offColor;
    this.matrix = current.matrix;
  }
  get width() {
    return this.matrix[0].length;
  }
}

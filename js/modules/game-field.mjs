import { draw as drawMatrix, createMatrix } from './dot-matrix.mjs';
import Observer from './observer.mjs';

export default class GameField {
  cols;
  matrix;
  rows;

  constructor(c, r) {
    this.cols = c;
    this.rows = r;
    this.matrix = createMatrix(this.cols, this.rows);
  }
  static ROW_CLEARED = 'rowCleared';
  cleanup() {
    outer: for (let y = this.matrix.length - 1; y > 0; --y) {
      for (let x = 0; x < this.matrix[y].length; ++x) {
        if (this.matrix[y][x] === 0) {
          continue outer;
        }
      }
      let row = this.matrix.splice(y, 1)[0].fill(0);
      this.matrix.unshift(row);
      ++y;
      Observer.dispatch(GameField.ROW_CLEARED);
    }
  }
}

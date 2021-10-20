import { draw as drawMatrix, createMatrix } from './dot-matrix.mjs';
import Tile from './tile.mjs';

export default class Player {
  tile;
  position;

  constructor() {
    this.tile = new Tile();
  }
  reset() {
    this.tile.randomize();
    this.position = { x: 0, y: 0 };
  }
  moveTo(x, y) {
    this.position.x = x;
    this.position.y = y;
  }
  moveUp() {
    this.position.y--;
  }
  moveDown() {
    this.position.y++;
  }
  moveLeft() {
    --this.position.x;
  }
  moveRight() {
    ++this.position.x;
  }
  rotate(dir) {
    let offset = 1;
    this.rotateMatrix(this.tile.matrix, dir);
    // while (collide(ARENA, PLAYER)) {
    //   this.position.x += offset;
    //   offset = -(offset + (offset > 0? 1: -1));
    //   if (offset > this.tile.matrix[0].length) {
    //     this.rotateMatrix(this.tile.matrix, -dir);
    //     this.position.x = pos;
    //     return;
    //   }
    // }
  }
  // rotating matrices: first transpose rows -> cols, then reverse()
  rotateMatrix(matrix, dir) {
    // transpose
    for (let y = 0; y < matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        // destructuring/tuple switch; e.g. [a, b] = [b, a]
        [
          matrix[x][y],
          matrix[y][x],
        ] = [
          matrix[y][x],
          matrix[x][y],
        ]
      }
    }
    // reverse
    if (dir > 0) {
      matrix.forEach(row => row.reverse());
    } else {
      matrix.reverse();
    }
  }
  get color() {
    return this.tile.onColor;
  }
  // Simple way to get the dims of the active, visible portion of the player at
  // its tile's current rotation; e.g. "I" pieces may result in 1 or 4
  get width() {
    let tracker = new Array(this.tile.width);
    tracker.fill(0);
    this.tile.matrix.forEach((row) => {
      row.forEach((cell, i) => {
        if (!!cell) {
          tracker[i] = 1;
        }
      });
    });
    return tracker.filter(el => !!el).length;
  }
  get height() {
    let tracker = [];
    this.tile.matrix.forEach((row) => {
      tracker.push(Number(row.includes(1)));
    });
    return tracker.filter(el => !!el).length;
  }
  // "inner" for x/y in matrices like "I" that may have invisible rows/cols
  // (comes into play mostly after rotations)
  get inner() {
    let r = [];
    this.tile.matrix.forEach(row => {
      r.push(row.findIndex(c => !!c));
    });
    return {
      x: this.position.x + r.filter(el => el >= 0).sort()[0],
      y: this.position.y + r.findIndex(el => el >= 0),
      dx: r.filter(el => el >= 0).sort()[0],
      dy: r.findIndex(el => el >= 0),
    };
  }
}

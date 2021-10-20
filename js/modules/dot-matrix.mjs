import { draw as drawRect } from './rect.mjs';

/**
 * Iterates over a 2D array where zeroes are skipped and non-zeroes draw a 1x1
 * unit square. Use a CSS color value as the non-zero.
 * @param  {[type]} ctx       HTMLCanvasElement context
 * @param  {[type]} matrix    2D array to describe shape
 * @param  {Object} [offset={ x: 0, y: 0 }]
 */
function draw(ctx, matrix, offset = { x: 0, y: 0 },
              fillStyle = '#666', strokeStyle = '#333') {
  matrix.forEach((row, y) => {
    row.forEach((val, x) => {
      if (!!val) {
        // truthy vals may be a Number 1 or it may be a CSS color string so...
        let clr = (typeof val === 'string')? val: fillStyle;
        drawRect(ctx, x + offset.x, y + offset.y, 1, 1, clr, strokeStyle);
      }
    });
  });
}

function createMatrix(cols, rows) {
  const MATRIX = [];
  while (rows--) {
    MATRIX.push(new Array(cols).fill(0));
  }
  return MATRIX;
}

export { draw, createMatrix };

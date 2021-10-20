import { create as createCanvas } from './canvas.mjs';

export default class GameBoard {
  ctx;
  el;
  height;
  host;
  ref;
  scale;
  width;

  constructor(ref, host, w, h, scale = 1) {
    this.ref = ref;
    this.host = host;
    this.width = w;
    this.height = h;
    this.scale = scale;

    this.el = createCanvas(ref, host, w, h);
    this.ctx = this.el.ctx;
    this.ctx.scale(scale, scale);
  }
}

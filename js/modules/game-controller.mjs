import Observer from './observer.mjs';

// TODO: MAYBE SEPARATE USER INPUT EVENT HANDLING INTO ANOTHER MODULE

export default class GameController {
  game;

  constructor(game) {
    this.game = game;

    document.querySelector('#tetris-ctrl-A').onclick = () => {this.moveLeft()};
    document.querySelector('#tetris-ctrl-S').onclick = () => {this.moveDown()};
    document.querySelector('#tetris-ctrl-D').onclick = () => {this.moveRight()};
    document.querySelector('#tetris-ctrl-Q').onclick = () => {this.rotateCounter()};
    document.querySelector('#tetris-ctrl-E').onclick = () => {this.rotate()};

    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 65: // A (left)
          this.moveLeft();
          break;
        case 68: // D (right)
          this.moveRight();
          break;
        case 69: // E (rotate clockwise)
          this.rotate();
          break;
        case 81: // Q (rotate counter-clockwise)
          this.rotateCounter();
          break;
        case 83: // S (down)
          this.moveDown();
          break;
        case 87: // W (up)
          // this.game.player.moveUp(); // FOR DEBUGGING ONLY
          break;
      }
    });
  }
  moveLeft() {
    this.game.player.moveLeft();
    Observer.dispatch('player/move', 'moveLeft');
    if (this.game.hasCollision()) {
      this.game.player.moveRight();
    }
  }
  moveRight() {
    this.game.player.moveRight();
    Observer.dispatch('player/move', 'moveRight');
    if (this.game.hasCollision()) {
      this.game.player.moveLeft();
    }
  }
  moveDown() {
    this.game.player.moveDown();
    Observer.dispatch('player/move', 'moveDown');
    if (this.game.hasCollision()) {
      this.game.player.moveUp();
      this.game.mergeTileIntoField();
      this.game.readyPlayer();
      this.game.field.cleanup();
    }
  }
  rotate() {
    this.game.player.rotate(1);
  }
  rotateCounter() {
    this.game.player.rotate(-1);
  }
}

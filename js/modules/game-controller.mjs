import Observer from './observer.mjs';

export default class GameController {
  game;

  constructor(game) {
    this.game = game;

    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 65: // A (left)
          this.game.player.moveLeft();
          Observer.dispatch('player/move', 'moveLeft');
          if (this.game.hasCollision()) {
            this.game.player.moveRight();
          }
          break;
        case 68: // D (right)
          this.game.player.moveRight();
          Observer.dispatch('player/move', 'moveRight');
          if (this.game.hasCollision()) {
            this.game.player.moveLeft();
          }
          break;
        case 69: // E (rotate clockwise)
          this.game.player.rotate(1);
          break;
        case 81: // Q (rotate counter-clockwise)
          this.game.player.rotate(-1);
          break;
        case 83: // S (down)
          this.game.player.moveDown();
          Observer.dispatch('player/move', 'moveDown');
          if (this.game.hasCollision()) {
            this.game.player.moveUp();
            this.game.mergeTileIntoField();
            this.game.readyPlayer();
            this.game.field.cleanup();
          }
          break;
        case 87: // W (up)
          // this.game.player.moveUp(); // FOR DEBUGGING ONLY
          break;
      }
    });
  }
}

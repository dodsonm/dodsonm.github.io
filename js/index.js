import { GAME_CONFIG, init as initTetrish } from './tetrish-main.mjs';

const gameActivator = document.querySelector('#tetris-activator');
const gameHostEl = document.querySelector('#tetris-field');
GAME_CONFIG.hostEl = gameHostEl;

gameActivator.onclick = (e) => {
  e.preventDefault();
  e.target.textContent = 'ENJOY!';
  gsap.to('#tetris-activator > span', {
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out',
  });
  gsap.to('#tetris-activator > img', {
    y: 10,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    onComplete() {
      gameActivator.remove();
      document.querySelector('#tetris-cntr').style.display = 'grid';
      initTetrish();
    }
  });
}

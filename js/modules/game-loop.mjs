export default class GameLoop {
  updateInterval = 1000;
  #prevRealTime = new Date().getTime();
  #gameClockLag = 0.0;

  processInput() {
    console.info('[GameLoop processInput] Please provide a method definition for processInput() on this GameLoop instance');
  }
  render() {
    console.info('[GameLoop render] Please provide a method definition for render() on this GameLoop instance');
  }
  update() {
    console.info('[GameLoop update] Please provide a method definition for update() on this GameLoop instance');
  }
  runGame() {
    let currentRealTime = new Date().getTime();
    let elapsedRealTime = currentRealTime - this.#prevRealTime;

    this.#prevRealTime = currentRealTime;
    this.#gameClockLag += elapsedRealTime;

    this.processInput();

    // console.log(this.#gameClockLag);

    while (this.#gameClockLag >= this.updateInterval) {
      this.update();
      this.#gameClockLag -= this.updateInterval;
    }

    this.render(this.#gameClockLag / this.updateInterval);

    requestAnimationFrame((t) => {
      this.runGame();
    });
  }
}

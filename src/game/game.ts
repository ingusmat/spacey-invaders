import * as PIXI from 'pixi.js';

export enum GameModes {
  DEMO = 'demo',
  PLAY = 'play',
}

/* Our main singleton store for game state */
class Game {
  public mode: GameModes;

  public score: number = 0;

  public highScore: number = 0;

  public isPaused = false;

  public text: { [key: string]: PIXI.Text } = {};

  constructor() {
    this.mode = GameModes.PLAY;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }
}

export default Game;

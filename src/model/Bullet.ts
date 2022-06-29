import * as PIXI from 'pixi.js';

const BULLET_CEILING = 110;
const BULLET_FLOOR = 560;

class Bullet extends PIXI.Graphics {
  public vx = 0;

  public vy = 0;

  constructor() {
    super();
    this.beginFill(0xFFFFFF);
    this.drawRect(0, 0, 4, 14);
    this.x = -400;
    this.y = BULLET_FLOOR;
    this.endFill();
  }

  public travel() {
    this.y -= this.vy;
    if (this.y <= BULLET_CEILING) {
      this.hide();
    }
  }

  public launch(xCoord: number) {
    this.x = xCoord;
    this.vy = 2;
  }

  public hide() {
    this.vy = 0;
    this.x = -400;
    this.y = BULLET_FLOOR;
  }
}

export default Bullet;

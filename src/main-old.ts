import './style.css';
import * as PIXI from 'pixi.js';
import { WebfontLoaderPlugin } from 'pixi-webfont-loader';
import setUpAliens from './game/setUpAliens';
import keyboard from './util/keyboard';
import Bullet from './model/Bullet';
import Game from './game/game';
import EntityFactory from './model/EntityFactory';
import Entity from './model/Entity';

const ALIENS_MARGIN = { x: 40, y: 90 };

const { Application } = PIXI;
PIXI.Loader.registerPlugin(WebfontLoaderPlugin);

const loader = PIXI.Loader.shared;

loader.add({ name: 'pressStart', url: './fonts/PressStart2P-vaV7.ttf' });
// const { resources } = PIXI.Loader.shared;
const { TextureCache } = PIXI.utils;

const app = new Application({
  width: 1200,
  height: 640,
  antialias: false,
  transparent: false,
  resolution: 1,
});

document.body.appendChild(app.view);

/*
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
*/

enum Dirs {
  LEFT,
  RIGHT,
}

loader
  .add('images/sprites.json')
  .load(setup);

let player: Entity;
let aliens: PIXI.Container | undefined;
let aliensSpeed = 0.4;
let aliensdirection: Dirs = Dirs.RIGHT;

const bullets: Bullet[] = [];
// const bombs: PIXI.Graphics[] = [];

const demo = (): void => {
  player.vx = 0;
  player.vy = 0;
};

const pause = (): void => {
  player.vx = 0;
  player.vy = 0;
};

function hitTestRectangle(r1, r2) {
  // Define the variables we'll need to calculate
  let hit; let combinedHalfWidths; let combinedHalfHeights; let vx; let
    vy;

  // hit will determine whether there's a collision
  hit = false;

  // Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  // Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  // Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  // Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  // Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {
    // A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      // There's definitely a collision happening
      hit = true;
    } else {
      // There's no collision on the y axis
      hit = false;
    }
  } else {
    // There's no collision on the x axis
    hit = false;
  }

  // `hit` will be either `true` or `false`
  return hit;
}

const play = (game: Game): void => {
  if (!game.isPaused) {
    game.text.pause.position.set(-300, 0);
    player.x += player.vx;

    if (aliens.x + aliens.width + ALIENS_MARGIN.x >= 560 && aliensdirection === Dirs.RIGHT) {
      aliensdirection = Dirs.LEFT;
      aliensSpeed += 0.2;
      aliens.y += 15;
    } else if (aliens.x <= 0 && aliensdirection === Dirs.LEFT) {
      aliensdirection = Dirs.RIGHT;
      aliensSpeed += 0.2;
      aliens.y += 15;
    }

    aliens.x += (aliensdirection === Dirs.RIGHT ? aliensSpeed : -1 * aliensSpeed);

    bullets.forEach((bullet) => bullet.travel());

    bullets.forEach((bullet) => {
      aliens.children.forEach((alien) => {
        if (hitTestRectangle(bullet, alien.getBounds())) {
          console.log('bang');
          bullet.hide();
          alien.y = -400;
        }
      });
    });
  } else {
    game.text.pause.position.set(280, 300);
  }
};

const levelMap = [3, 1, 1, 5, 5];
const game = new Game();

function setup() {
  player = EntityFactory.createEntity(
    TextureCache['sprites_22.png'],
    [240, 580],
  );

  for (let i = 0; i < 12; i += 1) {
    bullets[i] = new Bullet(i);
    app.stage.addChild(bullets[i]);
  }

  aliens = setUpAliens(
    TextureCache,
    levelMap,
  );

  /*
  aliens.children.forEach((alien) => {
    const bounds = alien.getBounds();

    const rec = new PIXI.Graphics();
    rec.beginFill(0x8888ee);
    rec.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
    rec.endFill();
    app.stage.addChild(rec);
  });
  */

  app.stage.addChild(aliens);
  app.stage.addChild(player);

  const keys = {
    left: keyboard('ArrowLeft'),
    up: keyboard('ArrowUp'),
    right: keyboard('ArrowRight'),
    down: keyboard('ArrowDown'),
    space: keyboard(' '),
    pause: keyboard('p'),
  };

  keys.left.press = () => {
    player.vx = -1;
    player.vy = 0;
  };

  keys.left.release = () => {
    if (!keys.right.isDown && player.vy === 0) {
      player.vx = 0;
    }
  };

  keys.right.press = () => {
    player.vx = 1;
    player.vy = 0;
  };

  keys.right.release = () => {
    if (!keys.left.isDown && player.vy === 0) {
      player.vx = 0;
    }
  };

  keys.pause.press = () => {
    game.togglePause();
  };

  keys.space.press = () => {
    bullets.find((b) => !b.vy)?.launch(player.x);
  };

  const style = new PIXI.TextStyle({
    fontFamily: 'pressStart',
    fill: 'white',
  });

  game.text.pause = new PIXI.Text('PAUSE', style);
  game.text.pause.position.set(-300, 400);
  game.text.pause.anchor.set(0.5, 0.5);
  app.stage.addChild(game.text.pause);

  const scoreStyle = new PIXI.TextStyle({
    fontFamily: 'pressStart',
    align: 'center',
    fill: 'white',
    fontSize: 20,
    lineHeight: 30,
  });

  game.text.score = new PIXI.Text('SCORE\n00020', scoreStyle);
  game.text.score.position.set(80, 30);
  game.text.score.anchor.set(0.5, 0);
  app.stage.addChild(game.text.score);

  game.text.highScore = new PIXI.Text('HIGH SCORE\n00000', scoreStyle);
  game.text.highScore.position.set(430, 30);
  game.text.highScore.anchor.set(0.5, 0);
  app.stage.addChild(game.text.highScore);

  app.ticker.add(() => gameLoop());
}

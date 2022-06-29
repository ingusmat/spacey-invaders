import keyboard from '../util/keyboard';

const keys = {
  left: keyboard('ArrowLeft'),
  up: keyboard('ArrowUp'),
  right: keyboard('ArrowRight'),
  down: keyboard('ArrowDown'),
  space: keyboard('Space'),
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

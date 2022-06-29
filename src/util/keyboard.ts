interface Key {
  value: string,
  isDown: boolean,
  isUp: boolean
  press: () => null,
  release: () => null,
  downHandler: (event: KeyboardEvent) => void,
  upHandler: (event: KeyboardEvent) => void,
  unsubscribe: () => void,
}

const keyboard = (value: string): any => {
  const key: Key = {
    value,
    isDown: false,
    isUp: true,
    press: () => null,
    release: () => null,
    downHandler: (event: KeyboardEvent): void => {
      if (event.key === key.value) {
        if (key.isUp && key.press) {
          key.press();
        }
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    },
    upHandler: (event: KeyboardEvent): void => {
      if (event.key === key.value) {
        if (key.isDown && key.release) {
          key.release();
        }
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    },
    unsubscribe: () => {},
  };

  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener('keydown', downListener, false);
  window.addEventListener('keyup', upListener, false);

  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener);
    window.removeEventListener('keyup', upListener);
  };

  return key;
};

export default keyboard;

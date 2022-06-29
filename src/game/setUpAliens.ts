import * as PIXI from 'pixi.js';

import EntityFactory from '../model/EntityFactory';

const setUpAliens = (
  TextureCache: typeof PIXI.utils.TextureCache,
  levelMap: number[],
) => {
  const ALIENS_MARGIN = { x: 40, y: 130 };
  const ALIENS_SPACING = { x: 32, y: 32 };
  const aliens = new PIXI.Container();

  levelMap.forEach((spriteIndex: number, row: number) => {
    for (let index = 0; index < 11; index += 1) {
      const alienX = ALIENS_MARGIN.x + index * ALIENS_SPACING.x;
      const alienY = ALIENS_MARGIN.y + row * ALIENS_SPACING.y;

      aliens.addChild(EntityFactory.createEntity(
        TextureCache[`sprites_${spriteIndex}.png`],
        [alienX, alienY],
      ));
    }
  });

  return aliens;
};

export default setUpAliens;

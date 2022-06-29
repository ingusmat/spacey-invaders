import * as PIXI from 'pixi.js';
import Entity from './Entity';

class EntityFactory {
  public static createEntity(
    texture: PIXI.Texture,
    position: [number, number],
  ): Entity {
    const [x, y] = position;
    const entity = new Entity(texture);
    entity.position.set(x, y);
    entity.anchor.set(0.5, 0.5);
    entity.scale.set(0.25, 0.25);
    entity.vx = 0;
    entity.vy = 0;

    return entity;
  }
}

export default EntityFactory;

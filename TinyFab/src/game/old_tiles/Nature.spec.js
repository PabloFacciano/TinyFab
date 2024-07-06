import World from './World';
import Nature from './Nature';
import WorldGeneration from './WorldGeneration';

describe('Tile: Nature', () => {
  let world;
  const width = 10;
  const height = 10;

  beforeEach(() => {
    world = new World(width, height);
  });
  test('updateTile() should grow each nature tile', () => {

    WorldGeneration.placeRandomNatureTile(world);
    const natureTile = world.tiles.flat().find(tile => tile.type === 'nature');

    expect(natureTile.properties.resource).not.toBeNull();
    expect(natureTile.properties.generation.tickCount).toBe(0);

    const worldTicks = 20;
    for (let tick = 0; tick < natureTile.properties.generation.time * worldTicks; tick++) {
      Nature.updateTile(natureTile, world);
    }

    let expectedResult = {};
    expectedResult[natureTile.properties.resource] =
      Math.min(
        natureTile.properties.generation.quantity * natureTile.properties.generation.time * worldTicks,
        natureTile.properties.out.capacity
      );
    expect(natureTile.properties.out.items).toEqual(expectedResult);

  });

});

import World from './World';
import WorldUtils from './WorldUtils';

describe('World Utils', () => {
    let world;
    const width = 10;
    const height = 10;

    beforeEach(() => {
        world = new World(width, height);
    });

    test('getPlainTiles() should return all plain tiles', () => {
        const plainTiles = WorldUtils.getPlainTiles(world);
        const flatTiles = world.tiles.flat();
        const plainCount = flatTiles.filter(tile => tile.terrain === 'plain').length;
        expect(plainTiles.length).toBe(plainCount);
    });


});
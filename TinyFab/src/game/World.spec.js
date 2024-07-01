import World from './World';

describe('World', () => {
    let world;
    const width = 10;
    const height = 10;

    beforeEach(() => {
        world = new World(width, height);
    });

    test('should create a new world with the correct size', () => {
        expect(world.size.width).toBe(width);
        expect(world.size.height).toBe(height);
    });

    test('should generate a new world with the correct tile structure', () => {
        expect(world.tiles.length).toBe(height);
        world.tiles.forEach(row => {
            expect(row.length).toBe(width);
            row.forEach(tile => {
                expect(tile).toHaveProperty('type', 'none');
                expect(tile).toHaveProperty('terrain');
                expect(tile).toHaveProperty('properties');
            });
        });
    });
    
    test('getPlainTiles() should return all plain tiles', () => {
        const plainTiles = world.getPlainTiles();
        const flatTiles = world.tiles.flat();
        const plainCount = flatTiles.filter(tile => tile.terrain === 'plain').length;
        expect(plainTiles.length).toBe(plainCount);
    });

    test('placeNatureTiles() should place a nature tile at a random plain tile', () => {
        world.placeNatureTiles();
        const placedTile = world.tiles.flat().find(tile => tile.type === 'nature');
        expect(placedTile).toBeDefined();
        expect(placedTile.terrain).toBe('plain');
        expect(placedTile.properties).toEqual({
            resource: 'tree',
            generation: {
                time: 2,
                quantity: 3
            },
            capacity: 10
        });
    });

});

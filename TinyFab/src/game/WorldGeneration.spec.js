import World from './World';
import WorldGeneration from './WorldGeneration';

describe('World Generation', () => {
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
    
  test('placeNatureTile() should place a nature tile at a random plain tile', () => {

    WorldGeneration.placeRandomNatureTile(world);
    const placedTile = world.tiles.flat().find(tile => tile.type === 'nature');
    expect(placedTile).toBeDefined();
    expect(placedTile.terrain).toBe('plain');

    expect(placedTile.properties.generation.tickCount).toBe(0);
    expect(placedTile.properties.generation.time).toBeGreaterThan(0);
    expect(placedTile.properties.generation.quantity).toBeGreaterThan(0);

    expect(placedTile.properties.out.capacity).toBeGreaterThan(0);
    expect(placedTile.properties.out.items).toEqual({});

  });

    test('placeTransport() should place a transport with all the properties set', () => {

        const location = {
          x: 1,
          y: 1
        }
        const destiny = {
          x: width - 2,
          y: 1
        }
        WorldGeneration.placeTransport(world, location, destiny);;
    
        const transportTile = world.tiles.flat().find(tile => tile.type === 'transport');
    
        // Verificar que todas las propiedades están establecidas con un valor
        expect(transportTile).not.toBeUndefined();
        expect(transportTile.properties).toHaveProperty('transport', 'truck');
        expect(transportTile.properties).toHaveProperty('in.capacity', 5);
        expect(transportTile.properties).toHaveProperty('in.location.x', location.x);
        expect(transportTile.properties).toHaveProperty('in.location.y', location.y);
        expect(transportTile.properties).toHaveProperty('out.location.x', destiny.x);
        expect(transportTile.properties).toHaveProperty('out.location.y', destiny.y);
        expect(transportTile.properties).toHaveProperty('items');
        expect(transportTile.properties).toHaveProperty('status', 'standby');
        expect(transportTile.properties).toHaveProperty('velocity', 1);
    
        // Verificar que la suma de la cantidad de cada item no supera la capacidad total in.capacity
        const items = transportTile.properties.items;
        const totalItems = Object.values(items).reduce((acc, qty) => acc + qty, 0);
        expect(totalItems).toBeLessThanOrEqual(transportTile.properties.in.capacity);
    
        // Cuando no hay items en items{}, se determina que no se está ocupando el espacio disponible
        if (Object.keys(items).length === 0) {
          expect(totalItems).toBe(0);
        }
      });
});
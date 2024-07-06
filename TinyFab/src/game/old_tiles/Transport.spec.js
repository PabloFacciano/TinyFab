import World from './World';
import WorldGeneration from './WorldGeneration';
import WorldUtils from './WorldUtils';
import Transport from './Transport';

describe('Tile: Transport', () => {
  let world;
  const width = 10;
  const height = 10;

  beforeEach(() => {
    world = new World(width, height);
  });

  test('updateTransport() status = standby -> loading -> travelling -> finish', () => {
    const world = new World(8, 8);
    const location = { x: 1, y: 1 };
    const endLocation = { x: 7, y: 1 };

    // Colocar items en tiles adyacentes
    world.tiles[0][1].type = 'resource';
    world.tiles[0][1].properties = { out: { items: { wood: 12 } } };

    world.tiles[1][0].type = 'resource';
    world.tiles[1][0].properties = { out: { items: { stone: 15 } } };

    world.tiles[1][2].type = 'resource';
    world.tiles[1][2].properties = { out: { items: { iron: 8 } } };

    world.tiles[2][1].type = 'resource';
    world.tiles[2][1].properties = { out: { items: { coal: 9 } } };

    // Colocar el transporte en la celda central [1,1]
    WorldGeneration.placeTransport(world, location, endLocation);
    const transportTile = world.tiles[1][1];
    expect(transportTile.properties.status).toBe('standby');

    // Imprimir el estado del mundo
    //console.log("Initial world state:");
    //printWorld(world);

    // Ejecutar el tick de actualización
    world.runTick();

    // Verificar que el estado haya cambiado a "loading"
    expect(transportTile.properties.status).toBe('loading');

    // Ejecutar el tick de actualización nuevamente para cargar items
    world.runTick();

    // Verificar que los items hayan sido cargados en el transporte, hasta un máximo de 10 de cada tipo
    expect(transportTile.properties.items.wood).toBe(10);
    expect(transportTile.properties.items.coal).toBe(9);
    expect(transportTile.properties.items.stone).toBe(10);
    expect(transportTile.properties.items.iron).toBe(8);

    // Verificar que los items sobrantes se quedan en los tiles adyacentes
    expect(world.tiles[0][1].properties.out.items.wood).toBe(2); // 12 - 10 = 2
    expect(world.tiles[1][0].properties.out.items.stone).toBe(5); // 15 - 10 = 5
    expect(world.tiles[1][2].properties.out.items.iron).toBeUndefined();
    expect(world.tiles[2][1].properties.out.items.coal).toBeUndefined();

    // Ejecutar el tick de actualización nuevamente para cambiar el estado a "travelling"
    world.runTick();

    // Verificar que el estado haya cambiado a "travelling"
    expect(transportTile.properties.status).toBe('travelling');

    // Ejecutar ticks adicionales para mover el transporte hasta la ubicación final
    while (transportTile.properties.status !== 'finish') {
      world.runTick();
    }

    // Verificar que el transporte ha llegado a la ubicación final
    const finalLocation = transportTile.properties.in.location;
    expect(finalLocation.x).toBe(endLocation.x);
    expect(finalLocation.y).toBe(endLocation.y);

    // Verificar que el estado sea "finish"
    expect(transportTile.properties.status).toBe('finish');
  });
  function printWorld(world) {
    for (let y = 0; y < world.size.height; y++) {
      let row = '';
      for (let x = 0; x < world.size.width; x++) {
        const tile = world.tiles[x][y];
        row += `[${tile.type}, ${tile.terrain}] `;
      }
      console.log(row);
    }
  }





});
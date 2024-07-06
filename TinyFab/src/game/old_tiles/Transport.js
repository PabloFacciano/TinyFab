import WorldUtils from './WorldUtils'

function buildTileProperties(transportType, startLocation, endLocation) {
  const transportTypes = {
    "truck": {
      capacity: 10,
      velocity: 1
    }
  }

  return {
    transport: transportType,
    in: {
      capacity: transportTypes[transportType].capacity,
      location: startLocation
    },
    out: {
      location: endLocation
    },
    items: {
      /*
      // Ejemplo de items iniciales, estos pueden ser dinámicos
      tree: 2,
      rock: 3
      */
    },
    status: 'standby',
    velocity: transportTypes[transportType].velocity // tiles per tick
  };
}





function updateTile(tile, world, location) {
  const { properties } = tile;

  if (properties.status === 'standby') {
    _handleStandbyStatus(properties, location);
  } else if (properties.status === 'loading') {
    _handleLoadingStatus(tile, world, location);
  } else if (properties.status === 'travelling') {
    _handleTravellingStatus(tile, world, location);
  } else if (properties.status === 'finish') {
    
  }
}
function _handleTravellingStatus(tile, world, location) {
  const { properties } = tile;
  const endLocation = properties.out.location;

  // console.log(`Current location: (${location.x}, ${location.y})`);
  // console.log(`End location: (${endLocation.x}, ${endLocation.y})`);

  // Si ya hemos llegado al destino, cambiamos el estado a 'finish'
  if (location.x === endLocation.x && location.y === endLocation.y) {
      properties.status = 'finish';
      return;
  }

  // Obtener el camino de la ubicación actual a la ubicación final
  const path = WorldUtils.findPath(world, location, endLocation);

  // Verificar que el camino es válido y tiene al menos dos pasos
  if (!path || path.length < 2) {
      // console.log('Path not found or invalid');
      throw new Error('No valid path found from current location to destination');
  }

 // console.log('Path found:', path);

  // Mover el transporte a la siguiente posición en el camino
  const nextStep = path[1]; // La primera posición es la actual, la segunda es el siguiente paso

  // Verificar que la siguiente celda es transitable
  const nextTile = world.tiles[nextStep.x][nextStep.y];
  // console.log(`Next step: (${nextStep.x}, ${nextStep.y}), Tile:`, nextTile);
  if (nextTile.terrain === 'plain') {
      // Actualizar la ubicación del transporte
      world.tiles[location.x][location.y] = { type: 'none', terrain: 'plain' }; // Dejar la celda actual vacía
      world.tiles[nextStep.x][nextStep.y] = tile; // Mover el transporte a la nueva celda

      // Actualizar las coordenadas del transporte
      properties.in.location = nextStep;
  } else {
      throw new Error(`Tile at (${nextStep.x}, ${nextStep.y}) is not suitable for transport: type=${nextTile.type}, terrain=${nextTile.terrain}`);
  }
}

function _handleStandbyStatus(properties, location) {
  if (properties.items && Object.keys(properties.items).length < properties.in.capacity) {
      properties.status = 'loading';
  }
}

function _handleLoadingStatus(tile, world, location) {
  const { properties } = tile;
  const tilesToCheck = [
      { x: location.x - 1, y: location.y },
      { x: location.x + 1, y: location.y },
      { x: location.x, y: location.y - 1 },
      { x: location.x, y: location.y + 1 }
  ];

  const maxItems = tile.properties.in.capacity; // Máximo de items que puede cargar de cada tipo

  tilesToCheck.forEach(({ x, y }) => {
      if (x >= 0 && x < world.size.width && y >= 0 && y < world.size.height) {
          const neighborTile = world.tiles[x][y];
          if (neighborTile.properties.out.items) {
              const items = neighborTile.properties.out.items;
              if (items) {
                  Object.keys(items).forEach(itemType => {
                      const amountToLoad = Math.min(items[itemType], maxItems - (properties.items[itemType] || 0));
                      if (amountToLoad > 0) {
                          properties.items[itemType] = (properties.items[itemType] || 0) + amountToLoad;
                          items[itemType] -= amountToLoad;
                          if (items[itemType] === 0) {
                              delete items[itemType];
                          }
                      }
                  });
              }
          }
      }
  });

  // Cambiar a 'travelling' si se han cargado items
  if (Object.keys(properties.items).length > 0) {
      properties.status = 'travelling';
  }
}

function _isFull(properties) {
  const currentLoad = Object.values(properties.items).reduce((acc, qty) => acc + qty, 0);
  return currentLoad >= properties.in.capacity;
}

function _getCurrentLoad(properties) {
  return Object.values(properties.items).reduce((acc, qty) => acc + qty, 0);
}

function _addItemToTransport(properties, item, amount) {
  if (!properties.items[item]) {
    properties.items[item] = 0;
  }
  properties.items[item] += amount;
}

function _removeItemFromTile(tile, item, amount) {
  tile.properties.out.items[item] -= amount;
  if (tile.properties.out.items[item] === 0) {
    delete tile.properties.out.items[item];
  }
}


export default {
  buildTileProperties,
  updateTile
}


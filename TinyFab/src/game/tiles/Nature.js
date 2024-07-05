
function buildTileProperties(resource, generationTime, generationQuantity, capacity){
  return {
    resource: resource,
    generation: {
      tickCount: 0,
      time: generationTime,
      quantity: generationQuantity
    },
    out: {
      capacity: capacity,
      items: {}
    }
  };
}

function _Growth(tile){
  tile.properties.generation.tickCount += 1;
  if (tile.properties.generation.tickCount < tile.properties.generation.time) {
    return;
  }

  tile.properties.generation.tickCount = 0;

  if (!tile.properties.out.items[tile.properties.resource]) {
    tile.properties.out.items[tile.properties.resource] = 0;
  }

  tile.properties.out.items[tile.properties.resource] = Math.min(
    tile.properties.out.capacity,
    tile.properties.out.items[tile.properties.resource] + tile.properties.generation.quantity
  );
}
function updateTile(tile, world){
  _Growth(tile);
}


export default {
  buildTileProperties,
  updateTile
}
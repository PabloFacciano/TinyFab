import WorldUtils from './WorldUtils'
import Nature from './tiles/Nature'
import Transport from './tiles/Transport'

function placeRandomNatureTile(world){
  const availableTiles = WorldUtils.getPlainTiles(world);
  const randomTile = availableTiles[Math.floor(Math.random() * availableTiles.length)];
  randomTile.type = 'nature';
  randomTile.properties = Nature.buildTileProperties('tree', 3, 4, 10);
}

function placeTransport(world, location, destiny) {
  const tile = world.tiles[location.x][location.y];
  tile.type = 'transport';
  tile.properties = Transport.buildTileProperties('truck', location, destiny);
}

export default {
  placeRandomNatureTile,
  placeTransport
}
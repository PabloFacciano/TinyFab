import Transport from './Transport'
import Nature from './Nature'

class World {
  constructor(width, height) {
    this.size = { width, height };
    this.tiles = [];

    // initialize tiles
    this.tiles = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => ({
        type: 'none',
        terrain: 'plain',
        properties: {}
      }))
    );
  }

  runTick() {
    this.tiles.flat().forEach((tile, index) => {
      const x = Math.floor(index / this.size.width);
      const y = index % this.size.width;
      if (tile.type === 'nature') {
        Nature.updateTile(tile, this, { x, y });
      } else if (tile.type == 'transport') {
        Transport.updateTile(tile, this, { x, y });
      }
    });
  }

}

export default World;
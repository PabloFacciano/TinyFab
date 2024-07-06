export default class Tile {
  constructor(terrain) {
    if (new.target === Tile) {
      throw new Error('Tile cannot be instantiated directly');
    }
    this._terrain = terrain;
    this.itemsIn = {};
    this.itemsOut = {};
    this.state = {};
  }

  get terrain() {
    return this._terrain;
  }

  get itemList() {
    const itemList = {};

    for (const key in this.constructor.acceptedItems) {
      itemList[key] = 0;
    }

    for (const key in this.itemsIn) {
      itemList[key] = this.itemsIn[key];
    }

    for (const key in this.itemsOut) {
      itemList[key] = this.itemsOut[key];
    }

    return itemList;
  }

  setup(world, tileLocation) {
    const { x, y } = tileLocation;
    const tile = world.tiles[x][y];

    if (tile.terrain !== 'plain') {
      throw new Error('Tile cannot be built on this terrain');
    }

    const cost = this.constructor.cost;

    for (const item in cost) {
      if (!world.itemsStorage[item] || world.itemsStorage[item] < cost[item]) {
        throw new Error('Not enough resources to build the tile');
      }
    }

    // Deduct the cost from world itemsStorage
    for (const item in cost) {
      world.itemsStorage[item] -= cost[item];
    }

    // Set up the tile in the world
    world.tiles[x][y] = this;
  }

  update(world) {
    // Default update logic to be extended
    const directions = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 }
    ];

    const { x, y } = this.location;

    directions.forEach(dir => {
      const newX = x + dir.x;
      const newY = y + dir.y;

      if (newX >= 0 && newY >= 0 && newX < world.tiles.length && newY < world.tiles[0].length) {
        const neighbor = world.tiles[newX][newY];

        if (neighbor instanceof Tile) {
          for (const item in neighbor.itemsOut) {
            if (this.constructor.acceptedItems[item]) {
              const availableSpace = this.constructor.acceptedItems[item] - (this.itemsIn[item] || 0);
              if (availableSpace > 0) {
                const transferAmount = Math.min(availableSpace, neighbor.itemsOut[item]);
                this.itemsIn[item] = (this.itemsIn[item] || 0) + transferAmount;
                neighbor.itemsOut[item] -= transferAmount;
              }
            }
          }
        }
      }
    });
  }

  destroy(world) {
    // Custom logic for destruction can be implemented in subclasses
  }
}
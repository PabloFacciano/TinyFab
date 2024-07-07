export class Tile {
  constructor(world, location) {
    if (new.target === Tile) {
      throw new Error("Tile is an abstract class and cannot be instantiated directly.");
    }
    
    this.world = world;
    this.location = location;
    this.itemsIn = {};
    this.itemsOut = {};
    this.state = {};
  }

  static get type() {
    throw new Error("Type getter must be implemented by subclass");
  }

  static get acceptItems() {
    throw new Error("AcceptItems getter must be implemented by subclass");
  }

  static get cost() {
    throw new Error("Cost getter must be implemented by subclass");
  }

  get itemList() {
    const items = { ...this.constructor.acceptItems };
    for (let key in this.itemsIn) {
      items[key] = (items[key] || 0) + this.itemsIn[key];
    }
    for (let key in this.itemsOut) {
      items[key] = (items[key] || 0) + this.itemsOut[key];
    }
    return items;
  }

  acceptInputs() {
    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ];

    for (let dir of directions) {
      const neighborX = this.location.x + dir.x;
      const neighborY = this.location.y + dir.y;
      const neighborTile = this.world.tiles[neighborX] && this.world.tiles[neighborX][neighborY];

      if (neighborTile) {
        for (let item in neighborTile.itemsOut) {
          if (this.constructor.acceptItems[item]) {
            const transferAmount = Math.min(
              neighborTile.itemsOut[item],
              this.constructor.acceptItems[item] - (this.itemsIn[item] || 0)
            );

            if (transferAmount > 0) {
              this.itemsIn[item] = (this.itemsIn[item] || 0) + transferAmount; 
              neighborTile.itemsOut[item] -= transferAmount;
            }
          }
        }
      }
    }
  }

  update() {
    throw new Error("Update method must be implemented by subclass");
  }
}
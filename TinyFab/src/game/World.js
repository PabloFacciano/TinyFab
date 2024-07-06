class World {
  constructor() {
    this.tiles = [];
  }

  createNewWorld(width, height) {
    this.tiles = Array.from({ length: width }, () =>
      Array.from({ length: height }, () => ({
        type: 'none',
        terrain: ['plain', 'mountain', 'river'][Math.floor(Math.random() * 3)]
      }))
    );
  }

  runTick() {
    for (let row of this.tiles) {
      for (let tile of row) {
        if (tile.type !== 'none') {
          tile.update(this);
        }
      }
    }
  }
}

export default World;
class World {
  constructor() {
      this.terrain = [];
      this.tiles = [];
  }

  get width() {
      return this.terrain.length;
  }

  get height() {
      return this.terrain.length > 0 ? this.terrain[0].length : 0;
  }

  createNewWorld(width, height) {
      const types = ['plain', 'mountain', 'river'];
      this.terrain = Array.from({ length: width }, () =>
          Array.from({ length: height }, () => ({
              type: types[Math.floor(Math.random() * types.length)],
          }))
      );
      this.tiles = Array.from({ length: width }, () =>
          Array.from({ length: height }, () => null)
      );
  }

  runTick() {
      for (let x = 0; x < this.tiles.length; x++) {
          for (let y = 0; y < this.tiles[x].length; y++) {
              if (this.tiles[x][y] !== null) {
                  this.tiles[x][y].update();
              }
          }
      }
  }
}

export default World;
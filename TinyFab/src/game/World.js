// World.js
import PerlinNoise from './PerlinNoise';

class World {
    constructor(perlinNoise) {
        this.perlinNoise = perlinNoise;
        this.terrain = [];
        this.tiles = [];
    }
    create(width, height) {

        this.terrain = [];
        this.tiles = [];
        for (let x = 0; x < width; x++) {
            this.terrain[x] = [];
            this.tiles[x] = [];
            for (let y = 0; y < height; y++) {
                const value = this.perlinNoise.generate(x / width , y / height);
                this.terrain[x][y] = { elevation: (value * 100).toFixed(0) };
                this.tiles[x][y] = { empty: true, showBorder: false, location: {x,y} };
            }
        }
        
    }

    get width() {
        return this.terrain.length;
    }

    get height() {
        return this.terrain.length ? this.terrain[0].length : 0;
    }

    runTick() {
        for (let row of this.tiles) {
            for (let tile of row) {
                if (tile && tile.update) {
                    tile.update();
                }
            }
        }
    }
}

export default World;
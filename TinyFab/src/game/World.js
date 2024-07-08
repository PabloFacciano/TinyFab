// World.js
import PerlinNoise from './PerlinNoise';

class World {
    constructor(perlinNoise) {
        this.perlinNoise = perlinNoise;
        this.terrain = [];
        this.tiles = [];
    }

    create(width, height) {
        this.terrain = Array.from({ length: width }, () => Array.from({ length: height }, () => ({})));
        this.tiles = Array.from({ length: width }, () => Array.from({ length: height }, () => null));

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const value = this.perlinNoise.generate(x / width , y / height);
                let type;
                if (value < 0.40) {
                    type = 'river';
                } else if (value < 0.60) {
                    type = 'plain';
                } else {
                    type = 'mountain';
                }
                this.terrain[x][y] = { type, elevation: value };
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
                if (tile) {
                    tile.update();
                }
            }
        }
    }
}

export default World;
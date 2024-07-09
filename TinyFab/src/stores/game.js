// Game.js
import { defineStore } from 'pinia';
import World from '../game/World';
import PerlinNoise from '../game/PerlinNoise';
import NatureTile from '../game/tiles/NatureTile';

export const useGameStore = defineStore('game', {
  state: () => ({
    world: null,
  }),
  actions: {
    initializeWorld(width, height, expectedCount) {
      let perlinNoise = new PerlinNoise();
      let wrl = new World(perlinNoise);
      wrl.create(width, height);
      perlinNoise = null;
  
      // default tiles
      for (let tileIndex = 0; tileIndex < expectedCount; tileIndex++) {
        const x = generarNumeroAleatorio(0, width-1);
        const y = generarNumeroAleatorio(0, height-1);
        if (!wrl.tiles[x]) {
          wrl.tiles[x] = [];
        }
        if (wrl.terrain[x][y].elevation < 0.35 || wrl.terrain[x][y].elevation > 0.65){
          continue;
        }
        wrl.tiles[x][y] = new NatureTile(wrl, { x, y });
      }
  
      this.world = wrl;
    },
    onCellClick(tile, location){
      tile.showBorder = !tile.showBorder;
    }
  }
});

function generarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

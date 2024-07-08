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
    initializeWorld(width, height) {
      let perlinNoise = new PerlinNoise();
      let wrl = new World(perlinNoise);
      wrl.create(width, height);

      // Set initial tiles
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const location = { x, y };
          wrl.tiles[location.x][location.y] = new NatureTile(wrl, location);
        }
      }

      this.world = wrl;
      perlinNoise = null;
    },
  },
});
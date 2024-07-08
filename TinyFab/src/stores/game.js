// Game.js
import { defineStore } from 'pinia';
import World from '../game/World';
import PerlinNoise from '../game/PerlinNoise';

export const useGameStore = defineStore('game', {
  state: () => ({
    world: null,
  }),
  actions: {
    initializeWorld(width, height) {
      const perlinNoise = new PerlinNoise();
      let wrl =  new World(perlinNoise);
      wrl.create(width, height)
      this.world = wrl;
    },
  },
});
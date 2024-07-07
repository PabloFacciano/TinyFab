// Game.js
import { defineStore } from 'pinia';
import World from '../game/World';

export const useGameStore = defineStore('game', {
  state: () => ({
    world: null,
  }),
  actions: {
    initializeWorld(width, height) {
      this.world = new World();
      this.world.create(width, height)
    },
  },
});
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGameStore } from './Game';
import NatureTile from '../game/tiles/NatureTile'; // Asegúrate de importar NatureTile correctamente

describe('Game Store', () => {
  beforeEach(() => {
    // Ensure that Pinia is created and set as active before each test
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it('should initialize world with custom size', () => {
    const store = useGameStore();
    store.initializeWorld(30, 40);
    expect(store.world.width).toBe(30);
    expect(store.world.height).toBe(40);
  });
  
  it('should initialize world with some default tiles', () => {
    const store = useGameStore();
    store.initializeWorld(100, 50);

    // world.tiles must have at least 1 Nature tile for each 10x10 tiles
    for (let x = 0; x < store.world.width; x += 10) {
      for (let y = 0; y < store.world.height; y += 10) {
        const location = { x, y };
        store.world.tiles[location.x][location.y] = new NatureTile(store.world, location);
      }
    }
  });
});
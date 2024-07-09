import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGameStore } from './Game';

describe('Game Store', () => {
  beforeEach(() => {
    // Ensure that Pinia is created and set as active before each test
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it('should initialize world with custom size', () => {
    const store = useGameStore();
    store.initializeWorld(40, 30);
    expect(store.world.width).toBe(40);
    expect(store.world.height).toBe(30);
  });
  
  it('should initialize world with % tiles', () => {
    const store = useGameStore();
    const width = 100;
    const height = 50;
    const percentRequired = 3;
    const expectedCount = Math.floor((percentRequired / 100) * (width * height));
    store.initializeWorld(width, height, expectedCount);
  
    let tileCount = 0;
    for (let x = 0; x < store.world.width; x++) {
      for (let y = 0; y < store.world.height; y++) {
        if (store.world.tiles[x] != null && store.world.tiles[x][y] != null){
          tileCount++;
        }
      }
    }
    expect(tileCount).toBeGreaterThanOrEqual(expectedCount);
  });
});
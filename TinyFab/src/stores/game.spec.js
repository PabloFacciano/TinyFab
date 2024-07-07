import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGameStore } from './Game';
import World from '../game/World';

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
  
});
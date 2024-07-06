import { describe, it, expect, beforeEach, vi } from 'vitest';
import World from './World';
import NatureTile from './tiles/NatureTile';

describe('World', () => {
  let world;

  beforeEach(() => {
    world = new World();
  });

  it('should initialize with an empty tiles array', () => {
    expect(world.tiles).toEqual([]);
  });

  it('should create a new world with the given dimensions', () => {
    world.createNewWorld(3, 3);
    expect(world.tiles.length).toBe(3);
    expect(world.tiles[0].length).toBe(3);
    expect(world.tiles[0][0].type).toBe('none');
    const terrains = ['plain', 'mountain', 'river'];
    expect(terrains).toContain(world.tiles[0][0].terrain);
  });

  it('should run tick and update all non-empty tiles', () => {
    world.createNewWorld(2, 2);

    // Manually set some tiles to non-empty
    world.tiles[1][1] = new NatureTile('plain');

    const spy = vi.spyOn(NatureTile.prototype, 'update');

    world.runTick();

    // Only one tile should be updated
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });
});
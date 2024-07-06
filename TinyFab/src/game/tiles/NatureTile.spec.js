import { describe, it, expect, beforeEach } from 'vitest';
import NatureTile from './NatureTile';
import Tile from './Tile';

describe('NatureTile', () => {
  let world;
  let natureTile;

  beforeEach(() => {
    world = {
      tiles: [
        [{ terrain: 'plain' }, { terrain: 'plain' }],
        [{ terrain: 'mountain' }, { terrain: 'water' }]
      ],
      itemsStorage: {
        wood: 10,
        rock: 5
      }
    };
    natureTile = new NatureTile('plain');
  });

  it('should be an instance of Tile', () => {
    expect(natureTile).toBeInstanceOf(Tile);
  });

  it('should have the correct type', () => {
    expect(natureTile.type).toBe('nature');
  });

  it('should initialize with the correct state', () => {
    expect(['wood', 'stone', 'coal', 'iron']).toContain(natureTile.state.generation.resource);
    expect(natureTile.state.generation.ticks).toBeGreaterThanOrEqual(1);
    expect(natureTile.state.generation.ticks).toBeLessThanOrEqual(10);
    expect(natureTile.state.generation.ammount).toBeGreaterThanOrEqual(1);
    expect(natureTile.state.generation.ammount).toBeLessThanOrEqual(10);
    expect(natureTile.state.generation.capacity).toBeGreaterThanOrEqual(10);
    expect(natureTile.state.generation.capacity).toBeLessThanOrEqual(50);
  });

  it('should increment ticksRunning correctly', () => {
    const initialTicks = natureTile.state.generation.ticks;

    for (let i = 0; i < initialTicks; i++) {
      natureTile.update(world);
      if (i + 1 < initialTicks) {
        expect(natureTile.state.ticksRunning).toBe(i + 1);
      }
    }

    // After the last tick, it should reset to 0
    expect(natureTile.state.ticksRunning).toBe(0);
  });

  it('should generate resources and reset ticksRunning after reaching generation.ticks', () => {
    const initialTicks = natureTile.state.generation.ticks;

    for (let i = 0; i < initialTicks; i++) {
      natureTile.update(world);
    }

    const resource = natureTile.state.generation.resource;
    const amount = natureTile.state.generation.ammount;

    expect(natureTile.state.ticksRunning).toBe(0);
    expect(natureTile.itemsOut[resource]).toBe(amount);

    // Let's verify it continues to accumulate correctly
    for (let i = 0; i < initialTicks; i++) {
      natureTile.update(world);
    }

    expect(natureTile.state.ticksRunning).toBe(0);
    expect(natureTile.itemsOut[resource]).toBe(amount * 2);
  });

  it('should not exceed generation capacity', () => {
    const { ticks, ammount, capacity, resource } = natureTile.state.generation;
    for (let i = 0; i < (capacity / ammount) * ticks; i++) {
      natureTile.update(world);
    }

    natureTile.update(world);
    expect(natureTile.itemsOut[resource]).toBeLessThanOrEqual(capacity);
  });
});
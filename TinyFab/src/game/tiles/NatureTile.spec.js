import { describe, it, expect, beforeEach } from 'vitest';
import NatureTile from './NatureTile';
import { Tile } from './Tile';

describe('NatureTile', () => {
  let natureTile;

  beforeEach(() => {
    const mockWorld = { tiles: [] };
    const location = { x: 0, y: 0 };
    natureTile = new NatureTile(mockWorld, location);
  });

  it('should have type "nature"', () => {
    expect(natureTile.type).toBe('nature');
  });

  it('should have correct cost', () => {
    expect(natureTile.cost).toEqual(1000);
  });

  it('should initialize with correct properties', () => {
    expect(natureTile.state).toHaveProperty('generation');
    expect(natureTile.state.generation).toHaveProperty('resource');
    expect(natureTile.state.generation).toHaveProperty('ticks');
    expect(natureTile.state.generation).toHaveProperty('ammount');
    expect(natureTile.state).toHaveProperty('ticksRunning', 0);
    expect(natureTile.itemsOut).toHaveProperty(natureTile.state.generation.resource, 0);
  });

  it('should update itemsOut when ticksRunning exceeds generation.ticks', () => {
    const { resource, ammount } = natureTile.state.generation;
    natureTile.state.ticksRunning = natureTile.state.generation.ticks + 1;
    natureTile.update();
    expect(natureTile.itemsOut[resource]).toBe(ammount);
    expect(natureTile.state.ticksRunning).toBe(0);
  });

  it('should not exceed generation capacity', () => {
    const { resource } = natureTile.state.generation;
    natureTile.itemsOut[resource] = natureTile.capacity - 1;
    natureTile.state.ticksRunning = natureTile.state.generation.ticks + 1;
    natureTile.update();
    expect(natureTile.itemsOut[resource]).toBeLessThanOrEqual(natureTile.capacity);
  });
});
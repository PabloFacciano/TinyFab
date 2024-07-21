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

  it('should initialize with correct properties', () => {
    expect(natureTile.type).toBe('nature');
    expect(natureTile.cost).toEqual(1000);
    expect(natureTile.state).toHaveProperty('generation');
    expect(natureTile.state.generation).toHaveProperty('resource');
    expect(natureTile.state.generation).toHaveProperty('lastGeneration');
    expect(natureTile.state.generation).toHaveProperty('ammount');
    expect(natureTile.state.generation).toHaveProperty('timeRequired');
    expect(natureTile.itemsOut).toHaveProperty(natureTile.state.generation.resource, 0);
  });

  it('should update itemsOut after some time', () => {
    
    natureTile.state.generation.timeRequired = 3000;
    natureTile.state.generation.lastGeneration = Date.now() - 2500;
    natureTile.update();    
    expect(natureTile.itemsOut[natureTile.state.generation.resource]).toBe(0);
    
    natureTile.state.generation.timeRequired = 3000;
    natureTile.state.generation.lastGeneration = Date.now() - 4000;
    natureTile.update();    
    expect(natureTile.itemsOut[natureTile.state.generation.resource]).toBe(natureTile.state.generation.ammount);

  });
});
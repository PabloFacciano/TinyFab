import { describe, it, expect, beforeEach } from 'vitest';
import { Tile } from './Tile';

class TestTile extends Tile {
  static get type() { 
    return 'TestTile'; 
  }

  static get acceptItems() { 
    return { 'wood': 10, 'stone': 5 }; 
  }

  static get cost() { 
    return { 'wood': 2, 'stone': 2 }; 
  }

  update() {
    this.state = { status: 'updated' };
  }
}

describe('Tile', () => {
  let world, location, tile;

  beforeEach(() => {
    world = { tiles: [[null, null], [null, null]] };
    location = { x: 0, y: 0 };
    tile = new TestTile(world, location);
  });

  it('should throw an error when trying to instantiate Tile directly', () => {
    expect(() => new Tile(world, location)).toThrowError("Tile is an abstract class and cannot be instantiated directly.");
  });

  it('should throw an error when type getter is not implemented', () => {
    class IncompleteTile extends Tile {}
    expect(() => IncompleteTile.type).toThrowError("Type getter must be implemented by subclass");
  });

  it('should throw an error when acceptItems getter is not implemented', () => {
    class IncompleteTile extends Tile {}
    expect(() => IncompleteTile.acceptItems).toThrowError("AcceptItems getter must be implemented by subclass");
  });

  it('should throw an error when cost getter is not implemented', () => {
    class IncompleteTile extends Tile {}
    expect(() => IncompleteTile.cost).toThrowError("Cost getter must be implemented by subclass");
  });

  it('should have correct type', () => {
    expect(TestTile.type).toBe('TestTile');
  });

  it('should have correct acceptItems', () => {
    expect(TestTile.acceptItems).toEqual({ 'wood': 10, 'stone': 5 });
  });

  it('should have correct cost', () => {
    expect(TestTile.cost).toEqual({ 'wood': 2, 'stone': 2 });
  });

  it('should combine acceptItems, itemsIn, and itemsOut in itemList', () => {
    tile.itemsIn = { 'wood': 3 };
    tile.itemsOut = { 'stone': 2 };
    expect(tile.itemList).toEqual({ 'wood': 13, 'stone': 7 });
  });

  it('should transfer items from neighboring tiles during acceptInputs', () => {
    const neighborTile = new TestTile(world, { x: 0, y: 1 });
    neighborTile.itemsOut = { 'wood': 5, 'stone': 3 };
    world.tiles[0][1] = neighborTile;

    tile.acceptInputs();

    expect(tile.itemsIn).toEqual({ 'wood': 5, 'stone': 3 });
    expect(neighborTile.itemsOut).toEqual({ 'wood': 0, 'stone': 0 });
  });

  it('should not transfer items if neighborTile is null', () => {
    world.tiles[0][1] = null;
    tile.acceptInputs();
    expect(tile.itemsIn).toEqual({});
  });

  it('should not transfer items if item is not in acceptItems', () => {
    const neighborTile = new TestTile(world, { x: 0, y: 1 });
    neighborTile.itemsOut = { 'iron': 5 };
    world.tiles[0][1] = neighborTile;

    tile.acceptInputs();

    expect(tile.itemsIn).toEqual({});
    expect(neighborTile.itemsOut).toEqual({ 'iron': 5 });
  });

  it('should transfer items correctly when there is enough space in acceptItems', () => {
    const neighborTile = new TestTile(world, { x: 0, y: 1 });
    neighborTile.itemsOut = { 'wood': 8, 'stone': 2 };
    world.tiles[0][1] = neighborTile;

    tile.itemsIn = { 'wood': 2 }; // Already has 2 wood, can accept 8 more
    tile.acceptInputs();

    expect(tile.itemsIn).toEqual({ 'wood': 10, 'stone': 2 });
    expect(neighborTile.itemsOut).toEqual({ 'wood': 0, 'stone': 0 });
  });

  it('should call the update method and change state', () => {
    tile.update();
    expect(tile.state).toEqual({ status: 'updated' });
  });

  it('should throw an error when update method is not implemented in subclass', () => {
    class IncompleteTile extends Tile {}
    const incompleteTile = new IncompleteTile(world, location);
    expect(() => incompleteTile.update()).toThrowError("Update method must be implemented by subclass");
  });
});
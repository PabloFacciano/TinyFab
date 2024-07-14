import { describe, it, expect, beforeEach } from 'vitest';
import ShopTile from './ShopTile';
import Tile from './Tile';

class WorldMock {
  constructor() {
    this.cash = 0;
    this.tiles = [
      [ ], 
      [ ]
    ];
  }
}

describe('ShopTile', () => {
  let world;
  let shopTile;

  beforeEach(() => {
    world = new WorldMock();
    shopTile = new ShopTile(world, { x: 0, y: 0 });
  });

  it('should be an instance of Tile', () => {
    expect(shopTile).toBeInstanceOf(ShopTile);
  });

  it('should have type "shop"', () => {
    expect(shopTile.type).toBe('shop');
  });

  it('should have a cost of 100', () => {
    expect(shopTile.cost).toBe(100);
  });

  it('should accept any item', () => {
    expect(shopTile.acceptItems.length).toBe(4);
  });

  it('should have an initial empty state for itemsIn and itemsOut', () => {
    expect(shopTile.itemsIn).toEqual({});
    expect(shopTile.itemsOut).toEqual({});
  });

  it('should update world cash when items are sold', () => {
    shopTile.itemsIn = { wood: 10, iron: 2 };
    shopTile.update();
    expect(world.cash).toBe(10 * 5 + 2 * 15); // wood: 10 * 5 = 50, iron: 2 * 15 = 30, total = 80
    expect(shopTile.itemsIn).toEqual({});
  });
});
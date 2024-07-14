import { describe, it, expect, beforeEach } from 'vitest';
import { Tile } from './Tile';

describe('Tile', () => {
  let tile, world;

  beforeEach(() => {
    world = {
      tiles: [
        [{ location: { x: 0, y: 0 } }, { location: { x: 1, y: 0 } }, { location: { x: 2, y: 0 } }],
        [{ location: { x: 0, y: 1 } }, null, { location: { x: 2, y: 1 } }],
        [{ location: { x: 0, y: 2 } }, { location: { x: 1, y: 2 } }, { location: { x: 2, y: 2 } }]
      ]
    };
    tile = new Tile(world, { x: 1, y: 1});
    world.tiles[1][1] = tile;
  });

  describe('itemList', () => {
    it('should return the combined list of itemsIn and itemsOut', () => {
      tile.itemsIn = { 'item1': 5 };
      tile.itemsOut = { 'item2': 10, 'item1': 5 };

      expect(tile.itemList).toEqual({ 'item1': 10, 'item2': 10 });
    });
  });

  describe('runItemsIn', () => {


    it('should not do anything if acceptItems is empty', () => {
      tile.acceptItems = [];
      tile.runItemsIn();
      expect(tile.itemsIn).toEqual({});
    });


    it('should update itemsIn based on itemsOut from adjacent tiles', () => {
      tile.acceptItems = ['item1', 'item2'];      
      tile.itemsIn = { 'item1': 1 };
      tile.itemsOut = { 'item1': 3, 'item2': 2 };
      tile.capacity = 4;

      world.tiles[0][1].itemsOut = { 'item1': 4, 'item2': 4 };
      world.tiles[1][0].itemsOut = { 'item1': 4, 'item2': 4 };

      tile.runItemsIn();

      expect(tile.itemsIn).toEqual({ 'item1': 1, 'item2': 2 });
    });



    it('should not update itemsIn if it reaches capacity', () => {
      tile.acceptItems = ['item1', 'item2'];      
      tile.itemsIn = { 'item1': 4 };
      tile.itemsOut = { 'item2': 2 };
      tile.capacity = 4;

      world.tiles[0][1].itemsOut = { 'item1': 4 };

      tile.runItemsIn();

      expect(tile.itemsIn).toEqual({ 'item1': 4 });
    });

  });
});
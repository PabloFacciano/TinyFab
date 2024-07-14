import { describe, it, expect, beforeEach, vi } from 'vitest';
import TransportTile from './TransportTile';

describe('TransportTile', () => {
  let transportTile;
  let world;
  let emptyCell = { empty: true, location: { x: 0, y: 0 } };

  beforeEach(() => {
    world = {
      width: 5,
      height: 5,
      tiles: Array(5).fill().map(() => Array(5).fill({ ...emptyCell }))
    };
    transportTile = new TransportTile(world, { x: 0, y: 0 });
    world.tiles[0][0] = transportTile;
  });

  it('should initialize with correct properties', () => {
    expect(transportTile.constructor.type).toBe('transport');
    expect(transportTile.constructor.cost).toEqual({ wood: 4, rock: 2 });
    expect(transportTile.itemsIn).toEqual({});
    expect(transportTile.itemsOut).toEqual({});
    expect(transportTile.constructor.acceptItems).toEqual({ '*': 20 });
    expect(transportTile.state).toEqual({
      direction: 'right',
      onBlockTurn: 'back'
    });
  });

  it('should move correctly according to the direction', () => {

    expect(world.width).toBeGreaterThanOrEqual(3);
    expect(world.height).toBeGreaterThanOrEqual(3);
    transportTile.location = { x: 0, y: 0 };

    // right
    transportTile.state.direction = 'right';
    transportTile.update();
    expect(world.tiles[0][0].empty).toBe(true);;
    expect(world.tiles[1][0]).toEqual(transportTile);

    // down
    transportTile.state.direction = 'down';
    transportTile.update();
    //console.log("Line 46: ", world.tiles[1][0])
    expect(world.tiles[1][0].empty).toBe(true);;
    expect(world.tiles[1][1].empty).toBe(false);

    // left
    transportTile.state.direction = 'left';
    transportTile.update();
    expect(world.tiles[1][1].empty).toBe(true);
    expect(world.tiles[0][1]).toEqual(transportTile);

    // up
    transportTile.state.direction = 'up';
    transportTile.update();
    expect(world.tiles[0][1].empty).toBe(true);
    expect(world.tiles[0][0]).toEqual(transportTile);

  });

  it('should not move to a next cell when it is not empty', () => {

    world = {
      width: 3,
      height: 3,
      tiles: Array(3).fill().map(() => Array(3).fill({ ...emptyCell }))
    };

    // Set default location
    transportTile = new TransportTile(world, { x: 1, y: 1 })
    world.tiles[1][1] = transportTile;

    // Set adjacent tiles 
    let top = new TransportTile(world, { x: 0, y: 1 });
    world.tiles[0][1] = top;
    let left = new TransportTile(world, { x: 1, y: 0 });
    world.tiles[1][0] = left;
    let right = new TransportTile(world, { x: 2, y: 1 });
    world.tiles[2][1] = right;
    let bottom = new TransportTile(world, { x: 1, y: 2 });
    world.tiles[1][2] = bottom;

    // 8 because there are 4 directions
    for (let index = 0; index < 8; index++) {
      expect(world.tiles[1][1]).toBe(transportTile);
      transportTile.update();
      expect(world.tiles[1][1]).toBe(transportTile);
    }
  })

  it('should not move to a next cell when it is out of bounds', () => {

    world = {
      width: 1,
      height: 1,
      tiles: Array(1).fill().map(() => Array(1).fill({ ...emptyCell }))
    };

    // Set default location
    transportTile = new TransportTile(world, { x: 0, y: 0 })
    world.tiles[0][0] = transportTile;

    // 8 because there are 4 directions
    for (let index = 0; index < 8; index++) {
      expect(world.tiles[0][0]).toBe(transportTile);
      transportTile.update();
      expect(world.tiles[0][0]).toBe(transportTile);
    }
  })

  it('should change direction if cannot move to the next cell', () => {
    world = {
      width: 1,
      height: 1,
      tiles: Array(1).fill().map(() => Array(1).fill({ ...emptyCell }))
    };
    transportTile = new TransportTile(world, { x: 0, y: 0 });
    world.tiles[0][0] = transportTile;

    let expected_onBlockTurn = {
      back: {
        right: 'left',
        left: 'right',
        up: 'down',
        down: 'up'
      },
      left: {
        right: 'up',
        up: 'left',
        left: 'down',
        down: 'right'
      },
      right: {
        right: 'down',
        down: 'left',
        left: 'up',
        up: 'right'
      }
    };

    // Test for 'back' turns
    transportTile.state.onBlockTurn = 'back';
    for (let direction in expected_onBlockTurn.back) {
      transportTile.state.direction = direction;
      transportTile.update();
      expect(transportTile.state.direction).toBe(expected_onBlockTurn.back[direction]);
    }

    // Test for 'left' turns
    transportTile.state.onBlockTurn = 'left';
    for (let direction in expected_onBlockTurn.left) {
      transportTile.state.direction = direction;
      transportTile.update();
      expect(transportTile.state.direction).toBe(expected_onBlockTurn.left[direction]);
    }

    // Test for 'right' turns
    transportTile.state.onBlockTurn = 'right';
    for (let direction in expected_onBlockTurn.right) {
      transportTile.state.direction = direction;
      transportTile.update();
      expect(transportTile.state.direction).toBe(expected_onBlockTurn.right[direction]);
    }
  });
});
import { describe, it, expect, beforeEach, vi } from 'vitest';
import TransportTile from './TransportTile';

describe('TransportTile', () => {
  let transportTile;
  let world;
  let emptyCell = { empty: true, location: { x: 0, y: 0}};

  beforeEach(() =>{
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
    expect(transportTile.constructor.acceptItems).toEqual({});
    expect(transportTile.state).toEqual({
      direction: 'right'
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

  it('should change direction and do not move if the next step is not empty', () => {
    
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

    // right
    transportTile.state.direction = 'right';
    transportTile.update();
    expect(transportTile.state.direction).toBe('left');
    expect(world.tiles[1][1]).toBe(transportTile);
    expect(world.tiles[2][1]).toBe(right);

    // down
    transportTile.state.direction = 'down';
    transportTile.update();
    expect(transportTile.state.direction).toBe('up');
    expect(world.tiles[1][1]).toBe(transportTile);
    expect(world.tiles[1][2]).toBe(bottom);

    // left
    transportTile.state.direction = 'left';
    transportTile.update();
    expect(transportTile.state.direction).toBe('right');
    expect(world.tiles[1][1].empty).toBe(false);
    expect(world.tiles[0][1].empty).toBe(false);

    // up
    transportTile.state.direction = 'up';
    transportTile.update();
    expect(transportTile.state.direction).toBe('down');
    expect(world.tiles[1][1].empty).toBe(false);
    expect(world.tiles[1][0].empty).toBe(false);

  });

  it('should change direction and do not move if the next step out of bounds', () => {
    
    expect(world.width).toBe(5);
    expect(world.height).toBe(5);

    // Set default location bottom-right corner
    world.tiles[4][4] = transportTile;
    transportTile.location = { x: 4, y: 4 };

    // right
    transportTile.state.direction = 'right';
    transportTile.update();

    expect(transportTile.state.direction).toBe('left');
    expect(world.tiles[4][4]).toEqual(transportTile);
    // down
    transportTile.state.direction = 'down';
    transportTile.update();
    expect(transportTile.state.direction).toBe('up');
    expect(world.tiles[4][4]).toEqual(transportTile);

    // Set default location top-left corner
    world.tiles[0][0] = transportTile;
    transportTile.location = { x: 0, y: 0 };

    // left
    transportTile.state.direction = 'left';
    transportTile.update();
    expect(transportTile.state.direction).toBe('right');
    expect(world.tiles[0][0]).toEqual(transportTile);
    // up
    transportTile.state.direction = 'up';
    transportTile.update();
    expect(transportTile.state.direction).toBe('down');
    expect(world.tiles[0][0]).toEqual(transportTile);

  });

});
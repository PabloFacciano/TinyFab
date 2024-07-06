import { describe, it, expect, beforeEach } from 'vitest';
import Tile from './Tile';

describe('Tile', () => {
  let world;

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
  });

  it('should not be instantiable directly', () => {
    expect(() => new Tile('plain')).toThrow('Tile cannot be instantiated directly');
  });

  it('should throw an error if setup is called on non-plain terrain', () => {
    class TestTile extends Tile {
      constructor() {
        super('mountain');
      }

      static cost = { wood: 3 };
      static acceptedItems = { wood: 10, rock: 5 };

      setup(world, tileLocation) {
        super.setup(world, tileLocation);
      }
    }

    const testTile = new TestTile();
    expect(() => testTile.setup(world, { x: 1, y: 0 })).toThrow('Tile cannot be built on this terrain');
  });

  it('should throw an error if setup is called without sufficient resources', () => {
    class TestTile extends Tile {
      constructor() {
        super('plain');
      }

      static cost = { wood: 20 };
      static acceptedItems = { wood: 10, rock: 5 };

      setup(world, tileLocation) {
        super.setup(world, tileLocation);
      }
    }

    const testTile = new TestTile();
    expect(() => testTile.setup(world, { x: 0, y: 0 })).toThrow('Not enough resources to build the tile');
  });

  it('should successfully setup if conditions are met', () => {
    class TestTile extends Tile {
      constructor() {
        super('plain');
      }

      static cost = { wood: 3 };
      static acceptedItems = { wood: 10, rock: 5 };

      setup(world, tileLocation) {
        super.setup(world, tileLocation);
      }
    }

    const testTile = new TestTile();
    expect(() => testTile.setup(world, { x: 0, y: 0 })).not.toThrow();
  });
});
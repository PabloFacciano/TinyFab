import Tile from './Tile';

function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class NatureTile extends Tile {
  constructor(terrain) {
    super(terrain);
    this.type = 'nature';
    this.itemsIn = {};
    this.state = {
      generation: {
        resource: getRandomValue(['wood', 'stone', 'coal', 'iron']),
        ticks: getRandomInt(1, 10),
        ammount: getRandomInt(1, 10),
        capacity: getRandomInt(10, 50)
      },
      ticksRunning: 0
    };

    this.itemsOut = {
      [this.state.generation.resource]: 0
    };
  }

  setup(world, tileLocation) {
    super.setup(world, tileLocation);
  }

  update(world) {
    this.state.ticksRunning++;
    
    if (this.state.ticksRunning < this.state.generation.ticks) return;

    let { resource, capacity, ammount } = this.state.generation;

    this.itemsOut[resource] = Math.min(this.itemsOut[resource] + ammount, capacity);
    this.state.ticksRunning = 0;
    
  }

  destroy(world) {
    super.destroy(world);
  }
}
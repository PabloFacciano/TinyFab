import { Tile } from './Tile';

export default class NatureTile extends Tile {
  constructor(world, location) {
    super(world, location);
    this.type = 'nature';
    this.iconCategory = 'nature';
    this.state = {
      generation: {
        resource: NatureTile.randomResource(),
        ticks: NatureTile.randomNumber(5, 15),
        ammount: NatureTile.randomNumber(1, 3)
      },
      ticksRunning: 0
    };
    this.capacity = NatureTile.randomNumber(10, 20);
    this.itemsOut = { 
      [this.state.generation.resource]: 0 
    };
    this.cost = 1000;
    this.acceptItems = [];
  }

  static randomResource() {
    const resources = ['wood', 'stone', 'coal', 'iron'];
    return resources[Math.floor(Math.random() * resources.length)];
  }

  static randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  update() {
    const { resource, ticks, ammount } = this.state.generation;
    this.state.ticksRunning++;

    if (this.state.ticksRunning > ticks) {
      this.itemsOut[resource] += ammount;
      this.state.ticksRunning = 0;
    }

    if (this.itemsOut[resource] > this.capacity) {
      this.itemsOut[resource] = this.capacity;
    }
  }
}
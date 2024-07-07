import { Tile } from './Tile';

export class NatureTile extends Tile {
  constructor(world, location) {
    super(world, location);
    this.state = {
      generation: {
        resource: NatureTile.randomResource(),
        ticks: NatureTile.randomNumber(1, 10),
        ammount: NatureTile.randomNumber(1, 10),
        capacity: NatureTile.randomNumber(10, 50)
      },
      ticksRunning: 0
    };
    this.itemsOut = { 
      [this.state.generation.resource]: 0 
    };
  }

  static get type() {
    return 'nature';
  }

  static get cost() {
    return { wood: 5 };
  }

  static get acceptItems() {
    return {};
  }

  static randomResource() {
    const resources = ['wood', 'stone', 'coal', 'iron'];
    return resources[Math.floor(Math.random() * resources.length)];
  }

  static randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  update() {
    const { resource, ticks, ammount, capacity } = this.state.generation;
    this.state.ticksRunning++;

    if (this.state.ticksRunning > ticks) {
      this.itemsOut[resource] += ammount;
      this.state.ticksRunning = 0;
    }

    if (this.itemsOut[resource] > capacity) {
      this.itemsOut[resource] = capacity;
    }
  }
}
import { Tile } from './Tile';

export default class NatureTile extends Tile {
  constructor(world, location) {
    super(world, location);
    this.type = 'nature';
    this.iconCategory = 'nature';
    this.state = {
      generation: {
        lastGeneration: Date.now(),
        resource: NatureTile.randomResource(),
        timeRequired: randomNumber(1000, 10000),
        ammount: randomNumber(1, 3)
      }
    };
    this.capacity = randomNumber(6, 15);
    this.itemsOut = { 
      [this.state.generation.resource]: 0 
    };
    this.cost = 1000;
    this.acceptItems = [];
  }

  static randomResource() {
    const resources = ['wood', 'stone', 'coal', 'iron'];
    return resources[randomNumber(0, resources.length)];
  }

  update() {

    let currentPassedTime = Date.now() - this.state.generation.lastGeneration;
    if (currentPassedTime > this.state.generation.timeRequired){
      this.state.generation.lastGeneration += this.state.generation.timeRequired;

      // more resources
      this.itemsOut[this.state.generation.resource] += this.state.generation.ammount;
      if (this.itemsOut[this.state.generation.resource] > this.capacity) {
        this.itemsOut[this.state.generation.resource] = this.capacity;
      }

    }

  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
import { Tile } from './Tile';

export class ShopTile extends Tile {
  constructor(world, location) {
    super(world, location);
    this.state = {
      pricingList: {
        wood: 5,
        stone: 5,
        coal: 5,
        iron: 15
      }
    };
  }

  static get type() {
    return 'shop';
  }

  static get cost() {
    return 100;
  }

  static get acceptItems() {
    return { '*': 50 };
  }

  update() {
    const pricingList = this.state.pricingList;
    let totalCash = 0;

    for (const item in this.itemsIn) {
      if (pricingList[item] !== undefined) {
        totalCash += this.itemsIn[item] * pricingList[item];
      }
    }

    this.world.cash += totalCash;
    this.itemsIn = {}; // Clear itemsIn after selling
  }
}
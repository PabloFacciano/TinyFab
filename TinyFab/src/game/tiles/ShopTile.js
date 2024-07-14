import { Tile } from './Tile';

export default class ShopTile extends Tile {
  constructor(world, location) {
    super(world, location);
    this.type = 'shop';
    this.iconCategory = 'shop';
    this.state = {
      pricingList: {
        wood: 5,
        stone: 5,
        coal: 5,
        iron: 15
      }
    };
    this.cost = 100;
    this.acceptItems = [ 'wood', 'iron', 'stone', 'coal' ];
  }


  update() {
    this.runItemsIn();

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
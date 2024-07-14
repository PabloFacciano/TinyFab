import { Tile } from './Tile';

export default class TransportTile extends Tile {
  constructor(world, location) {
    super(world, location);
    this.type = "transport";
    this.state = {
      direction: 'right',
      onBlockTurn: 'back'
    };
    this.iconCategory = 'transport';
    this.capacity = 20;
    this.cost = 250;
    this.acceptItems = [ 'wood', 'iron', 'stone', 'coal']
  }
  
  
  doMovement(){
    let updateDirection = false;
    let nextLocation = { x: this.location.x, y: this.location.y };

    if (this.state.direction === 'right') {
      nextLocation.x += 1;
    } else if (this.state.direction === 'left') {
      nextLocation.x -= 1;
    } else if (this.state.direction === 'up') {
      nextLocation.y -= 1;
    } else if (this.state.direction === 'down') {
      nextLocation.y += 1;
    }

    if (nextLocation.x < 0 || nextLocation.y < 0) {
      updateDirection = true;
    } else if (nextLocation.x >= this.world.width || nextLocation.y >= this.world.height) {
      updateDirection = true;
    } else if (!this.world.tiles[nextLocation.x][nextLocation.y].empty) {
      updateDirection = true;
    }

    if (updateDirection) {
      this.state.direction = onBlockTurnResult[this.state.onBlockTurn][this.state.direction];
    } else {

      let emptyCell = { empty: true, location: { x: this.location.x, y: this.location.y } };
      this.world.tiles[emptyCell.location.x][emptyCell.location.y] = emptyCell;
      
      this.location = { x: nextLocation.x, y: nextLocation.y };
      this.world.tiles[nextLocation.x][nextLocation.y] = this;
    }
  }

  updateItemsOut(){
    const combined = { ...this.itemsIn };

    for (const [key, value] of Object.entries(this.itemsOut)) {
      if (combined[key] != null) {
        combined[key] += value;
      } else {
        combined[key] = value;
      }
    }
  
    this.itemsOut = combined;
    this.itemsIn = {};
  }

  update() {
    this.doMovement();
    this.runItemsIn();
    this.updateItemsOut();
  }
}

const onBlockTurnResult = {
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
}
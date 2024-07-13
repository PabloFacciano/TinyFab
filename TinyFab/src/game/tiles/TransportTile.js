import { Tile } from './Tile';

export default class TransportTile extends Tile {
  constructor(world, location) {
    super(world, location);
    this.type = "transport";
    this.state = {
      direction: 'right'
    };
    this.iconCategory = 'transport';
  }

  static get type() {
    return 'transport';
  }

  static get cost() {
    return { wood: 4, rock: 2 };
  }

  static get acceptItems() {
    return {};
  }

  update() {

    let updateDirection = false;
    let nextLocation = { x: this.location.x, y: this.location.y };
    if (this.state.direction == 'right') {
      nextLocation.x += 1;
    } else if (this.state.direction == 'left') {
      nextLocation.x -= 1;
    } else if (this.state.direction == 'up') {
      nextLocation.y -= 1;
    } else if (this.state.direction == 'down') {
      nextLocation.y += 1;
    }
    
    if (nextLocation.x <= 0 || nextLocation.y <= 0) {
      updateDirection = true;
    } else if (nextLocation.x >= (this.world.width - 1) || nextLocation.y >= (this.world.height - 1)) {
      updateDirection = true;
    } else if (this.world.tiles[nextLocation.x][nextLocation.y].empty == false) {
      updateDirection = true;
    }

    if (updateDirection) {
      if (this.state.direction == 'right') {
        this.state.direction = 'left';
      } else if (this.state.direction == 'left') {
        this.state.direction = 'right';
      } else if (this.state.direction == 'up') {
        this.state.direction = 'down';
      } else if (this.state.direction == 'down') {
        this.state.direction = 'up';
      }
    }

      let emptyCell = { empty: true, location: { x: this.location.x, y: this.location.y } };
      this.world.tiles[emptyCell.location.x][emptyCell.location.y] = emptyCell;
      
      this.location = { x: nextLocation.x, y: nextLocation.y };
      this.world.tiles[nextLocation.x][nextLocation.y] = this;

  }
}
import { Tile } from './Tile';

class TransportTile extends Tile {
    constructor(world, location) {
        super(world, location);
        this.state = {
            path: [],
            goingForward: true
        };
    }

    static get type() {
        return 'transport';
    }

    static get acceptItems() {
        return {};
    }

    static get cost() {
        return { wood: 4, rock: 2 };
    }

    exportInputs() {
        this.itemsOut = { ...this.itemsIn };
        this.itemsIn = {};
    }

    dontExportInputs() {
        this.itemsIn = { ...this.itemsOut };
        this.itemsOut = {};
    }

    update() {
        const path = this.state.path;
        if (path.length === 0) return;

        const currentIndex = path.findIndex(step => step.x === this.location.x && step.y === this.location.y);
        let newIndex = this.state.goingForward ? currentIndex + 1 : currentIndex - 1;

        if (newIndex >= path.length) {
            this.state.goingForward = false;
            newIndex = path.length - 2; // Ajuste aquí
        } else if (newIndex < 0) {
            this.state.goingForward = true;
            newIndex = 1; // Ajuste aquí
        }

        const nextStep = path[newIndex];
        //console.log(`Moving from (${this.location.x}, ${this.location.y}) to (${nextStep.x}, ${nextStep.y})`);

        if (this.world.tiles[nextStep.y][nextStep.x] === null) {
            //console.log(`Position (${nextStep.x}, ${nextStep.y}) is empty. Moving tile.`);
            this.world.tiles[this.location.y][this.location.x] = null;
            this.location = { x: nextStep.x, y: nextStep.y };
            this.world.tiles[this.location.y][this.location.x] = this;

            if (nextStep.in) {
                this.acceptInputs();
            }

            if (nextStep.out) {
                this.exportInputs();
            } else {
                this.dontExportInputs();
            }
        } else {
            //console.log(`Position (${nextStep.x}, ${nextStep.y}) is not empty`);
        }
    }
}

export default TransportTile;
import { Tile } from './Tile';

export default class TransportTile extends Tile {
    constructor(world, location) {
        super(world, location);
        this.type = "transport";
        this.state = {
            path: [],
            goingForward: true
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

    exportInputs() {
        this.itemsOut = { ...this.itemsIn };
        this.itemsIn = {};
    }

    dontExportInputs() {
        this.itemsIn = { ...this.itemsOut };
        this.itemsOut = {};
    }

    update() {
        const { path, goingForward } = this.state;
        if (path.length === 0) return;

        const currentIndex = path.findIndex(p => p.x === this.location.x && p.y === this.location.y);
        if (currentIndex === -1) return;

        let nextIndex;
        if (goingForward) {
            nextIndex = currentIndex + 1;
            if (nextIndex >= path.length) {
                this.state.goingForward = false;
                nextIndex = currentIndex - 1;
            }
        } else {
            nextIndex = currentIndex - 1;
            if (nextIndex < 0) {
                this.state.goingForward = true;
                nextIndex = currentIndex + 1;
            }
        }

        const nextStep = path[nextIndex];
        if (this.world.tiles[nextStep.y][nextStep.x] !== null) {
            return;
        }

        this.world.tiles[this.location.y][this.location.x] = null;
        this.location = { x: nextStep.x, y: nextStep.y };
        this.world.tiles[nextStep.y][nextStep.x] = this;
    }
}
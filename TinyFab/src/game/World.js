class World {
    constructor(width, height) {
        this.size = { width, height };
        this.tiles = [];
        this._initializeTiles();
    }

    _initializeTiles() {
        const { width, height } = this.size;
        this.tiles = Array.from({ length: height }, () =>
            Array.from({ length: width }, () => ({
                type: 'none',
                terrain: 'plain',
                properties: {}
            }))
        );
    }

    getPlainTiles() {
        return this.tiles.flatMap(row => row.filter(tile => tile.terrain === 'plain'));
    }

    placeNatureTiles() {
        const availableTiles = this.getPlainTiles();
        const randomTile = availableTiles[Math.floor(Math.random() * availableTiles.length)];
        randomTile.type = 'nature';
        randomTile.properties = {
            resource: 'tree',
            generation: {
                time: 2,
                quantity: 3
            },
            capacity: 10
        };
    }


}

export default World;

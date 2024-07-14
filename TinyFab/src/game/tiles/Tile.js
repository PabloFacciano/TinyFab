export class Tile {
  constructor(world, location) {    
    this.world = world;
    this.location = location;
    this.itemsIn = {};
    this.itemsOut = {};
    this.state = {};
    this.capacity = 10;
    this.showBorder = false;
    this.empty = false;
    this.acceptItems = [];
  }

  get itemList() {
    let items = {};
    for (let key in this.itemsIn) {
      items[key] = (items[key] ?? 0) + (this.itemsIn[key] ?? 0);
    }
    for (let key in this.itemsOut) {
      items[key] = (items[key] ?? 0) + (this.itemsOut[key] ?? 0);
    }
    return items;
  }

  runItemsIn() {
    /*
      Este método sólo ingresa itemsOut de celdas cercanas a itemsIn, siempre y cuando haya capacidad disponible.
    */


    // Does this tile accepts any item?
    if (this.acceptItems && this.acceptItems.length == 0) return;
    
    // Get near tiles
    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ];
    let adjacentTiles = [];
    directions.forEach(d => {
      const neighborX = this.location.x + d.x;
      const neighborY = this.location.y + d.y;
      if (!this.world.tiles[neighborX] || !this.world.tiles[neighborX][neighborY]) return;
      adjacentTiles.push(this.world.tiles[neighborX][neighborY]);
    });

    let currentItems = this.itemList;

    // Update near tiles
    adjacentTiles.forEach(t => {
      // Sólo procesar si hay algo en itemsOut
      Object.keys(t.itemsOut ?? []).forEach(itemKey => {

        // si el item no está en acceptItems, saltar
        if (!this.acceptItems.includes(itemKey)) return;

        // si el item ya esta en el maximo, saltar
        const currentItemCount = currentItems[itemKey] ?? 0;
        if (currentItemCount >= this.capacity) return;

        // calcular nueva cantidad 
        const adjacentItemCount = t.itemsOut[itemKey] ?? 0;
        let newItemCount =  currentItemCount + adjacentItemCount;

        // calcular cantidad maxima y resto
        let restAdjacent = 0;
        if (newItemCount > this.capacity){
          restAdjacent = newItemCount - this.capacity;
          newItemCount = this.capacity;
        }

        // nuevo inventario - el existente
        this.itemsIn[itemKey] = newItemCount - (this.itemsOut[itemKey] ?? 0);
        // resto para la celda que da items
        adjacentTiles[itemKey] = restAdjacent;

      })
    });

  }
}
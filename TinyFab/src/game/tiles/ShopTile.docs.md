
# ShopTile

## ChatGPT Prompt

```
Escribe el archivo ShopTile.spec.js y a continuación el archivo ShopTile.js que implementará las pruebas.
Se utiliza Vitest.

La clase ShopTile extenderá la implementación de Tile.js. 

# Propiedades

tile.type = 'shop' 
tile.cost = 100;
tile.itemsIn = {} // none
tile.acceptItems = { '*': 50 } // any up to 50
tile.state = {
    pricingList: {
        wood: 5,
        stone: 5,
        coal: 5,
        iron: 15
    }
}
tile.itemsOut = {} // none

# Métodos

update(){
    /*
    this.acceptsItems():
    update world.cash selling every item in tile.itemsIn using this.state.pricingList as a referece.
    */
}

```
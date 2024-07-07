
# NatureTile

## ChatGPT Prompt

```
Escribe el archivo NatureTile.spec.js y a continuación el archivo NatureTile.js que implementará las pruebas.
Se utiliza Vitest.

La clase NatureTile extenderá la implementación de Tile.js. 

# Propiedades

tile.type = 'nature' 
tile.cost = {
    wood: 5
}
tile.itemsIn = {} // none
tile.acceptItems = {} // none
tile.state = {
    generation: {
        resource: `wood`, // Valor aleatorio entre `wood`, `stone`, `coal`, `iron`
        ticks: 3, // Número aleatorio entre 1 y 10.
        ammount: 2, // Número aleatorio entre 1 y 10.
        capacity: 50 // Número aleatorio entre 10 y 50.
    },
    ticksRunning: 0
}
tile.itemsOut = { 
    wood: 0 // Definición: [generation.resource]: 0
}

# Métodos

update(){
    /*
    1. ticksRunning > generation.ticks? Aumentar itemsOut[resource] en generation.ammount y restablecer ticksRunning a cero
    2. Limitar itemsOut a máximo generation.capacity
    */
}

```
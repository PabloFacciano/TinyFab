
# World

## ChatGPT Prompt

```

Escribe el archivo World.spec.js y a continuación el archivo World.js que implementará las pruebas. Las pruebas deben ejecutarse exitosamente. Se utiliza Vitest.

# Propiedades

## tiles
Es un array bidimensional de elementos de implementaciones de la clase Tile.



# Metodos

## createNewWorld(width, height)
Llena el array this.tile[width][height] con un mapa vacío de tiles: 
{ 
    type: 'none',
    terrain: 'plain' // Valor aleatorio entre: 'plain', 'mountain', 'river'
}

## runTick()
Deberá ejecutar tile.update(this) en cada tile guardado en this.tiles, siempre y cuando el tile no esté vacío (type != none).

```
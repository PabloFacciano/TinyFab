
# World

## ChatGPT Prompt

```

Escribe el archivo World.spec.js y a continuación el archivo World.js que implementará las pruebas. Las pruebas deben ejecutarse exitosamente. Se utiliza Vitest.

# Propiedades

## terrain
Es un array bidimensional. Cada celda contiene un objeto así:
{
    type: 'plain' // Valor aleatorio entre: 'plain', 'mountain', 'river'
}

## tiles
Es un array bidimensional. Cada celda se inicializa en null.

## width
Devuelve this.terrain.length

## height
Devuelve this.terrain[0].length en caso de que haya al menos un elemento diposnible. 
De lo contrario, devuelve 0.

# Metodos

## createNewWorld(width, height)
Llena this.terrain y this.tiles con el tamaño y contenido indicado anteriormente.

## runTick()
Recorre cada celda de this.tiles.
Si la celda no es null, ejecuta this.tile[x,y].update()
```
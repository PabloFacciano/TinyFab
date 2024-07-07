
# Tile

## ChatGPT Prompt

```

Escribe el archivo Tile.spec.js y a continuación el archivo Tile.js. Se utiliza Vitest.

Tile.js exporta una clase. La misma será utilizada  como base para las implementaciones específicas de cada tipo de Tile disponible en el mundo (World.tiles[][]).

# Ejemplo
# Docs

Tile no puede ser utilizado directamente, sino que debe ser heredado y ciertas propiedades y métodos deben ser implementados, extendidos o sobreescritos.

## Propiedades

> tile.type: Nombre de cada implementación. design-time const
> tile.itemsIn: es un objeto dinámico que incluye la cantidad de cada item que va ingresando a la celda.
> tile.itemsOut: es un objeto dinámico que incluye la cantidad de cada item que será exportable de la celda.
> tile.acceptItems: Objeto estático (nombres de los items y cantidad) que serán aceptados para ingresar a itemsIn. design-time const
> tile.cost: Objeto estático (nombres de los items y cantidad) necesarias para poder construir el tile específico. design-time const
> tile.itemList: read-only, es un objeto dinámico que unifica las propiedades de acceptedItems, itemsIn y itemsOut, mostrando la cantidad de cada item, aunque sea 0.
> tile.state es un objeto dinámico que contiene las propiedades de estado internas de cada implementación de la clase, por ejemplo, "status".

## Métodos:

> new(world, location)
this.world = world; // referencia al objeto World que lo contiene.
this.location = location; // {x: 0, y: 0} ubicacion xy dentro de world.tiles[X][y]

> acceptInputs()
Valida las celdas contiguas en las 4 direcciones. Si éstas contienen propiedades de tile.itemsOut que coinciden con this.acceptedItems, se moverán los items a this.itemsIn (résta del origen, acumula en destino). Siempre considerando de no superar el límite de cantidad de items definido en this.acceptedItems.

> update(world): 
- Se ejecutará una vez por cada tick del mundo. Las implementaciones del tile serán encargadas de implementar la lógica como procesamiento de this.itemsIn y establecer this.itemsOut, aplicando el procesamiento y estado en this.state. También se encarga de llamar a this.acceptInputs (opcional).

```

# Tile

## ChatGPT Prompt

```

Escribe el archivo Tile.spec.js y a continuación el archivo Tile.js que implementará las pruebas. Las pruebas deben ejecutarse exitosamente. No se requiere la implementación de un ejemplo de Tile.

Se utiliza Vitest.

Tile.js exporta una clase. La misma será utilizada sólo como base para las implementaciones específicas de cada tipo de Tile disponible en el mundo (World.tiles[][]).

# Ejemplo
{
  terrain: "plain",
  type: "factory",
  cost: {
    wood: 3
  },
  acceptedItems: {
    wood: 10,
    rock: 5,
    ...
  },
  itemsIn: {
    wood: 10,
    rock: 2,
    ...
  },
  itemsOut: {
    chair: 2,
    ...
  },
  itemList: {
    ...
  },
  state: {
    ...
  }
}

# Docs

Tile no puede ser utilizado directamente, sino que debe ser heredado y ciertas propiedades y métodos deben ser implementados, extendidos o sobreescritos.

## Propiedades

> tile.terrain: read-only, está predefinido al crearse el objeto tile, por lo tanto ya posee un valor de sólo lectura cuando se crea un mundo. Los valores que puede tomar son 'plain', 'mountain' o 'water'. No tiene relacion con la implementación de cada clase.
> tile.type: Nombre de cada implementación. design-time const
> tile.itemsIn: es un objeto dinámico que incluye la cantidad de cada item que va ingresando a la celda.
> tile.itemsOut: es un objeto dinámico que incluye la cantidad de cada item que será exportable de la celda.
> tile.acceptItems: Objeto estático (nombres de los items y cantidad) que serán aceptados para ingresar a itemsIn. design-time const
> tile.cost: Objeto estático (nombres de los items y cantidad) necesarias para poder construir el tile específico. design-time const
> tile.itemList: read-only, es un objeto dinámico que unifica las propiedades de acceptedItems, itemsIn y itemsOut, mostrando la cantidad de cada item, aunque sea 0.
> tile.state es un objeto dinámico que contiene las propiedades de estado internas de cada implementación de la clase, por ejemplo, "status".

## Métodos:

> new(...): debe ser implementado en cada clase, definiendo los parámetros adicionales que sean necesarios. Se encarga de inicializar el objeto Tile específico con las propiedades y state necesario.

> setup(world, tileLocation): 
- Contiene lógica predefinida y podrá ser extendido por implementaciones de cada Tile. 
- Se ejecutará por única vez al construirse el Tile en el mundo (un sólo world.runTick). 
- La lógica predefinida:
-- valida si es posible construir en la celda (world.tile[tileLocation.x][tileLocation.y].terrain === 'plain' )
-- valida si se cuenta con los recursos en el mundo para construir (tile.cost <= world.itemsStorage)
- Arroja una excepción con el mensaje de error cuando no puede construise por cualquier motivo (celda ocupada, costo, etc). En ese caso, no se actualiza la celda del mundo.
- Cuando se realize una extension de este método y el mismo genere una excepción, también se cancelará la actualización de la celda en el mundo.

> update(world): 
- Contiene lógica predefinida y deberá ser extendido por implementaciones de cada Tile. 
- Se ejecutará una vez por cada tick del mundo, sólo después de haberse construido la celda en el mundo.
- La lógica predefinida:
-- Valida las celdas contiguas en las 4 direcciones. Si éstas contienen propiedades de tile.itemsOut que coinciden con this.acceptedItems, se moverán los items a this.itemsIn (résta del origen, acumula en destino). Siempre considerando de no superar el límite de cantidad de items definido en this.acceptedItems.
- Las extensiones del tile serán encargadas de implementar la lógica como procesamiento de this.itemsIn y establecer this.itemsOut, aplicando el procesamiento y estado en this.state.

> destroy(world):
- No contiene lógica predefinida sino que puede implementarse para ejecutar lógica para cancelar la destrucción del tile en caso de darse ciertas condiciones.
- Si genera una excepción, se cancelará la destrucción del tile (y su consiguiente modificación del mundo).


```
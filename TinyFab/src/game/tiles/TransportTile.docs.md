
# TransportTile  

## ChatGPT Prompt

```
Escribe el archivo TransportTile.spec.js y a continuación el archivo TransportTile.js que implementará las pruebas.
Se utiliza Vitest.

La clase TransportTile extenderá la implementación de Tile.js. 

# Propiedades

tile.type = `transport`
tile.cost = {
    wood: 4,
    rock: 2
}
tile.itemsIn = {}
tile.itemsOut = {}
tile.acceptItems = {} // user-selected after built
tile.state: {
    path: [
        { x: 0, y: 0, in: true, out: false},
        { x: 1, y: 0, in: false, out: false},
        ...
        { x: 2, y: 0, in: false, out: false},
        { x: 3, y: 0, in: false, out: true},
    ],
    goingForward: true
}

tile.state.path sólo puede contener tiles vacíos del mundo, excluyendo el tile actual.
Además, las posiciones xy deben estar dentro de los limites del mundo (World.widht/height).


# Métodos

exportInputs(){
    /*
    Mueve los items almacenados en this.itemsIn a this.itemsOut;
    */
}
dontExportInputs(){
    /*
    Mueve los items almacenados en this.itemsOut a this.itemsIn;
    */
}

update(world){
    /*    
    Cada objeto dentro de path, se llamará step.

    Si this.location no es un step dentro de this.path (X,Y), mover el tile actual a la posicion del primer step.

    Mover el tile actual al siguiente step del path (goingForward == true, siguiente step, de lo contrario, el anterior).

    Sólo se puede mover al siguiente/anterior step en caso de que la celda esté vacía (== null).

    El transporte debe moverse dentro del mundo (Word.tiles).

    Si step.in == true, ejecuta this.acceptInputs();

    Si step.out == true, ejecuta this.exportInputs(); de lo contrario, ejecuta this.dontExportInputs();
    
    Si llegó al final, comenzar a ir en reversa, cambiando goingForward to false.

    Al llegar al inicio, cambiar goingForward to true.

    En cada update del mundo, el tile actual sólo puede desplazarse una posición a la vez. Es decir, no pueden realizarse movimientos sucesivos para el mismo World.runTick() que actualiza cada Tile.

    */
}

```
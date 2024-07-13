// Game.js
import { defineStore } from 'pinia';
import World from '../game/World';
import PerlinNoise from '../game/PerlinNoise';

import NatureTile from '../game/tiles/NatureTile';
import TransportTile from '../game/tiles/TransportTile';

export const useGameStore = defineStore('game', {
  state: () => ({
    world: null,
    tool: 'select',
    selectedTile: null,
    selectedPath: [],
    mouseDownOnTile: false
  }),
  actions: {
    initializeWorld(width, height, expectedCount) {
      this.selectedTile = null;
      this.tool = 'select';

      let perlinNoise = new PerlinNoise();
      let wrl = new World(perlinNoise);
      wrl.create(width, height);
      perlinNoise = null;
  
      // default tiles
      for (let tileIndex = 0; tileIndex < expectedCount; tileIndex++) {
        const x = generarNumeroAleatorio(0, width-1);
        const y = generarNumeroAleatorio(0, height-1);
        if (!wrl.tiles[x]) {
          wrl.tiles[x] = [];
        }
        if (wrl.terrain[x][y].elevation < 35 || wrl.terrain[x][y].elevation > 65){
          continue;
        }
        wrl.tiles[x][y] = new NatureTile(wrl, { x, y });
      }
  
      this.world = wrl;
    },
    onCellClick(tile, location){

      if (this.tool == 'select'){
        this.unselectAll();
        this.selectedTile = tile;
        tile.showBorder = true;

      } else if (this.tool == 'path'){
        this.pathToolEvent(tile, location);        

      }

    },
    unselectAll(){      
      for (let row of this.world.tiles) {
        for (let tile of row) {
            if (tile) {
                tile.showBorder = false;
            }
        }
    }
    },
    placeTile(block){
      let location = {
        x: this.selectedTile.location.x,
        y: this.selectedTile.location.y
      }
      let newTile;

      if (block.type == 'nature'){
        newTile = new NatureTile(this.world, location);
      } else if (block.type == 'transport'){
        newTile = new TransportTile(this.world, location);
      }

      newTile.location = location;
      
      this.world.tiles[location.x][location.y] = newTile;
      this.onCellClick(newTile, location);
    },
    removeSelectedTile(){
      if (!this.selectedTile) return;

      this.world.tiles[this.selectedTile.location.x][this.selectedTile.location.y].empty = true;
      this.selectedTile = null;
    },
    setTool(tool){      
      if (this.tool != 'path' &&  tool == 'path') this.pathToolInit();
      if (this.tool == 'path' &&  tool != 'path') this.pathToolEnd();

      this.tool = tool;
    },
    pathToolInit(){
      this.unselectAll();
      this.selectedPath = this.selectedTile.state.path;
      if (this.selectedPath == 0){
        this.selectedPath.push({ x: this.selectedTile.location.x, y: this.selectedTile.location.y})
      }
      this.selectedPath.forEach(location => {
        this.world.tiles[location.x][location.y].showBorder = true;
      });
    },
    pathToolEvent(tile, location){

      let lastPoint = this.selectedPath[this.selectedPath.length - 1];

      if (lastPoint.x == location.x && lastPoint.y == location.y && this.selectedPath.length > 1){
        // Si es la misma celda, la quita
        this.selectedPath.pop();
        this.world.tiles[location.x][location.y].showBorder = 0;
        console.log("Removed!", location)
        return;
      }

      if (
        this.world.terrain[location.x][location.y].terrain < 35
      ){ 
        // Es agua
        console.log("It's water. Skip! ", location, lastPoint)
        return;
      }

      if (
        tile.empty == false
      ){ 
        // Es agua
        console.log("It's not empty. Skip! ", location, lastPoint)
        return;
      }

      if (
        location.x > lastPoint.x + 1 ||
        location.x < lastPoint.x - 1 ||
        location.y > lastPoint.y + 1 ||
        location.y < lastPoint.y - 1
      ){ 
        // Si se está saltando celdas continuas,
        // o es agua,
        // o la celda está ocupada
        // no agregar
        console.log("Too far away. Skip! ", location, lastPoint)
        return;
      }

      this.selectedPath.push({
        x: location.x,
        y: location.y
      });
      this.world.tiles[location.x][location.y].showBorder = 1;
      console.log("Added! ", location)

    },
    pathToolEnd(){
      this.selectedTile.state.path = this.selectedPath;
      this.selectedPath = [];
      this.unselectAll();
      this.world.tiles[this.selectedTile.location.x][this.selectedTile.location.y].showBorder = 1;
    }
  }
});

function generarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

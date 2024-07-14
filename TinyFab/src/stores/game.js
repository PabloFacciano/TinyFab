// Game.js
import { defineStore } from 'pinia';
import World from '../game/World';
import PerlinNoise from '../game/PerlinNoise';

import NatureTile from '../game/tiles/NatureTile';
import TransportTile from '../game/tiles/TransportTile';
import ShopTile from '../game/tiles/ShopTile';

export const useGameStore = defineStore('game', {
  state: () => ({
    world: null,
    tool: 'select',
    selectedTile: null,
    tickInterval: null
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

    
      this.unselectAll();
      this.selectedTile = tile;
      tile.showBorder = true;

        

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
      } else if (block.type == 'shop'){
        newTile = new ShopTile(this.world, location);
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
      if (this.tool != 'play' && tool == 'play') this.playSimulation();
      if (this.tool == 'play' && tool != 'play') this.stopSimulation();


      this.tool = tool;
    },
    playSimulation(){
      this.tickInterval = setInterval(() => {
        this.world.runTick();
      }, 100);
    },
    stopSimulation(){
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
  }
});

function generarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

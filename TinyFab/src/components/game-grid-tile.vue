<template>
  <div 
    class="p-2 flex justify-center select-none"
    :style="this.style"
    @mousedown="onCellClick"
  >
    <div :class="selected" class="rounded overflow-show">
      <img v-if="this.icon" :style="customImageStyle" class="w-auto m-auto" draggable="false" :src="this.icon" alt="icon">
      <div v-for="progressBar in this.progressBars ?? []" :key="progressBar.name" class="w-full bg-gray-200/40 dark:bg-gray-700/40" :style="{ 'height': (20 / (this.progressBars.length)).toFixed(1) + '%'}">
        <div class="bg-blue-600 h-full" :style="{width: progressBar.value + '%'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../stores/game';
export default {
  name: 'GameGridTile',
  data(){
    return {
      gameStore: useGameStore()
    }
  },
  props: {
    tile: {
      type: Object,
      required: false
    },
    terrain: {
      type: Object,
      required: true
    }
  },
  methods: {
    onCellClick(){
      if (!this.tile) return;
      this.gameStore.onCellClick(this.tile, this.tile.location);
    }
  },
  computed: {
    isBackTileEmpty(){
      if (this.tile.type != 'transport') return null;

      let tilePosition = {
        x: this.tile.location.x,
        y: this.tile.location.y
      }
      if (this.tile.state.direction == 'left'){
        tilePosition.x += 1;
      } else if (this.tile.state.direction == 'right'){
        tilePosition.x -= 1;
      } else if (this.tile.state.direction == 'up'){
        tilePosition.y += 1;
      } else if (this.tile.state.direction == 'down'){
        tilePosition.y -= 1;
      } 

      // outside the world border validation
      if (tilePosition.x < 0) return false;
      if (tilePosition.y < 0) return false;
      if (tilePosition.x > (this.tile.world.width - 1)) return false;
      if (tilePosition.y > (this.tile.world.height - 1)) return false;

      return this.tile.world.tiles[tilePosition.x][tilePosition.y].empty;
    },
    isNextTileEmpty(){
      if (this.tile.type != 'transport') return null;

      let tilePosition = {
        x: this.tile.location.x,
        y: this.tile.location.y
      }
      if (this.tile.state.direction == 'left'){
        tilePosition.x -= 1;
      } else if (this.tile.state.direction == 'right'){
        tilePosition.x += 1;
      } else if (this.tile.state.direction == 'up'){
        tilePosition.y -= 1;
      } else if (this.tile.state.direction == 'down'){
        tilePosition.y += 1;
      } 

      // outside the world border validation
      if (tilePosition.x < 0) return false;
      if (tilePosition.y < 0) return false;
      if (tilePosition.x > (this.tile.world.width - 1)) return false;
      if (tilePosition.y > (this.tile.world.height - 1)) return false;

      return this.tile.world.tiles[tilePosition.x][tilePosition.y].empty;
    },
    customImageStyle(){
      if (!this.tile) return;
      let style = {};

      if (this.tile.type == 'transport'){

        let percentage = this.tile.state.percentMoved;
        
        const rotationDirectionMapping = {
          back: {
            left: {
              true: 1,
              false: 2
            },
            right: {
              true: 2,
              false: 1
            },
            up: {
              true: 3,
              false: 4
            },
            down: {
              true: 4,
              false: 3
            }
          },
          left: {
            left: {
              true: 1,
              false: 4
            },
            right: {
              true: 2,
              false: 3
            },
            up: {
              true: 3,
              false: 1
            },
            down: {
              true: 4,
              false: 2
            }
          },
          right: {
            left: {
              true: 1,
              false: 3
            },
            right: {
              true: 2,
              false: 4
            },
            up: {
              true: 3,
              false: 2
            },
            down: {
              true: 4,
              false: 1
            }
          }
        }
        let rotationDirection = rotationDirectionMapping[this.tile.state.onBlockTurn][this.tile.state.direction][this.isNextTileEmpty];

        if (!this.isBackTileEmpty && !this.isNextTileEmpty){
          // Both cell not empty (border case,)
          // dont move by percentage
          percentage = 0;
          rotationDirection = 1;
        }
        if (!this.gameStore.settings.animations){
          percentage = 0;
        }
          

        if (rotationDirection == 1){ // left
          style.transform = `scaleX(-1) translateX(${percentage}%)`;
        } else if (rotationDirection == 2){ // right
          style.transform = `scaleX(1) translateX(${percentage}%)`;
        } else if (rotationDirection == 3){ // up
          style.transform = ` translateY(-${percentage}%) rotate(-90deg)`;
        } else if (rotationDirection == 4){ // down
          style.transform = `rotate(90deg) translateX(${percentage}%)`;
        } 

      }

      if (this.progressBars.length > 0){
        style.height = '80%';
      }

      return style;
    },
    progressBars(){
      let progressBars = [];

      if (this.tile.type == 'nature'){
        progressBars.push({
          name: 'generation',
          value: ((this.tile.state.ticksRunning * 100) / this.tile.state.generation.ticks).toFixed(0)
        })
        progressBars.push({
          name: 'capacity',
          value: ((this.tile.itemList[this.tile.state.generation.resource] * 100) / this.tile.capacity).toFixed(0)
        })
      }

      return progressBars;
    },
    elevation(){
      return this.terrain?.elevation ?? 50;
    },
    selected(){
      if (!this.tile) return false;
      return {
        'border rounded w-full h-full': this.tile.showBorder
      }
    },
    style(){
      let obj = {};

      let interpolateOpacity = (minElevation, maxElevation) => {
        let factor = ((this.elevation - minElevation) / (maxElevation - minElevation)).toFixed(2);
        let opacity = Math.sqrt(factor); // Usar una función cuadrática inversa para una transición más gradual
        return Math.round(opacity * 255).toString(16).padStart(2, '0').toUpperCase();
  
      }

      if (this.elevation >= 35) {
        let hexOpacity = interpolateOpacity(90, 35);
        obj[`background-color`] = `#06732e${hexOpacity}`; // verde
      } else {
        let hexOpacity = interpolateOpacity(0, 35);
        obj[`background-color`] = `#063d73${hexOpacity}`; // azul
      }

      
      return obj;
    },
    icon(){
      if (!this.tile) return;
      if (this.tile.empty) return;

      const icons = {
        truck: 'https://img.icons8.com/color/48/truck--v1.png',
        wood: 'https://img.icons8.com/color/48/deciduous-tree.png',
        stone: 'https://img.icons8.com/color/48/rock.png',
        coal: 'https://img.icons8.com/color/48/coal.png',
        iron: 'https://img.icons8.com/color-glass/48/rock.png',
        factory: 'https://img.icons8.com/color/48/factory.png',
        market: 'https://img.icons8.com/color/48/shopping-basket-2.png',
        question: 'https://img.icons8.com/color/48/question-mark.png',
        shop: 'https://img.icons8.com/color/48/shop.png'
      };

      if (this.tile.iconCategory in icons){
        return icons[this.tile.iconCategory]
      }

      if (this.tile.iconCategory == 'nature' && this.tile.state.generation.resource in icons){
        return icons[this.tile.state.generation.resource];
      }
      if (this.tile.iconCategory == 'transport'){
        return icons.truck;
      }

      return icons.question;
    }
  }
};
</script>

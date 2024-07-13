<template>
  <div 
    class="p-2 flex items-center justify-center select-none"
    :style="this.style"
    @mousedown="tileDown"
    @mouseleave="tileLeave"
    @mouseover="tileEnter"
    @mouseup="tileUp"
  >
    <div :class="selected" >
      <img v-if="this.icon" :src="this.icon" alt="icon">
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
    tileDown(){
      if (!this.tile) return;
      console.log("Down!")
      this.gameStore.mouseDownOnTile = true;
    },
    tileLeave(){
      if (!this.tile) return;
      if (!this.gameStore.mouseDownOnTile) return;
      this.gameStore.onCellClick(this.tile, this.tile.location);

    },
    tileEnter(){
      
    },
    tileUp(){
      if (!this.tile) return;
      console.log("Up!")
      this.gameStore.onCellClick(this.tile, this.tile.location);
      this.gameStore.mouseDownOnTile = false;

    }
  },
  computed: {
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
        question: 'https://img.icons8.com/color/100/question-mark.png'
      };

      if (this.tile.iconCategory in icons){
        return icons[this.tile.icon]
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

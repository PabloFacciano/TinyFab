<template>
  <div 
    class="p-2 flex items-center justify-center select-none"
    :class="this.class"
    @click="tileClick"
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
    tileClick(){
      if (!this.tile) return;
      const gameStore = useGameStore();
      gameStore.onCellClick(this.tile);
    }
  },
  computed: {
    elevation(){
      if(!this.terrain) return 50;
      return parseInt((this.terrain.elevation.toFixed(2) + '').substring(2,4));
    },
    selected(){
      if (!this.tile) return false;
      return {
        'border rounded w-full h-full': this.tile.showBorder
      }
    },
    class(){
      let obj = {};

      obj[`bg-stone-950`] = this.elevation >= 65;
      obj[`bg-stone-800/[0.4]`] = this.elevation >= 60 && this.elevation < 65;
      obj[`bg-green-800/[0.5]`] = this.elevation >= 50 && this.elevation < 60;
      obj[`bg-green-800/[0.6]`] = this.elevation >= 45 && this.elevation < 50;
      obj[`bg-green-800/[0.7]`] = this.elevation >= 40 && this.elevation < 45;
      obj[`bg-green-800/[0.8]`] = this.elevation >= 35 && this.elevation < 40;
      obj[`bg-cyan-950/[1]`] = this.elevation < 35;

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

      return icons.question;
    }
  }
};
</script>

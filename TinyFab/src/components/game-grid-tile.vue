<template>
  <div 
    class="p-2 flex items-center justify-center select-none"
    :class="this.class"
  >
  <div v-if="false" v-text="this.elevation"></div>
  <img v-if="this.icon" :src="this.icon" alt="icon">
  </div>
</template>

<script>
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
  computed: {
    elevation(){
      return parseInt((this.terrain.elevation.toFixed(2) + '').substring(2,4));
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
      let icon = '';

      const icons = {
        truck: 'https://img.icons8.com/color/48/truck--v1.png',
        tree: 'https://img.icons8.com/color/48/deciduous-tree.png',
        rock: 'https://img.icons8.com/color/48/coal.png'
      }

      if (this.elevation >= 40 && this.elevation < 45){
        return icons.tree;
      }

      return icon;
    }
  }
};
</script>

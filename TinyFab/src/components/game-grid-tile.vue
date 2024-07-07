<template>
  <div class="tile" v-if="tile && tile.itemsIn">
    <div v-if="tile.itemsIn.tree" class="icon tree-icon"></div>
    <div v-if="tile.itemsIn.truck" class="icon truck-icon"></div>
    <div v-if="tile.itemsIn.factory" class="icon factory-icon"></div>
    <div v-if="tile.itemsIn.cart" class="icon cart-icon"></div>
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
  },
};
</script>

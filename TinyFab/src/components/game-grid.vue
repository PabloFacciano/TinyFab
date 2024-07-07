<template>
  <div class="grid grid-cols-10 gap-1">
    <div v-for="(row, rowIndex) in tiles" :key="`row-${rowIndex}`">
      <GameGridTile 
        v-for="(tile, colIndex) in row" 
        :key="`tile-${rowIndex}-${colIndex}`"
        :tile="tile" />
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../stores/game';
import GameGridTile from './game-grid-tile.vue';

export default {
  components: {
    GameGridTile,
  },
  computed: {
    tiles() {
      const gameStore = useGameStore();
      return gameStore.world?.tiles;
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  gap: 1px;
}
</style>

<template>
  <div v-if="this.visible" class="
    p-5 border-l border-indigo-500
    /* light mode */ bg-zinc-200 
    /* dark mode */ dark:bg-zinc-800 text-zinc-200 
  ">
    <div class="mb-3">What do you want to build at ({{ tile.location.x }}, {{ tile.location.y }})?</div>
    <!-- item list -->
    <div class="grid grid-cols-3 mb-5">
      <button v-for="block in this.blocks" :title="block.label" @click="this.gameStore.placeTile(block)"
        class="m-2 p-3 w-auto border border-indigo-500 rounded hover:bg-indigo-500 transition-all"><img :src="block.icon"
          :alt="block.label" /></button>
    </div>

    <div class="text-sm mb-3">Terrain Properties</div>
    <table class="bg-neutral-700 border-collapse w-full text-start mb-3">
      <tr>
        <td class="bg-neutral-900 px-3 py-1">Elevation</td>
        <td class="px-3 py-1">{{ this.terrain.elevation }}</td>
      </tr>
    </table>

  </div>
</template>

<script>
import { useGameStore } from '../stores/game';
export default {
  name: 'GameMarketPanel',
  data() {
    return {
      gameStore: useGameStore(),
      blocks: [
        {
          type: 'nature',
          label: 'Nature',
          icon: 'https://img.icons8.com/color/48/deciduous-tree.png'
        },
        {
          type: 'transport',
          label: 'Transport',
          icon: 'https://img.icons8.com/color/48/truck--v1.png'
        }
      ]
    }
  },
  computed: {
    visible() {
      return (this.gameStore.selectedTile && this.gameStore.selectedTile.empty)
    },
    tile(){
      return this.gameStore.selectedTile;
    },
    terrain(){
      return this.gameStore.world.terrain[this.tile.location.x][this.tile.location.y];
    }
  }
}
</script>
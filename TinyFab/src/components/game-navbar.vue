<template>
  <div 
  class="
    text-center p-2 flex justify-between content-middle
    border-b-2 border-indigo-500
    /* light mode */ bg-zinc-200 
    /* dark mode */ dark:bg-zinc-800 text-zinc-200 
  ">
    <button class="border-2 border-indigo-500 rounded p-2" @click="NewMap()">New Map</button>
    <div>150 Coins</div>
  </div>
</template>

<script>
import { useGameStore } from '../stores/game';

export default {
  methods: {
    NewMap() {
      const gameStore = useGameStore();
      return gameStore?.initializeWorld(
        gameStore.world.width,
        gameStore.world.height
      );
    },
  }
};
</script>
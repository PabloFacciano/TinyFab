<template>
  <div 
  class="
    text-center p-2
    border-b-2 border-indigo-500
    /* light mode */ bg-zinc-200 
    /* dark mode */ dark:bg-zinc-800 text-zinc-200 
  ">
    <button @click="NewMap()">New Map</button>
    <div>150 Coins</div>
  </div>
</template>

<script>
import { useGameStore } from '../stores/game';

export default {
  methods: {
    NewMap() {
      const gameStore = useGameStore();
      let size = Math.floor(Math.random() * (50 - 10 + 1)) + 10
      return gameStore?.initializeWorld(
        size,
        size * 2
      );
    },
  }
};
</script>
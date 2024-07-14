<template>
  <div 
  class="
    text-center flex justify-between items-stretch
    border-b-2 border-indigo-500
    /* light mode */ bg-zinc-200 text-zinc-800 
    /* dark mode */ dark:bg-zinc-800 dark:text-zinc-200 
  ">
    <div class="flex">
      <button class="hover:bg-indigo-800 rounded p-2 m-2" @click="NewMap()">New Map</button>
      <button :class="{ 'bg-indigo-500': this.gameStore.tool == 'select' }" class="hover:bg-indigo-800 p-2" @click="this.gameStore.setTool('select')"><img width="24" height="24" src="https://img.icons8.com/ios-filled/48/ffffff/cursor.png" alt="select"/></button>
      <button :class="{ 'bg-indigo-500': this.gameStore.tool == 'play' }" class="hover:bg-indigo-800 p-2"  @click="this.gameStore.setTool('play')"><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/48/ffffff/play--v1.png" alt="play/pause"/></button>
    
      <button class="hover:bg-indigo-800 rounded p-2 m-2" @click="NewMap()">{{ this.gameStore.world.cash + ' Coins' }}</button>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../stores/game';

export default {
  data(){
    return {
      gameStore: useGameStore()
    }
  },
  methods: {
    NewMap() {
      this.gameStore.setTool('select');
      this.gameStore.initializeWorld(
        this.gameStore.world.width,
        this.gameStore.world.height,
        8
      );
    },
  }
};
</script>
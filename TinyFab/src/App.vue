<template>
  <div class="flex flex-col h-svh">
    <GameNavbar />
    <GameGrid class="flex" />
  </div>
</template>

<script>
import GameNavbar from './components/game-navbar.vue';
import GameGrid from './components/game-grid.vue';

export default {
  components: {
    GameGrid,
    GameNavbar
  }
};
</script>

<template>
  <div>
    <GameNavbar />
    <GameGrid />
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

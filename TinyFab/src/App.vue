<template>
  <div class="flex flex-col h-svh">
    <GameNavbar />
    <div class="flex items-stretch flex-1">
      <GameGrid class="flex flex-1" />
      <GamePropertiesPanel />
      <GameMarketPanel />
    </div>
  </div>
</template>

<script>
import GameNavbar from './components/game-navbar.vue';
import GameGrid from './components/game-grid.vue';
import GameMarketPanel from './components/game-market-panel.vue';
import GamePropertiesPanel from './components/game-properties-panel.vue';

export default {
  components: {
    GameGrid,
    GameNavbar,
    GameMarketPanel,
    GamePropertiesPanel
  }
};
</script>

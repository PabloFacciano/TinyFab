<template>
  <!-- Grid container -->
  <div class=" p-3 bg-zinc-900 overflow-auto content-center" @wheel="handleWheel"
       @mousemove="handleMouseMove"
       @mousedown="startDrag"
       @mouseup="endDrag"
       @mouseleave="endDrag">

    <!-- Tiles -->
    <div class="flex content"
         :style="contentStyle"
         :class="contentClass">
      <div class="flex flex-col" v-for="(row, rowIndex) in tiles" :key="`row-${rowIndex}`">
        <GameGridTile v-for="(tile, colIndex) in row" :key="`tile-${rowIndex}-${colIndex}`" :tile="tile"
          :terrain="getTerrainByLocation(rowIndex, colIndex)" class="w-10 h-10 shrink-0 tile" />
      </div>
    </div>

  </div>
</template>

<script>
import { useGameStore } from '../stores/game';
import GameGridTile from './game-grid-tile.vue';

export default {
  data() {
    return {
      zoom: 1,
      zoomStep: 0.05,
      minZoom: 0.05,
      maxZoom: 2,
      transformOrigin: 'center center',
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      initialOffsetX: 0,
      initialOffsetY: 0,
      offsetX: 0,
      offsetY: 0,
      isZooming: false
    }
  },
  components: {
    GameGridTile,
  },
  computed: {
    tiles() {
      const gameStore = useGameStore();
      return gameStore?.world?.tiles;
    },
    contentStyle() {
      return {
        transform: `scale(${this.zoom}) translate(${this.offsetX}px, ${this.offsetY}px)`,
        transformOrigin: this.transformOrigin,
        backfaceVisibility: 'hidden' // Improve rendering
      };
    },
    contentClass() {
      if (this.isDragging) {
        return 'dragging';
      } else if (this.isZooming) {
        return this.zoomingIn ? 'zooming-in' : 'zooming-out';
      }
      return '';
    }
  },
  methods: {
    getTerrainByLocation(x, y) {
      const gameStore = useGameStore();
      return gameStore?.world?.terrain[x][y];
    },
    handleWheel(event) {
      if (event.ctrlKey) {
        event.preventDefault();
        this.isZooming = true;
        if (event.deltaY < 0) {
          // Zoom in
          this.zoom = Math.min(this.zoom + this.zoomStep, this.maxZoom);
          this.zoomingIn = true;
        } else {
          // Zoom out
          this.zoom = Math.max(this.zoom - this.zoomStep, this.minZoom);
          this.zoomingIn = false;
        }
        setTimeout(() => {
          this.isZooming = false;
        }, 300); // Reset zooming state after a short delay
      }
    },
    handleMouseMove(event) {
      if (this.isDragging) {
        this.handleDrag(event);
      }
    },
    updateTransformOrigin(event) {
      const rect = event.target.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const percentX = (offsetX / rect.width) * 100;
      const percentY = (offsetY / rect.height) * 100;
      this.transformOrigin = `${percentX}% ${percentY}%`;
    },
    startDrag(event) {
      if (event.ctrlKey) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = true;
        this.dragStartX = event.clientX;
        this.dragStartY = event.clientY;
        this.initialOffsetX = this.offsetX;
        this.initialOffsetY = this.offsetY;
        event.target.classList.add('dragging');
      }
    },
    endDrag(event) {
      event.preventDefault();
      event.stopPropagation();
      this.isDragging = false;
      event.target.classList.remove('dragging');
    },
    handleDrag(event) {
      const deltaX = (event.clientX - this.dragStartX) / this.zoom;
      const deltaY = (event.clientY - this.dragStartY) / this.zoom;
      this.offsetX = this.initialOffsetX + deltaX;
      this.offsetY = this.initialOffsetY + deltaY;
    }
  }
};
</script>

<style scoped>
.content {
  backface-visibility: hidden; /* Improve rendering quality */
}


.dragging {
  cursor: grabbing !important;
}

.zooming-in {
  cursor: zoom-in !important;
}

.zooming-out {
  cursor: zoom-out !important;
}

.tile {
  margin: 0; /* Remove any margin */
  padding: 0; /* Remove any padding */
  backface-visibility: hidden; /* Improve rendering quality */
  /* Ensure no gaps between tiles */
  border: 0px solid transparent;
  box-sizing: border-box;
}
</style>
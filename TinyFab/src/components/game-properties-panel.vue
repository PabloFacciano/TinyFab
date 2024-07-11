<template>
    <div v-if="this.visible" class="
      p-5 border-l border-indigo-500 select-none w-96 text-pretty
      /* light mode */ bg-zinc-200 text-zinc-800 
      /* dark mode */ dark:bg-zinc-800 dark:text-zinc-200">

      <div class="text-xl mb-4" v-text="this.tileType.name"></div>
  
      <div class="text-sm mb-2">Terrain Properties</div>
      <table class="bg-neutral-700 table-fixed border-collapse text-start w-full mb-3">
        <tr>
          <td class="bg-neutral-900 px-3 py-1">Elevation</td>
          <td class="px-3 py-1">{{ this.terrain.elevation }}</td>
        </tr>
      </table>

      <div class="text-sm mb-2">Tile Properties</div>
      <table class="bg-neutral-700 table-fixed border-collapse text-start w-full mb-3">
        <tr v-for="prop in this.tileGlobalProperties.concat(this.tileType.properties)" :key="prop.label" :title="prop.info">
          <td class="bg-neutral-900 px-3 py-1">{{ prop.label }}</td>
          <td class="px-3 py-1">{{ prop.value(this.tile) }}</td>
        </tr>
      </table>

      
      <div class="text-sm mb-2">Items</div>
      <table class="bg-neutral-700 table-fixed border-collapse text-start w-full mb-3">
        <tr v-for="(value, name) in this.tile.itemList" :key="name">
          <td class="bg-neutral-900 px-3 py-1">{{ name }}</td>
          <td class="px-3 py-1">{{ value }}</td>
        </tr>
      </table>

      <button
        class="rounded border border-red-500 hover:bg-red-500 transition-all w-full py-2 mt-3"
        @click="this.gameStore.removeSelectedTile"
      >Delete</button>

    </div>
  </template>
  
  <script>
  import { useGameStore } from '../stores/game';
  export default {
    name: 'GamePropertiesPanel',
    data() {
      return {
        tileGlobalProperties: [
          {
            label: 'Type',
            info: 'The Type determines what the Tile does.',
            value: (t) => t.type
          },
          {
            label: 'Location',
            info: 'Coordinates indicating where the Tile is located.',
            value: (t) => t.location.x + ', ' + t.location.y
          }
        ],
        tileTypes: {
          'nature' : {
            name: 'Nature',
            properties: [
              {
                label: 'Resource',
                info: 'Resource that will be generated from time to time.',
                value: (t) => t.state.generation.resource
              },
              {
                label: 'Capacity',
                info: 'Maximum amount of resources to be generated.',
                value: (t) => t.state.generation.capacity
              },
              {
                label: 'Generation Time',
                info: 'Time required for resource generation.',
                value: (t) => t.state.generation.ticks
              },
              {
                label: 'Generation Ammount',
                info: 'Ammount of resource that will be generated from time to time.',
                value: (t) => t.state.generation.ammount
              },
              {
                label: 'Generation %',
                info: 'Generation progress percentage',
                value: (t) => ((t.state.ticksRunning * 100) / t.state.generation.ticks).toFixed(0) + '%'
              }
            ]
          }, 
          'transport' : {
            name: 'Transport',
            properties: [
              {
                label: 'Path',
                info: 'Path locations',
                value: (t) => t.path
              }
            ]
          }
        }
      }
    },
    computed: {
      gameStore(){
        return useGameStore()
      },
      visible() {
        return (this.tile && !this.tile.empty);
      },
      tile(){
        return this.gameStore.selectedTile;
      },
      terrain(){
        return this.gameStore.world.terrain[this.tile.location.x][this.tile.location.y];
      },
      tileType(){
        return this.tileTypes[this.tile.type];
      }
    }
  }
  </script>
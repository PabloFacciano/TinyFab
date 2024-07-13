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
          <td class="px-3 py-1">{{ this.terrain?.elevation ?? '???' }}</td>
        </tr>
      </table>

      <div class="text-sm mb-2">Tile Properties</div>
      <table class="bg-neutral-700 table-fixed border-collapse text-start w-full mb-3">
        <tr v-for="prop in this.tileGlobalProperties.concat(this.tileType.properties)" :key="prop.label" :title="prop.info">
          <td class="bg-neutral-900 px-3 py-1">{{ prop.label }}</td>
          <td class="px-3 py-1" @click="prop.onPropertyValueClick(this.tile)">{{ prop.value(this.tile) }}</td>
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
        v-if="this.gameStore.tool == 'select'"
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
        gameStore: useGameStore(),
        tileGlobalProperties: [
          {
            label: 'Type',
            info: 'The Type determines what the Tile does.',
            value: (t) => t.type,
            onPropertyValueClick: () => {}
          },
          {
            label: 'Location',
            info: 'Coordinates indicating where the Tile is located.',
            value: (t) => t.location.x + ', ' + t.location.y,
            onPropertyValueClick: () => {}
          }
        ],
        tileTypes: {
          'nature' : {
            name: 'Nature',
            properties: [
              {
                label: 'Resource',
                info: 'Resource that will be generated from time to time.',
                value: (t) => t.state.generation.resource,
                onPropertyValueClick: () => {}
              },
              {
                label: 'Capacity',
                info: 'Maximum amount of resources to be generated.',
                value: (t) => t.state.generation.capacity,
                onPropertyValueClick: () => {}
              },
              {
                label: 'Generation Time',
                info: 'Time required for resource generation.',
                value: (t) => t.state.generation.ticks,
                onPropertyValueClick: () => {}
              },
              {
                label: 'Generation Ammount',
                info: 'Ammount of resource that will be generated from time to time.',
                value: (t) => t.state.generation.ammount,
                onPropertyValueClick: () => {}
              },
              {
                label: 'Generation %',
                info: 'Generation progress percentage',
                value: (t) => ((t.state.ticksRunning * 100) / t.state.generation.ticks).toFixed(0) + '%',
                onPropertyValueClick: () => {}
              }
            ]
          }, 
          'transport' : {
            name: 'Transport',
            properties: [
              {
                label: 'Direction',
                info: 'Transport items in this direction',
                value: (t) => t.state.direction,
                onPropertyValueClick: (t) => {
                  if (t.state.direction == 'right') {
                    t.state.direction = 'down';
                  } else if (t.state.direction == 'down') {
                    t.state.direction = 'left';
                  } else if (t.state.direction == 'left') {
                    t.state.direction = 'up';
                  } else if (t.state.direction == 'up') {
                    t.state.direction = 'right';
                  }
                }
              }
            ]
          }
        }
      }
    },
    computed: {
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
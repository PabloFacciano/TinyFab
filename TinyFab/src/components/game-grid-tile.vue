<template>
  <div 
    class="p-2 flex items-center justify-center select-none"
    :class="{
      'bg-sky-950': this.terrain.type == 'river',
      'bg-zinc-900': this.terrain.type == 'mountain',
      'bg-zinc-800': this.terrain.type == 'plain'
    }"
  >
  <!--div v-text="(this.terrain.elevation.toFixed(1) + '').substring(2,3)"></div-->
  <img v-if="this.terrain.type == 'plain' && false" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABa0lEQVR4nO3VP0jXQRjHcS3C0CFIRXHUrRbRxf4g6OgkgohjhkG6aIuS0NTQ0lSLCo4KIor8UETBwZodhIYWEaOiHNRByUFecXDC8UP9+efr5sFn+d49z/u55+7zvaKi23E7rj3wAstYuYSW0HZRwD6eofESase3iwIOrrDrCmzdNOAvXuJVoi6UZgU4xmd8SDSHDVRm2iI8xVDURrwIdzIBoBp/MJJAVvEuK0Aj1vLmH2ITzVkAGvDllDWd+JoF4AF+YgbTieZxlNUh16AjVp3q340aTcidD8BjTCCHPtw9D4B7GMACRlF7JgB12I6ubMUiPhYAhKSzaEE/foSWpYDfeB17NoXhJFEZduIvIO3tGxyiN8aXJDHvMR5z/gofnkTLh0rWQ/XJ4uJoohAQ5k/0CT0Yyz8LDAZfxJxN+Vt/ju94hPuxmlyBgwyufRt2gfposIbzArojZBeTKC8AqIoe2AtvRHgr0gX/AToexY+xS/nbAAAAAElFTkSuQmCC">
  </div>
</template>

<script>
export default {
  name: 'GameGridTile',
  props: {
    tile: {
      type: Object,
      required: false
    },
    terrain: {
      type: Object,
      required: true
    }
  },
};
</script>

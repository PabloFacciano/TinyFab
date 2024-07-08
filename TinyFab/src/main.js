import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { useGameStore } from './stores/game';
import './style.css'; 

const app = createApp(App);

// Create a Pinia instance
const pinia = createPinia();
app.use(pinia);

// Mount the app
app.mount('#app');

// Use the store and initialize the world
const store = useGameStore();
store.initializeWorld(50, 100); // Or whatever dimensions you need
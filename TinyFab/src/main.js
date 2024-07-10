import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { useGameStore } from './stores/game';
import './style.css'; 

const app = createApp(App);

// Create a Pinia instance
const pinia = createPinia();
app.use(pinia);

// Use the store and initialize the world
const store = useGameStore();
store.initializeWorld(30, 20, 15);

// Mount the app
app.mount('#app');
import { createApp } from 'vue'; 
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './style.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

const app = createApp(App);
app.use(router);
const pinia = createPinia();
app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');


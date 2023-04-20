// import { createApp } from 'vue'
// import './style.css'


// createApp(App).mount('#app')
import { createApp } from 'vue';
import App from './App.vue';
import './scss/style.scss';
import * as bootstrap from 'bootstrap';	
import { router } from './router';

createApp(App).use(router).mount('#app');

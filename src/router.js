import { createRouter, createWebHistory } from 'vue-router';

import AppHome from "./pages/AppHome.vue";
import RestaurantsIndex from './pages/RestaurantsIndex.vue';
import RestaurantsShow from './pages/RestaurantsShow.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: AppHome
        },
        {
            path: '/ristoranti',
            name: 'restaurants-index',
            component: RestaurantsIndex
        },
        {
            path: '/Menù',
            name: 'restaurants-show',
            component: RestaurantsShow
        },
    ]
});

export { router };
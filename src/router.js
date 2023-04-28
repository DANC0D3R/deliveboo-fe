import { createRouter, createWebHistory } from 'vue-router';

import AppHome from "./pages/AppHome.vue";
import RestaurantsIndex from './pages/RestaurantsIndex.vue';
import RestaurantsShow from './pages/RestaurantsShow.vue';
import CartTest from './pages/CartTest.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/Home',
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
        {
            path: '/cart',
            name: 'cart',
            component: CartTest
        },
    ]
});

export { router };
import { createRouter, createWebHistory } from 'vue-router';

import AppHome from "./pages/AppHome.vue";
import RestaurantsIndex from './pages/RestaurantsIndex.vue';
import RestaurantsShow from './pages/RestaurantsShow.vue';
import CartTest from './pages/CartTest.vue';
import CheckOut from './pages/CheckOut.vue';
import AppMain from './components/AppMain.vue';
import ThankYou from './components/ThankYou.vue';
import Payment from './components/Payment.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/tutti-i-ristoranti',
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
        {
            path: '/checkout',
            name: 'checkout',
            component: CheckOut
        },
        {
            path: '/', //tenendoci solo lo slash, come prima pagina comparirà il main. Se dovesse dare problemi, rimettere la stringa che c'era prima "/Home"
            name: 'appmain',
            component: AppMain
        },
        {
            path: '/payment',
            name: 'payment',
            component: Payment
        },
        {
            path: '/thank-you',
            name: 'thankyou',
            component: ThankYou
        },
    ]
});

export { router };
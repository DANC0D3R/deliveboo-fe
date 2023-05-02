<script>
import axios from 'axios';
import { store } from "../../store";
import RestaurantCard from '../components/RestaurantCard.vue'
export default {
    name: 'AppHome',
    components: {
        RestaurantCard,
    },
    data() {
        return {
            restaurants: [],
            currentPage: 1,
            lastPage: 1,
        };
    },
    created() {
        this.getAllRestaurants();
    },
    methods: {
        // Funzione per creare la paginazione
        changePage(page) {
            // 1. cambio la pagina
            this.currentPage = page;

            //2. richiamo la funzione per mostrare i ristoranti
            this.getAllRestaurants();
        },

        // Funzione per recuperare tutti i ristoranti
        getAllRestaurants() {
            axios
                .get('http://127.0.0.1:8000/api/restaurants', {
                    params: {
                        page: this.currentPage
                    }
                })
                .then(response => {
                    console.log('Response con oggetto', response.data);

                    // Riempo l'array restaurants con i ristoranti
                    this.restaurants = response.data.restaurants.data

                    this.lastPage = response.data.restaurants.last_page
                });
        },

        onMenuClick(restaurantId) {
            store.selectedRestaurant = restaurantId;
            console.log("Ciao mamma", store.selectedRestaurant);
        }
    }
};
</script>

<template>
    <div class="container">

        <!-- TITOLO -->
        <div class="row">
            <div class="col text-center my-5">
                <h1>
                    Tutti i ristoranti
                </h1>
            </div>
        </div>

        <!-- RISTORANTI -->
        <div class="row g-4">
            <div v-for="restaurant in restaurants" class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <RestaurantCard :restaurant="restaurant" />
            </div>
        </div>

        <!-- PAGINE -->
        <!-- <div class="d-flex justify-content-center mb-4">
            <div class="page-button" v-for="singlePage in lastPage">
                <button @click="changePage(singlePage)">
                    {{ singlePage }}
                </button>
            </div>
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
h1 {
    font-weight: 600;
}
</style>
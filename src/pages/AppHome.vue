<script>
import axios from 'axios';
import {store} from "../../store";
import RestaurantCard from '../components/RestaurantCard.vue'
export default {
    name: 'AppHome',
    components: {
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
        changePage(page){
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
        }
    }
};
</script>

<template>
    <div class="container">

        <!-- TITOLO -->
        <div class="row">
            <div class="col text-center mb-3">
                <h1>
                    Homepage
                </h1>
            </div>
        </div>

        <!-- RISTORANTI -->
        <div class="row">
            <div v-for="singleRestaurant in restaurants" class="col-4 mb-2">
                <div class="restaurant-card">
                    <h4>
                        {{ singleRestaurant.name }}
                    </h4>

                    <p>
                        {{ singleRestaurant.address }}
                    </p>

                    <ul>
                        <li v-for="singleType in singleRestaurant.types">
                            {{ singleType.name }}
                        </li>
                    </ul>

                    <img :src="singleRestaurant.img" alt="">

                </div>
            </div>
        </div>

        <!-- PAGINE -->
        <div class="d-flex justify-content-center mb-4">
            <div class="page-button" v-for="singlePage in lastPage">
                <button @click="changePage(singlePage)">
                    {{ singlePage }}
                </button>
            </div>
        </div>


    </div>
</template>

<style scoped>
img{
    width:100px;
}
</style>
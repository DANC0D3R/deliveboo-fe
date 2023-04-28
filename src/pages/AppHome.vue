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
                <h2>
                    Tutti i ristoranti
                </h2>
            </div>
        </div>

        <!-- RISTORANTI -->
        <div class="row">
            <div v-for="singleRestaurant in restaurants" class="col-4 mb-2">
                <div class="restaurant-card mb-4 shadow">

                    <div class="img-container">
                        <img :src="singleRestaurant.img" :alt="singleRestaurant.name">
                    </div>
                    
                    <h4>
                        {{ singleRestaurant.name }}
                    </h4>

                    <p>
                        <i class="fa-solid fa-location-dot icons"></i>
                        {{ singleRestaurant.address }}
                    </p>

                    <div>
                        <span>Tipologia</span>
                        <ul>
                            <li v-for="singleType in singleRestaurant.types">
                                {{ singleType.name }}
                            </li>
                        </ul>
                    </div>

                    <div class="scopri-button">
                        Scopri il ristorante
                    </div>

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

<style lang="scss">

.restaurant-card{

    padding: 1rem;
    border-radius: 0 30px 0 30px;
    // border:2px solid $main-orange;
    background-color: $main-yellow;
    position: relative;

    .img-container{
        height: 200px;
        width: 100%;
        margin-bottom: 2rem;

        img{
            border-radius: 0 30px 0 30px ;
            width: 100%;
            height: 100%;
        }
    }

    h4{
        font-weight: 600;
    }

    ul{
        li{
            list-style-type:disc;
            list-style-type: $main-orange;
        }
    }

    .scopri-button{
        @include button-base;
        position:absolute;
        bottom: -15px;
        right: 15px;
    }
}
</style>
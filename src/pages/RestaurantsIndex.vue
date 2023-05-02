<script>
import axios from 'axios';
import { store } from "../../store";
import RestaurantCard from '../components/RestaurantCard.vue'
export default {
    name: 'RestaurantsIndex',
    components: {
        RestaurantCard,
    },
    data() {
        return {
            types: [],
            restaurants: [],
            selectedTypes: [], // variabile per contenere gli id dei tipi selezionati
            currentPage: 1,
            lastPage: 1,
        };
    },
    created() {
        this.getTypes();
    },
    methods: {
        changePage(page) {
            // 1. cambio la pagina
            this.currentPage = page;

            //2. richiamo la funzione per mostrare i ristoranti
            this.getRestaurants();
        },

        targetTypeCheck() {
            console.log(this.targetType);
        },
        getTypes() {
            axios
                .get('http://127.0.0.1:8000/api/types', {
                })
                .then(response => {
                    console.log('tipologie', response.data);
                    this.types = response.data.data;
                });
        },
        getRestaurants() {
            this.restaurants = []; //Così svuotiamo l'array dei ristoranti
            let typeIds = this.selectedTypes; // array degli id dei tipi selezionati

            axios
                .get('http://127.0.0.1:8000/api/restaurants', {
                    params: {
                        page: this.currentPage
                    }
                })
                .then(response => {
                    console.log('ristoranti', response.data);
                    const restaurantsData = response.data.restaurants.data; //Qui salviamo il risultato della chiamata in una variabile

                    this.lastPage = response.data.restaurants.last_page

                    console.log('restaurantsData', restaurantsData);

                    // Con questa funzione filtriamo i ristoranti, aggiungendo all'array solo quelli che tra le tipologie hanno quelle con l'id ricercato
                    this.restaurants = restaurantsData.filter(restaurant => {
                        let restaurantTypeIds = restaurant.types.map(type => type.id);
                        return typeIds.some(typeId => restaurantTypeIds.includes(typeId));
                    });
                console.log('restaurants', this.restaurants);
                });
        }
    }
};
</script>
<template>
    <div class="container">
        <div class="row text-center mb-3">
            <h2>Cerca un ristorante per tipo</h2>
        </div>

        <form class="row justify-content-center mb-4" @submit.prevent="getRestaurants">
            <div class="col-6 rounded-start">
                <div v-for="singleType in types" :key="singleType.id">
                    <label>
                        <input type="checkbox" :value="singleType.id" v-model="selectedTypes">
                        {{ singleType.name }}
                    </label>
                </div>
            </div>
            <button type="submit" class="col-1 rounded-end" value="Cerca"><i
                    class="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>

        <!-- <form class="row justify-content-center mb-4" @submit.prevent="getRestaurants()">
            <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <div v-for="singleType in types">
                    <input type="checkbox" class="btn-check" :id="singleType.name" autocomplete="off">
                    <label class="btn btn-outline-primary" :for="singleType.name">
                        {{ singleType.name }}
                    </label>
                </div>
            </div>

            <button type="submit" class="col-1 rounded-end" value="Cerca"><i
                    class="fa-solid fa-magnifying-glass"></i>
            </button>
        </form> -->

        <!-- Ristoranti -->
        <div class="row g-4 mb-4">
            <div v-for="restaurant in restaurants" class="col-12 col-sm-4 col-md-3">
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

<style scoped lang="scss">
select {
    border-right: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    // border-left: none;

}

.rounded-end {
    width: 50px;
    background-color: white;
    border: 1px solid black;
    border-left: none;
}
</style>
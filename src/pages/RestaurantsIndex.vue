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
            targetType: '',
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

            let typeId = this.targetType.id; //Qui salviamo l'id della tipologia ricercata

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
                    for (let j = 0; j < restaurantsData.length; j++) {
                        for (let i = 0; i < restaurantsData[j].types.length; i++) {
                            if (restaurantsData[j].types[i].id == typeId) {
                                this.restaurants.push(restaurantsData[j]); //Qui facciamo push del ristorante giusto nell'array
                            }
                        }
                    };
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
            <select class="col-6 rounded-start" name="types" id="types" v-model="targetType">
                <option v-for="singleType in types" :value="singleType">
                    {{ singleType.name }}
                </option>
            </select>
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

        <!-- <div class="row">
                                                                                                                                                                                                                                <div class="col">
                                                                                                                                                                                                                                    <nav class="d-flex justify-content-center">
                                                                                                                                                                                                                                        <ul class="pagination">
                                                                                                                                                                                                                                            <li class="page-item" v-for="i in lastPage">
                                                                                                                                                                                                                                                <button class="page-link" :class="{
                                                                                                                                                                                                                                                    active: currentPage == i
                                                                                                                                                                                                                                                }" @click="changePage(i)">
                                                                                                                                                                                                                                                    {{ i }}
                                                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                                            </li>
                                                                                                                                                                                                                                        </ul>
                                                                                                                                                                                                                                    </nav>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                            </div> -->

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
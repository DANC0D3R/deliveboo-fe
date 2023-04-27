<script>
import axios from 'axios';
import {store} from "../../store";
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
        };
    },
    created() {
        this.getTypes();
    },
    methods: {
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

                })
                .then(response => {
                    console.log('ristoranti', response.data);
                    const restaurantsData = response.data.restaurants.data; //Qui salviamo il risultato della chiamata in una variabile

                    console.log('restaurantsData', restaurantsData);

                    // Con questa funzione filtriamo i ristoranti, aggiungendo all'array solo quelli che tra le tipologie hanno quelle con l'id ricercato
                    for (let j = 0; j < restaurantsData.length; j++) {
                        for (let i = 0; i < restaurantsData[j].types.length; i++) {
                            if (restaurantsData[j].types[i].id == typeId) {
                                this.restaurants.push(restaurantsData[j]); //Qui facciamo push del ristorante giusto nell'array
                            }
                        }
                    };
                    console.log('restaurants',this.restaurants);
                });
        }
    }
};
</script>
<template>
    <div class="container">
        <form class="row justify-content-center" @submit.prevent="getRestaurants">
            <select class="col-6" name="types" id="types" v-model="targetType">
                <option 
                 v-for="singleType in types" 
                 :value="singleType"
                >
                    {{ singleType.name }}
                </option>
            </select>

            <input type="submit" class="col-3">
        </form>
        <div class="row g-3 mb-4">
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
    </div>
</template>

<style scoped>
</style>
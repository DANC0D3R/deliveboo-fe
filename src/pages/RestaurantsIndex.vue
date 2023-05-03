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
            
        };
    },
    created() {
        this.getTypes();
        this.getRestaurants(); // chiamata per mostrare tutti i ristoranti all'avvio della pagina
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
            let typeIds = this.selectedTypes; // array degli id dei tipi selezionati

            if (typeIds.length === 0) {
                // se non viene selezionata nessuna checkbox, mostriamo tutti i ristoranti
                axios
                    .get('http://127.0.0.1:8000/api/restaurants', {
                        params: {
                            page: this.currentPage
                        }
                    })
                    .then(response => {
                        console.log('ristoranti', response.data);
                        this.restaurants = response.data.restaurants.data;
                        this.lastPage = response.data.restaurants.last_page;
                        console.log('restaurants', this.restaurants);
                    });
            } else {
                axios
                    .get('http://127.0.0.1:8000/api/restaurants', {
                    
                    })
                    .then(response => {
                        console.log('ristoranti', response.data);
                        const restaurantsData = response.data.restaurants.data; //Qui salviamo il risultato della chiamata in una variabile

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

    }
};
</script>
<template>

    <div class="container">

        <div class="row text-center mb-5">
            <h2>Ordina online dai ristoranti</h2>
        </div>
        
        <div class="row">
            
            <form class="col-3 justify-content-center mb-4" @submit.prevent="getRestaurants">
                <h4 class="mb-3">
                    Scegli per tipologia
                </h4>

                <p>Filtra tra le varie tipologie e ricerca</p>

                <!-- Checkbox -->
                <div class="rounded-start">
                    <div v-for="singleType in types" :key="singleType.id">
                        <label class="mb-1">
                            <input type="checkbox" :value="singleType.id" v-model="selectedTypes">
                            {{ singleType.name }}
                        </label>
                    </div>
                </div>

                <!-- Bottone ricerca -->
                <button type="submit" class="type-button my-2" value="Cerca">
                    <i class="fa-solid fa-magnifying-glass"></i> Cerca
                </button>

            </form>

            <!-- Ristoranti -->
            <div class="col-9 mb-4">
                <div class="row">
                    <div v-for="restaurant in restaurants" class="col-4 mb-4">
                        <RestaurantCard :restaurant="restaurant" />
                    </div>
                </div>
            </div>
        </div>
        

    </div>
</template>

<style scoped lang="scss">
.container{
    margin-top: 100px;

    h4, h2{
        font-weight: 600;
    }
}
form{

    label{
        width: 100%;
        border-radius:20px;
        border: 1px solid $main-orange;
        padding: 10px 25px;
        color: $main-orange;
    }

    input{
    }

    .type-button{
        width: 100%;
        border-radius:20px;
        background-color: $main-orange;
        padding: 10px 25px;
        border: none;
        color: white;
    }
    .type-button:hover{
        background-color: $main-yellow;
    }
}

</style>
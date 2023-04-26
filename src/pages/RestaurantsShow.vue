<script>
    import axios from 'axios';
    import {store} from "../../store.js"
    import FoodCard from '../components/FoodCard.vue';
    export default {
        name: 'RestaurantsShow',
        components:{
            FoodCard
        },
        data() {
            return {
                store,
                restaurants: [],
                // currentPage: 1,
                // lastPage: 1
            };
        },
        mounted() {
            this.getFoods(store.selectedRestaurant);
        },
        methods: {
            // changePage(page) {
            //     this.currentPage = page;
            //     this.getPosts();
            // },
            getFoods(restaurantId) {
                console.log("papa", restaurantId);
            axios
                .get('http://127.0.0.1:8000/api/foods/' + restaurantId)
                .then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        store.foodsList = response.data;
                        console.log("piatti lista", store.foodsList);
                    }
                    else {
                        this.$router.push({ name: 'not-found' });
                    }
                });
                console.log(this.getFoods)
            },
            dataStorage(item) {
                this.store.order = []; //svuotiamo lo store
                let checkStorage = JSON.parse(localStorage.getItem('order')); //verifichiamo se il localstorage sia pieno o no
                console.log('checkstorage', checkStorage);
                if (checkStorage) {
                    for (let i = 0; i < checkStorage.length; i++) {
                        this.store.order.push(checkStorage[i]); //se checkstorage ha del contenuto, lo pusha nello store
                    }
                    checkStorage = null; //resetta checkstorage
                }
                this.store.order.push(item); //così pushiamo ogni piatto che ordiniamo nello store
                localStorage.setItem('order', JSON.stringify(this.store.order)); //il contenuto dello store viene salvato in localstorage
                console.log('ordine aggiunto!');
                console.log('order', this.store.order);
            },
        }
    };
</script>

<template>
    <section class="container">
        <div class="row justify-content-between">
            <div v-for="food in store.foodsList.food" class="col-4 mb-3 card" style="width: 18rem;">
                <img :src="food.img" class="card-img-top" alt="...">

                <div class="card-body">
                    <h5 class="card-title">{{ food.name }}</h5>

                    <div class="d-flex justify-content-between">
                        <a :href="'#food-'+food.id" class="btn btn-primary" data-bs-toggle="modal">Dettagli</a>
    
                        <!-- con questo pulsante, usiamo il metodo che prende come argomento il singolo piatto e tutti i suoi dati -->
                        <button class="btn btn-warning" @click="dataStorage(food)">Aggiungi</button>
                      
                    </div>

                </div>

                <!-- Modal -->
                <div v-for="food in store.foodsList.food" class="modal fade" :id="'food-'+food.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">{{ food.name }}</h1>

                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div class="modal-body">
                                <div class="text-center mb-3">
                                    <img :src="food.img" alt="" style="width: 22rem;">
                                </div>

                                <p>{{ food.description }}</p>

                                <p><strong>Disponibilità:</strong> {{ food.availability }}</p>

                                <span><strong>Vegano:</strong> {{ food.vegan }}</span>

                                <span><strong>Vegetariano:</strong> {{ food.vegetarian }}</span>

                                <p class="mt-3"><strong>Prezzo:</strong> {{ food.price }}€</p>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- <div class="row g-3 mb-4">
        <div v-for="food in foods" class="col-12 col-sm-4 col-md-3">
            {{ food.name }}>
        </div>
    </div> -->
    <!-- <div v-for="food in store.foodsList.food">
        {{ food.name }}
    </div> -->
</template>

<script>
import axios from 'axios'
import { store } from "../../store.js"
import FoodCard from '../components/FoodCard.vue'
export default {
    name: 'RestaurantsShow',
    components: {
        FoodCard
    },
    data() {
        return {
            store,
            restaurants: [],
            count: 0
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
            alert('Ordine aggiunto al carrello!');
            console.log('ordine aggiunto!');
            console.log('order', this.store.order);
        },
        increment() {
            this.count++;
        },
        decrement() {
            if (this.count > 0) {
                this.count--;
            }
        }
    }
};
</script>

<template>
    <section class="container">
        <h2 class="text-center mb-4">Cosa ti portiamo oggi?</h2>
        <!-- <h5 class="card-title">{{ restaurant.name }}</h5> -->
        <div class="row">
            <div v-for="food in store.foodsList.food" class="card-container col-4 mb-4 card ms-4 p-0 shadow rounded-end"
                style="width: 18rem;">
                <a>
                    <img :src="food.img" class="card-img-top" alt="...">
                </a>
                <a :href="'#food-' + food.id" data-bs-toggle="modal" class="overlay">
                    <span><i class="fa-solid fa-magnifying-glass-plus fa-lg overlay-search"></i></span>
                </a>

                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title">{{ food.name }}</h5>
                        <div>
                            <span v-if="food.vegetarian"> <i class="fa-solid fa-leaf type text-success"></i></span>
                            <span class="ms-1" v-if="food.vegan"><i class="text-warning fa-solid fa-wheat-awn gluten"></i>
                            </span>
                        </div>
                    </div>
                    <p class="small text-secondary text-end"><strong>Prezzo:</strong> {{ food.price }}€</p>

                <div class="button">
                    <!-- <a :href="'#food-' + food.id" class="btn btn-primary" data-bs-toggle="modal">Dettagli</a> -->

                    <!-- con questo pulsante, usiamo il metodo che prende come argomento il singolo piatto e tutti i suoi dati -->
                    <button class="btn btn-warning w-100" @click="dataStorage(food)">Aggiungi al carrello</button>
                    <div class="input-group pt-1 d-flex justify-content-center">
                        <span class="input-group-btn">
                                <button type="button" class="quantity-left-minus btn btn-number" v-on:click="decrement()"
                                    data-type="minus" data-field="">
                                    <span class=""><i class="fa-solid fa-circle-minus"></i></span>
                                </button>

                                <span class="w-50">{{ count }}</span>
                                <button type="button" class="quantity-right-plus btn btn-number" v-on:click="increment()"
                                    data-type="plus" data-field="">
                                    <span class=""><i class="fa-solid fa-circle-plus"></i></span>
                                </button>
                            </span>
                        </div>

                    </div>

                </div>

                <!-- Modal -->
                <div v-for="food in store.foodsList.food" class="modal fade" :id="'food-' + food.id" tabindex="-1"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
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

                                <!-- <span><strong>Vegano:</strong> {{ food.vegan }}</span> -->

                                <div v-if="food.vegetarian">
                                    <i class="fa-solid fa-leaf type text-success"></i> Il piatto è
                                    vegetariano
                                </div>
                                <div v-if="food.vegan"><i class="text-warning fa-solid fa-wheat-awn gluten"></i>
                                    Il piatto è vegano
                                </div>
                                <!-- <span v-else class="text-white">Nessuna opzione veg</span> -->
                                <!-- <span><strong>Vegetariano:</strong> {{ food.vegetarian }}</span> -->

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <div v-for="food in store.foodsList.food">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                {{ food.name }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div> -->
</template>

<style lang="scss" scoped>
.card-container {
    min-height: 450px;

    .card-title {
        font-size: 1.1rem;
    }

    .overlay {
        z-index: 10;
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;


        &:hover {
            background-color: rgba(0, 0, 0, $alpha: 0.4);
            cursor: pointer;

            & .overlay-search {
                display: block;

            }

        }


        .overlay-search {
            display: none;
            font-size: 3rem;
            color: goldenrod;


        }
    }
}

.button {
    // min-height: 200px;
}

.input-number {
    border: 0;
}

a {
    min-height: 60%;
    max-height: 60%;
}

img {
    height: 100%;
    object-fit: cover;
}
</style>

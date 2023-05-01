<script>
import axios from 'axios';
import { store } from "../../store.js"
import FoodCard from '../components/FoodCard.vue';
export default {
    name: 'RestaurantsShow',
    components: {
        FoodCard
    },
    data() {
        return {
            store,
            restaurants: [],
            doubles: []
            // currentPage: 1,
            // lastPage: 1
        };
    },
    mounted() {
        this.getFoods(store.selectedRestaurant);

        // cerca se esiste un valore salvato nel localStorage per store.plateCount
        let savedCounter = JSON.parse(localStorage.getItem('counter'));
        if (savedCounter && typeof savedCounter === 'object') {
            store.plateCount = savedCounter;
        } else {
            store.plateCount = {};
        }
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
            // Parte contatore---------------------------------------------------------------------
            let target = 'food-' + item.id; //creiamo una chiave da assegnare al contatore che abbia in se l'id del piatto

            let checkCounter = JSON.parse(localStorage.getItem('counter'));
            console.log('checkCounter', checkCounter);
            if (checkCounter && Array.isArray(checkCounter)) { // controlla se l'array esiste
                checkCounter.forEach(singleCount => {
                    console.log('singleCount', singleCount);
                });
            }
            else {
                checkCounter = []; // se l'array non esite lo inizializza, vuoto
            }
            if (target in this.store.plateCount == true) {
                this.store.plateCount[target]++; //se la chiave esiste già, verrà aumentato di 1 il suo valore
                localStorage.setItem('counter', JSON.stringify(this.store.plateCount));
            }
            else {
                this.store.plateCount[target] = 1; //se la chiave non esiste nell'oggetto, viene aggiunta con valore 1
                localStorage.setItem('counter', JSON.stringify(this.store.plateCount));
            }

            console.log('plateCount', this.store.plateCount);

            // Parte ordine---------------------------------------------------------------------
            this.store.order = []; //svuotiamo lo store
            let checkStorage = JSON.parse(localStorage.getItem('order')); //verifichiamo se il localstorage sia pieno o no

            if (checkStorage) {
                for (let i = 0; i < checkStorage.length; i++) {
                    this.store.order.push(checkStorage[i]); //se checkstorage ha del contenuto, lo pusha nello store
                }
                checkStorage = null; //resetta checkstorage
            }

            const itemId = item.id; //recupero l'id del piatto
            let flag = false; //setto una flag di controllo
            for (let i = 0; i < this.store.order.length; i++) {
                if (this.store.order[i].id == itemId) {
                    flag = true; //verifico se il piatto è già nell'array o meno
                }
            }

            if (flag == false) {
                this.store.order.push(item); //così pushiamo ogni piatto che ordiniamo nello store
                localStorage.setItem('order', JSON.stringify(this.store.order)); //il contenuto dello store viene salvato in localstorage
                console.log('order', this.store.order);
            }
            else {
                this.doubles.push(item); //pusho il piatto doppione in un altro array
                console.log('doubles', this.doubles);
            }

            this.store.totalPrice += parseFloat(item.price);
        },
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
                <a :href="'#food-' + food.id" data-bs-toggle="modal" class="overlay text-decoration-none">
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
                        <a class="food-buttons btn btn-warning w-100"  @click="dataStorage(food)"
                        href="#" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                            Il tuo carrello
                        </a>

                        <!-- <div class="input-group pt-1 d-flex justify-content-center">
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
                        </div> -->

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
    min-height: 380px;

    .card-title {
        font-size: 1.1rem;
    }
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
            text-decoration: none;

        }

    }


    .overlay-search {
        display: none;
        font-size: 3rem;
        color: #FF8400
    }
}

.btn {
    background-color: #FF8400;
    color: white;

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

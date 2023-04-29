<script>
import { store } from "../../store"
export default {
    name: "RestaurantCard",
    data() {
        return {
           store,
           index: 0
        };
    },
    props: ['restaurant'],
    methods: {
        onMenuClick(restaurantId) {
            store.selectedRestaurant = restaurantId;
            console.log("Ciao mamma", store.selectedRestaurant);
        }
    }
};
</script>
<template>
    <div class="card h-100 shadow restaurant-card">

        <div class="card-body position-relative px-0 pt-0 ">
            <!-- Immagine -->
            <a href="#">
                <img :src="restaurant.img" class="card-img-top mb-3" :alt="restaurant.name">
            </a>

            <!-- Nome -->
            <h4 class="card-title my-2 ms-4">
                {{ restaurant.name }}
            </h4>

            <!-- Indirizzo -->
            <div class="ps-4">
                <p>
                    <i class="fa-solid fa-location-dot icons"></i>
                    {{ restaurant.address }}
                </p>
            </div>

            <div class="card-footer bg-white w-100 mb-5" v-if="restaurant.types.length > 0">
                
                <!-- Tipologia -->
                <div>
                    <h6>Tipi di cucina:</h6>
                    <div class="typologies">
                        <ul class="ps-4">
                            <li v-for="Type in restaurant.types">
                                {{ Type.name }}
                            </li>
                            <!-- <span class="badge rounded-pill bg-warning text-dark">{{ Type.name }}</span> -->
                        </ul>
                    </div>

                </div>

            </div>

            <router-link :to="{ name: 'restaurants-show', }" @click="onMenuClick(restaurant.id)"
                class="button-menu btn btn-dark w-100 position-absolute bottom-0 start-50 translate-middle-x">
                Visita il nostro menù
            </router-link>
        </div>
        
        <router-link v-if="this.store.order.length == 0" :to="{ name: 'restaurants-show',  }" @click="onMenuClick(restaurant.id)" class="btn btn-primary">
            Menù
        </router-link>
        <router-link v-else-if="this.store.order[0].restaurant_id == restaurant.id || this.store.order == null" :to="{ name: 'restaurants-show',  }" @click="onMenuClick(restaurant.id)" class="btn btn-primary">
            Menù
        </router-link>
        <p v-else>Puoi ordinare da un solo ristorante alla volta! Svuota il carrello per ordinare da {{ restaurant.name }}.</p>
    </div>
</template>

<style lang="scss" scoped>
.restaurant-card{
    border-radius: 0 30px !important;
    background-color: white;
    position: relative;

    .card-body{
        img{
            min-height: 50%;
            max-height: 50%;
            object-fit: cover;
            border-radius: 0 30px 0 30px !important;
        }

        .card-footer{
            border-radius: 0 30px 0 30px !important;
        }
    }

    .button-menu{
        border-radius: 0 30px !important;
        background-color: $main-orange !important;
        border:none !important;
    }
}
</style>
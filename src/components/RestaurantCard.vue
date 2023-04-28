<script>
import { store } from "../../store"
export default {
    name: "RestaurantCard",
    data() {
        return {

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
    <div class="card h-100 shadow rounded">

        <div class="card-body position-relative px-0 pt-0 ">
            <a href="">
                <img :src="restaurant.img" class="card-img-top" alt="...">
            </a>
            <h4 class="card-title text-center my-2">{{ restaurant.name }}</h4>
            <div class="card-footer bg-white w-100 mb-3" v-if="restaurant.types.length > 0">
                <h5>Tipi di cucina:</h5>
                <div class="typologies d-flex flex-wrap">
                    <ul class="mb-2 ps-4" v-for="Type in restaurant.types">
                        <li class="">{{ Type.name }}</li>
                        <!-- <span class="badge rounded-pill bg-warning text-dark">{{ Type.name }}</span> -->
                    </ul>
                </div>
            </div>

            <router-link :to="{ name: 'restaurants-show', }" @click="onMenuClick(restaurant.id)"
                class="btn btn-dark rounded-0 w-100 position-absolute bottom-0 start-50 translate-middle-x">
                Visita il nostro menù
            </router-link>
        </div>


    </div>
</template>

<style lang="scss" scoped>
img {
    min-height: 50%;
    max-height: 50%;
    object-fit: cover;
}
</style>
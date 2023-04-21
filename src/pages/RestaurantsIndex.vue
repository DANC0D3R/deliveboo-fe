<script>
import axios from 'axios';
import {store} from "../../store"
import RestaurantCard from '../components/RestaurantCard.vue'
export default {
    name: 'RestaurantsIndex',
    components: {
        RestaurantCard,
    },
    data() {
        return {
            restaurants: [],
            // currentPage: 1,
            // lastPage: 1
        };
    },
    created() {
        this.getRestaurants();
    },
    methods: {
        
        // changePage(page) {
        //     this.currentPage = page;
        //     this.getPosts();
        // },
        getRestaurants() {
            axios
                .get('http://127.0.0.1:8000/api/restaurants', {
                    // params: {
                    //     page: this.currentPage
                    // }
                })
                .then(response => {
                    console.log(response.data);
                    this.restaurants = response.data.restaurants.data;
                    // this.lastPage = response.data.posts.last_page;
                });
                console.log(this.getRestaurants)
        }
    }
};
</script>
<template>
    <div class="container">
        <div class="row g-3 mb-4">
            <div v-for="restaurant in restaurants" class="col-12 col-sm-4 col-md-3">
                <RestaurantCard :restaurant="restaurant" />
            </div>
        </div>
        
        {/* <!-- <div class="row">
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
        </div> --> */}
    </div>
</template>

<style scoped>
</style>
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
        } 
        }
    };
</script>
<template>
    
        <!-- <div class="row g-3 mb-4">
            <div v-for="food in foods" class="col-12 col-sm-4 col-md-3">
                {{ food.name }}>
            </div>
        </div> -->
        <div v-for="food in store.foodsList.food">
            {{ food.name }}
        </div>
</template>

<script>
import {store} from "../../store"
export default {
    name: "RestaurantCard",
    data() {
        return {
           
        };
    },
    props:['restaurant'],
    methods:{
        onMenuClick(restaurantId){
            store.selectedRestaurant = restaurantId;
            console.log("Ciao mamma", store.selectedRestaurant);
        }
    }
};
</script>
<template>
    <div class="card h-100">
    
    <div class="card-body">
        <h3 class="card-title">{{restaurant.name}}</h3>
        <div class="card-footer text-body-secondary" v-if="restaurant.types.length > 0">
            <h4>Tipologia :</h4>
            <h6 class="" v-for="Type in restaurant.types">
                {{ Type.name }}
            </h6>
        </div>
        
        <router-link :to="{ name: 'restaurants-show',  }" @click="onMenuClick(restaurant.id)" class="btn btn-primary">
            Menù
        </router-link>
    </div>
    
    
</div>
</template>
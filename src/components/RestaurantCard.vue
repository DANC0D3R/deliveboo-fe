<script>
import {store} from "../../store"
export default {
    name: "RestaurantCard",
    data() {
        return {
           store,
           index: 0
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
        
        <router-link v-if="this.store.order.length == 0" :to="{ name: 'restaurants-show',  }" @click="onMenuClick(restaurant.id)" class="btn btn-primary">
            Menù
        </router-link>
        <router-link v-else-if="this.store.order[0].restaurant_id == restaurant.id || this.store.order == null" :to="{ name: 'restaurants-show',  }" @click="onMenuClick(restaurant.id)" class="btn btn-primary">
            Menù
        </router-link>
        <p v-else>Puoi ordinare da un solo ristorante alla volta! Svuota il carrello per ordinare da {{ restaurant.name }}.</p>
    </div>
    
    
</div>
</template>
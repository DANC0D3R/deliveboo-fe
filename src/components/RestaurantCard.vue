<script>
export default {
    name: "RestaurantCard",
    data() {
        return {
           
        };
    },
    props:['restaurant'],
    
};
</script>
<template>
    <div class="card h-100">
    
    <div class="card-body">
        <h5 class="card-title">{{restaurant.name}}</h5>
        <h6>
            <i class="fa-solid fa-tag"></i> {{restaurant.types ? restaurant.types.name : 'Nessuna categoria' }}
        </h6>
        
        <!-- <router-link :to="{ name: 'restaurants-show', params: { slug: post.slug } }" class="btn btn-primary">
            Leggi tutto
        </router-link> -->
    </div>
    <div class="card-footer text-body-secondary" v-if="restaurant.foods.length > 0">
        <span class="badge text-bg-primary me-1" v-for="food in restaurant.foods">
            {{ food.name }}
        </span>
    </div>
    
</div>
</template>
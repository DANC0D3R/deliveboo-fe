<script>
    export default {
        name: "FoodCard",
        data() {
            return {
            
            };
        },
        props:['food'],
        
    };
</script>
<template>
    <div class="card-footer text-body-secondary" v-if="foods.length==foods.restaurant_id">
        <span class="badge text-bg-primary me-1" v-for="food in foods">
            {{ food.name }}
        </span>
    </div>
</template>
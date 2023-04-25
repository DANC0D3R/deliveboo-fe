<script>
export default {
    name: 'CartTest',
    data() {
        return {
            orderCart: []
        }
    },
    methods: {
        viewData() {
            const oneOrder = JSON.parse(localStorage.getItem('order')); //recuperiamo i dati dal localstorage e li salviamo in una variabile
            this.orderCart.push(oneOrder); //la variabile con i dati al suo interno viene pushata nell'array' orderCart
            console.log('orderCart', this.orderCart);
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 text-center">
                Cart
            </div>

            <button class="btn btn-primary col-4" v-on:click="viewData()">Processa ordine</button>

            <!-- per ogni oggetto presente nell'array orderCart, ne stampiamo una lista di dati -->
            <ul v-for="singleOrder in orderCart" class="col-12 text-center">
                <li>{{ singleOrder.name }}</li>

                <li>{{ singleOrder.price }}</li>

                <li>{{ singleOrder.description }}</li>
            </ul>
       
        </div>
    </div>
</template>

<style scoped>
</style>
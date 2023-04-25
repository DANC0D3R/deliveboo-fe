<script>
import {store} from "../../store.js"
export default {
    name: 'CartTest',
    data() {
        return {
            store,
            orderCart: []
        }
    },
    methods: {
        viewData() {
            localStorage.setItem('order', JSON.stringify(this.store.order)); //il contenuto dello store viene salvato in localstorage
            const oneOrder = JSON.parse(localStorage.getItem('order')); //recuperiamo i dati dal localstorage e li salviamo in una variabile, che diventerà un'array
            console.log('oneOrder', oneOrder);
            for (let i = 0; i < oneOrder.length; i++) { 
                this.orderCart.push(oneOrder[i]); //ogni indice dell'array con i dati al suo interno viene pushato nell'array' orderCart
            }
            console.log('orderCart', this.orderCart);
        },
        deleteData() {
            localStorage.clear(); //questo svuota localstorage
            this.orderCart = []; //questo svuota l'array in data
            this.store.order = []; //questo svuota lo store
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

            <button class="btn btn-primary col-3" v-on:click="viewData()">Processa ordine</button>

            <button class="btn btn-danger col-3" v-on:click="deleteData()">Cancella ordine</button>

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
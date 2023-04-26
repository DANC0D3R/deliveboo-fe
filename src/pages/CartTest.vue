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
        refreshData() {
            let refreshStorage = JSON.parse(localStorage.getItem('order')); //riprende i dati del localstorage
            console.log('refreshstorange', refreshStorage);
            if (refreshStorage) {
                for (let i = 0; i < refreshStorage.length; i++) {
                    this.store.order.push(refreshStorage[i]); //se refresh storage ha del contenuto, lo pusha nello store
                }
                refreshStorage = null; //resetta refreshstorage
            }
            console.log('order', this.store.order);
        },
        deleteData() {
            localStorage.clear(); //questo svuota localstorage
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

            <!-- se lo store si svuota per un refresh o altro, questo pulsante compare e permette di ripristinare lo store -->
            <button v-if="store.order.length == 0" class="btn btn-primary col-3" v-on:click="refreshData()">Processa ordine</button>

            <!-- questo pulsante svuota il localstorage -->
            <button class="btn btn-danger col-3" v-on:click="deleteData()">Cancella ordine</button>

            <!-- per ogni oggetto presente nell'array orderCart, ne stampiamo una lista di dati -->
            <ul v-for="singleOrder in store.order" class="col-12 text-center">
                <li>{{ singleOrder.name }}</li>

                <li>{{ singleOrder.price }}</li>

                <li>{{ singleOrder.description }}</li>
            </ul>
       
        </div>
    </div>
</template>

<style scoped>
</style>
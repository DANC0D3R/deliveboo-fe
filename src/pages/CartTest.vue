<script>
import {store} from "../../store.js"
export default {
    name: 'CartTest',
    data() {
        return {
            store,
            orderCart: [],
            totalPrice: 0
        }
    },
    methods: {
        refreshData() {
            this.store.order = []; //svuotiamo l'array per evitare raddoppi
            let refreshStorage = JSON.parse(localStorage.getItem('order')); //riprende i dati del localstorage
            console.log('refreshstorange', refreshStorage);
            if (refreshStorage) {
                this.totalPrice = 0; //azzera il prezzo totale
                for (let i = 0; i < refreshStorage.length; i++) {
                    this.store.order.push(refreshStorage[i]); //se refresh storage ha del contenuto, lo pusha nello store
                    
                    //una volta aggiunto come componente al restaurantshow, assicurarsi che il calcolo funzioni, altrimenti fare funzione a parte
                    this.totalPrice += parseFloat(refreshStorage[i].price * store.plateCount['food-' + refreshStorage[i].id]); //aggiorna il prezzo totale con il prezzo di ogni ordine
                }
                refreshStorage = null; //resetta refreshstorage
            }
            console.log('order', this.store.order);
        },
        deleteSingleOrder(item) {
            const targetIndex = this.store.order.indexOf(item); //troviamo l'index del singolo piatto
            this.totalPrice -= parseFloat(item.price); //sottraiamo il prezzo del piatto eliminato dal prezzo totale
            this.store.order.splice(targetIndex, 1); //togliamo quel piatto dall'array
            console.log('newArray', this.store.order);
            localStorage.setItem('order', JSON.stringify(this.store.order)); //sovrascriviamo il localstorage
        },
        deleteData() {
            localStorage.clear(); //questo svuota localstorage
            this.store.order = []; //questo svuota lo store
        },
        increaseQuantity(index) {
            this.store.plateCount['food-' + index] ++;
            console.log('plateCount+', this.store.plateCount['food-' + index]);
            this.refreshData();
        },
        decreaseQuantity(item) {
            this.store.plateCount['food-' + item.id] --;
            console.log('plateCount-', this.store.plateCount['food-' + item.id]);
            
            if(this.store.plateCount['food-' + item.id] == 0) {
                this.deleteSingleOrder(item);
            }
            else {
                this.refreshData();
            }
        }
    },
    mounted() {
        this.refreshData();
    }
};
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 text-center">
                Cart
            </div>

            <!-- questo pulsante svuota il localstorage -->
            <button class="btn btn-danger col-3" v-on:click="deleteData()">Cancella ordine</button>

            <!-- per ogni oggetto presente nell'array orderCart, ne stampiamo una lista di dati -->
            <ul v-for="singleOrder in store.order" class="col-12 text-center">
                <li>{{ singleOrder.name }}</li>

                <li>{{ singleOrder.price }}</li>

                <li>{{ singleOrder.description }}</li>

                <p>Quantità: {{ store.plateCount['food-' + singleOrder.id] }}</p>

                <button class="btn btn-warning" v-on:click="decreaseQuantity(singleOrder)">-</button>
                
                <button class="btn btn-danger mx-2" v-on:click="deleteSingleOrder(singleOrder)">Elimina piatto</button>
                
                <button class="btn btn-success" v-on:click="increaseQuantity(singleOrder.id)">+</button>
            </ul>
       
        </div>
        <div>Prezzo totale {{ totalPrice }} €</div>
    </div>
</template>

<style scoped>
</style>
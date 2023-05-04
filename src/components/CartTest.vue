<script>
import axios from 'axios';
import {store} from "../../store.js"
export default {
    name: 'CartTest',
    data() {
        return {
            store,
            orderCart: [],
            // totalPrice: 0,
            // restaurantId: store.order[0].restaurant_id,
            restaurantId: ''
        }
    },
    methods: {
        refreshData() {
            this.store.order = []; //svuotiamo l'array per evitare raddoppi
            this.store.plateCount = {};
            let refreshStorage = JSON.parse(localStorage.getItem('order')); //riprende i dati del localstorage
            let refreshCounter = JSON.parse(localStorage.getItem('counter'));

            if (refreshCounter) {
                this.store.plateCount = {...refreshCounter};
                localStorage.setItem('counter', JSON.stringify(this.store.plateCount));
                
                refreshCounter = null;
            }

            if (refreshStorage) {
                this.store.totalPrice = 0; //azzera il prezzo totale
                for (let i = 0; i < refreshStorage.length; i++) {
                    this.store.order.push(refreshStorage[i]); //se refresh storage ha del contenuto, lo pusha nello store
                    
                    //una volta aggiunto come componente al restaurantshow, assicurarsi che il calcolo funzioni, altrimenti fare funzione a parte
                    this.store.totalPrice += parseFloat(refreshStorage[i].price * store.plateCount['food-' + refreshStorage[i].id]); //aggiorna il prezzo totale con il prezzo di ogni ordine
                }
                refreshStorage = null; //resetta refreshstorage
            }
        },
        deleteSingleOrder(item) {
            const targetIndex = this.store.order.indexOf(item); //troviamo l'index del singolo piatto
            this.store.totalPrice -= parseFloat(item.price* this.store.plateCount['food-' + item.id]); //sottraiamo il prezzo del piatto eliminato dal prezzo totale
            this.store.order.splice(targetIndex, 1); //togliamo quel piatto dall'array
            localStorage.setItem('order', JSON.stringify(this.store.order)); //sovrascriviamo il localstorage
        },
        increaseQuantity(item) {
            this.store.plateCount['food-' + item.id] ++; //aumenta di 1 il contatore del piatto
            this.store.totalPrice += parseFloat(item.price); //aumenta il prezzo totale
            localStorage.setItem('counter', JSON.stringify(this.store.plateCount));
            this.refreshData();
        },
        decreaseQuantity(item) {
            this.store.plateCount['food-' + item.id] --; //decrementa di 1 il contatore del piatto
            localStorage.setItem('counter', JSON.stringify(this.store.plateCount));
            
            if(this.store.plateCount['food-' + item.id] == 0) {
                this.deleteSingleOrder(item); //se il contatore del piatto raggiunge 0, si cancella il piatto
            }
            else {
                this.refreshData();
            }
        },
        deleteData() {
            localStorage.clear(); //questo svuota localstorage
            this.store.order = []; //questo svuota lo store
            this.store.plateCount = {};
            this.store.totalPrice = 0;
        },
    },
    mounted() {
        this.refreshData();
    }
};
</script>

<template>
    <div class="container">
        <div v-if="store.totalPrice > 0" class="row justify-content-center">
            <div class="col-12 mb-3">
                <h4>
                    Il tuo ordine
                </h4>
            </div>

            <!-- per ogni oggetto presente nell'array orderCart, ne stampiamo una lista di dati -->
            <div v-for="singleOrder in store.order" class="col-12 mb-4 single-order py-4">
                <p> 
                    <span>Prodotto: </span>
                    <strong>{{ singleOrder.name }}</strong> 
                </p>

                <p>
                    <span>Prezzo singolo piatto: </span>
                    <strong>{{ singleOrder.price }}€</strong>
                </p>


                <!-- Bottoni -->
                <div class="row button-container">
                    <div class="d-flex col-6 align-items-center">
                        <button class="btn increase-decrease" v-on:click="decreaseQuantity(singleOrder)">-</button>
                        <span class="mx-2">
                            {{ store.plateCount['food-' + singleOrder.id] }}
                        </span>
                        <button class="btn increase-decrease" v-on:click="increaseQuantity(singleOrder)">+</button>
                    </div>
                    
                    <div class="col-6 text-end">
                        <button class="btn btn-danger mx-2" v-on:click="deleteSingleOrder(singleOrder)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            
            </div>

            <div class="single-order py-4 col-12 d-flex justify-content-between">
                <span>Totale Ordine:</span>
                <span> <strong>
                    {{ store.totalPrice.toFixed(2) }}€
                </strong></span>     
            </div>

            <div>
                <!-- Pulsante che reinderizza al check-out -->
                <router-link :to="{ name: 'checkout' }" class="btn btn-success col-12 mt-4">
                    Vai al cheockout
                </router-link>

                <!-- questo pulsante svuota il localstorage -->
                <p class="mt-5 delete-text">
                    Non sei soddisfatto? Vuoi ordinare da un altro ristorante? <br>
                    Cancella l'ordine attuale ed effettuane un altro!
                </p>
                <button class="btn btn-danger col-12 mb-4" v-on:click="deleteData()">
                    Cancella ordine
                </button>
            </div>
        </div>

        <div v-else>
            <h4>Aggungi piatti per visualizzare il tuo ordine</h4>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h4{
    font-weight: 600;
}
.single-order{
    background-color: #EFEDEA;

    .button-container{
        .increase-decrease{
            color: white;
            background-color: $main-orange;
        }

        span{
            font-weight: 600;
        }

    }
}

.delete-text{
    font-size: 0.8rem;
}
</style>
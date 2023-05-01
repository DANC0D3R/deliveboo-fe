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
            restaurantId: '',

            client_name: '',
            client_surname: '',
            client_address: '',
            client_phone: '',
            client_email: '',
            notes: '',
        }
    },
    methods: {
        createOrder() {
            this.restaurantId = this.store.order[0].restaurant_id;

            // Il primo argomento della chiamata axios è l'url al quale dovranno essere inviati i dati con metodo post, completo di rotta api/orders (vedi api.php in back end).
            axios.post('http://127.0.0.1:8000/api/orders', {
                // Il secondo argomento è un oggetto che contiene dei rapporti chiave/valore dove i valori sono gli stessi che salviamo in data, presi dagli input.
                restaurant_id: this.restaurantId,
                total_price: this.totalPrice,
                client_name: this.client_name,
                client_surname: this.client_surname,
                client_address: this.client_address,
                client_phone: this.client_phone,
                client_email: this.client_email,
                notes: this.notes
            })
            .then(response => {
                console.log(response); //Con questo console.log visualiziamo in console il messaggio di avvenuto salvataggio nel database.
            }); //Dopo il .then potremmo anche aggiungere un .catch per gli aventuali errori.

            this.deleteData();
            
            alert('ordine inviato');
        },
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
            this.store.totalPrice -= parseFloat(item.price); //sottraiamo il prezzo del piatto eliminato dal prezzo totale
            this.store.order.splice(targetIndex, 1); //togliamo quel piatto dall'array
            localStorage.setItem('order', JSON.stringify(this.store.order)); //sovrascriviamo il localstorage
        },
        deleteData() {
            localStorage.clear(); //questo svuota localstorage
            this.store.order = []; //questo svuota lo store
            this.store.plateCount = {};
            this.store.totalPrice = 0;
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
            <div class="col-12 mb-3">
                <h4>
                    Il tuo ordine
                </h4>
            </div>

            <!-- per ogni oggetto presente nell'array orderCart, ne stampiamo una lista di dati -->
            <div v-for="singleOrder in store.order" class="col-12 mb-4 single-order py-4">
                <p> 
                    <strong>Prodotto:</strong>
                    {{ singleOrder.name }}
                </p>

                <p>
                    <strong>Prezzo:</strong>
                    {{ singleOrder.price }} €
                </p>


                <div class="d-flex">
                    <div class="d-flex">
                        <button class="btn btn-warning" v-on:click="decreaseQuantity(singleOrder)">-</button>
                        <p>{{ store.plateCount['food-' + singleOrder.id] }}</p>
                        <button class="btn btn-success" v-on:click="increaseQuantity(singleOrder)">+</button>
                    </div>
                    
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-danger mx-2" v-on:click="deleteSingleOrder(singleOrder)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            
            </div>
       
        </div>
        <div>Prezzo totale {{ store.totalPrice }} €</div>

        <!-- questo pulsante svuota il localstorage -->
        <button class="btn btn-danger col-3" v-on:click="deleteData()">Cancella ordine</button>


        <h2>Invio ordine</h2>

        <form action="./api/orders" method="POST" @submit.prevent="createOrder()">

            <input
            v-model="client_name" type="text" name="client_name" placeholder="Scrivi il tuo nome">

            <input v-model="client_surname" type="text" name="client_surname" placeholder="Scrivi il tuo cognome">

            <input v-model="client_address" type="text" name="client_address" placeholder="Scrivi il tuo indirizzo">

            <input v-model="client_phone" type="text" name="client_phone" placeholder="Scrivi il tuo numero di telefono">

            <input v-model="client_email" type="text" name="client_email" placeholder="Scrivi il tuo indirizzo email">

            <textarea v-model="notes" name="notes" id="notes" cols="30" rows="10"></textarea>

            <input type="submit" class="btn btn-success">
        </form>
    </div>
</template>

<style scoped>
h4{
    font-weight: 600;
}
.single-order{
    background-color: #EFEDEA;
}
</style>
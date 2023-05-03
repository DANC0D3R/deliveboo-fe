<script>
import {store} from "../../store.js";
import axios from 'axios';

import Riepilogo from "../components/Riepilogo.vue";

export default {
    name: 'CheckOut',
    components: {
        Riepilogo,
    },
    data() {
        return {
            store,
            orderCart: [],
            // totalPrice: 0,
            // restaurantId: store.order[0].restaurant_id,
            restaurantId: '',

            //Form client
            client_name: '',
            client_surname: '',
            client_address: '',
            client_phone: '',
            client_email: '',
            notes: '',
            food_content: [],
            counter: [],

            //Form pagamento
            numero_carta : '',
            titolare_carta : '',
            data_scadenza : '',
            cvc : '',

        };
    },
    methods: {
        createOrder() {
            this.restaurantId = this.store.order[0].restaurant_id;
            for(let i = 0; i < this.store.order.length; i++) {
                this.food_content.push(this.store.order[i].id);
            }
            let foodString = this.food_content.toString();

            // Il primo argomento della chiamata axios è l'url al quale dovranno essere inviati i dati con metodo post, completo di rotta api/orders (vedi api.php in back end).
            axios.post('http://127.0.0.1:8000/api/orders', {
                // Il secondo argomento è un oggetto che contiene dei rapporti chiave/valore dove i valori sono gli stessi che salviamo in data, presi dagli input.
                restaurant_id: this.restaurantId,
                total_price: this.store.totalPrice,
                client_name: this.client_name,
                client_surname: this.client_surname,
                client_address: this.client_address,
                client_phone: this.client_phone,
                client_email: this.client_email,
                notes: this.notes,
                foods: foodString,
                quantity: this.store.plateCount
            })
            .then(response => {
                console.log(response); //Con questo console.log visualiziamo in console il messaggio di avvenuto salvataggio nel database.
            }); //Dopo il .then potremmo anche aggiungere un .catch per gli aventuali errori.

            this.deleteData();
            this.deleteForm();
            this.deleteFormPayment();

            //alert('ordine inviato');
        },
        deleteFormPayment() {
            this.numero_carta = '';
            this.titolare_carta = '';
            this.data_scadenza = '';
            this.cvc = '';
        },
        deleteForm() {
            this.client_name = '';
            this.client_surname = '';
            this.client_address = '';
            this.client_phone = '';
            this.client_email = '';
            this.notes = '';
        },
        deleteData() {
            localStorage.clear(); //questo svuota localstorage
            this.store.order = []; //questo svuota lo store
            this.store.plateCount = {};
            this.store.totalPrice = 0;
        }
    }
};

</script>

<template>

    <div class="container">

        <div class="row py-5">

            <!-- Riepilogo ordine -->
            <Riepilogo />

            <div class="col-9 mb-3">
                <h4>
                    Check out
                </h4>
                    <form action="./api/orders" method="POST" @submit.prevent="createOrder()">

                    <!-- Nome -->
                    <div class="mb-3">
                        <label for="client_name" class="form-label">Nome <strong>*</strong></label>
                        <input v-model="client_name"
                        name="client_name" 
                        id="client_name"
                        type="text" 
                        class="form-control"
                        placeholder="Inserisci il tuo nome..."
                        required>
                    </div>

                    <!-- Cognome -->
                    <div class="mb-3">
                        <label for="client_surname" class="form-label">Cognome <strong>*</strong></label>
                        <input v-model="client_surname"
                        name="client_surname" 
                        id="client_surname"
                        type="text" 
                        class="form-control"
                        placeholder="Inserisci il tuo cognome..."
                        required>
                    </div>

                    <!-- Indirizzo -->
                    <div class="mb-3">
                        <label for="client_address" class="form-label">Indirizzo <strong>*</strong></label>
                        <input v-model="client_address"
                        name="client_address" 
                        id="client_address"
                        type="text" 
                        class="form-control"
                        placeholder="Inserisci il tuo indirizzo..."
                        required>
                    </div>

                    <!-- Telefono -->
                    <div class="mb-3">
                        <label for="client_phone" class="form-label">Numero di telefono <strong>*</strong></label>
                        <input v-model="client_phone"
                        name="client_phone" 
                        id="client_phone"
                        type="text" 
                        class="form-control"
                        placeholder="Inserisci il tuo numero di telefono..."
                        required>
                    </div>

                    <!-- Email -->
                    <div class="mb-3">
                        <label for="client_email" class="form-label">Email <strong>*</strong></label>
                        <input v-model="client_email"
                        name="client_email" 
                        id="client_email"
                        type="email" 
                        class="form-control"
                        placeholder="Inserisci la tua email..."
                        required>
                    </div>

                    <!-- Note -->
                    <div class="mb-3">
                        <label for="notes" class="form-label">Note</label>
                        <textarea 
                        v-model="notes" 
                        name="notes" 
                        id="notes" 
                        cols="30" 
                        rows="10"
                        class="form-control"
                        placeholder="Note"></textarea>
                    </div>

                    <p> Tutti i campi contrassegnati con <strong>*</strong> sono <strong>obbligatori</strong> </p>

                    <!-- <button type="submit" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Invia ordine e procedi al pagamento
                    </button> -->

                    <router-link :to="{ name: 'payment' }" type="submit" class="btn btn-success" @click="createOrder()">
                        <span>Procedi al pagamento e invia ordine</span>
                    </router-link>

                </form>
                
            </div>
        </div>

    </div>

</template>

<style lang="scss" scoped>
form{
    p{
       font-size: 0.8rem; 
    }
}
</style>
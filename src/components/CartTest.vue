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
            // food_content: [],
        }
    },
    methods: {
        createOrder() {
            this.restaurantId = this.store.order[0].restaurant_id;
            // for(let i = 0; i < this.store.order.length; i++) {
            //     this.food_content.push(this.store.order[i]);
            // }

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
                // foods: this.food_content,
            })
            .then(response => {
                console.log(response); //Con questo console.log visualiziamo in console il messaggio di avvenuto salvataggio nel database.
            }); //Dopo il .then potremmo anche aggiungere un .catch per gli aventuali errori.

            this.deleteData();
            this.deleteForm();

            alert('ordine inviato');
        },
        deleteForm() {
            this.client_name = '';
            this.client_surname = '';
            this.client_address = '';
            this.client_phone = '';
            this.client_email = '';
            this.notes = '';
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
                    <span>Prodotto: </span>
                    <strong>{{ singleOrder.name }}</strong> 
                </p>

                <p>
                    <span>Prezzo: </span>
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

            <!-- questo pulsante svuota il localstorage -->
            <button class="btn btn-danger col-12 mt-4" v-on:click="deleteData()">
                Cancella ordine
            </button>
        
        </div>

        <hr class="my-5">

        <div class="row justify-content-center">
            <div class="col-12 mb-3">
                <h4>
                    Check out
                </h4>
            </div>

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

                <button type="submit" class="btn btn-success">
                    Invia ordine e procedi al pagamento
                </button>
            </form>
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

form{
    p{
        font-size:0.8rem;
    }
}
</style>
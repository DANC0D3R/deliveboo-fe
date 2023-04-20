<script>
import axios from 'axios';
export default {
    name: 'TestOrders',
    data() {
        return {
            // In queste variabili vengono salvati i dati raccolti dagli input, che poi spediremo al back end con axios.
            // è importante che abbiano gli stessi nomi delle colonne del database, perchè dopo ci serviranno per fare le validazioni.
            total_price: '',
            client_name: '',
            client_surname: '',
            client_address: '',
            client_phone: '',
            client_email: '',
            notes: ''
        }
    },
    methods: {
        createOrder() {
            // Il primo argomento della chiamata axios è l'url al quale dovranno essere inviati i dati con metodo post, completo di rotta api/orders (vedi api.php in back end).
            axios.post('http://127.0.0.1:8000/api/orders', {
                // Il secondo argomento è un oggetto che contiene dei rapporti chiave/valore dove i valori sono gli stessi che salviamo in data, presi dagli input.
                total_price: this.total_price,
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
        },
    }
}
</script>

<template>
    <h1>Form di test</h1>
    <!-- In action ho inserito il nome della rotta alla quale spedire i dati, ma non so se sia davvero necessaria, dobbiamo verificare. -->
    <form action="./api/orders" method="POST" @submit.prevent="createOrder()">
        <!-- Il v-model ci serve a prendere il valore inserito nell'input. Stavolta non usiamo il name, ma mettiamolo comunque. -->
        <!-- Il total_price per ora è solo un placeholder, poi dovremmo capire come fare per calcolarlo in base agli ordini fatti -->
        <input v-model="total_price" id="total_price" type="number" placeholder="Es: 9.99" name="price" step="0.01" min="0.00">

        <input v-model="client_name" type="text" name="client_name" placeholder="Scrivi il tuo nome">

        <input v-model="client_surname" type="text" name="client_surname" placeholder="Scrivi il tuo cognome">

        <input v-model="client_address" type="text" name="client_address" placeholder="Scrivi il tuo indirizzo">

        <input v-model="client_phone" type="text" name="client_phone" placeholder="Scrivi il tuo numero di telefono">

        <input v-model="client_email" type="text" name="client_email" placeholder="Scrivi il tuo indirizzo email">

        <textarea v-model="notes" name="notes" id="notes" cols="30" rows="10"></textarea>

        <input type="submit" class="btn btn-success">
    </form>
</template>

<style lang="scss" scoped>
</style>
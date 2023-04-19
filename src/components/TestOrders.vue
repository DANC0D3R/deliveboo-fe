<script>
import axios from 'axios';
export default {
    name: 'TestOrders',
    data() {
        return {
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
            axios.post('http://127.0.0.1:8000/api/orders', {
                total_price: this.total_price,
                client_name: this.client_name,
                client_surname: this.client_surname,
                client_address: this.client_address,
                client_phone: this.client_phone,
                client_email: this.client_email,
                notes: this.notes
            })
            .then(response => {
                console.log(response);

                
            });
        },
    }
}
</script>

<template>
    <h1>Form di test</h1>
    <form action="./api/orders" method="POST" @submit.prevent="createOrder()">
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
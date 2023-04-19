<script>
import axios from 'axios';
export default {
    name: 'TestOrders',
    data() {
        return {
        }
    },
    methods: {
        createOrder() {
            axios.post('http://127.0.0.1:8000/api/orders')
            .then(response => {
                console.log(response);

                
            });
        }
    }
}
</script>

<template>
    <h1>Form di test</h1>
    <form action="" method="POST" @submit.prevent="createOrder()">
        <input type="text" name="client_name" placeholder="Scrivi il tuo nome">

        <input type="text" name="client_surname" placeholder="Scrivi il tuo cognome">

        <input type="text" name="client_address" placeholder="Scrivi il tuo indirizzo">

        <input type="text" name="client_phone" placeholder="Scrivi il tuo numero di telefono">

        <input type="text" name="client_email" placeholder="Scrivi il tuo indirizzo email">

        <textarea name="notes" id="notes" cols="30" rows="10"></textarea>

        <input type="submit" class="btn btn-success">
    </form>
</template>

<style lang="scss" scoped>
</style>
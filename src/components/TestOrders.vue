<script>
export default {
    name: 'TestOrders',
    data() {
    return {
    }
  },
}
</script>

<template>
    <h1>Form di test</h1>
    <form action="">
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
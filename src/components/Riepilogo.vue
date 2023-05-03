<script>
import {store} from "../../store.js";
export default {
    name: "AppHeader",
    data() {
        return {
            store,
        };
    }
};
</script>

<template>

<div class="col-3 riepilogo-ordine p-5">
    <h3 class="mb-5"> <strong>Riepilogo ordine</strong></h3>

    <h5><strong>
        Lista prodotti:
    </strong></h5>

    <div v-for="singleOrder in store.order">
        <span>{{ store.plateCount['food-' + singleOrder.id] }} x</span> 
        {{ singleOrder.name }}
    </div>

    <hr class="my-5">

    <div class="d-flex justify-content-between">
        <h5>Totale ordine:</h5>
        <p> <strong>
            {{ store.totalPrice.toFixed(2) }}€
        </strong></p>
    </div>
</div>

</template>

<style lang="scss" scoped>
.riepilogo-ordine{
    background-color: #FFEAD2;
    border-radius:0 30px;

    span{
        color: rgb(177, 177, 177);
    }
}
</style>
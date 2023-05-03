<script>
import {store} from "../../store.js";
import Riepilogo from './Riepilogo.vue';

export default {
    name: "payment",
    data() {
        return {
            store,
        }
    },
    components: {
        Riepilogo

    },
    methods: {

    }
};
</script>

<template>

<div class="container">

    <div class="row py-5 justify-content-center">

        <div class="col-7">
            <div class="card shadow p-5">

                <div class="card-body">

                    <div class="d-flex justify-content-between">
                        <h4 class="mb-4">Paga con carta</h4>
                        
                        <div>
                            <img src="../img/mastercard-logo.png" alt="mastercard">
                            <img src="../img/visa-logo.png" alt="visa">
                        </div>
                    </div>

                <form>
                    <div class="mb-2">
                        <label for="numero-carta" class="form-label">
                            Numero carta *
                        </label>
                        <input type="text" class="form-control" id="numero-carta" minlength="13" maxlength="13" required>
                    </div>

                    <div class="mb-2">
                        <label for="titolare-carta" class="form-label">
                            Nome titolare carta *
                        </label>
                        <input type="text" class="form-control" id="titolare-carta" required>
                    </div>

                    <div class="mb-2">
                        <label for="data-scadenza" class="form-label">
                            Scadenza *
                        </label>
                        <input type="date" class="form-control" id="data-scadenza" required>
                    </div>

                    <div class="mb-2">
                        <label for="cvc" class="form-label">
                            CVC *
                        </label>
                        <input type="text" class="form-control" id="cvc" minlength="3" maxlength="3" required>
                    </div>

                    <p> Tutti i campi contrassegnati con <strong>*</strong> sono <strong>obbligatori</strong> </p>

                    <!-- <button type="submit" class="btn btn-success">Effettua pagamento</button> -->

                    <router-link :to="{ name: 'thankyou' }" type="submit" class="btn btn-success">
                        <span>Effettua pagamento</span>
                    </router-link>
                </form>
                </div>
            </div>
        </div>

    </div>


</div>

    



</template>

<style lang="scss" scoped>
img{
    height: 2rem;
    margin-left: 1rem;
}
</style>

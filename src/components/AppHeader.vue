<script>
import { store } from "../../store"
import CartTest from "./CartTest.vue"


export default {
    name: "AppHeader",
    data() {
        return {
            store,
        };
    },
    components: {
        CartTest,
    },
};
</script>

<template>

  <header class="menu shadow px-5 py-3">
        <div class="row d-flex justify-content-between align-items-center">

            <!-- Carrello -->
            <div class="col-md-4">

                <a href="#" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                    Il tuo carrello
                </a>

                <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                    
                    <!-- Titolo -->
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
                            Riepilogo carrello
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <!-- Contenuto carrello -->
                    <div class="offcanvas-body">
                        <CartTest />
                    </div>
                </div>

            </div>

            <!-- Logo -->
            <div class="col-md-4  d-flex justify-content-center align-items-center">
                <router-link :to="{ name: 'appmain' }" class="nav-link logo-link">
                    <i class="fa-solid fa-burger me-1"></i>
                    <span><strong>
                        Deliveboo
                    </strong></span>
                </router-link>
            </div>


            <!-- Accedi o Registrati -->
            <div class="col-md-4 text-end">
                <a href="http://127.0.0.1:8000/" class="me-2">
                    Sei un ristoratore? Accedi o Registrati
                </a>
            </div>
        
        </div>
  </header>

</template>

<style lang="scss" scoped>
.menu{
    background-color: white;
    height: 60px;
    position: fixed;
    width: 100%;
    top:0;left:0;
    z-index: 30;

    .logo-link:hover{
        text-decoration: none !important;
    }

}

</style>
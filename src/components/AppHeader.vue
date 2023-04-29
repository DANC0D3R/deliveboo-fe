<script>
export default {
    name: "AppHeader",
    data() {
        return {
        };
    }
};
</script>

<template>

  <header class="menu shadow px-5 py-3">
        <div class="row d-flex justify-content-between align-items-center">

            <!-- Carrello -->
            <div class="col-md-4">

                <a href="#" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                    Il tuo Carrello
                </a>

                <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    
                    <!-- Titolo -->
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
                            Riepilogo carrello
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <!-- Contenuto carrelo -->
                    <div class="offcanvas-body">
                        <p>
                            Contenuto del carrello
                        </p>
                    </div>
                </div>

            </div>

            <!-- Logo -->
            <div class="col-md-4  d-flex justify-content-center align-items-center">
                <router-link :to="{ name: 'Home' }" class="nav-link logo-link">
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
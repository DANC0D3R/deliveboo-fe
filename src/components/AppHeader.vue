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

            <div class="col-md-4">
                <a href="http://127.0.0.1:8000/" class="me-2">
                    Sei un ristoratore? Accedi o Registrati
                </a>
            </div>

            <div class="col-md-4  d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-burger me-2"></i>
                <span><strong>
                    Deliveroo
                </strong></span>
            </div>

            <div class="col-md-4 text-end">
                <a href="#">
                    Carrello
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

}

</style>
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
                <a href="#" class="me-2">
                    Accedi
                </a>
                <a href="#">
                    Registrati
                </a>
            </div>

            <div class="col-md-4  d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-burger me-2 logo"></i>
                <span><strong>
                    Deliveroo
                </strong></span>
            </div>

            <div class="col-md-4 text-end">
                <a href="#">
                    Contattaci
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

    .logo{
        font-family: Arial, Helvetica, sans-serif !important;
    }
}

</style>
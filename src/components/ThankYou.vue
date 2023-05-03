<script>

export default {
    name: "thankyou",
    data() {
        return {
        }
    },
    components: {

    },
    methods: {

    }
};
</script>

<template>

  <div class="container">
    <div class="row g-3 align-items-center">

        <div class="col-4 d-flex justify-content-between align-items-center img-container">
            <img src="../img/logo.png" alt="logo-success">
        </div>

        <div class="col-8">
            <!-- Thank You card -->
            <div class="card text-center">
                <div class="card-body p-5 shadow">

                    <i class="fa-solid fa-circle-check check mb-2"></i> <br>
                    <h3 class="card-title mb-5">
                        Ordine effettuato con successo!
                    </h3>

                    <p class="card-text mb-5">
                        Grazie per averci scelto e aver effettuato un ordine con noi, stiamo arrivando! 
                    </p>
                    
                    <router-link :to="{ name: 'appmain' }">
                        <span><strong>
                                Torna alla home
                        </strong></span>
                    </router-link>

                </div>
            </div>
        </div>
    </div>
  </div>


</template>

<style lang="scss" scoped>
.container{
    padding: 100px 0;

    .img-container img{
        width: 100%;
    }

    .check{
        color: rgb(3, 160, 3);
        font-size: 4rem;
        border: 5px solid greenyellow;
        border-radius: 50%
    }

    .card.title h3{
        font-weight: 600;
    }

    a{
        @include button-base;
    }
}
</style>

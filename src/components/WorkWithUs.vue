<script>
export default {
    name: 'WorkWithUs',
    components: {
    },
    data() {
        return {
        };
    },
    created() {
    },
    methods: {
    }
};
</script>

<template>
    <div class="container py-5">

        <h1 class="mb-5">Lavora con Deliveboo</h1>

        <div class="row g-4">

            <div class="col-lg-4 col-md-6">

                <div class="work-card shadow">
                    <img src="../img/rider.jpg" alt="rider">

                    <div class="text-container p-5">
                        <h2 class="mb-2">Rider</h2>
                        <p class="mb-5">
                            Diventa un rider: flessibilità, ottimi guadagni e un mondo di vantaggi per te.
                        </p>

                        <a href="#">
                            Diventa un rider
                        </a>
                    </div>
                </div>

            </div>

            <div class="col-lg-4 col-md-6">

                <div class="work-card shadow">
                    <img src="../img/restaurant-us.jpg" alt="restaurant-us">

                    <div class="text-container p-5">
                        <h2 class="mb-2">Ristoranti</h2>
                        <p class="mb-5">
                            Diventa partner di Deliveroo e raggiungi sempre più clienti.
                        </p>
                        <a href="#">
                            Diventa nostro partner
                        </a>
                    </div>
                </div>

            </div>

            <div class="col-lg-4 col-md-6">

                <div class="work-card shadow">
                    <img src="../img/work-with-us.jpg" alt="work-with-us">

                    <div class="text-container p-5">
                        <h2 class="mb-2">Lavora con noi</h2>
                        <p class="mb-5">
                            Il nostro obiettivo è trasformare il modo in cui le persone mangiano!
                        </p>

                        <a href="#">
                            Scopri di più
                        </a>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped>
h1,
h2 {
    font-weight: 600;
}

.work-card {
    height: 550px;
    border-radius: 0 30px;
    background-color: #FFEAD2;
    // box-shadow: 0px 0px 8px 1px #ffd9667c;

    img {
        width: 100%;
        min-height: 50%;
        max-height: 50%;
        object-fit: cover;
        border-radius: 0 30px 0 0;
    }

    .text-container a {
        @include button-base
    }

    .text-container a:hover {
        background-color: $main-yellow;
    }
}
</style>
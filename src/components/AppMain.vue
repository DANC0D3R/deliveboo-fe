<script>
import Jumbo from "./Jumbo.vue"
import BestFoods from "./BestFoods.vue"
import WorkWithUs from "./WorkWithUs.vue";

export default {
    name: "AppMain",
    data() {
        return {
            menuItems: [
                // {
                //     routeName: 'Home',
                //     label: 'Tutti i ristoranti'
                // },
                {
                    routeName: 'restaurants-index',
                    label: 'Cerca tra ristoranti della tua zona'
                },
                // {
                //     routeName: 'cart',
                //     label: 'Il tuo Carrello'
                // },
            ]
        }
    },
    components: {
        Jumbo,
        BestFoods,
        WorkWithUs
    },
    methods: {

    }
};
</script>

<template>
    <Jumbo />

    <!-- Navbar pagine -->
    <div class="container mb-5">
        <div class="row">
            <div class="col">
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid rounded shadow my-5 d-block background-container">

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="text-container text-center mb-5">
                            <div class="overlay rounded text-center">
                                <h2>Ordina dai tuoi ristoranti preferiti</h2>
                                <p>Trova i ristoranti nella tua zona e ordina online a domicilio, rimanendo comodamente sul
                                    divano di casa</p>
                            </div>
                        </div>

                        <div class="navbar-collapse button-container" id="navbarNav">
                            <ul class="navbar-nav d-flex w-100 justify-content-center menu-collegamenti">
                                <li class="nav-item bottoni-collegamenti shadow" v-for="menuItem in menuItems">
                                    <router-link :to="{ name: menuItem.routeName }" class="nav-link text-white">
                                        <i class="fa-solid fa-magnifying-glass"></i> {{ menuItem.label }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>

    <BestFoods />

    <WorkWithUs />
</template>

<style lang="scss" scoped>
main {
    margin-top: 60px;

    .button-container {

        .menu-collegamenti {

            .bottoni-collegamenti {
                background-color: $main-orange;
                font-size: 2rem;
                border-radius: 2rem;
                border: 10px solid white;
                padding: 0.3rem 1rem;
                margin: 0 2rem;
                font-weight: 600;
                color: white !important;
                position: absolute;
                top: 85%;
            }

            .bottoni-collegamenti:hover {
                background-color: $main-yellow;
            }

            .bottoni-collegamenti>a {
                text-decoration: none !important;
            }

        }

    }

    .background-container {
        padding: 120px;
        background-image: url('../img/restaurants-background.jpg');
        background-size: cover;
        background-position: center;
        position: relative;

        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);

            display: flex;
            flex-direction: column;
            justify-content: center;
            color: white;
        }
    }
}

@media screen and (max-width: 992px) {

    .bottoni-collegamenti {
        width: 60%;
        font-size: 1.3rem !important;
    }


}

@media screen and (max-width: 770px) {
    .bottoni-collegamenti {
        width: 60%;
        font-size: 0.9rem !important;
        margin-left: 0 !important;


    }
}

@media screen and (max-width: 500px) {
    .bottoni-collegamenti {
        width: 60%;
        font-size: 0.8rem !important;
        margin-left: 0 !important;
    }
}
</style>

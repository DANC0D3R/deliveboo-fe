<script>
import Jumbo from "./Jumbo.vue"

export default {
    name: "AppMain",
    data() {
        return {
            menuItems: [
                {
                    routeName: 'Home',
                    label: 'Tutti i ristoranti'
                },
                {
                    routeName: 'restaurants-index',
                    label: 'Scegli per Tipologia'
                },
                {
                    routeName: 'cart',
                    label: 'Il tuo Carrello'
                },
            ]
        }
    },
    components: {
        Jumbo,
    },
    methods: {

    }
};
</script>

<template>
  <main>

    <Jumbo />

    <!-- Navbar pagine -->
    <div class="container">
            <div class="row">
                <div class="col">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">

                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav d-flex w-100 justify-content-center menu-collegamenti">
                                    <li class="nav-item bottoni-collegamenti" v-for="menuItem in menuItems">
                                        <router-link :to="{ name: menuItem.routeName }" class="nav-link">
                                            {{ menuItem.label }}
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

        <!-- RISTORANTI -->
        <router-view>

        </router-view>
    </div>
  </main>
</template>

<style lang="scss" scoped>

main{
    margin-top:60px;

    .menu-collegamenti{
        margin: 4rem 0;

        .bottoni-collegamenti{
            background-color: $main-orange;
            border-radius: 2rem;
            padding: 0.3rem 1rem;
            margin: 0 2rem;
            font-weight: 600;
            color: white !important;
        }
        .bottoni-collegamenti:hover{
            background-color: $secondary-orange;
        }
    }
}


</style>

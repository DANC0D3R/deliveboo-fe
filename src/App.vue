<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';
import TestOrders from './components/TestOrders.vue';

export default {
    name: "App",
    data() {
        return {
        }
    },
    components: {
        AppHeader,
        AppMain,
        AppFooter,
        TestOrders
    },
    methods: {

    }
};
</script>

<template>
  <AppHeader />

  <div>

    <main>
        <router-view>

        </router-view>
    </main>
    
  </div>

  <AppFooter />


</template>

<style lang="scss" scoped>
main{
    margin-top:60px;
}
</style>

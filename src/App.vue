<script>
import AppHeader from './components/AppHeader.vue';
import TestOrders from './components/TestOrders.vue';

export default {
    name: "App",
    data() {
        return {
        }
    },
    components: {
        AppHeader,
        TestOrders
    },
    methods: {

    }
};
</script>

<template>
  <AppHeader />
  <TestOrders />
  <router-view></router-view>
</template>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

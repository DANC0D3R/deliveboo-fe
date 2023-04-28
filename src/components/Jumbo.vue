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

    <div class="back-jumbo">
        <div class="text-container">
            <h5>Grazie a Deliveboo</h5>
            <h1 class="mb-4">I tuoi piatti preferiti direttamente a casa tua!</h1>
            <h4>Con un semplice click ordina da dove vuoi, qualsiasi cosa desideri</h4>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.back-jumbo{
    background-image:url('../img/jumbo.png');
    background-size: 100%;
    height:600px;
    display: flex;
    align-items: center;

    .text-container{
        margin-left: 50%;
        padding: 0 6rem;

        h1{
            font-weight: 600;
        }
    }
}
</style>
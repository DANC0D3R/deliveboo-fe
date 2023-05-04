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
    <div class="row d-flex ">
        <div class="back-jumbo col-lg-12 col-sm-12">
            <div class="text-container ">
                <h5>Grazie a Deliveboo</h5>
                <h1 class="mb-4">I tuoi piatti preferiti direttamente a casa tua!</h1>
                <h4>Con un semplice click ordina da dove vuoi, qualsiasi cosa desideri</h4>
            </div>
        </div>
        <div class="text-container-alone d-none">
            <h5>Grazie a Deliveboo</h5>
            <h1 class="mb-4">I tuoi piatti preferiti direttamente a casa tua!</h1>
            <h4>Con un semplice click ordina da dove vuoi, qualsiasi cosa desideri</h4>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.back-jumbo {
    background-image: url('../img/jumbo.png');
    background-size: cover;
    height: 600px;
    display: flex;
    align-items: center;

    .text-container {
        margin-left: 60%;
        // padding: 0 6rem;

        &>* {
            width: 70%;
        }

        h1 {
            font-weight: 600;
        }
    }
}

@media screen and (max-width: 992px) {
    .back-jumbo {
        height: 400px;
    }

    .text-container>* {
        font-size: 1.3rem;

    }

    .text-container {
        h1 {
            font-size: 1.5rem;
        }
    }


}

@media screen and (max-width: 770px) {
    // .back-jumbo {
    //     display: block;
    // }

    .text-container {
        // padding-left: 50%;
        display: none;

    }

    .text-container-alone {
        display: block !important;
        padding: 50px;
        margin-top: -100px;
        padding-bottom: 0;
    }
}
</style>
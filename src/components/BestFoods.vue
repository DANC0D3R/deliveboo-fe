<script>
export default {
    name: 'BestFoods',
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

    <div class="background p-5">
        <div class="container">

            <h1 class="mb-4">I tuoi piatti preferiti consegnati da noi</h1>

            <div class="row g-3">

                <div class="col-5">
                    <div class="box">
                        <div class="overlay p-5 text-center">
                            <h3>Comfort food</h3>
                            <p>I grandi classici che scaldano il cuore, perfetti in ogni momento.</p>
                    
                        </div>
                    </div>
                </div>

                <div class="col-7">
                    <div class="box">
                        <div class="overlay p-5 text-center">
                            <h3>Dolci e Dessert</h3>
                            <p>Dolci piaceri per rendere la giornata ancora più gustosa.</p>
                    
                        </div>
                    </div>
                </div>

                <div class="col-7"> 
                    <div class="box">
                        <div class="overlay p-5 text-center">
                            <h3>Piatti da condividere</h3>
                            <p>Serve una scusa per stare insieme? Ordina dai ristoranti che trasformeranno la tua serata in un vera festa.</p>
                        </div>
                    </div>

                </div>

                <div class="col-5">
                    <div class="box">
                        <div class="overlay p-5 text-center">
                            <h3>Tutto il mondo</h3>
                            <p>Scopri piatti di diverse culture grazie alla nostra ampia scelta di ristoranti.</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>  
    </div>
    
    

</template>

<style lang="scss" scoped>
.background{
    background-color: #ffeae4;
}
h1{
    font-weight: 600;
}
.box{
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    position: relative;

    // immagini
    background-size: cover;
    background-position: center;

    .overlay{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);

        h3{
            font-weight: 600;
        }
    }
}
.row > div:nth-child(1) > .box {
    background-image: url('../img/comfort.jpg');
}

.row > div:nth-child(2) > .box {
    background-image: url('../img/dolci.jpg');
}

.row > div:nth-child(3) > .box {
    background-image: url('../img/condividere.jpg');
}

.row > div:nth-child(4) > .box  {
    background-image: url('../img/mondo.jpg');
}

</style>
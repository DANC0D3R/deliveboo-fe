<script>
import braintree from 'braintree-web';

export default {
    data() {
        return {
        clientToken: null,
        paymentStatus: null,
        paymentMessage: null,
        dropinInstance: null
        }
    },
    mounted() {
        axios.get('/payment').then(response => {
        this.clientToken = response.data.clientToken;
        this.initializeDropin();
        });
    },
    methods: {
        initializeDropin() {
        braintree.dropin.create({
            authorization: this.clientToken,
            container: '#dropin-container',
            paypal: {
            flow: 'checkout',
            amount: '10.00',
            currency: 'USD'
            }
        }, (error, dropinInstance) => {
            if (error) {
            console.error(error);
            return;
            }

            this.dropinInstance = dropinInstance;
        });
        },
        processPayment() {
            if (this.dropinInstance) {
                this.dropinInstance.requestPaymentMethod((error, payload) => {
                    if (error) {
                        console.error(error);
                        this.paymentStatus = 'error';
                        this.paymentMessage = 'An error occurred while processing your payment.';
                        return;
                    }

                    axios.post('/api/payments', {
                        paymentMethodNonce: payload.nonce
                    }).then(response => {
                        this.paymentStatus = 'success';
                        this.paymentMessage = response.data.message;
                    }).catch(error => {
                        console.error(error);
                        this.paymentStatus = 'error';
                        this.paymentMessage = 'An error occurred while processing your payment.';
                    });
                });
            }
        }
    }
}
</script>

<template>
    <div>
        <div v-if="paymentStatus" :class="{ 'text-green-500': paymentStatus === 'success', 'text-red-500': paymentStatus === 'error' }">
            {{ paymentMessage }}
        </div>
        <div v-else>
            <div id="dropin-container"></div>
            <button @click="processPayment" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Pay $10</button>
        </div>
    </div>
</template>
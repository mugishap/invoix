<template>
    <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-column">
        <form @submit.prevent="submitForm" class="invoice-content">
            <h1>New Invoice</h1>

            <div class="bill-from flex flex-column">
                <h4>Bill From</h4>
                <div class="input flex flex-column">
                    <label for="billerStreetAddress">
                        Street Address
                    </label>
                    <input id="billerStreetAddress" v-model="billerStreetAddress" required type="text" />
                </div>
            </div>

            <div class="location-details flex">
                <div class="input flex flex-column">
                    <label for="billerCity">
                        Biller City
                    </label>
                    <input id="billerCity" v-model="billerCity" required type="text" />
                </div>
                <div class="input flex flex-column">
                    <label for="billerZipCode">
                        ZIP Code
                    </label>
                    <input id="billerZipCode" v-model="billerZipCode" required type="text" />
                </div>
                <div class="input flex flex-column">
                    <label for="billerCountry">
                        Biller Country
                    </label>
                    <input id="billerCountry" v-model="billerCountry" required type="text" />
                </div>
            </div>

            <div class="bill-to flex flex-column">
                <h4>Bill To</h4>
                <div class="input flex flex-column">
                    <label for="clientName">
                        Client Name
                    </label>
                    <input id="clientName" v-model="clientName" required type="text" />
                </div>
                <div class="input flex flex-column">
                    <label for="clientEmail">
                        Client Email
                    </label>
                    <input id="clientEmail" v-model="clientEmail" required type="text" />
                </div>
                <div class="input flex flex-column">
                    <label for="billerStreetAddress">
                        Street Address
                    </label>
                    <input id="billerStreetAddress" v-model="billerStreetAddress" required type="text" />
                </div>
            </div>

        </form>
    </div>
</template>
<script>
export default {
    name: "invoiceModal",
    data() {
        return {
            billerStreetAddress: null,
            billerCity: null,
            billerZipCode: null,
            billerCountry: null,
            clientName: null,
            clientEmail: null,
            clientStreetAddress: null,
            clientCity: null,
            clientZipCode: null,
            clientCountry: null,
            invoiceDateUnix: null,
            invoiceDate: null,
            paymentTerms: null,
            paymentDueDateUnix: null,
            paymentDueDate: null,
            productDescription: null,
            invoicePending: null,
            invoiceDraft: null,
            invoiceItemList: [],
            invoiceTotal: 0
        }
    },
    methods: {
        checkClick() {

        },
        submitForm() {

        }
    }
}
</script>
<style lang="scss">

</style>
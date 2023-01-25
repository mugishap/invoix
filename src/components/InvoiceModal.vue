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
                    <label for="clientStreetAddress">
                        Street Address
                    </label>
                    <input id="clientStreetAddress" v-model="clientStreetAddress" required type="text" />
                </div>

                <div class="location-details flex">
                    <div class="input flex flex-column">
                        <label for="clientCity">
                            Client City
                        </label>
                        <input id="clientCity" v-model="clientCity" required type="text" />
                    </div>
                    <div class="input flex flex-column">
                        <label for="ClientZipCode">
                            ZIP Code
                        </label>
                        <input id="ClientZipCode" v-model="ClientZipCode" required type="text" />
                    </div>
                    <div class="input flex flex-column">
                        <label for="clientCountry">
                            Biller Country
                        </label>
                        <input id="clientCountry" v-model="clientCountry" required type="text" />
                    </div>
                </div>
            </div>

            <div class="invoice-work flex flex-column">
                <div class="payment flex">
                    <div class="input flex flex-column">
                        <label for="invoiceDate">
                            Invoice Date
                        </label>
                        <input disabled id="invoiceDate" v-model="invoiceDate" required type="text" />
                    </div>
                    <div class="input flex flex-column">
                        <label for="paymentDueDate">
                            Payment Due
                        </label>
                        <input disabled id="paymentDueDate" v-model="paymentDueDate" required type="text" />
                    </div>
                </div>

                <div class="input flex flex-column">
                    <label for="paymentTerms">
                        Payment Terms
                    </label>
                    <select id="paymentTerms" v-model="paymentTerms">
                        <option value="30">Net 30 days</option>
                        <option value="60">Net 60 days</option>
                    </select>
                </div>
                <div class="input flex flex-column">
                    <label for="productDescription">
                        Product description
                    </label>
                    <input id="productDescription" v-model="productDescription" required type="text" />
                </div>
                <div class="work-items">
                    <h3>Items-list</h3>
                    <table class="item-list">
                        <thead>

                            <tr class="table-heading">
                                <th class="item-name">Item Name</th>
                                <th class="qty">Qty</th>
                                <th class="price">Price</th>
                                <th class="total">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-items flex" v-for="(item, index ) in invoiceItemList" :key="index">
                                <td class="item-name"><input type="text" v-model="item.itemName"></td>
                                <td class="qty"><input type="text" v-model="item.qty"></td>
                                <td class="price"><input type="text" v-model="item.price"></td>
                                <td class="total flex">${{ (item.total = item.qty * item.price) }}</td>
                                <img @click="deleteInvoiceItem(item.id)" src="@/assets/icon-delete.svg" alt="" />
                            </tr>
                        </tbody>
                    </table>
                    <div @click="addNewInvoiceItem" class="flex button">
                        <img src="@/assets/icon-plus.svg" alt="" />
                        Add New Item
                    </div>
                </div>
            </div>

            <div class="save flex">

                <div class="left">
                    <button @click="closeInvoice" class="red">Cancel</button>
                </div>
                <div class="right">
                    <button class="dark-purple" @click="saveDraft">Save Draft</button>
                    <button class="dark-purple" @click="publishInvoice">Publish Invoice</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import db from './../firebase/firebase'
import { mapMutations } from 'vuex';
import { uid } from "uid"
export default {
    name: "invoiceModal",
    data() {
        return {
            dateOptions: { year: 'numeric', month: 'short', day: 'numeric' },
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
    created() {
        this.invoiceDateUnix = Date.now()
        this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString('en-us', this.dateOptions)
    },
    methods: {
        ...mapMutations(['TOGGLE_INVOICE']),
        closeInvoice() {
            this.TOGGLE_INVOICE()
        },
        checkClick() {

        },
        async uploadInvoice() {
            if (this.invoiceItemList.length <= 0) {
                alert("Please make ssure you filled out work items")
                return
            }
            this.calcInvoiceTotal()
            const database = db.collection("invoices").doc();
            await database.set({
                invoiceId: uid(6),
                billerStreetAddress: this.billerStreetAddress,
                billerCity: this.billerCity,
                billerZipCode: this.billerZipCode,
                billerCountry: this.billerCountry,
                clientName: this.clientName,
                clientEmail: this.clientEmail,
                clientStreetAddress: this.clientStreetAddress,
                clientCity: this.clientCity,
                clientZipCode: this.clientZipCode,
                clientCountry: this.clientCountry,
                invoiceDateUnix: this.invoiceDateUnix,
                invoiceDate: this.invoiceDate,
                paymentTerms: this.paymentTerms,
                paymentDueDateUnix: this.paymentDueDateUnix,
                paymentDueDate: this.paymentDueDate,
                productDescription: this.productDescription,
                invoicePending: this.invoicePending,
                invoiceDraft: this.invoiceDraft,
                invoiceItemList: this.invoiceItemList,
                invoiceTotal: this.invoiceTotal,
                invoicePaid: null
            })

            this.TOGGLE_INVOICE()
        },
        submitForm() {
            this.uploadInvoice()
        },
        deleteInvoiceItem(id) {
            this.invoiceItemList = this.invoiceItemList.filter(i => i.id != id)
        },
        calcInvoiceTotal() {
            this.invoiceTotal = 0;
            this.invoiceItemList.forEach(invoice => {
                this.invoiceTotal += invoice.total
            })
        },
        addNewInvoiceItem() {
            this.invoiceItemList.push({
                id: uid(),
                itemName: null,
                qty: "",
                price: 0,
                total: 0
            })
        },
        saveDraft() {
            this.invoiceDraft = true
        },
        publishInvoice() {
            this.invoicePending = true
        }
    },
    watch: {
        paymentTerms() {
            const futureDate = new Date()
            this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms))
            this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString('en-us', this.dateOptions)
        }
    }
}
</script>
<style lang="scss">
.invoice-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (min-width: 900px) {
        left: 90px;
    }

    .invoice-content {
        position: relative;
        padding: 56px;
        max-width: 700px;
        width: 100%;
        background-color: #141625;
        color: #fff;
        box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        h1 {
            margin-bottom: 48px;
            color: #fff;
        }

        h3 {
            margin-bottom: 16px;
            font-size: 18px;
            color: #777f98;
        }

        h4 {
            color: #7c5dfa;
            font-size: 12px;
            margin-bottom: 24px;
        }

        // Bill To / Bill From
        .bill-to,
        .bill-from {
            margin-bottom: 48px;

            .location-details {
                gap: 16px;

                div {
                    flex: 1;
                }
            }
        }

        // Invoice Work
        .invoice-work {
            .payment {
                gap: 24px;

                div {
                    flex: 1;
                }
            }

            .work-items {
                .item-list {
                    width: 100%;

                    // Item Table Styling
                    .table-heading,
                    .table-items {
                        gap: 16px;
                        font-size: 12px;

                        .item-name {
                            flex-basis: 50%;
                        }

                        .qty {
                            flex-basis: 10%;
                        }

                        .price {
                            flex-basis: 20%;
                        }

                        .total {
                            flex-basis: 20%;
                            align-self: center;
                        }
                    }

                    .table-heading {
                        margin-bottom: 16px;

                        th {
                            text-align: left;
                        }
                    }

                    .table-items {
                        position: relative;
                        margin-bottom: 24px;

                        img {
                            position: absolute;
                            top: 15px;
                            right: 0;
                            width: 12px;
                            height: 16px;
                        }
                    }
                }

                .button {
                    color: #fff;
                    background-color: #252945;
                    align-items: center;
                    justify-content: center;
                    width: 100%;

                    img {
                        margin-right: 4px;
                    }
                }
            }
        }

        .save {
            margin-top: 60px;

            div {
                flex: 1;
            }

            .right {
                justify-content: flex-end;
            }
        }
    }

    .input {
        margin-bottom: 24px;
    }

    label {
        font-size: 12px;
        margin-bottom: 6px;
    }

    input,
    select {
        width: 100%;
        background-color: #1e2139;
        color: #fff;
        border-radius: 4px;
        padding: 12px 4px;
        border: none;

        &:focus {
            outline: none;
        }
    }
}
</style>
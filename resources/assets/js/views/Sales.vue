<template>
    <layout>
        <v-layout row wrap>
            <v-spacer></v-spacer>
            <v-flex sm3>
                <v-btn color="primary" block @click="showSaleDialog" :disabled="!loaded">New Sale</v-btn>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
            <v-flex sm12>
                <v-card flat>
                    <v-card-title class="pt-0">
                        <v-layout>
                            <v-flex sm6 md4 offset-sm6 offset-md8>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="search" label="Search sales" single-line
                                    hide-details clearable></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-data-table :items="sales" :rows-per-page-items="[20]" search :headers="headers" :loading="loading">
                        <template slot="no-data">
                            No sales yet.
                        </template>
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.meter_number }}</td>
                            <td>{{ props.item.energy_vended }}</td>
                            <!-- <td>{{ props.item.energy_balance }}</td> -->
                            <td>{{ props.item.price }}</td>
                            <td>{{ props.item.amount }}</td>
                            <td>{{props.item.created_at}}</td>
                            <td>
                                <v-icon small class="mr-2" @click="editItem(props.item)">
                                    edit
                                </v-icon>
                            </td>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-dialog v-model="newSaleDialog" max-width="750px" persistent>
                <v-card>
                    <v-card-title primary-title>
                        <h3>
                            Enter vending details
                        </h3>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-form lazy-validation ref="sales_form">
                            <v-layout row wrap>
                                <v-flex sm6 px-2>
                                    <v-text-field required v-model="sale.meter_number" validate-on-blur label="Meter number"
                                        :rules="formRules.required" name="meter_number"></v-text-field>
                                </v-flex>
                                <v-flex sm6 px-2>
                                    <v-text-field required v-model="sale.energy_vended" validate-on-blur type="number"
                                        min="0" step="0.001" label="Energy vended" :rules="formRules.required" name="energy_vended"></v-text-field>
                                </v-flex>
                                <v-flex sm6 px-2>
                                    <v-text-field required v-model="sale.price" type="number" min="0" step="0.001"
                                        readonly label="Price" :rules="formRules.required" name="price"></v-text-field>
                                </v-flex>
                                <v-flex sm6 px-2>
                                    <v-text-field required v-model="eAmount" label="Amount" :rules="formRules.required"
                                        name="amount"></v-text-field>
                                </v-flex>
                                <v-flex sm6 px-2>
                                    <v-text-field required v-model="eBalance" readonly label="Energy Balance" :rules="formRules.required"
                                        name="energy_balance"></v-text-field>
                                </v-flex>
                                <v-flex sm6 px-2>
                                    <v-text-field required v-model="sale.otd" readonly label="OTD" :rules="formRules.required"
                                        name="otd"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>

                            </v-layout>
                            <v-layout>
                                <v-spacer></v-spacer>
                                <v-btn @click="closeSaleDialog" flat :disabled="posting">Close</v-btn>
                                <v-btn @click="save" flat :disabled="posting || settings.totalEnergy <= 0" color="primary">{{saveText}}</v-btn>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog v-model="updateSaleDialog" max-width="750px" persistent>
                <v-card>
                    <v-card-title primary-title>
                        <h3>
                            Vending details
                        </h3>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-form lazy-validation ref="update_sales_form">
                            <v-layout row wrap>
                                <v-flex sm6 px-2>
                                    <v-text-field required v-model="sale.meter_number" validate-on-blur label="Meter number"
                                        :rules="formRules.required" name="meter_number"></v-text-field>
                                </v-flex>
                                <v-flex sm6 px-2>
                                    <v-text-field required v-model="sale.energy_vended" validate-on-blur type="number"
                                        min="0" step="0.001" label="Energy vended" :rules="formRules.required" name="energy_vended"></v-text-field>
                                </v-flex>
                                <v-flex sm6 px-2>
                                    <v-text-field required v-model="sale.price" type="number" min="0" step="0.001"
                                        readonly label="Price" :rules="formRules.required" name="price"></v-text-field>
                                </v-flex>
                                <v-flex sm6 px-2>
                                    <v-text-field required v-model="eAmount" label="Amount" :rules="formRules.required"
                                        name="amount"></v-text-field>
                                </v-flex>
                                <v-flex sm6 px-2>
                                    <v-text-field required v-model="eBalance" readonly label="Energy Balance" :rules="formRules.required"
                                        name="energy_balance"></v-text-field>
                                </v-flex>
                                <v-flex sm6 px-2>
                                    <v-text-field required v-model="sale.otd" readonly label="OTD" :rules="formRules.required"
                                        name="otd"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>

                            </v-layout>
                            <v-layout>
                                <v-spacer></v-spacer>
                                <v-btn @click="closeSaleDialog" flat :disabled="posting">Close</v-btn>
                                <v-btn @click="save" flat :disabled="posting || settings.totalEnergy <= 0" color="primary">{{updateText}}</v-btn>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-layout>
    </layout>
</template>

<script>
    import Layout from "./../components/Layout";
    export default {
        components: {
            Layout
        },
        computed: {
            eAmount() {
                const vended = this.sale.energy_vended || 0
                const price = this.sale.price || 0
                return parseFloat((price * vended).toPrecision(8))
            },
            eBalance() {
                const vended = this.sale.energy_vended || 0
                return this.settings.totalEnergy - vended
            },
            saveText() {
                return this.posting ? 'Saving...' : 'Save'
            },
            updateText() {
                return this.posting ? 'Updating...' : 'Update'
            }
        },
        created() {
            this.getSales()
            this.getSettings()
        },
        data() {
            return {
                headers: [{
                        text: "Meter number",
                        value: "meter_number"
                    },
                    {
                        text: "EV",
                        value: "energy_vended"
                    },
                    {
                        text: "Price",
                        value: "price"
                    },
                    {
                        text: "Amount",
                        value: "amount"
                    },
                    {
                        text: "OTD",
                        value: "created_at"
                    },
                    {
                        text: "Actions",
                        value: ""
                    }
                ],
                sale: {},
                sales: [],
                search: '',
                loading: true,
                loaded: false,
                newSaleDialog: false,
                settings: {},
                updateSaleDialog: false,
            };
        },
        methods: {
            closeSaleDialog() {
                this.newSaleDialog = false
                this.updateSaleDialog = false
                this.sale = Object.assign({})
            },
            editItem(item) {
                this.sale = Object.assign({}, item);
                // console.log(this.sale);
                this.showUpdateSaleDialog()
            },
            async getSales() {
                try {
                    const res = await this.$http.get('/api/sales')
                    this.loading = false
                    this.handleResponse(res, data => {
                        this.sales = data
                    })
                } catch (error) {
                    this.loading = false
                    this.handleError(error, "We couldn't get your sales data. Please try again later.")
                }
            },
            async getSettings() {
                try {
                    const res = await this.$http.get('/api/setup')
                    this.loaded = true
                    this.handleResponse(res, data => {
                        this.settings = Object.assign({}, {
                            price: data.price_per_kwh,
                            totalEnergy: data.total_energy_vendable
                        })
                    })
                } catch (error) {
                    this.loaded = true
                    this.handleError(error, "We couldn't get your settings. Please try again later.")
                }
            },
            async save() {
                if (!this.$refs.sales_form.validate()) return
                const sale = Object.assign({}, this.sale)
                try {
                    const res = await this.$http.post('/api/sales', sale)
                    this.posting = false
                    this.handleResponse(res, data => {
                        console.log(data)
                        this.sales.push(data)
                        this.settings.totalEnergy = data.total_energy_vendable
                        this.closeSaleDialog()
                    })
                    this.showSnackbar('Sale added successfully.')
                } catch (error) {
                    this.posting = false
                    this.handleError(error,
                        "There was an error while processing this sale. Please try again later.")
                }
                console.log(this.sale)
            },
            showSaleDialog() {
                this.sale.price = this.settings.price
                this.sale.energy_balance = this.settings.totalEnergy
                this.sale.otd = this.getNow()
                this.newSaleDialog = true
            },
            showUpdateSaleDialog() {
                this.sale.energy_balance = this.settings.totalEnergy
                this.sale.otd = this.momentFormat(this.sale.created_at)
                this.updateSaleDialog = true
            },
            async update() {
                if (!this.$refs.update_sales_form.validate()) return
                const sale = Object.assign({}, this.sale)
                try {
                    const res = await this.$http.post('/api/sales', sale)
                    this.posting = false
                    this.handleResponse(res, data => {
                        console.log(data)
                        this.sales.push(data)
                        this.settings.totalEnergy = data.total_energy_vendable
                        this.closeSaleDialog()
                    })
                    this.showSnackbar('Sale updated successfully.')
                } catch (error) {
                    this.posting = false
                    this.handleError(error,
                        "There was an error while updating this sale. Please try again later.")
                }
                console.log(this.sale)
            },
        }
    };

</script>

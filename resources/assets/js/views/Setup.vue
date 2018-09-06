<template>
    <layout>
        <v-layout row wrap>
            <v-flex sm6 md4>
                <v-form lazy-validation ref="settings_form" @submit.prevent="saveSettings">
                    <v-layout row wrap>
                        <v-flex sm12>
                            <v-text-field required :rules="formRules.aboveZeroRules" label="Total Energy Vendable (TEV)"
                                type="number" min="0" step="1" v-model="settings.totalEnergy" :loading="!loaded"></v-text-field>
                        </v-flex>
                        <v-flex sm12>
                            <v-text-field required :rules="formRules.aboveZeroRules" label="Price per KWh" type="number"
                                min="0" step="0.01" v-model="settings.price" :loading="!loaded"></v-text-field>
                        </v-flex>
                        <v-flex sm12>
                            <v-layout>
                                <v-spacer></v-spacer>
                                <v-flex sm6>
                                    <v-btn color="primary" :disabled="posting" type="submit" block>{{saveText}}</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </layout>
</template>

<script>
    import Layout from './../components/Layout'
    export default {
        components: {
            Layout
        },
        computed: {
            saveText() {
                return this.posting ? 'Saving...' : 'Save Settings'
            }
        },
        async created() {
            await this.getSettings()
        },
        data() {
            return {
                loaded: false,
                posting: false,
                settings: {
                    price: 0.00,
                    totalEnergy: 0.00
                }
            }
        },
        methods: {
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
            async saveSettings() {
                if (!this.$refs.settings_form.validate()) return
                this.posting = true
                const settings = Object.assign({}, this.settings)
                try {
                    const res = await this.$http.post('/api/setup', settings)
                    this.posting = false
                    this.handleResponse(res, data => console.log(data))
                    this.showSnackbar('Settings saved successfully.')
                } catch (error) {
                    this.posting = false
                    this.handleError(error, "There was an error saving your settings. Please try again later.")
                }
            }
        }
    }

</script>

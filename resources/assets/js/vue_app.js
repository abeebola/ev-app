import Vue from "vue";
import App from "./components/App.vue";
import router from "./router";
import store from "./store";
import vuetify from "vuetify";
import moment from "moment";
import axios from "axios";
import VueAxios from "vue-axios";
import qs from "qs";
import accounting from "accounting";


import db from "./db";

axios.defaults.withCredentials = true;
// axios.interceptors.request.use(config => {
//     const tokens = db.get(_config.constants.TOKENS);
//     if (tokens) {
//         config.headers.Authorization = `Bearer ${tokens.accessToken}`;
//         config.headers["X-Refresh-Token"] = `${tokens.refreshToken}`;
//     }

//     return config;
// });

Vue.use(vuetify);
Vue.use(VueAxios, axios);
Vue.prototype.$qs = qs;
Vue.prototype.$db = db;
Vue.prototype.$moment = moment;
Vue.prototype.$accounting = accounting;
Vue.config.productionTip = false;

// axios.interceptors.response.use(response => {
//     const refreshToken = response.headers["x-refresh-token"];
//     if (refreshToken) {
//         db.save(config.constants.REFRESH_TOKEN, refreshToken);
//     }

//     return response;
// });

Vue.mixin({
    computed: {
        snackbar() {
            return this.$store.getters.snackbar;
        }
    },
    data() {
        return {
            alert: this.$store.getters.alert,
            formRules: {
                aboveZeroRules: [
                    v =>
                    (v && parseInt(v) > 0) ||
                    "Not a valid amount."
                ],
                amountRules: [
                    v =>
                    (v && !!v.toString().match(/^\d+(\.{1}\d{0,8})?$/)) ||
                    "Not a valid amount."
                ],
                dynamic: (bool, rule) => {
                    const rules = {
                        required: this.formRules.required,
                        amount: this.formRules.amountRules,
                        pin: this.formRules.pinRules,
                        password: this.formRules.passwordRules
                    };
                    if (bool) {
                        return rules[rule] || rules["required"];
                    } else return [() => true];
                },
                passwordRules: [
                    v =>
                    (v && v.length >= 6) ||
                    "Password can't be less than 6 characters."
                ],
                phoneRules: [
                    v =>
                    (v && v.length >= 11) ||
                    "Please enter a valid phone number"
                ],
                pinRules: [
                    v =>
                    (v && !!v.match(/^\d{5}/)) ||
                    "PIN code must be 6 digits long."
                ],
                tokenRules: [
                    v =>
                    (!!v && v.length >= 6) ||
                    "Token can't be less than 6 characters"
                ],
                required: [v => !!v || v === 0 || "This is a required field"]
            },
            posting: false,
        };
    },
    methods: {
        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        },
        async handleError(error, msg, fn) {
            if (fn) fn();
            const response = await error.response;
            if (!(response && response.data && response.data.errors))
                return this.showSnackbar(msg, {
                    type: "error"
                });

            const data = response.data;
            let messages = [];
            data.errors.forEach(error => {
                messages.push(error.msg);
            });
            this.showSnackbar(messages.join("<br />"), {
                type: "error"
            });
        },
        async handleResponse(res, fn) {
            const response = await res.data;
            // const data = await response.data;
            if (response.status === 0 || response.status === false) {
                return this.showSnackbar(response.message, {
                    type: "error"
                });
            }

            if (fn) fn(response);
        },
        maxLength(len) {
            let chars = "";
            [...Array(len)].forEach(() => (chars += "#"));
            return chars;
        },
        momentFormat(dateTime) {
            return this.$moment(dateTime).format("DD/MM/YYYY");
        },
        niceDateFormat(dateTime) {
            return this.$moment(dateTime).format("DD MMM YYYY");
        },
        fullDateFormat(dateTime) {
            return this.$moment(dateTime).format("DD MMM YYYY HH:mm");
        },
        getToday() {
            return this.$moment().format("DD/MM/YYYY");
        },
        moneyFormat(value) {
            return this.$accounting.formatNumber(value, 2, ",");
        },
        numberFormat(value) {
            return this.$accounting.formatNumber(value, 0, ",");
        },
        showAlert(msg, type, global = true) {
            this.$store.commit("showAlert", {
                msg,
                type,
                global
            });
        },
        showSnackbar(_msg, _config) {
            const config = _config || {};
            const type = config.type;
            let defaultMessage = "An error occurred.";
            if (type !== "error") defaultMessage = "Success!";
            const msg = _msg || defaultMessage;
            const timeout = config.timeout;
            const position = config.position;
            const align = config.align;
            this.$store.commit("showSnackbar", {
                msg,
                type,
                timeout,
                position,
                align
            });
        }
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

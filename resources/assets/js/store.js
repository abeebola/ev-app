import Vue from "vue";
import Vuex from "vuex";
import db from "./db";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        drawer: undefined,
        isLoggedIn: false,
        loadingPage: false,
        // selectedStore: null,
        snackbar: {
            content: "",
            show: false,
            mode: "",
            align: "",
            position: "top",
            timeout: 4000
        },
        stores: []
    },
    getters: {
        accessToken() {
            const user = db.get(config.constants.USER);
            return user ? user.token : null;
        },
        authTokens() {
            const tokens = db.get(config.constants.TOKENS);
            return tokens;
        },
        drawer(state) {
            return state.drawer;
        },
        loadingPage(state) {
            return state.loadingPage;
        },
        snackbar(state) {
            return state.snackbar;
        },
    },
    mutations: {
        // addStore(state, store) {
        //   const businessInfo = db.get(config.constants.BUSINESS) || {};
        //   const stores = businessInfo.stores || [];
        //   stores.push(store);
        //   businessInfo.stores = stores;
        //   db.save(config.constants.BUSINESS, businessInfo);
        // },
        burn() {
            localStorage.clear();
            return (window.location = "/");
        },
        showSnackbar(state, snackObj) {
            const obj = {};
            obj.content = snackObj.msg || "An error occurred.";
            let color = snackObj.type;
            if (color && color == "error") {
                color = "red darken-3";
            }
            obj.color = color;
            obj.show = true;
            obj.mode = snackObj.mode || false;
            obj.align = snackObj.align || false;
            obj.align = snackObj.align || "right";
            obj.position = snackObj.position || "bottom";
            // obj.position = snackObj.position || "top";
            obj.timeout = snackObj.timeout || 4000;
            state.snackbar = obj;
        },
        toggleDrawer(state) {
            state.drawer = !state.drawer;
        },
        updateDrawer(state, bool) {
            state.drawer = bool;
        },
    },
    actions: {}
});

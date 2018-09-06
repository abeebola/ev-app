import Vue from "vue";
import Router from "vue-router";
import Home from "./../views/Home.vue";
import Sales from "./../views/Sales.vue";
import Setup from "./../views/Setup.vue";
// import DriverRoutes from "./drivers";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/",
            name: "Dashboard",
            component: Home
        },
        {
            path: "/sales",
            name: "Sales",
            component: Sales
        },
        {
            path: "/setup",
            name: "Setup",
            component: Setup
        }
    ]
});

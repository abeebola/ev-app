<template>
    <div id="base-layout">
        <v-navigation-drawer persistent fixed app :clipped="true" :value="drawer" @input="change">
            <drawer-menus></drawer-menus>
        </v-navigation-drawer>
        <main-header></main-header>
        <v-content>
            <div class="page-content">
                <v-card>
                    <v-card-title primary-title class="pa-3">
                        <h3 class="ma-0">{{$router.currentRoute.name || 'Dashboard'}}</h3>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-layout row wrap>
                        <v-flex xs12 pa-3>
                            <slot></slot>
                        </v-flex>
                    </v-layout>
                </v-card>
            </div>
        </v-content>
    </div>
</template>

<script>
    import MainHeader from "./shared/MainHeader";
    import DrawerMenus from "./shared/DrawerMenus";
    export default {
        components: {
            DrawerMenus,
            MainHeader
        },
        computed: {
            drawer() {
                return this.$store.getters.drawer;
            }
        },
        created() {
            if (!this.loggedInUser) this.$router.replace("/");
        },
        data() {
            return {
                currentUser: this.loggedInUser
            };
        },
        methods: {
            change(e) {
                this.$store.commit("updateDrawer", e);
            }
        },
        props: {
            "requires-store": Boolean,
            "requires-warehouse": Boolean
        },
        updated() {
            if (!this.loggedInUser) this.$router.replace("/");
        }
    };

</script>

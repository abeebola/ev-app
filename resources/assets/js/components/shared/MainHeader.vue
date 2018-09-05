<template>
    <div>
        <v-toolbar app :clipped-left="true" :fixed="true" dark>
            <v-toolbar-side-icon @click="toggleDrawer"></v-toolbar-side-icon>
            <v-toolbar-title>
                <app-logo></app-logo>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat to="/privacy">
                    Privacy policy
                </v-btn>
            </v-toolbar-items>
            <v-menu bottom left offset-y min-width="250px">
                <v-btn slot="activator" icon>
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list dense>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-form action="/logout" method="post">
                                <v-layout row wrap>
                                    <v-flex sm12>
                                        <v-btn type="submit" flat block>Log out</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-list>

                </v-list>
            </v-menu>
        </v-toolbar>
        <v-progress-linear :active="loadingPage" indeterminate :height="6" color="red darken-2" class="top-progress"></v-progress-linear>
    </div>
</template>

<script>
    import Logo from "./Logo";
    export default {
        name: "MainHeader",
        components: {
            appLogo: Logo
        },
        data() {
            return {
                loadingPage: this.$store.getters.loadingPage,
                user: {}
            };
        },
        methods: {
            toggleDrawer() {
                this.$store.commit("toggleDrawer");
            }
        }
    };

</script>

<style scoped>
    .top-progress {
        z-index: 50;
        margin: 0;
    }

</style>

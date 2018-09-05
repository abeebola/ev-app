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
                <v-list>
                    <v-list-tile avatar dark to="/profile">
                        <v-list-tile-avatar>
                            <img src="/static/img/default_thumb.jpg" alt="">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{user.firstName}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                    <v-list-tile to="/logout">
                        <v-list-tile-title>
                            Log out
                        </v-list-tile-title>
                    </v-list-tile>
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

<template>
    <div class="drawer-list">
        <br>
        <v-list dense>
            <v-list-tile to="/" exact>
                <v-list-tile-action>
                    <v-icon>pie_chart</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        Dashboard
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/setup" exact>
                <v-list-tile-action>
                    <v-icon>build</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                    Setup
                </v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/sales" exact>
                <v-list-tile-action>
                    <v-icon>add_shopping_cart</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                    Sales
                </v-list-tile-title>
            </v-list-tile>
        </v-list>
    </div>
</template>

<script>
    export default {
        name: "DrawerMenus"
    };

</script>

<style scoped>
</style>

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
            <v-list-tile to="/drivers" exact>
                <v-list-tile-action>
                    <v-icon>contact_mail</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                    Drivers
                </v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/discounts_actions" exact>
                <v-list-tile-action>
                    <v-icon>styles</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                    Cars
                </v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/users" exact>
                <v-list-tile-action>
                    <v-icon>people</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        Users
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-group prepend-icon="build">
                <v-list-tile slot="activator">
                    <v-list-tile-title>Settings</v-list-tile-title>
                </v-list-tile>
                <v-list-tile to="/settings/table_other_settings" exact>
                    <v-list-tile-action>
                        <v-icon>fiber_manual_record</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        Table/Other settings
                    </v-list-tile-title>
                </v-list-tile>
            </v-list-group>
            <v-list-group prepend-icon="view_module">
                <v-list-tile slot="activator">
                    <v-list-tile-title>Warehouse</v-list-tile-title>
                </v-list-tile>
                <v-list-tile to="/warehouse/storage_status" exact>
                    <v-list-tile-action>
                        <v-icon>storage</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        Storage Status
                    </v-list-tile-title>
                </v-list-tile>
                <v-list-tile to="/warehouse/inventory" exact>
                    <v-list-tile-action>
                        <v-icon>add_shopping_cart</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        Inventory
                    </v-list-tile-title>
                </v-list-tile>
                <v-list-tile to="/warehouse/receipts" exact>
                    <v-list-tile-action>
                        <v-icon>add_circle_outline</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        Incoming Receipts
                    </v-list-tile-title>
                </v-list-tile>
            </v-list-group>
        </v-list>
        <!-- <v-list dense>

        </v-list> -->
    </div>
</template>

<script>
    export default {
        name: "DrawerMenus"
    };
</script>

<style scoped>
</style>
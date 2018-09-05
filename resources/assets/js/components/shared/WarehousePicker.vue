<template>
  <div class="warehouse-picker">
    <v-card light flat>
      <v-layout row wrap>
        <v-flex sm4 md3 px-4>
          <br> Select a warehouse
        </v-flex>
        <v-flex sm6 md4 px-4>
          <v-autocomplete :items="warehouses" return-object :loading="loading.warehouses" item-text="name" autocomplete item-value="id" label="Select warehouse"
            single-line @change="change"></v-autocomplete>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getWarehouses();
  },
  data() {
    return {
      loading: {
        warehouses: true
      },
      warehouses: []
    };
  },
  methods: {
    change(warehouse) {
      this.$emit("warehouseSelected", warehouse);
    },
    async getWarehouses() {
      const user = this.isLoggedIn;
      const storeId = user.store_id;
      let url = `${this.apiBaseUrl}/warehouses`;
      if (storeId) url += `?store_id=${storeId}`;
      try {
        const res = await this.$http.get(url);
        this.loading.warehouses = false;
        this.handleResponse(res, data => {
          this.warehouses = data;
        });
      } catch (error) {
        this.loading.warehouses = false;
        this.handleError(error, "We couldn't load your warehouses.");
      }
    }
  }
};
</script>

<style scoped>
.warehouse-picker {
  /* margin-bottom: 20px; */
}
</style>

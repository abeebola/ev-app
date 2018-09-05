<template>
  <div class="store-picker">
    <v-card light flat>
      <v-layout row wrap>
        <v-flex sm3 md2 px-4>
          <br> Select a store
        </v-flex>
        <v-flex sm6 md4 px-4>
          <v-autocomplete :items="stores" return-object :value="selectedStore" item-text="name" :loading="loading" autocomplete item-value="id"
            label="Select Store" single-line @change="change"></v-autocomplete>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  // computed: {
  //     selectedStore_() {
  //         const store = this.selectedStore
  //         return store ? store : {}
  //     }
  // },
  created() {
    this.getStores();
  },
  data() {
    return {
      loading: true,
      stores: []
      // stores: this.$store.getters.stores
    };
  },
  methods: {
    change(store) {
      this.$store.commit("selectStore", store);
      this.selectedStore_ = store;
      // console.log(e);
    },
    async getStores() {
      this.loading = true;
      try {
        const res = await this.$http.get(`${this.apiBaseUrl}/stores`);
        this.loading = false;
        this.handleResponse(res, data => {
          this.stores = data;
          this.$store.commit("updateStores", data);
        });
      } catch (error) {
        this.loading = false;
        this.handleError(error, "We couldn't fetch your stores");
      }
    }
  }
};
</script>

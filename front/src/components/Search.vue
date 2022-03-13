<template>
  <v-row class="no-gutters mt-lg-4">
    <v-col
      cols="12"
      class="pa-4 mb-4 mb-lg-0 d-flex justify-center gradient pa-5 rounded-xl"
    >
      <v-text-field
        label="Поиск..."
        prepend-icon="mdi-magnify"
        class="white rounded-xl px-6"
        v-model="request"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      request: "",
    };
  },
  methods: {
    ...mapMutations(["setSearchRequest"]),
  },
  watch: {
    request: function () {
      this.setSearchRequest(this.request);
    },
  },
};
</script>
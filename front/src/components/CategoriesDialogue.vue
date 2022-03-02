<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn
          class="rounded-xl mt-4"
          style="
            background: linear-gradient(132deg, #f4d03f81 0%, #16a085 100%);
          "
          dark
          v-bind="attrs"
          v-on="on"
        >
          <div style="color: white">Категории</div>
          <v-icon color="white">mdi-filter</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </div>
    </template>
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
      <div class="d-flex flex-column">
        <Categories class="my-3" />
        <NewsList class="my-3" />
      </div>
    </v-card>
  </v-dialog>
</template>



<script>
import Categories from "../components/Categories.vue";
import NewsList from "../components/NewsComponent.vue";

export default {
  data() {
    return {
      dialog: false,
    };
  },
  components: {
    Categories,
    NewsList,
  },
};
</script>

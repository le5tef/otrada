<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn
          x-large
          class="rounded-xl my-4"
          style="background: linear-gradient(132deg, #f4d03f 0%, #16a085 100%)"
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
import { mapMutations } from "vuex";

export default {
  components: {
    Categories,
    NewsList,
  },
  methods: {
    ...mapMutations(["setCategoriesDialog"]),
  },
  computed: {
    dialog: {
      set(val) {
        this.setCategoriesDialog(val);
      },
      get() {
        return this.$store.state.categoriesDialogue;
      },
    },
  },
};
</script>

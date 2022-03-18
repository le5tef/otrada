<template>
  <div
    class="mx-4 mt-4 pa-1 rounded-xl"
    style="
      background-image: linear-gradient(132deg, #f4d03f81 0%, #16a085 100%);
    "
  >
    <div class="title text-center">ПОЛЕЗНЫЕ СОСЕДИ</div>
    <div class="categories pa-4 white rounded-xl d-flex flex-column">
      <div v-for="(category, id) in adsCategories" :key="id">
        <v-btn @click="filterCats(category._id)" width="100%">{{
          category.title
        }}</v-btn>
      </div>
      <v-btn
        color="red"
        style="color: white"
        v-if="filter"
        @click="setFilter('')"
        >Очистить категории</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["filter"]),
    ...mapGetters(["adsCategories"]),
  },
  methods: {
    ...mapMutations(["setFilter", "setCategoriesDialog"]),
    filterCats(id) {
      this.setCategoriesDialog(false);
      this.setFilter(id);
    },
  },
};
</script>
<template>
  <div class="mt-4">
    <Carousel />
    <div>
      <CategoriesDialog
        v-if="
          $vuetify.breakpoint.name == 'sm' ||
          $vuetify.breakpoint.name == 'xs' ||
          $vuetify.breakpoint.name == 'md'
        "
      />
      <v-row class="no-gutters">
        <v-col
          v-if="
            $vuetify.breakpoint.name == 'lg' || $vuetify.breakpoint.name == 'xl'
          "
          cols="12"
          lg="3"
          class="mt-4"
        >
          <NewsList />
        </v-col>

        <v-col
          cols="12"
          offset-md="2"
          md="8"
          offset-lg="0"
          lg="6"
          class="pa-4 pa-md-0"
        >
          <v-row
            class="no-gutters container rounded-xl my-md-4 pa-1"
            v-if="cutedPosts.length != 0"
          >
            <v-col
              v-for="(post, id) in cutedPosts"
              :key="id"
              cols="12"
              sm="12"
              md="12"
              lg="6"
              class="pa-4"
            >
              <New :post="post" />
            </v-col>
            <v-col
              v-if="!(filteredPosts.length == cutedPosts.length)"
              cols="12"
              class="d-flex justify-center"
            >
              <v-btn color="white" @click="changeNews(4)" text
                >Показать еще</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
        <v-col
          v-if="
            $vuetify.breakpoint.name == 'lg' || $vuetify.breakpoint.name == 'xl'
          "
          cols="12"
          lg="3"
          ><Categories
        /></v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import New from "../components/New.vue";
import Carousel from "../components/Slider.vue";
import Categories from "../components/Categories.vue";
import NewsList from "../components/NewsComponent.vue";
import CategoriesDialog from "../components/CategoriesDialogue.vue";
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters(["cutedPosts", "filteredPosts"]),
    ...mapState(["posts", "postsOnPage"]),
  },
  methods: {
    ...mapMutations(["changeNews"]),
  },
  components: { New, Carousel, Categories, NewsList, CategoriesDialog },
};
</script>

<style lang='scss' scoped>
.container {
  margin: 3px auto;
  background-image: linear-gradient(132deg, #f4d03f81 0%, #16a085 100%);
}
</style>
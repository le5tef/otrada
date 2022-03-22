<template>
  <v-row class="no-gutters">
    <v-col cols="12" md="8" offset-md="2">
      <v-carousel
        cycle
        :height="
          $vuetify.breakpoint.name == 'xs' || $vuetify.breakpoint.name == 'sm'
            ? 250
            : 400
        "
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
          :src="slide.media[0]"
        >
          <router-link
            :to="{ name: 'post', params: { id: slide.id } }"
            class="post__button"
          >
            <v-row class="fill-height" align="center" justify="center"> </v-row>
          </router-link>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["slides"]),
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>
<template>
  <v-container v-if="post" class="my-4">
    <v-row>
      <v-col
        cols="3"
        xl="2"
        offset-xl="1"
        class="back rounded-xl"
        v-if="
          $vuetify.breakpoint.name == 'lg' || $vuetify.breakpoint.name == 'xl'
        "
      >
        <New
          v-for="post in newPosts"
          :key="post._id"
          :post="post"
          class="mt-4"
          :isSmall="true"
        />
      </v-col>
      <v-col
        cols="12"
        md="10"
        lg="6"
        offset-md="1"
        offset-lg="0"
        class="back pa-sm-6 rounded-xl align-self-start px-md-4"
      >
        <div class="d-flex justify-end" v-if="post.video.length">
          <v-btn
            @click="(showImages = true), (showVideo = false)"
            class="rounded-b-0"
            >Картинки</v-btn
          ><v-btn
            @click="(showImages = false), (showVideo = true)"
            class="rounded-b-0"
            >Видео</v-btn
          >
        </div>
        <div max-width="900" class="d-flex justify-center" v-if="showVideo">
          <video width="100%" controls ref="video">
            <source :src="post.video[0]" />
          </video>
        </div>
        <v-carousel
          v-if="showImages"
          :show-arrows="post.media.length > 1 ? true : false"
          :hide-delimiters="post.media.length > 1 ? false : true"
        >
          <v-carousel-item
            v-for="(item, i) in post.media"
            :key="i"
            :src="item"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>
        <div class="mt-8 px-8 white py-4 rounded-xl">
          <h1>
            {{ post.title }}
          </h1>
          <p class="my-4">{{ post.description }}</p>
          <v-row>
            <v-col cols="12" md="8" class="d-flex justify-center">
              <h3>{{ post.contacts }}</h3>
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-center">
              <v-btn text v-if="post.link" :href="post.link">
                Ссылка на телеграм
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col
        cols="3"
        xl="2"
        class="back rounded-xl"
        v-if="
          $vuetify.breakpoint.name == 'lg' || $vuetify.breakpoint.name == 'xl'
        "
      >
        <New
          v-for="post in oldPosts"
          :key="post._id"
          :post="post"
          class="mt-4"
          :isSmall="true"
      /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import New from "../components/New.vue";
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    post: {
      type: Object,
    },
  },
  components: {
    New,
  },
  data() {
    return {
      showVideo: false,
      showImages: true,
    };
  },
  computed: {
    ...mapGetters(["oldPosts", "newPosts"]),
    ...mapState(["posts"]),
  },
  mounted: async function () {
    if (await this.post) {
      console.log(this.post.video.length);
    }
  },
};
</script>

<style scoped>
.back {
  background-color: #f4d03f;
  background-image: linear-gradient(132deg, #f4d03f 0%, #16a085 100%);
}
</style>
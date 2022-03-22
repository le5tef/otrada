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
          :height="
            $vuetify.breakpoint.name == 'xs' || $vuetify.breakpoint.name == 'sm'
              ? 250
              : 400
          "
          v-if="showImages"
          :show-arrows="post.media.length > 1 ? true : false"
          :hide-delimiters="post.media.length > 1 ? false : true"
        >
          <v-carousel-item
            v-for="item in post.media"
            :key="item"
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
          <p v-html="post.description" class="my-4"></p>
          <v-row>
            <v-col cols="12" md="8" class="d-flex justify-center">
              <h3>{{ post.contacts }}</h3>
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-center">
              <v-btn text v-if="post.link" :href="post.link"> Ссылка </v-btn>
            </v-col>
          </v-row>
        </div>
        <div
          class="white rounded-xl mt-4 pa-4"
          v-if="currentPostsComments.length"
        >
          <div
            class="my-2 pt-1 pb-2"
            v-for="(comment, i) in currentPostsComments"
            :key="i"
            :class="
              i == currentPostsComments.length - 1 ||
              currentPostsComments.length == 1
                ? ''
                : 'underline'
            "
          >
            <div class="d-flex flex-row align-center" v-if="!auth">
              <v-spacer></v-spacer>
              <v-btn @click="deleteCurrentComment(comment._id)" icon
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </div>
            <div class="d-flex flex-row align-center">
              <strong>{{ comment.author }}</strong>
              <v-spacer></v-spacer>
              <div>
                <v-icon
                  v-for="(star, i) in comment.rate"
                  :key="i"
                  style="color: rgb(255, 187, 0)"
                  >mdi-star</v-icon
                >
              </div>
            </div>
            <div v-html="comment.description"></div>
          </div>
        </div>
        <div class="white rounded-xl mt-4 pa-4">
          <v-btn
            @click="showComments = true"
            v-show="!showComments"
            text
            width="100%"
          >
            Добавить коментарий
          </v-btn>
          <div v-show="showComments">
            <div class="d-flex mb-2 align-center">
              Ваша оценка:
              <v-btn
                @mouseover="starHover(i + 1)"
                @click="setRate(i + 1)"
                icon
                v-for="(star, i) in 5"
                :key="star"
              >
                <v-icon :id="i + 1" style="color: grey">mdi-star</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text @click="showComments = false"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </div>
            <v-text-field
              v-model="name"
              solo
              placeholder="Ваше имя"
              clearable
            ></v-text-field>
            <ckeditor :editor="editor" v-model="editorData"></ckeditor>
            <v-btn @click="add()" text width="100%"> Отправить </v-btn>
          </div>
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapState, mapGetters, mapActions } from "vuex";
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
      showComments: false,
      editor: ClassicEditor,
      name: "",
      editorData: "",
      rate=0,
      auth: false,
    };
  },
  methods: {
    ...mapActions(["createComment", "deleteComment"]),
    starHover(val) {
      for (let i = 1; i <= 5; i++) {
        document.getElementById(i).style.color = "grey";
      }
      for (let i = 1; i <= val; i++) {
        document.getElementById(i).style.color = "rgb(255, 187, 0)";
      }
    },
    setRate(val) {
      this.rate = val;
    },
    add() {
      var comment = {
        description: this.editorData,
        post_id: this.post.id,
        author: this.name,
        rate: this.rate,
      };
      let config = { comment: comment, post_id: this.post.id };
      this.createComment(config);
      this.name = "";
      this.rate = 0;
      this.editorData = "";
    },
    deleteCurrentComment(id) {
      var config = { id: id, post_id: this.post.id };
      this.deleteComment(config);
    },
    async check() {
      const resp = await this.$store.dispatch("checkPassword");
      if (resp.data == "ok") {
        this.auth = true;
      }
    },
  },
  computed: {
    ...mapGetters(["oldPosts", "newPosts"]),
    ...mapState(["posts", "currentPostsComments"]),
  },
  mounted() {
    this.$store.dispatch("fetchComments", this.post.id);
  },
  watch: {
    post: {
      deep: true,
      handler() {
        console.log("поменялась");
        this.$store.dispatch("fetchComments", this.post.id);
      },
    },
  },
};
</script>

<style scoped>
.back {
  background-color: #f4d03f;
  background-image: linear-gradient(132deg, #f4d03f 0%, #16a085 100%);
}
.star:hover {
  color: rgb(255, 187, 0);
}
.underline {
  -webkit-box-shadow: 0px 2px 0px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 2px 0px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 2px 0px 0px rgba(34, 60, 80, 0.2);
}
</style>
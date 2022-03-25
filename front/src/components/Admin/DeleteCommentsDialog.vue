<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn width="300px" dark v-bind="attrs" v-on="on">
          Удалить комменты
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Удалить комменты</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-row>
            <v-col cols="6">
              <v-btn
                width="100%"
                v-for="post in posts"
                @click="fetchComments(post._id)"
                :key="post._id"
                >{{
                  post.title.length > 18
                    ? post.title.slice(0, 18) + "..."
                    : post.title
                }}</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-checkbox
                v-for="comment in currentPostsComments"
                :key="comment._id"
                :value="comment"
                multiple
                v-model="dialogm1"
              >
                <template v-slot:label>
                  <div v-html="comment.description"></div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Закрыть
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteSelectedComments()">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      dialogm1: [],
      dialog: false,
      post: "",
    };
  },
  methods: {
    ...mapActions(["deleteComment", "fetchComments"]),
    async deleteSelectedComments() {
      for (let i = 0; i < this.dialogm1.length; i++) {
        var config = {
          id: this.dialogm1[i]._id,
          post_id: this.dialogm1[i].post_id,
        };
        await this.deleteComment(config);
      }
    },
    getCurrentPost(id) {
      return this.posts.find((x) => {
        return x._id == id;
      });
    },
  },
  watch: {
    post: {},
  },
  computed: {
    ...mapState(["currentPostsComments", "posts"]),
  },
};
</script>

<style scoped>
</style>
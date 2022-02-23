<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn width="300px" dark v-bind="attrs" v-on="on">
          Удалить пост
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Выберите пост</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-checkbox
            v-for="post in posts"
            :key="post.id"
            v-model="dialogm1"
            :label="post.title"
            :value="post._id"
          ></v-checkbox>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Закрыть
          </v-btn>
          <v-btn color="blue darken-1" text @click="del()"> Удалить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["posts"]),
  },
  methods: {
    ...mapActions(["deletePosts"]),
    del() {
      if (this.dialogm1.length > 0) {
        this.deletePosts(this.dialogm1);
        this.dialogm1 = [];
        this.dialog = false;
      }
    },
  },
  data() {
    return {
      dialogm1: [],
      dialog: false,
    };
  },
};
</script>
<template>
  <div style="background: white">
    <v-container style="height: 100vh">
      <v-row v-if="!auth" class="fill-height">
        <v-col
          cols="7"
          sm="8"
          md="5"
          lg="4"
          offset-md="2"
          offset-lg="3"
          class="d-flex align-center"
        >
          <v-text-field
            hide-details
            v-model="password"
            label="Пароль"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col
          cols="5"
          sm="4"
          md="3"
          lg="2"
          class="d-flex align-center justify-center"
        >
          <v-btn @click="authification(password)">Войти</v-btn>
        </v-col>
      </v-row>
      <div
        v-if="auth"
        class="admin__wrapper fill-height d-flex align-center justify-center"
      >
        <div>
          <CreatePost class="my-2" />
          <CreateBack class="my-2" />
          <CreateCategory class="my-2" />
          <DeleteBack class="my-2" />
          <DeletePost class="my-2" />
          <DeleteCategory class="my-2" />
          <DeleteComments class="my-2" />
          <v-btn width="100%" @click="logout()">ВЫЙТИ</v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import CreatePost from "../components/Admin/CreatePostDialog.vue";
import CreateBack from "../components/Admin/CreateBackDialog.vue";
import DeleteBack from "../components/Admin/DeleteBackDialog.vue";
import DeletePost from "../components/Admin/DeletePostDialog.vue";
import CreateCategory from "../components/Admin/CreateCategoryDialog.vue";
import DeleteCategory from "../components/Admin/DeleteCategoryDialog.vue";
import DeleteComments from "../components/Admin/DeleteCommentsDialog.vue";
export default {
  components: {
    CreatePost,
    CreateBack,
    DeleteBack,
    DeletePost,
    CreateCategory,
    DeleteCategory,
    DeleteComments,
  },
  methods: {
    async authification(pass) {
      localStorage.setItem("pass", pass);
      this.check();
    },
    logout() {
      localStorage.setItem("pass", "");
      this.auth = false;
    },
    async check() {
      const resp = await this.$store.dispatch("checkPassword");
      if (resp.data == "ok") {
        this.auth = true;
      }
    },
  },
  data() {
    return {
      auth: false,
      password: "",
    };
  },
  mounted: function () {
    this.check();
  },
};
</script>


<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn width="300px" dark v-bind="attrs" v-on="on">
          Добавить фон
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Добавить фон</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-file-input
                    clearable
                    truncate-length="19"
                    v-model="files"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Закрыть
          </v-btn>
          <v-btn color="blue darken-1" text @click="add()"> Создать </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    deletePostDialog: false,

    files: "",
  }),
  methods: {
    ...mapActions(["createBack"]),
    add() {
      const valid = this.$refs.form.validate();
      if (valid && !!this.files) {
        var media = this.files;
        this.createBack(media);
        this.$refs.form.reset();
      }
    },
  },
  computed: {
    ...mapGetters(["adsCategories", "newsCategories"]),
    categories() {
      return (
        this.type == "Новость" ? this.newsCategories : this.adsCategories
      ).map((x) => {
        return {
          text: x.title,
          value: x._id,
        };
      });
    },
  },
};
</script>
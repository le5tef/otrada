<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn width="300px" dark v-bind="attrs" v-on="on">
          Удалить категорию
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Удалить категорию</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-select
            :items="categories"
            v-model="type"
            label="Выберите тип записи"
          >
          </v-select>
          <div v-if="type == 'Реклама'">
            <v-checkbox
              v-for="add in adsCategories"
              :key="add.id"
              :label="add.title"
              :value="add._id"
              v-model="dialogm1"
            ></v-checkbox>
          </div>
          <div v-if="type == 'Новость'">
            <v-checkbox
              v-for="news in newsCategories"
              :key="news.id"
              :label="news.title"
              :value="news._id"
              v-model="dialogm2"
            ></v-checkbox>
          </div>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      add: "",
      news: "",
      type: "",
      dialogm1: [],
      dialogm2: [],
      dialog: false,
      categories: ["Новость", "Реклама"],
    };
  },
  methods: {
    ...mapActions(["deleteCategories"]),
    del() {
      if (this.dialogm2.length > 0 || this.dialogm1.length > 0) {
        var categories = [...this.dialogm2, ...this.dialogm1];
        console.log(categories);
        this.deleteCategories(categories);
        this.dialogm2 = [];
        this.dialogm1 = [];
        this.dialog = false;
      }
    },
  },

  computed: {
    ...mapGetters(["newsCategories", "adsCategories"]),
  },
};
</script>
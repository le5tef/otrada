<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn width="300px" dark v-bind="attrs" v-on="on">
          Создать категорию
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Создать категорию</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-select
                  label="Тип записи"
                  v-model="type"
                  :items="categories"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  required
                  v-model="title"
                  label="Название категории"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Закрыть
          </v-btn>
          <v-btn color="blue darken-1" text @click="add()"> Добавить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    title: "",
    type: "",
    categories: ["Реклама", "Новость"],
    dialog: false,
  }),
  methods: {
    ...mapActions(["createCategory"]),
    add() {
      if (this.type && this.title) {
        var category = {
          title: this.title,
          type: this.type,
        };
        this.title = "";
        this.createCategory(category);
      }
    },
  },
};
</script>
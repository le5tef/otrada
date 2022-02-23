<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn width="300px" dark v-bind="attrs" v-on="on">
          Создать пост
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Создать пост</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    :rules="rules"
                    label="Название поста"
                    v-model="title"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    filled
                    :rules="rules"
                    name="input-7-4"
                    label="Текст поста"
                    v-model="description"
                  ></v-textarea> </v-col
                ><v-col cols="12">
                  <v-checkbox
                    v-model="checkbox"
                    label="Будет ли отображаться пост на баннере"
                  ></v-checkbox
                ></v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Контакты"
                    :rules="rules"
                    v-model="contacts"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    placeholder="https://t.me"
                    label="Ссылка на телеграм"
                    v-model="link"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    clearable
                    multiple
                    :rules="[() => !!files.length]"
                    truncate-length="19"
                    v-model="files"
                  ></v-file-input>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    :items="['Новость', 'Реклама']"
                    label="Новость или реклама"
                    required
                    :rules="rules"
                    v-model="type"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="categories"
                    label="Категория"
                    :rules="rules"
                    :disabled="!type"
                    v-model="subcategory"
                  ></v-select>
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
    title: "",
    description: "",
    checkbox: false,
    subcategory: "",
    contacts: "",
    link: "",
    dialog: false,
    type: "Новость",
    files: [],
    rules: [(v) => !!v || "Не заполнено"],
  }),
  methods: {
    ...mapActions(["createPost"]),
    add() {
      const valid = this.$refs.form.validate();
      if (valid) {
        var post = {
          title: this.title,
          description: this.description,
          type: this.type,
          isMain: !!this.checkbox,
          subcategory: this.subcategory,
          contacts: this.contacts,
          link: this.link,
          media: this.files,
        };

        this.createPost(post);
        // this.$refs.form.reset();
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
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="700px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn width="300px" dark v-bind="attrs" v-on="on">
          Изменить баннер
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Изменение баннера</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-input
                    placeholder="Текст над баннером"
                    class="ckeditor"
                    :rules="rules"
                    v-model="description"
                  >
                    <ckeditor :editor="editor" v-model="description"></ckeditor>
                  </v-input>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    clearable
                    :rules="[() => !!bannerFile]"
                    truncate-length="19"
                    v-model="bannerFile"
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
          <v-btn color="blue darken-1" text @click="add()"> Изменить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapActions } from "vuex";
export default {
  data: () => ({
    description: "",
    dialog: false,
    editor: ClassicEditor,
    bannerFile: null,
    rules: [(v) => !!v || "Не заполнено"],
  }),
  methods: {
    ...mapActions(["changeBanner"]),
    add() {
      const valid = this.$refs.form.validate();
      const descriptionValid = !!this.description;
      if (valid && descriptionValid) {
        var banner = {
          title: this.description,
          media: this.bannerFile,
        };

        this.changeBanner(banner);
        this.$refs.form.reset();
        this.description = "";
      }
    },
  },
};
</script>

<style scoped>
.ckeditor >>> .v-input__slot {
  display: block !important;
}
</style>
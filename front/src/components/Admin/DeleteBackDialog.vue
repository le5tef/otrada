<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn width="300px" dark v-bind="attrs" v-on="on"> Удалить фон </v-btn>
      </template>
      <v-card>
        <v-card-title>Удалить фон</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <div
            v-for="back in backs"
            :key="back.id"
            class="d-flex my-4 align-center"
          >
            <v-img width="150" :src="getImage(back)" class="mr-2"></v-img>
            <v-checkbox
              v-model="dialogm1"
              :label="back.title"
              :value="back._id"
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
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      dialogm1: [],
      dialog: false,
    };
  },
  methods: {
    getImage(back) {
      return process.env.VUE_APP_STATIC_BASE + back.src;
    },
    ...mapActions(["deleteBacks"]),
    del() {
      if (this.dialogm1.length > 0) {
        this.deleteBacks(this.dialogm1);
        this.dialogm1 = [];
        this.dialog = false;
      }
    },
  },

  computed: {
    ...mapState(["backs"]),
  },
};
</script>
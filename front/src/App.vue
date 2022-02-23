<template>
  <v-app>
    <div
      id="random2"
      v-if="backs"
      :style="{ backgroundImage: `url(${getBack})` }"
    >
      <!-- :style="{ backgroundImage: url(`${getBack}`) } -->
      <v-main class="wrapper" id="random">
        <Header v-if="$route.path != '/admin/'" />

        <router-view></router-view>
        <Footer v-if="$route.path != '/admin/'" />
      </v-main>
    </div>
  </v-app>
</template>
<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    ...mapActions(["fetchData"]),
  },
  mounted() {
    this.$store.dispatch("fetchData");
    this.$store.dispatch("fetchBacks");
    this.$store.dispatch("fetchCategories");
  },
  computed: {
    ...mapState(["backs"]),
    getBack() {
      var arr = this.backs
        .map((back) => {
          back = back.src;

          return back;
        })
        .map((x) => {
          return process.env.VUE_APP_STATIC_BASE + x;
        });

      var random = Math.floor(Math.random() * arr.length);
      var bigSize = [...arr];
      return bigSize[random];
    },
  },
};
</script>

<style scoped>
#random2 {
  background: no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
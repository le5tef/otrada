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
    this.$store.dispatch("fetchWeather");
    this.$store.dispatch("fetchExchange");
    this.$store.dispatch("fetchBanner");
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

<style>
#random2 {
  background: no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.gradient {
  background-image: linear-gradient(132deg, #f4d03f81 0%, #16a085 100%);
}
</style>
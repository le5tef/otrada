<template>
  <div>
    <News />
    <TelegramDialog v-show="!wasHere" @close-dialog="closeDialog" />
  </div>
</template>

<script>
import News from "../components/News.vue";
import TelegramDialog from "../components/TelegramDialog.vue";
export default {
  name: "App",
  mounted() {
    if (JSON.parse(localStorage.getItem("wasHere")) != true) {
      localStorage.setItem("wasHere", JSON.stringify(false));
    }
    this.wasHere = JSON.parse(localStorage.getItem("wasHere"));
  },
  components: {
    News,
    TelegramDialog,
  },
  methods: {
    closeDialog(val) {
      localStorage.setItem("wasHere", JSON.stringify(val));
      this.wasHere = val;
    },
  },
  data: () => ({
    wasHere: false,
  }),
};
</script>

<style scoped>
#app {
  background: #e2f0d9;
}
</style>

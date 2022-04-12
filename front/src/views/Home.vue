<template>
  <div>
    <News />
    <TelegramDialog v-show="dialog" @close-dialog="closeDialog(false)" />
  </div>
</template>

<script>
import News from "../components/News.vue";
import TelegramDialog from "../components/TelegramDialog.vue";
export default {
  name: "App",

  components: {
    News,
    TelegramDialog,
  },
  methods: {
    closeDialog(val) {
      this.dialog = val;
    },
  },
  data: () => ({
    dialog: true,
  }),
};
</script>

<style scoped>
#app {
  background: #e2f0d9;
}
</style>

<template>
  <div>
    <News />
  </div>
</template>

<script>
import News from "../components/News.vue";
export default {
  name: "App",

  components: {
    News,
  },

  data: () => ({}),
};
</script>

<style scoped>
#app {
  background: #e2f0d9;
}
</style>

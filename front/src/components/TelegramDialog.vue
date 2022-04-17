<template>
  <div>
    <!-- <v-btn @click="dialog = true">Запустить прелоадер</v-btn> -->
    <div class="wrapper" v-if="banner">
      <div class="gradient pa-16 d-flex flex-column rounded-xl">
        <div class="d-flex">
          <v-spacer />
          <v-btn icon text @click="$emit('close-dialog', true)">
            <v-icon color="red" size="40"> mdi-close </v-icon>
          </v-btn>
        </div>
        <v-img
          v-if="!banner.isVideo"
          :src="banner.media"
          :max-height="
            $vuetify.breakpoint.name == 'xs'
              ? 300
              : $vuetify.breakpoint.name == 'sm'
              ? 400
              : 500
          "
          :max-width="
            $vuetify.breakpoint.name == 'xs'
              ? 300
              : $vuetify.breakpoint.name == 'sm'
              ? 450
              : 600
          "
        />
        <video
          loop
          :width="
            $vuetify.breakpoint.name == 'xs'
              ? 300
              : $vuetify.breakpoint.name == 'sm'
              ? 450
              : 600
          "
          v-if="banner.isVideo"
          :src="banner.media"
          autoplay
          muted
        ></video>
        <div
          v-html="banner.title"
          class="mt-4"
          style="color: white; font-size: 20px"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["banner"]),
  },
};
</script>

<style scoped>
.wrapper {
  position: fixed;
  background: rgba(0, 0, 0, 0.115);
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.animate__animated.animate__shakeY {
  --animate-duration: 2500ms;
}
</style>
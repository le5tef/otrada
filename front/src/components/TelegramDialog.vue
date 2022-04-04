<template>
  <div>
    <!-- <v-btn @click="dialog = true">Запустить прелоадер</v-btn> -->
    <div class="wrapper">
      <div class="gradient pa-16 d-flex flex-column rounded-xl">
        <v-btn
          height="50"
          text
          class="white mb-2"
          href="https://t.me/otradalesnaya"
          target="_blank"
          >У нас есть телеграмм канал
          <v-img height="50" width="50" src="../assets/telegram.png" />
        </v-btn>
        <v-btn class="white" text @click="$emit('close-dialog', true)"
          >Закрыть</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
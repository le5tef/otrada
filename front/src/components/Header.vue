<template>
  <div class="d-flex justify-center mt-2">
    <router-link :to="{ name: 'Home' }">
      <div class="back px-6 rounded-xl">
        <v-img max-width="270px" src="../assets/logo.png" />
      </div>
    </router-link>
  </div>
</template>
<style scoped>
.back {
  background-image: linear-gradient(132deg, #f4d03f81 0%, #16a085 100%);
}
</style>
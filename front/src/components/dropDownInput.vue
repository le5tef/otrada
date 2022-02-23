<template>
  <v-row align="center" class="no-gutters">
    <v-col class="d-flex" cols="12" sm="6" md="4" offset-md="8">
      <v-select
        hide-details
        clearable
        :items="items"
        label="Категория"
        solo
      ></v-select>
    </v-col>
  </v-row>
</template>


<script>
export default {
  data: () => ({
    items: ["Дизайн интерьера", "Б/У Вещи", "Электричество"],
  }),
};
</script>
<template>
  <div>
    <New :post="post" v-if="post" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import New from "../components/detailedNew.vue";
export default {
  components: { New },
  props: { id: {} },
  computed: {
    ...mapState(["posts"]),
    post() {
      return this.posts.find((x) => {
        return x.id == this.id;
      });
    },
  },
};
</script>
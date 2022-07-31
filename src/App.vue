<template>
  <HeaderView />
  <main class="container">
    <RouterView />
  </main>
</template>

<script>
import HeaderView from "./views/HeaderView.vue";
export default {
  components: {
    HeaderView,
  },
};
</script>

<style scoped>
main {
  margin-bottom: 100px;
}
</style>

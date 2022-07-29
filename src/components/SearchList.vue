<template>
  <div class="c-search-list">
    APOD list
    <div v-for="apod in list" :key="apod.date">
      {{ apod }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.c-search-list {
  position: relative;
}
</style>

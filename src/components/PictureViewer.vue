<template>
  <div class="c-picture-viewer" target="_blank">
    <a :href="fullUrl">
      <img :src="imgUrl" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: "",
    },
    fullUrl: {
      type: String,
      default: "",
    },
  },
};
</script>

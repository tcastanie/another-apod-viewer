<template>
  <iframe :src="videoUrl"></iframe>
</template>

<script>
export default {
  props: {
    videoUrl: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
iframe {
  width: 100%;
  height: var(--max-picture-height);
}
</style>

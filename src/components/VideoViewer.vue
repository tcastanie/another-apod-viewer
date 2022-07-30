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

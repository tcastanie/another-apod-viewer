<script setup lang="ts">
definePageMeta({
  pageTransition: {
    onAfterLeave() {
      useLoadings().stopAllLoadings()
    },
  },
})
</script>

<template>
  <ApodViewer />
</template>

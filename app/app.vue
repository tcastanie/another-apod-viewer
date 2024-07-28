<template>
  <NuxtLoadingIndicator color="orange" :height="1" />
  <UContainer as="main" class="pt-4 pb-20">
    <NuxtPage />
  </UContainer>
  <TheFooter />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.6s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>

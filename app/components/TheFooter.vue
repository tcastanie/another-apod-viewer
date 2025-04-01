<script lang="ts" setup>
const modalAbout = ref(false)
</script>

<template>
  <footer class="bg-gray-900 fixed bottom-0 w-full">
    <div class="px-4 sm:px-6 lg:px-8 py-2 lg:py-4 md:flex md:items-center md:justify-between sm:gap-x-3">
      <div class="flex items-center justify-center md:order-2">
        <LazyDateWidget hydrate-on-idle />
      </div>
      <div class="mt-0 flex items-center justify-center md:justify-start md:flex-1 gap-x-4 md:order-1">
        <NuxtLink to="/" class="text-xl">
          Another APOD viewer
        </NuxtLink>
        <UButton
          icon="i-ph-info"
          variant="link"
          color="gray"
          @click="modalAbout = true"
        />
        <UModal v-model="modalAbout" :ui="{ width: 'md:max-w-3xl' }">
          <TheAbout @close="modalAbout = false" />
        </UModal>
      </div>
      <div class="mt-0 hidden md:flex md:flex-1 items-center justify-center md:justify-end gap-x-1.5 md:order-3">
        <UButton
          icon="i-ph-github-logo-bold"
          color="gray"
          variant="ghost"
          to="https://github.com/tcastanie/another-apod-viewer"
          target="_blank"
        />
        <UButton
          icon="i-ph-planet-bold"
          color="gray"
          variant="ghost"
          to="https://tcastanie.dev"
          target="_blank"
        />
      </div>
    </div>
  </footer>
</template>

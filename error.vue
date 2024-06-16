<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <UCard :ui="{ base: 'mx-auto text-center' }">
      <template #header>
        <UiH1>{{ error.statusCode }}</UiH1>
      </template>
      <UiP v-if="error.statusCode === 404">
        You got lost in space and found a <b>dead link</b> 😱
        <NuxtImg
          src="/404-space-link.jpg"
          alt="dead link in space"
          width="512"
          height="512"
          class="rounded mt-4"
        />
      </UiP>
      <UiP v-else>
        {{ error.message }}
      </UiP>
      <template #footer>
        <UButton icon="i-ph-flying-saucer" @click="handleError">
          Go back to earth
        </UButton>
      </template>
    </UCard>
  </div>
</template>

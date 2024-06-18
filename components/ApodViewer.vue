<script lang="ts" setup>
import type { Apod } from '~/types'

const { formattedFullDate } = useDateWidget()

const { date } = defineProps<{ date?: string }>()

const { data, error, status } = await useLazyFetch<Apod>(`/api/apod`, {
  query: { date },
  server: false,
  timeout: 10000,
})

const openImage = async (url?: string) => {
  if (url) {
    await navigateTo(url, { external: true })
  }
}
</script>

<template>
  <div v-if="['pending', 'idle', 'error'].includes(status)">
    <USkeleton class="w-full h-[350px] xl:h-[650px] mb-8" />
    <UAlert
      v-if="error"
      :title="`Error ${error.statusCode} ${error.statusMessage || error.message.includes('aborted') ? 'Nasa API is most likely down' : error.message}`"
      :description="JSON.stringify(error.data, null, 4)"
      icon="i-ph-warning-octagon"
      color="red"
      variant="subtle"
      :ui="{ description: 'whitespace-pre font-mono' }"
    />
    <UProgress
      v-if="['pending', 'idle'].includes(status)"
      animation="swing"
      size="xl"
      :max="['Fetching data from NASA API...']"
    />
  </div>
  <div v-else class="flex flex-col gap-8">
    <template v-if="data?.media_type === 'image'">
      <NuxtImg
        :src="data.url"
        :alt="data.title"
        :class="[{ 'cursor-pointer': data?.hdurl }, 'mx-auto rounded-md']"
        @click="openImage(data.hdurl)"
      />
    </template>
    <iframe
      v-else-if="data?.media_type === 'video'"
      :src="data.url"
      class="w-full rounded-md h-[350px] xl:h-[650px]"
    />
    <div v-if="data" class="flex flex-col">
      <div class="mb-3 text-sm/6 font-semibold text-primary flex items-center gap-1.5">
        {{ formattedFullDate }}
      </div>
      <UiH1>{{ data.title }}</UiH1>
      <UiP v-if="data.explanation" class="mt-4">
        {{ data.explanation }}
      </UiP>
      <UiP v-if="data.copyright" class="mt-4 flex items-center ring-1 ring-gray-800 rounded w-fit px-2">
        <UIcon name="i-ph-copyright" class="inline-block mr-2" />
        <span>{{ data.copyright }}</span>
      </UiP>
    </div>
    <DevOnly>
      <pre class="max-w-full overflow-x-auto">{{ JSON.stringify(data, null, 2) }}</pre>
      <pre class="max-w-full overflow-x-auto">{{ JSON.stringify(error, null, 2) }}</pre>
    </DevOnly>
  </div>
</template>

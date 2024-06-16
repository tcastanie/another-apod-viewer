<script lang="ts" setup>
import type { Apod } from '~/types'

const { formattedFullDate } = useDateWidget()

const { date } = defineProps<{ date?: string }>()

const { data, error } = await useFetch<Apod>(`/api/apod`, {
  query: { date },
})

const openImage = async (url?: string) => {
  if (url) {
    await navigateTo(url, { external: true })
  }
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <DevOnly v-if="0">
      <pre class="max-w-full overflow-x-hidden">{{ JSON.stringify(data, null, 2) }}</pre>
    </DevOnly>
    <UAlert
      v-if="error?.data"
      :title="'Error ' + error.data.code"
      :description="error.data.msg"
      icon="i-ph-warning-octagon"
      color="red"
      variant="outline"
    />
    <template v-if="data?.media_type === 'image'">
      <NuxtImg
        :src="data.url"
        :alt="data.title"
        class="max-h-[650px]"
        :class="[{ 'cursor-pointer': data?.hdurl }, 'mx-auto rounded-md']"
        @click="openImage(data.hdurl)"
      />
    </template>
    <iframe
      v-else-if="data?.media_type === 'video'"
      :src="data.url"
      class="w-full rounded-md h-[650px]"
    />
    <div class="flex flex-col">
      <div class="mb-3 text-sm/6 font-semibold text-primary flex items-center gap-1.5">
        {{ formattedFullDate }}
      </div>
      <UiH1>{{ data?.title }}</UiH1>
      <UiP v-if="data?.explanation" class="mt-4">
        {{ data.explanation }}
      </UiP>
      <UiP v-if="data?.copyright" class="mt-4 flex items-center ring-1 ring-gray-800 rounded w-fit px-2">
        <UIcon name="i-ph-copyright" class="inline-block mr-2" />
        <span>{{ data.copyright }}</span>
      </UiP>
    </div>
  </div>
</template>

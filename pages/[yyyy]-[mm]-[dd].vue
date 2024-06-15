<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    const dayjs = useDayjs()
    const { yyyy, mm, dd } = route.params
    const day = dayjs(`${yyyy}-${mm}-${dd}`, 'YYYY-MM-DD', true)
    return day.isValid() && day.isBefore(dayjs())
  },
  pageTransition: {
    onAfterLeave() {
      useLoadings().stopAllLoadings()
    },
  },
})

const { yyyy, mm, dd } = useRoute().params
</script>

<template>
  <ApodViewer :date="$dayjs(`${yyyy}-${mm}-${dd}`).format('YYYY-MM-DD')" />
</template>

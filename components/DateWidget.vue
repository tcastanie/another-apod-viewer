<script lang="ts" setup>
const { date, formattedDate, goToDate } = useDateWidget()
const { datePickerLoading, prevLoading, nextLoading } = useLoadings()
const { prevDay, nextDay, prevDisabled, nextDisabled, handleButtonClick } = useButtonsWidget(date)
</script>

<template>
  <UButtonGroup orientation="horizontal">
    <UButton
      title="Previous day"
      aria-label="Go to previous day"
      icon="i-ph-arrow-left"
      color="gray"
      :to="`/${prevDay.format('YYYY-MM-DD')}`"
      :disabled="prevDisabled"
      :class="{ 'cursor-not-allowed opacity-50': prevDisabled }"
      :loading="prevLoading"
      @click="handleButtonClick('prev')"
    />
    <UPopover :popper="{ placement: 'top' }">
      <UButton
        aria-label="Select date"
        icon="i-ph-calendar-dots"
        :label="formattedDate"
        :loading="datePickerLoading"
      />
      <template #panel="{ close }">
        <DatePicker
          v-model="date"
          is-required
          :max-date="$dayjs().toDate()"
          :min-date="$dayjs('1995-06-16').toDate()"
          @update:model-value="goToDate"
          @close="close"
        />
      </template>
    </UPopover>
    <UButton
      title="Next day"
      aria-label="Go to next day"
      icon="i-ph-arrow-right"
      color="gray"
      trailing
      :to="`/${nextDay.format('YYYY-MM-DD')}`"
      :disabled="nextDisabled"
      :class="{ 'cursor-not-allowed opacity-50': nextDisabled }"
      :loading="nextLoading"
      @click="handleButtonClick('next')"
    />
  </UButtonGroup>
</template>

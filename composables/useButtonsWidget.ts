export const useButtonsWidget = (date: Ref<Date>) => {
  const dayjs = useDayjs()

  const { prevLoading, nextLoading } = useLoadings()

  const prevDay = computed(() => dayjs(date.value).subtract(1, 'day'))
  const nextDay = computed(() => dayjs(date.value).add(1, 'day'))
  const prevDisabled = computed(() => {
    return prevDay.value.subtract(1, 'day').isBefore(dayjs('1995-06-16'))
  })
  const nextDisabled = computed(() => {
    return nextDay.value.isAfter(dayjs())
  })

  const handleButtonClick = (type: 'prev' | 'next') => {
    if (type === 'prev' && !prevDisabled.value) {
      prevLoading.value = true
    } else if (type === 'next' && !nextDisabled.value) {
      nextLoading.value = true
    }
  }

  return { prevDay, nextDay, prevDisabled, nextDisabled, handleButtonClick }
}

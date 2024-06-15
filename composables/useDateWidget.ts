export const useDateWidget = () => {
  const dayjs = useDayjs()
  const route = useRoute()

  const { datePickerLoading } = useLoadings()

  const date = ref()

  watchImmediate(
    () => route.params,
    (params) => {
      const { yyyy, mm, dd } = params
      const day = dayjs(`${yyyy}-${mm}-${dd}`, 'YYYY-MM-DD', true)
      date.value = day.isValid() ? day.toDate() : new Date()
    },
  )

  // date display
  const { language } = useNavigatorLanguage()
  const formattedDate = computed(() => {
    return new Intl.DateTimeFormat(language.value).format(date.value)
  })

  const formattedFullDate = computed(() => {
    const options: Intl.DateTimeFormatOptions = { dateStyle: 'full' }
    const dateFull = new Intl.DateTimeFormat(language.value, options).format(date.value)
    return dateFull.charAt(0).toUpperCase() + dateFull.slice(1)
  })

  const goToDate = async (event: Date) => {
    const day = dayjs(event)
    datePickerLoading.value = true
    if (day.isToday()) {
      await navigateTo('/')
    } else {
      await navigateTo(`/${day.format('YYYY-MM-DD')}`)
    }
  }

  return { date, formattedDate, formattedFullDate, goToDate }
}

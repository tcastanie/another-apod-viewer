export const useLoadings = () => {
  const datePickerLoading = useState('datePickerLoading', () => false)
  const prevLoading = useState('prevLoading', () => false)
  const nextLoading = useState('nextLoading', () => false)
  const stopAllLoadings = () => {
    datePickerLoading.value = false
    prevLoading.value = false
    nextLoading.value = false
  }
  return { datePickerLoading, prevLoading, nextLoading, stopAllLoadings }
}

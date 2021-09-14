import { ref } from 'vue'
import type { Ref } from 'vue'

export default function useRestore (startDate: Ref<any>, endDate: Ref<any>) {
  const storeDates: Ref<any[]> = ref([])

  function saveDateValue () {
    storeDates.value = [
      startDate.value ? startDate.value.toString() : null,
      endDate.value ? endDate.value.toString() : null
    ]
  }

  function restoreDateValue () {
    const [start, end] = storeDates.value

    startDate.value = start ? new Date(start) : null
    endDate.value = end ? new Date(end) : null
  }

  return { saveDateValue, restoreDateValue }
}
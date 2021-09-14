import { ref } from 'vue'
import type { Ref } from 'vue'

export default function useRestore (startSelectDate: Ref<any>, endSelectDate: Ref<any>) {
  const storeDates: Ref<any[]> = ref([])

  function saveDateValue () {
    storeDates.value = [
      startSelectDate.value ? startSelectDate.value.toString() : null,
      endSelectDate.value ? endSelectDate.value.toString() : null
    ]
  }

  function restoreDateValue () {
    const [start, end] = storeDates.value

    startSelectDate.value = start ? new Date(start) : null
    endSelectDate.value = end ? new Date(end) : null
  }

  return { saveDateValue, restoreDateValue }
}
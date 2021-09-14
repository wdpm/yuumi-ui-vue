import { computed, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'

function useSelection ({ props, emit }: {
  props: { [x: string]: any }
  emit: Function
}) {
  const selections: Ref<any[]> = ref([])

  // -1:unchecked  0:partChecked  1: allChecked
  const selectionValue: ComputedRef<-1|0|1> = computed(() => {
    if (selections.value.length === 0 || !props.data || props.data.length === 0) return -1

    if (props.data.every((item: any) => selections.value.some(selection => selection === item))) {
      return 1
    }

    if (props.data.some((item: any) => selections.value.some(selection => selection === item))) {
      return 0
    }

    return -1
  })

  function selectionChanged ({ value, checked }: any) {
    if (value === -1) {
      toggleRowsSelection(props.data, checked)
      emit('selectAll', selections.value)
    } else {
      emit('select', {
        selections: selections.value,
        row: props.data[value]
      })

      toggleRowsSelection([props.data[value]], checked)
    }
  }

  function toggleRowsSelection (rows: any[], value: boolean) {
    rows.forEach(row => {
      const index = selections.value.findIndex(item => item === row)
      let selectionChange = false

      if (selectionChange = (value && index === -1)) {
        selections.value.push(row)
      } else if (selectionChange = (!value && index > -1)) {
        selections.value.splice(index, 1)
      }

      if (selectionChange) {
        emit('selectionChange', selections.value)
      }
    })
  }

  function clearSelection () {
    selections.value = []
  }

  return {
    selections,
    selectionValue,
    selectionChanged,
    toggleRowsSelection,
    clearSelection
  }
}

export default useSelection
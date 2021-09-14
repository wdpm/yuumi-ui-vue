import { isDefined } from '../../../share/validator'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'

export default function useChildren ({ getNodeChecked, getNodeChildren, rootProps }: any) {
  const childrenComponent: Ref<any[]> = ref([])
  const children: Ref<any> = ref(getNodeChildren())
  const isLeaf = computed(() => {
    if (children.value) {
      return children.value.length === 0
    }

    return isDefined(rootProps.loadData) ? false : true
  })

  const isChecked: Ref<boolean> = ref(nodeIsChecked())

  const isIndeterminate = computed(() => {
    if (isLeaf.value) return false
    if (childrenComponent.value.some(child => child.isIndeterminate)) return true
    return !isChecked.value && childrenComponent.value.some(child => child.isChecked)
  })

  const loadingState = ref({
    default: 0,
    success: 1,
    error: 2,
    loading: 99
  })
  const childrenLoadState: Ref<number> = ref(nodeChildrenLoadState())

  function updateChildrenLoadState (state: keyof typeof loadingState.value) {
    childrenLoadState.value = loadingState.value[state]
  }

  function nodeChildrenLoadState (): number {
    if (children.value) return loadingState.value.success

    return isDefined(rootProps.loadData) ? loadingState.value.default : loadingState.value.success
  }

  function nodeIsChecked (): boolean {
    if (childrenComponent.value.length) {
      return childrenComponent.value.every((child: any) => child.isChecked)
    }

    if (isLeaf.value || !isDefined(children.value)) {
      return getNodeChecked()
    }

    return children.value.every((child: any) => getNodeChecked(child))
  }

  return {
    childrenComponent,
    children,
    isLeaf,
    isChecked,
    isIndeterminate,
    loadingState,
    childrenLoadState,
    updateChildrenLoadState,
    nodeIsChecked
  }
}
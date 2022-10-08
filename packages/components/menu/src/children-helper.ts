import { isDefined } from '../../../share/validator'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'

export default function useChildren ({ getNodeChildren, rootProps }: any) {
  const childrenComponent: Ref<any[]> = ref([])
  const children: Ref<any> = ref(getNodeChildren())
  const isLeaf = computed(() => {
    if (children.value) {
      return children.value.length === 0
    }

    return isDefined(rootProps.loadData) ? false : true
  })

  return {
    childrenComponent,
    children,
    isLeaf
  }
}
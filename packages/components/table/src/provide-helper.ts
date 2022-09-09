import { getValueByPath } from '../../../share/helper'
import { ComponentInternalInstance, computed, ComputedRef, provide, VNode } from 'vue'
import { getColumnsFromSlot, getColumnStickyPositions, SticyPosition } from './columns-helper'
import { useScrollbar } from './scollbar-helper'
import { useSelection } from './selection-helper'

export const injectionKey = Symbol("")

export interface ProvideGetters {
  rootProps: ComputedRef<{[x:string]: any}>
  columns: ComputedRef<VNode[]>
  columnsStickyPosition: ComputedRef<(SticyPosition|null)[]>
  staticWidth: ComputedRef<number>
}

export function useProvide(instance: ComponentInternalInstance | null) {
  if (!instance) { throw new Error('current instance must be required')}

  const columns = computed(() => getColumnsFromSlot(instance.slots.default))
  const getters: ProvideGetters = {
    rootProps: computed(() => instance.props),
    columns,
    columnsStickyPosition: computed(() => getColumnStickyPositions(columns.value)),
    staticWidth: computed(() => columns.value.reduce((acc, item) => {
      const itemWidth = item.props!.width || getValueByPath<number>(item, 'type.props.width.default')
      return acc + itemWidth
    }, 0))
  }

  const scrollbar = useScrollbar()
  const selection = useSelection(instance.props, instance.emit)
  provide(injectionKey, {
    getters,
    scrollbar,
    selection
  })

  return {
    getters,
    scrollbar,
    selection
  }
}
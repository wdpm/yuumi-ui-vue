import { getValueByPath } from '../../../share/helper'
import { getColumnsFromDefaultSlot, getColumnStickyPositions } from './columns-helper'
import { computed, provide } from 'vue'
import type { SticyPosition } from './columns-helper'
import type { ComponentInternalInstance, ComputedRef, Ref, VNode } from 'vue'
import useStyle, { updateRectOptions, ScrollbarState, TableRect } from './style-helper'
import useSelection from './selecction-helper'

function useProvider (tableInstance: ComponentInternalInstance | null): UseProvider {
  if (!tableInstance) { throw new Error('tableInstance must be required')}

  const columns = computed(() => getColumnsFromDefaultSlot(tableInstance.slots.default))
  const { rect, updateRect, scrollbarState, updateScrollbarPositionState, scrollbarSize } = useStyle()
  const { selections, selectionValue, selectionChanged, toggleRowsSelection, clearSelection } = useSelection(tableInstance)

  const state: ProvideState = {
    rootProps: computed(() => tableInstance.props),
    columns,
    columnStickyPositions: computed(() => getColumnStickyPositions(columns.value)),
    staticWidth: computed(() => columns.value.reduce((acc, item) => {
      const itemWidth = item.props!.width || getValueByPath<number>(item, 'type.props.width.default')
      return acc + itemWidth
    }, 0)),
    rect,
    scrollbarState,
    scrollbarSize,
    selections,
    selectionValue,
    selectionChanged
  }

  provide('state', state)

  return Object.assign(state, {
    updateRect,
    updateScrollbarPositionState,
    toggleRowsSelection,
    clearSelection
  })
}

export default useProvider

export interface ProvideState {
  rootProps: ComputedRef<any>
  columns: ComputedRef<VNode[]>
  columnStickyPositions: ComputedRef<(SticyPosition|null)[]>
  staticWidth: ComputedRef<number>
  rect: TableRect
  scrollbarState: ScrollbarState
  scrollbarSize: ComputedRef<number[]>
  selections: Ref<any[]>
  selectionValue: Ref<-1|0|1>
  selectionChanged: Function
}

interface UseProvider extends ProvideState {
  updateRect: (options: updateRectOptions) => void
  updateScrollbarPositionState: (element: Element) => void
  toggleRowsSelection: (rows: any[], value: boolean) => void
  clearSelection: () => void
}
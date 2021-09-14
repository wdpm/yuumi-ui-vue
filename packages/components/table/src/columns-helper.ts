import { getValueByPath } from '../../../share/helper'
import { YuumiTableColumn } from '../index'
import type { Slot, VNode } from 'vue'

export function getColumnsFromDefaultSlot (slot?: Slot) {
  const fixedLeft: VNode[] = []
  const fixedRight: VNode[] = []
  const general: VNode[] = []

  function walker (vnodes: VNode[]) {
    vnodes.forEach((vnode) => {
      if (vnode.type.toString() === 'Symbol(Fragment)') {
        walker(vnode.children as VNode[] || [])
        return
      }

      if (getValueByPath(vnode, 'type.name') !== YuumiTableColumn.name) return

      if (vnode.props!.fixed === 'left') {
        fixedLeft.push(vnode)
      } else if (vnode.props!.fixed === 'right') {
        fixedRight.push(vnode)
      } else {
        general.push(vnode)
      }
    })
  }

  walker(slot ? slot() : [])

  return fixedLeft.concat(general, fixedRight)
}

export interface SticyPosition {
  isLast?: boolean
  isFirst?: boolean
  left?: number
  right?: number
}

export function getColumnStickyPositions (columns: VNode[]) {
  const positions: (SticyPosition|null)[] = Array(columns.length).fill(null)

  const leftColumns = columns.filter(item => item.props!.fixed === 'left')
  leftColumns.reduce((acc, item, index) => {
    const itemWidth = item.props!.width || getValueByPath<number>(item, 'type.props.width.default')
    positions.splice(index, 1, { left: acc, isLast: leftColumns.length -1 === index, isFirst: index === 0 })
    return acc + itemWidth
  }, 0)

  const rightColumns = columns.filter(item => item.props!.fixed === 'right')
  rightColumns.reverse().reduce((acc, item, index) => {
    const itemWidth = item.props!.width || getValueByPath<number>(item, 'type.props.width.default')
    positions.splice((columns.length - 1) - index, 1, { right: acc, isFirst: rightColumns.length -1 === index, isLast: index === 0 })
    return acc + itemWidth
  }, 0)

  return positions
}
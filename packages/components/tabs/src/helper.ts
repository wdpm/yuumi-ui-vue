import { getValueByPath } from '../../../share/helper'
import type { Slot, VNode } from 'vue'

export function getTabItemsFromSlot (childName: string, slot?: Slot) {
  const res: VNode[] = []

  function walker (vnodes: VNode[]) {
    vnodes.forEach((vnode) => {
      if (vnode.type.toString() === 'Symbol(Fragment)' || vnode.type.toString() === 'Symbol()') {
        walker(vnode.children as VNode[] || [])
        return
      }

      if (getValueByPath(vnode, 'type.name') !== childName) return
      res.push(vnode)
    })
  }

  walker(slot ? slot() : [])
  return res
}
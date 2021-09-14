import { getValueByPath } from '../../../share/helper'
import { getCurrentInstance } from 'vue'
import type { ComponentInternalInstance } from 'vue'

export interface SelectedItem {
  [x: string]: string
}

function useHelper () {
  const instance = getCurrentInstance()!
  const props = (instance.props || {}) as {[x:string]: any}
  const proxy = (instance.proxy || {}) as {[x:string]: any}

  function isLeaf (node: any) {
    return getValueByPath<number>(node, 'children.length', 0) === 0
  }

  function getNodeLabel (node: any) {
    return getValueByPath(node, props.optionKey.label)
  }

  function getNodeValue (node: any) {
    return getValueByPath(node, props.optionKey.value)
  }

  function getNodeDisabled (node: any) {
    return getValueByPath(node, props.optionKey.disabled)
  }

  function getSelectedByModelValue () {
    const selected: SelectedItem[]  = []
    if (!props.modelValue) return selected

    let children = props.options as (any[]|undefined)

    for (let i = 0; i < props.modelValue.length; i++) {
      if (!children) break

      const node = children.find(child => getNodeValue(child) === props.modelValue[i])
      if (!node) break

      selected.push({ label: getNodeLabel(node), value: getNodeValue(node) })
      children = node.children
    }

    return selected
  }

  function getMenusBySelected () {
    const menus: (any[])[] = []
    let children = props.options as (any[]|undefined)

    for (let i = 0; i <= proxy.selected.length; i++) {
      if (children) { menus.push(children) }
      if (!children || !proxy.selected[i]) break

      const node = children.find(child => getNodeValue(child) === proxy.selected[i].value)
      if (!node) break

      children = node.children
    }

    return menus
  }

  function selected2string (selected: SelectedItem[]) {
    return selected.map((item: any) => item.value).toString()
  }

  return {
    isLeaf,
    getNodeLabel,
    getNodeValue,
    getNodeDisabled,
    getSelectedByModelValue,
    getMenusBySelected,
    selected2string
  }
}

export default useHelper
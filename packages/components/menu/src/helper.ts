import { getValueByPath } from '../../../share/helper'
import { computed, getCurrentInstance } from 'vue'

export default function useHelper (rootProps: any) {
  const instance = getCurrentInstance()!
  const props = instance.props as {[x: string]: any}

  const optionKey = computed(() => Object.assign({
    label: 'label',
    value: 'value',
    children: 'children',
    expand: 'expand'
  }, rootProps.optionKey))

  function getNodeLabel () {
    return getValueByPath<string>(props.node, optionKey.value.label, '')
  }

  function getNodeValue () {
    return getValueByPath<any>(props.node, optionKey.value.value)
  }

  function getNodeChildren () {
    return getValueByPath<boolean>(props.node, optionKey.value.children)
  }

  function getNodeExpand () {
    return getValueByPath<boolean>(props.node, optionKey.value.expand, false)
  }

  function getSelectedNodeValue () {
    return getValueByPath<any>(rootProps.selectedNode, optionKey.value.value)
  }

  return {
    getNodeLabel,
    getNodeValue,
    getNodeChildren,
    getNodeExpand,
    getSelectedNodeValue
  }
}
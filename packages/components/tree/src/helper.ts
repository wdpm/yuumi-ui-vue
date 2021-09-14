import { getValueByPath } from '../../../share/helper'
import { isDefined } from '../../../share/validator'
import { computed, getCurrentInstance } from 'vue'

export default function useHelper (rootProps: any) {
  const instance = getCurrentInstance()!
  const props = instance.props as {[x: string]: any}

  const optionKey = computed(() => Object.assign({
    label: 'label',
    value: 'value',
    children: 'children',
    disabled: 'disabled',
    checked: 'checked',
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

  function getNodeDisabled () {
    return getValueByPath<boolean>(props.node, optionKey.value.disabled, false)
  }

  function getNodeChecked (node?: any) {
    return getValueByPath<boolean>(isDefined(node) ? node : props.node, optionKey.value.checked, false)
  }

  function getNodeExpand () {
    return getValueByPath<boolean>(props.node, optionKey.value.expand, false)
  }

  return {
    getNodeLabel,
    getNodeValue,
    getNodeChildren,
    getNodeDisabled,
    getNodeChecked,
    getNodeExpand
  }
}
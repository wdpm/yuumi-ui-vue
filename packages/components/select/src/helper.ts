import { getValueByPath } from '../../../share/helper'
import { getCurrentInstance } from 'vue'

function useHelper () {
  const instance = getCurrentInstance()!
  const props = (instance.props || {}) as {[x: string]: any}

  function getLabel (item: any) {
    return getValueByPath(item, props.optionKey.label, '')
  }

  function getValue (item: any) {
    return getValueByPath(item, props.optionKey.value, '')
  }

  return { getLabel, getValue }
}

export default useHelper
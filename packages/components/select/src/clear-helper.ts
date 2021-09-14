import { getCurrentInstance, ref } from 'vue'

function useClear () {
  const instance = getCurrentInstance()!
  const props = (instance.props || {}) as {[x: string]: any}

  const clearBtnVisible = ref(false)

  function clearHalk (beforeClear?: Function) {
    beforeClear && beforeClear()

    instance.emit('update:modelValue', null)
    if (props.modelValue !== null) instance.emit('change', null)

    clearBtnVisible.value = false
  }

  function tryHideClearBtn () {
    if (clearBtnVisible.value) {
      clearBtnVisible.value = false
    }
  }

  function tryShowclearBtn () {
    if (!props.modelValue?.toString()) return
    if (!props.clearable) return
    clearBtnVisible.value = true
  }

  return {
    clearBtnVisible,
    clearHalk,
    tryHideClearBtn,
    tryShowclearBtn
  }
}

export default useClear
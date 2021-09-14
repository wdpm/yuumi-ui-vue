import { getCurrentInstance, ref } from 'vue'

function useClear () {
  const instance = getCurrentInstance()!
  const props = (instance.props || {}) as {[x:string]: any}
  const proxy = (instance.proxy || {}) as {[x:string]: any}

  const clearBtnVisible = ref(false)

  function clearHalk (beforeClear?: Function) {
    const value = beforeClear ? beforeClear() : undefined

    instance.emit('update:modelValue', value)
    if ((props.modelValue || '').toString() !== (value || '').toString()) {
      instance.emit('change', value)
    }

    clearBtnVisible.value = false
  }

  function tryHideClearBtn () {
    if (clearBtnVisible.value) {
      clearBtnVisible.value = false
    }
  }

  function tryShowclearBtn () {
    if (!proxy.startDate?.toString()) return
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
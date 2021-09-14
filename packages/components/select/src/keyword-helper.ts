import { computed, getCurrentInstance, ref } from 'vue'

function useKeyword () {
  const instance = getCurrentInstance()!
  const props = (instance.props || {}) as {[x: string]: any}
  const proxy = (instance.proxy || {}) as {[x: string]: any}

  const keywordPlaceholder = computed(() => {
    return proxy.labelSpans[0] || props.placeholder
  })

  const keyword = ref('')

  function onKeywordInput (e: Event) {
    const target = e.target as HTMLInputElement
    keyword.value = target.value
  }

  const validOptions = computed(() => {
    if (!keyword.value) return props.options

    return props.options.filter((item: any) => {
      return props.filterMethod ? props.filterMethod(item, keyword.value) : proxy.getLabel(item).indexOf(keyword.value) > -1
    })
  })

  function keywordInputFocus () {
    (instance.refs.keywordInput as HTMLElement).focus()
    keyword.value = ''
  }

  function restoreKeywordValue () {
    const _value = proxy.labelSpans.toString()

    if (_value !== keyword.value) {
      keyword.value = _value
    }
  }

  return {
    keywordPlaceholder,
    keyword,
    onKeywordInput,
    validOptions,
    keywordInputFocus,
    restoreKeywordValue
  }
}

export default useKeyword
import { getCurrentInstance, nextTick, ref } from 'vue'
import { Ref } from 'vue'

interface OptionItem {
  [x: string]: any
}

export default function useOptins (selectedItems: Ref<any[]>) {
  const instance = getCurrentInstance()!
  const props = (instance.props || {}) as {[x: string]: any}
  const proxy = (instance.proxy || {}) as {[x: string]: any}

  function getOptionItemIndexInSelected (data: OptionItem) {
    return selectedItems.value.findIndex(item => proxy.getValue(item) === proxy.getValue(data))
  }

  function _onSelectItemWithMultiple (data: OptionItem) {
    const index = getOptionItemIndexInSelected(data)
    index > -1 ? selectedItems.value.splice(index, 1) : selectedItems.value.push(data)

    const value = selectedItems.value.map((item: any) => proxy.getValue(item))
    instance.emit('update:modelValue', value.length ? value : null)
    instance.emit('change', value.length ? selectedItems.value : null)

    if (proxy.isActivedState) {
      nextTick(() => {
        const { popper } = proxy.popperComponent
        popper?.forceUpdate()
      })
    }
  }

  function _onSelectItemWithSingle (data: OptionItem) {
    const newValue = proxy.getValue(data)
    if (newValue === props.modelValue) return

    selectedItems.value = [data]
    instance.emit('update:modelValue', newValue)
    instance.emit('change', data)

    nextTick(() => {
      const { hidePoper } = proxy.popperComponent
      hidePoper && hidePoper()
    })
  }

  function onSelectItem (data: OptionItem, e?: MouseEvent) {
    props.multiple ? _onSelectItemWithMultiple(data) : _onSelectItemWithSingle(data)
  }

  function removeSelectedByIndex (index: number, e: MouseEvent) {
    e.stopPropagation()
    _onSelectItemWithMultiple(selectedItems.value[index])
  }

  function onScrollInit (vm: any) {
    const scrollElement = vm.$el
    const optionItemElement = scrollElement.querySelector('.option-item.__selected')

    if (optionItemElement) {
      vm.$refs.body.scrollTop = optionItemElement.getBoundingClientRect().top - scrollElement.getBoundingClientRect().top
    }
  }

  const optionsMinWidth = ref(0)

  function updateOptionsMinWidth () {
    const { width } = proxy.selectElement.getBoundingClientRect()
    optionsMinWidth.value = width
  }

  return {
    getOptionItemIndexInSelected,
    onSelectItem,
    removeSelectedByIndex,
    onScrollInit,
    optionsMinWidth,
    updateOptionsMinWidth
  }
}
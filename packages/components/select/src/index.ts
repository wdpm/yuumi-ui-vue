import { arrayPatch } from '../../../share/helper'
import { isValidComponentSize, isValidComponentTheme } from '../../../share/validator'
import { computed, createVNode, defineComponent, Fragment, h, mergeProps, nextTick, ref, resolveComponent, watch } from 'vue'
import type { Ref } from 'vue'
import useClear from './clear-helper'
import useHelper from './helper'
import useKeyword from './keyword-helper'
import useOptins from './options-helper'

export default defineComponent({
  name: 'YuumiSelect',
  inheritAttrs: false,
  props: {
    modelValue: [String, Array],
    disabled: Boolean,
    multiple: Boolean,
    readonly: Boolean,
    placeholder: { type: String, default: '请选择' },
    size: { type: String, validator: isValidComponentSize, default: 'md' },
    theme: { type: String, validator: isValidComponentTheme, default: 'default' },
    defaultValueOptions: (Array as unknown) as any[],
    options: { type: Array, default: () => [] },
    optionKey: { type: Object, default: () => ({ label: 'label', value: 'value'}) },
    filterable: Boolean,
    filterMethod: Function,
    clearable: Boolean
  },
  setup (props) {
    const { getLabel, getValue } = useHelper()

    const popperComponent: Ref<any> = ref()
    const selectElement: Ref<HTMLElement|undefined> = ref()

    const selectedItems: Ref<any[]> = ref([])
    const labelSpans = computed(() => selectedItems.value.map(item => getLabel(item)))

    const isActivedState = computed(() =>{
      if (!popperComponent.value) return false
      return popperComponent.value.visible as boolean
    })

    const { getOptionItemIndexInSelected, onSelectItem, removeSelectedByIndex, onScrollInit, optionsMinWidth, updateOptionsMinWidth } = useOptins(selectedItems)
    const { keywordPlaceholder, keyword, onKeywordInput, validOptions, keywordInputFocus, restoreKeywordValue } = useKeyword()
    const { clearBtnVisible, clearHalk, tryHideClearBtn, tryShowclearBtn } = useClear()

    function onBeforeEnter () {
      if (props.filterable) keywordInputFocus()
    }

    function onBeforeLeave () {
      if (props.filterable) restoreKeywordValue()
    }

    watch(() => props.modelValue, () =>{
      let _selectedItems: any[] = []

      const _options = [].concat(props.options as any, props.defaultValueOptions as any)
      if (props.modelValue instanceof Array && props.multiple) {
        _selectedItems = _options.filter((option: any) => {
          return (props.modelValue as any).find((item: any) => item === getValue(option))
        })
      } else if (props.modelValue) {
        _selectedItems = _options.filter((option: any) => props.modelValue === getValue(option))
      }

      arrayPatch(selectedItems.value, _selectedItems)

      // 更新keyword
      if (props.filterable) {
        nextTick(restoreKeywordValue)
      }

      if (props.multiple) {
        nextTick(updateOptionsMinWidth)
      }
    }, { deep: true, immediate: true })

    return {
      getLabel,
      getValue,
      popperComponent,
      selectElement,
      selectedItems,
      labelSpans,
      isActivedState,
      getOptionItemIndexInSelected,
      onSelectItem,
      removeSelectedByIndex,
      keywordPlaceholder,
      keyword,
      onKeywordInput,
      validOptions,
      optionsMinWidth,
      onScrollInit,
      onBeforeEnter,
      onBeforeLeave,
      clearBtnVisible,
      onMouseenter: tryShowclearBtn,
      onMouseleave: tryHideClearBtn,
      onClear: (event: MouseEvent) => {
        event.stopPropagation()
        clearHalk()
      }
    }
  },
  render () {
    const _YuumiPopper = resolveComponent('YuumiPopper')
    const _YuumiIcon = resolveComponent('YuumiIcon')
    const _YuumiScrollbar = resolveComponent('YuumiScrollbar')

    const getIcon = () => {
      const { clearBtnVisible, onClear } = this
      const _props = clearBtnVisible ? {
        class: 'select__icon',
        icon: 'line-circle-close',
        onClick: onClear
      } : {
        class: 'select__icon __arrow',
        icon: 'flat-arrow-bottom-small'
      }

      return h(createVNode(_YuumiIcon, _props))
    }

    const getContentVnode = () => {
      const { $props, isActivedState, labelSpans, keywordPlaceholder, removeSelectedByIndex, onKeywordInput } = this
      let { keyword } = this

      if ($props.filterable && !$props.multiple) {
        return h('input', {
          readonly: !isActivedState,
          placeholder: keywordPlaceholder,
          ref: 'keywordInput',
          value: keyword,
          'onInput': onKeywordInput
        })
      }

      return h(Fragment, null, [
        h(Fragment, null, labelSpans.map((item, index) => h('span', { class: 'content-item' }, [
          h('span', null, [item]),
          $props.multiple && !$props.readonly && !$props.disabled ? h(_YuumiIcon, {
            icon: 'flat-circle-close',
            onClick: (e: any) => removeSelectedByIndex(index, e)
          }): undefined
        ]))),

        labelSpans.length === 0 ? h('span', { class: 'select__placeholder' }, [
          $props.placeholder
        ]): undefined
      ])
    }

    const getTriggerVnode = () => {
      const { $props, $attrs, isActivedState, onMouseenter, onMouseleave } = this
      const _props = mergeProps({
        class: ['yuumi-select', `theme__${$props.theme}`, `size__${$props.size}`, {
          '__focus': isActivedState,
          '__readonly': $props.readonly,
          '__disabled': $props.disabled,
          '__multiple': $props.multiple
        }],
        onMouseenter,
        onMouseleave,
        ref: 'selectElement'
      }, $attrs)

      return h('div', _props, [
        h('div', { class: 'select__content' }, [getContentVnode()]),
        getIcon()
      ])
    }

    const getOptionMenus = () => {
      const { $props, validOptions, getOptionItemIndexInSelected, onSelectItem, getLabel } = this

      const children = validOptions.map((item: any, index: number) => {
        return h('li', {
          class: ['option-item', {
            '__selected': getOptionItemIndexInSelected(item) > -1
          }],
          onClick: () => onSelectItem(item)
        }, [
          h('span', null, getLabel(item)),
          h(_YuumiIcon, { icon: 'correct' })
        ])
      })

      if (!validOptions.length) {
        children.push(h('li', {
          class: 'option-item placeholder'
        }, ['暂无可选项']))
      }

      return h('ul', {
        class: ['yuumi-select-options', `theme__${$props.theme}`],
      }, children)
    }

    const getOptionsVnode = () => {
      const { onScrollInit, optionsMinWidth } = this

      return createVNode(_YuumiScrollbar, {
        class: 'options-wrap ',
        style: { minWidth: `${optionsMinWidth}px` },
        onInit: onScrollInit
      }, {
        default: getOptionMenus
      })
    }

    const { onBeforeEnter, onBeforeLeave } = this

    return createVNode(_YuumiPopper, {
      placement: 'bottom-start',
      fallbackPlacements: ['top-start'],
      onBeforeEnter,
      onBeforeLeave,
      ref: "popperComponent"
    }, {
      trigger: () => h(getTriggerVnode(), {
        readonly: this.readonly,
        disabled: this.disabled
      }),
      default: () => getOptionsVnode()
    })
  }
})

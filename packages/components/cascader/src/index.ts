import { isValidComponentSize, isValidComponentTheme } from '../../../share/validator'
import { computed, defineComponent, Fragment, h, mergeProps, nextTick, ref, resolveComponent, watch } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import useHelper, { SelectedItem } from './helper'
import useClear from './clear-helper'

const DEFAULT_OPTION_KEY = {
  label: 'label',
  value: 'value',
  disabled: 'disabled'
}

export default defineComponent({
  name: 'YuumiCascader',
  inheritAttrs: false,
  props: {
    modelValue: { type: Array },
    options: { type: Array },
    optionKey: { type: Object, default: () => DEFAULT_OPTION_KEY },
    hyphen: { type: String, default: '/' },
    placeholder: { type: String },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    labelFormat: { type: Function },
    size: { type: String, validator: isValidComponentSize, default: 'md' },
    theme: { type: String, validator: isValidComponentTheme, default: 'default' },
    every: { type: Boolean },
    clearable: { type: Boolean }
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    const { isLeaf, getNodeLabel, getNodeValue, getNodeDisabled, getSelectedByModelValue, getMenusBySelected, selected2string } = useHelper()

    const popperComponent = ref()
    const scrollbarComponents: Ref<any[]> = ref([])

    const selected: Ref<SelectedItem[]> = ref([])
    const menus: ComputedRef<any[]> = computed(() => getMenusBySelected())

    const labelText: ComputedRef<string> = computed(() => {
      const value = getSelectedByModelValue()

      if (typeof props.labelFormat === 'function') {
        return props.labelFormat(value)
      }

      return value.map(item => item.label).join(props.hyphen)
    })

    const isActivedState = computed(() => {
      if (!popperComponent.value) return false
      return popperComponent.value.visible as boolean
    })

    function onScrollInit (vm: any) {
      const scrollElement = vm.$el
      const optionItemElement = scrollElement.querySelector('.menu-item.__active')

      if (optionItemElement) {
        vm.$refs.body.scrollTop = optionItemElement.getBoundingClientRect().top - scrollElement.getBoundingClientRect().top
      }
    }

    function onSelect (node: {[key: string]: any}, listIndex: number) {
      if (getNodeDisabled(node)) return

      const nodeData = {
        label: getNodeLabel(node),
        value: getNodeValue(node)
      }

      const _selected = selected.value.slice(0, listIndex).concat(nodeData)

      if (selected2string(_selected) !== selected2string(selected.value)) {
        selected.value = _selected

        if (props.every) {
          emit('update:modelValue', selected.value.map(item => item.value))
          emit('change', selected.value)
        } else if (isLeaf(node)) {
          emit('update:modelValue', selected.value.map(item => item.value))
          emit('change', selected.value)
        }

        if (!isLeaf(node)) {
          nextTick(() => {
            scrollbarComponents.value[selected.value.length].$refs.body.scrollTop = 0
          })
        }
      }

      if (isLeaf(node)) {
        nextTick(() => {
          popperComponent.value?.hidePoper()
        })
      }
    }

    watch((): any[] => (props.modelValue || []), (value, oldValue) => {
      if (value.toString() === (oldValue || '').toString()) return

      selected.value = getSelectedByModelValue()
    }, { deep: true, immediate: true })

    watch((): string => selected2string(selected.value), (value, oldValue) => {
      if (value === oldValue) return

      popperComponent.value.popper?.update()
    })

    const { clearBtnVisible, clearHalk, tryHideClearBtn, tryShowclearBtn } = useClear()

    return {
      isLeaf,
      getNodeLabel,
      getNodeValue,
      getNodeDisabled,
      popperComponent,
      scrollbarComponents,
      selected,
      labelText,
      menus,
      isActivedState,
      onScrollInit,
      onSelect,
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
    const _YuumiIcon = resolveComponent('YuumiIcon') as any
    const _YuumiScrollbar = resolveComponent('YuumiScrollbar') as any
    const _YuumiPopper = resolveComponent('YuumiPopper') as any

    const getLabelTextVnode = () => {
      const { $props } = this

      if (this.labelText) {
        return h('div', { class: 'cascader__label' }, [this.labelText])
      }

      return h('div', { class: 'cascader__placeholder' }, [$props.placeholder])
    }

    const getIconVnode = () => {
      const { clearBtnVisible, onClear } = this

      const _props = clearBtnVisible ? {
        class: 'cascader__icon',
        icon: 'line-circle-close',
        'onClick': onClear
      } : {
        class: 'cascader__icon __arrow',
        icon: 'flat-arrow-bottom'
      }

      return h(_YuumiIcon, _props)
    }

    const getTriggerVnode = () => {
      const { $props, $attrs, onMouseenter, onMouseleave } = this

      const _props = mergeProps({
        class: ['yuumi-cascader', `theme__${$props.theme}`, `size__${$props.size}`, {
          '__focus': this.isActivedState,
          '__readonly': $props.readonly,
          '__disabled': $props.disabled
        }],
        ref: 'cascader',
        onMouseenter,
        onMouseleave,
      }, $attrs)

      return h('div', _props, [
        getLabelTextVnode(),
        getIconVnode()
      ])
    }

    const getDefaultVnode = () => {
      const { $props, scrollbarComponents, selected, menus, onSelect, onScrollInit } = this
      const { getNodeValue, getNodeLabel, getNodeDisabled } = this

      return h(Fragment, null, menus.map((list: any, listIndex: number) => {
        return h('div', {
          class: ['yuumi-cascader-menu', `theme__${$props.theme}`]
        }, [
          h(_YuumiScrollbar, {
            onInit: onScrollInit,
            ref: el => { if (el) scrollbarComponents[listIndex] = el }
          }, {
            default: () => h('ul', null, list.map((node: any, index: number) => {
              return h('li', {
                class: ['menu-item', {
                  '__disabled': getNodeDisabled(node),
                  '__active': selected[listIndex] && getNodeValue(node) === selected[listIndex].value
                }],
                onClick: () => onSelect(node, listIndex)
              }, [
                h('span', { class: 'item__label' }, [getNodeLabel(node)]),
                node.children && node.children.length ? h(_YuumiIcon, {
                  class: 'item__icon',
                  icon: 'line-arrow-right'
                }) : null
              ])
            }))
          })
        ])
      }))
    }

    return h(_YuumiPopper, {
      placement: 'bottom-start',
      fallbackPlacements: ['top-start'],
      ref: 'popperComponent'
    }, {
      trigger: () => h(getTriggerVnode(), {
        readonly: this.readonly,
        disabled: this.disabled
      }),
      default: () => getDefaultVnode()
    })
  }
})
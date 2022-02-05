import './index.scss'
import { getValueByPath } from '../../../share/helper'
import { isValidTabsPosition, isValidTabsType } from '../../../share/validator'
import { getTabItemsFromSlot } from './helper'
import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, ref, resolveComponent, TransitionGroup, watch } from 'vue'
import { YuumiTabItem } from '../'
import useStyle from './style-helper'
import type { Ref, VNode } from 'vue'

export default defineComponent({
  name: 'YuumiTabs',
  props: {
    modelValue: { type: [String, Number ]},
    position: { type: String, validator: isValidTabsPosition, default: 'top' },
    type: { type: String, validator: isValidTabsType, default: 'line' }
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { slots, emit }) {
    const { rectStyle, updateRectPosition, navsStyle, updateNavsPosition, hasScrollbar, updateScollbarState } = useStyle()
    const tabsElement: Ref<any> = ref()
    const navsBodyElement: Ref<any> = ref()
    const tabItems = computed(() => getTabItemsFromSlot(YuumiTabItem.name, slots.default))

    onMounted(() => {
      updateRectPosition()
      onResize()

      window.addEventListener('resize', onResize, false)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize, false)
    })

    function onResize () {
      updateNavsPosition(0)
      updateScollbarState()
    }

    function navItemSelect ( vnode: VNode) {
      const { value } = vnode.props || {}
      if (value === props.modelValue) return

      emit('update:modelValue', value)
      emit('change', value)
    }

    watch(() => props.modelValue, (value, oldValue) => {
      if (value !== oldValue) {
        nextTick(() => {
          updateRectPosition()
          updateNavsPosition(0)
        })
      }
    })

    return {
      tabsElement,
      navsBodyElement,
      tabItems,
      rectStyle,
      navItemSelect,
      navsStyle,
      updateNavsPosition,
      hasScrollbar
    }
  },
  render () {
    const { type, position, tabItems, modelValue, rectStyle, navItemSelect, navsStyle, updateNavsPosition, hasScrollbar } = this
    const _isVertical = /top|bottom/.test(position)
    const _iconComponent = resolveComponent('YuumiIcon')

    function renderNavs () {
      let chilren = tabItems.map(item => {
        const props = item.props || {}

        function getContent () {
          const labelSlot = getValueByPath<Function>(item, 'children.label')
          if (labelSlot) {
            return labelSlot({$props: props})
          }

          return props.label
        }

        return h('div', {
          class: ['nav-item', {
            '__active': modelValue === props.value
          }],
          onClick: () => navItemSelect(item)
        }, getContent())
      })

      if (type === 'line') {
        chilren = chilren.concat(
          h('div', { class: 'navs__line' }, [
            h('div', { class: 'line-rect', style: _isVertical ? {
              transform: `translateX(${rectStyle.left}px)`,
              width: `${rectStyle.width}px`
            } : {
              transform: `translateY(${rectStyle.top}px)`,
              height: `${rectStyle.height}px`
            }})
          ])
        )
      }

      return h('div', { class: 'navs' }, [
        h('div', {
          class: 'navs__body',
          style: {
            transform: _isVertical ? `translateX(${0 - navsStyle.left}px)` : `translateY(${0 - navsStyle.top}px)`
          },
          ref: 'navsBodyElement'
        }, chilren)
      ])
    }

    function renderHeader () {
      return h('div', { class: 'tabs__header', ref: 'tabsElement' }, [
        hasScrollbar && h(_iconComponent, {
          class: 'navs__prev',
          icon: _isVertical ? 'line-left': 'line-top',
          onClick: () => updateNavsPosition(-1)
        }),

        renderNavs(),

        hasScrollbar && h(_iconComponent, {
          class: 'navs__next',
          icon: _isVertical ? 'line-right' : 'line-bottom',
          onClick: () => updateNavsPosition(1)
        })
      ])
    }

    function renderBody () {
      return h('div', { class: "tabs__panel" }, [
        h(TransitionGroup, {name: "yuumi-tabs"}, {
          default: () => {
            return tabItems.filter(item => modelValue === item.props?.value)
              .map(item => h(item, { key: item.props?.value }))
          }
        })
      ])
    }

    function tabChildren () {
      return /bottom/.test(position) ? [renderBody(), renderHeader()] : [renderHeader(), renderBody()]
    }

    return h('div', {
      class: ['yuumi-tabs', 'position__' + position, {
        '__card': type === 'card',
        '__border-card': type === 'border-card',
      }]
    }, tabChildren())
  }
})
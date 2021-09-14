import { getFirstValidNode } from '../../../share/helper'
import { isDescendantElement, isValidComponentPlacement, isValidPopperType } from '../../../share/validator'
import { computed, createVNode, defineComponent, Fragment, getCurrentInstance, h, mergeProps, ref, Teleport, Text, Transition } from 'vue'
import { createPopper } from '@popperjs/core'
import type { VNode } from 'vue'
import type { Placement } from '@popperjs/core'

export default defineComponent({
  name: 'YuumiPopper',
  inheritAttrs: false,
  props: {
    placement: { type: String, validator: isValidComponentPlacement, default: 'bottom' },
    fallbackPlacements: { type: Array, default: () => ['top', 'right', 'left'] },
    space: { type: Number, default: 6 },
    type: { type: String, validator: isValidPopperType, default: 'click' }
  },
  emits: ['before-open', 'before-enter', 'enter', 'after-enter', 'before-leave', 'leave', 'after-leave'],
  setup (props, { emit, expose }) {
    const instance = getCurrentInstance()!

    const triggerNode = computed(() => {
      const { trigger: triggerSlots } = instance.slots
      if (!triggerSlots) return createVNode('span')

      const node = getFirstValidNode(triggerSlots())

      if (node && node.type === Text) {
        return createVNode('span', {}, [node])
      }

      return node as VNode
    })

    const popper = ref()
    const visible = ref(false)

    function onClick (e: MouseEvent) {
      const { popper } = instance.refs as any

      if (visible.value && !isDescendantElement(e.target as HTMLElement, popper)) {
        hidePoper()
      } else if (!visible.value) {
        const { props } = triggerNode.value as VNode
        if (props && (props.disabled || props.readonly)) return
        showPopper()
      }
    }

    function onMouseenter () {
      const { props } = (instance.slots.trigger!() as any)
      if (props && (props.disabled || props.readonly)) return

      showPopper()
    }

    function onMouseleave () {
      hidePoper()
    }

    function showPopper () {
      emit('before-open')
      visible.value = true
    }

    function hidePoper () {
      visible.value = false
    }

    function transitionLifeCycleHalk (eventName: any) {
      return (data: any) => {
        emit(eventName, data)

        if (eventName === 'before-enter') {
          initailizePopper(data)
        }

        switch (eventName) {
          case 'before-enter':
            initailizePopper(data)
            break
          case 'after-enter':
            if (props.type === 'click') {
              window.addEventListener('click', onClick, false)
            }
            break
          case 'before-leave':
            if (props.type === 'click') {
              window.removeEventListener('click', onClick, false)
            }
            break
          case 'after-leave':
            destroyPopper()
            break
        }
      }
    }

    function initailizePopper (el: HTMLElement) {
      const { trigger } = instance.refs as any
      const reference = trigger.$el || trigger

      popper.value = createPopper(reference, el, {
        placement: props.placement as Placement,
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, props.space]
          },
        }, {
          name: 'arrow',
          options: {
            element: el.querySelector('.popper__arrow')
          },
        }, {
          name: 'flip',
          options: {
            fallbackPlacements: props.fallbackPlacements
          }
        }]
      })
    }

    function destroyPopper () {
      popper.value.destroy()
      popper.value = null
    }

    expose({
      visible,
      popper,
      showPopper,
      hidePoper
    })

    return {
      triggerNode,
      visible,
      onClick,
      onMouseenter,
      onMouseleave,
      transitionLifeCycleHalk
    }
  },
  render () {
    const renderPopper = () => {
      const { $slots, $attrs, visible } = this
      if (!visible) return

      return h('div', mergeProps({
        class: 'yuumi-popper',
        ref: 'popper'
      }, $attrs), [
        h('div', { class: 'popper__arrow', 'data-popper-arrow': '' }),
        h('div', { class: 'popper__content' }, $slots.default ? $slots.default() : undefined)
      ])
    }

    const { $props, triggerNode, transitionLifeCycleHalk, onClick, onMouseenter, onMouseleave } = this

    const handlers = $props.type === 'click' ? { onClick } : { onMouseenter, onMouseleave }
    const _triggerProps = mergeProps({
      ref: 'trigger'
    }, handlers)

    return h(Fragment, null, [
      h(triggerNode, _triggerProps),
      h(Teleport, { to: 'body' }, [
        h(Transition, {
          name: 'yuumi-popper',
          onBeforeEnter: transitionLifeCycleHalk('before-enter'),
          onEnter: transitionLifeCycleHalk('enter'),
          onAfterEnter: transitionLifeCycleHalk('after-enter'),
          onBeforeLeave: transitionLifeCycleHalk('before-leave'),
          onLeave: transitionLifeCycleHalk('leave'),
          onAfterLeave: transitionLifeCycleHalk('after-leave')
        }, {
          default: renderPopper
        })
      ])
    ])
  }
})
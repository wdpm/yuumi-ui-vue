import { isDefined } from '../../../share/validator'
import { defineComponent, h, isVNode, resolveComponent } from 'vue'

export default defineComponent({
  name: 'YuumiStepItem',
  props: {
    title: { type: String },
    icon: { type: [String, Object] },
    index: { type: Number, required: true },
    active: { type: Number, required: true },
    error: { type: Boolean, required: true }
  },
  render () {
    const { title, icon, index, active, error } = this
    const defaultSlot = this.$slots.default

    const getIcon = () => {
      if (error) {
        return h(resolveComponent('YuumiIcon'), { icon: 'line-close' })
      }

      if (typeof icon === 'string') {
        return h(resolveComponent('YuumiIcon'), { icon })
      }

      if (isVNode(icon)) { return icon }

      if (index < active) {
        return h(resolveComponent('YuumiIcon'), { icon: 'line-correct' })
      }

      return h('span', {}, [index + 1])
    }

    return h('div', {
      class: ['yuumi-step-item', {
        '__completed': index < active,
        '__processing': index === active,
        '__waiting': index > active,
        '__error': error
      }]
    }, [
      h('div', { class: 'step-item__line' }),
      h('div', { class: ['step-item__icon', { '__custom': isDefined(icon) }] }, [ getIcon() ]),
      h('div', { class: 'step-item__body' }, [
        h('div', { class: 'step-item__title ' }, [title]),
        defaultSlot && h('div', { class: 'step-item__description ' }, [defaultSlot()])
      ])
    ])
  }
})
import { YuumiStepItem } from '../'
import { getValueByPath } from '../../../share/helper'
import { isValidStepDirection } from '../../../share/validator'
import { computed, defineComponent, h } from 'vue'
import type { ComputedRef, VNode } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'YuumiStep',
  props: {
    direction: { type: String, validator: isValidStepDirection, default: 'horizontal' },
    active: { type: Number, default: 0 },
    mini: { type: Boolean },
    error: { type: Boolean }
  },
  setup (props, { slots }) {
    const steps: ComputedRef<VNode[]> = computed(() => {
      return getStepItemVnode(slots.default ? slots.default() : [])
    })

    return {
      steps
    }
  },
  render () {
    const { direction, steps, mini, error, active } = this

    return h('div', {
      class: ['yuumi-step', `__${direction}`, {
        '__mini': mini
      }]
    }, steps.map((item, index) => {
      const isLast = index === steps.length - 1
      return h(item, {
        index,
        active,
        error: error && active === index,
        style: {
          maxWidth: direction === 'horizontal' && isLast ? `${100 / steps.length}%` : null
        }
      })
    }))
  }
})

function getStepItemVnode (vnodes: VNode[]): VNode[] {
  const res: VNode[] = []

  function walker (children: VNode[]) {
    children.forEach((child) => {
      if (child.type.toString() === 'Symbol(Fragment)' && child.children) {
        walker(child.children as VNode[])
        return
      }

      if (getValueByPath(child, 'type.name') !== YuumiStepItem.name) return

      res.push(child)
    })
  }

  walker(vnodes)
  return res
}

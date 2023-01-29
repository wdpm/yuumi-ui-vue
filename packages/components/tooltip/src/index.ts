import { getFirstValidNode } from '../../../share/helper'
import { isValidComponentPlacement, isValidTooltipTheme } from '../../../share/validator'
import { createVNode, defineComponent, Fragment, h, resolveComponent } from 'vue'

export default defineComponent({
  name: 'YuumiTooltip',
  inheritAttrs: false,
  props: {
    content: { type: String },
    placement: { type: String, validator: isValidComponentPlacement, default: 'auto' },
    theme: { type: String, validator: isValidTooltipTheme, default: 'light' }
  },
  render () {
    const { content, theme, placement } = this
    const { default: defaultSlot, content: contentSlot } = this.$slots
    const YuumiPopper = resolveComponent('YuumiPopper')

    // Refer internal popper component
    return h(Fragment, null, [
      h(createVNode(YuumiPopper, {
        class: ['yuumi-tooltip', `theme__${theme}`],
        placement,
        type: 'hover'
      }, {
        default: () => contentSlot ? contentSlot() : content,
        trigger: () => getFirstValidNode(defaultSlot ? defaultSlot() : [])
      }))
    ])
  }
})

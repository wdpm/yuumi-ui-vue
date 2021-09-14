import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'YuumiTabItem',
  props: {
    label: { type: String },
    value: { type: [ String, Number ] }
  },
  render () {
    return h('div', {}, this.$slots.default ? this.$slots.default() : [])
  }
})
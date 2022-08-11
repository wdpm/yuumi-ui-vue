import { defineComponent, h, provide, ref } from 'vue'
import type { Ref } from 'vue'
import MenuNode, { injectKey } from './node'

export default defineComponent({
  name: 'YuumiMenu',
  props: {
    data: { type: Array },
    optionKey: { type: Object },
    expandIcon: { type: Object, default: () => ({ icon: 'line-arrow-bottom' })},
    expandIconVisible: { type: Boolean, default: true },
    selectedNode: { type: Object }
  },
  components: {
    MenuNode
  },
  emits: ['node-expand', 'node-click', 'node-mouseenter', 'node-mouseleave'],
  setup (props, { emit, expose }) {
    const childrenComponent: Ref<any[]> = ref([])

    const exposeRecord = {
      getMenuData,
      getCheckedNodes
    }

    function getMenuData () {
      return childrenComponent.value.map((item) => item.getNodeData())
    }

    function getCheckedNodes () {
      return childrenComponent.value.reduce((nodes, item) => {
        return nodes.concat(item.getCheckedNodes())
      }, [])
    }

    provide(injectKey, {
      rootProps: props,
      rootEmit: (eventName: any, detail: any) => {
        emit(eventName, detail)
      }
    })

    expose(exposeRecord)

    return {
      childrenComponent
    }
  },
  render () {
    const { $slots, data } = this

    return h('div', { class: 'yuumi-menu' }, (data || []).map((item, index) => {
      return h(MenuNode as any, {
        node: item,
        depth: 0,
        ref: (el: any) => this.childrenComponent[index] = el,
      }, {
        default: $slots.default
      })
    }))
  }
})
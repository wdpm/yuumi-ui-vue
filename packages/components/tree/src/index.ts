import { defineComponent, h, provide, ref } from 'vue'
import type { Ref, VNode } from 'vue'
import TreeNode, { injectKey } from './node'

export default defineComponent({
  name: 'YuumiTree',
  props: {
    data: { type: Array },
    optionKey: { type: Object },
    expandIcon: { type: Object, default: () => ({ icon: 'flat-arrow-bottom' })},
    expandIconVisible: { type: Boolean, default: true },
    checkable: { type: Boolean, default: true },
    loadData: { type: Function }
  },
  components: {
    TreeNode
  },
  emits: ['checked', 'node-expand', 'node-click'],
  setup (props, { emit, expose }) {
    const childrenComponent: Ref<any[]> = ref([])

    const exposeRecord = {
      getTreeData,
      getCheckedNodes
    }

    function getTreeData () {
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

    return h('div', { class: 'yuumi-tree' }, (data || []).map((item, index) => {
      return h(TreeNode as any, {
        node: item,
        ref: (el: any) => this.childrenComponent[index] = el,
      }, {
        default: $slots.default
      })
    }))
  }
})
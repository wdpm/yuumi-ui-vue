import { computed, defineComponent, getCurrentInstance, h, inject, mergeProps, resolveComponent, Transition, vShow, withDirectives } from 'vue'
import useHelper from './helper'
import useExpand from './expand-helper'
import useChildren from './children-helper'

export const injectKey = Symbol('menu')

export default defineComponent({
  name: 'YuumiMenuNode',
  props: {
    node: { type: Object },
    depth: { type: Number, default: 0 }
  },
  setup (props, { expose }) {
    const instance = getCurrentInstance()!

    const { rootProps, rootEmit }: any = inject(injectKey)

    const nodeLabel = computed(() => getNodeLabel())
    const nodeValue = computed(() => getNodeValue())

    const {
      getNodeLabel,
      getNodeValue,
      getNodeChildren,
      getNodeExpand,
      getSelectedNodeValue
    } = useHelper(rootProps)

    const {
      childrenComponent,
      children,
      isLeaf
    } = useChildren({ getNodeChildren, rootProps })

    const {
      isExpandChildren,
      toggleExpand,
      onBeforeEnter,
      onEnter,
      onAfterEnter,
      onBeforeLeave,
      onLeave,
      onAfterLeave
    } = useExpand({
      getNodeExpand,
      beforeExpand: (e) => {
        rootEmit('node-click', { instance, node: props.node })
      },
      expand: () => {
        return children.value && children.value.length > 0 ? Promise.resolve() : Promise.reject('children is empty.')
      },
      afterExpand: (expand) => {
        rootEmit('node-expand', { expand, instance })
      }
    })

    function getNodeData (): any {
      const _data: {[x:string]: any} = {
        value: nodeValue.value,
        label: nodeLabel.value
      }

      if (childrenComponent.value.length) {
        _data.children = childrenComponent.value.map((item) => item.getNodeData())
      }

      return _data
    }

    const exposeRecord = {
      nodeLabel,
      nodeValue,
      childrenComponent,
      getNodeData
    }

    expose(exposeRecord)

    return Object.assign({
      nodeLabel,
      nodeValue,

      // children
      children,
      childrenComponent,
      isLeaf,

      // expand
      expandIcon: computed(() => rootProps.expandIcon),
      expandIconVisible: computed(() => rootProps.expandIconVisible),
      isExpandChildren,
      toggleExpand,
      onBeforeEnter,
      onEnter,
      onAfterEnter,
      onBeforeLeave,
      onLeave,
      onAfterLeave,
      selectedNodeValue: computed(() => getSelectedNodeValue()),
      onMouseEnter: (e: Event) => {
        rootEmit('node-mouseenter', { event: e, node: props.node })
      },
      onMouseLeave: (e: Event) => {
        rootEmit('node-mouseleave', { event: e, node: props.node })
      }
    })
  },
  render () {
    if (!this.node) return

    const _YuumiIcon = resolveComponent('YuumiIcon') as any

    const getExpandIcon = () => {
      const {
        expandIcon,
        expandIconVisible,
        isLeaf,
        isExpandChildren
      } = this

      if (isLeaf || !expandIconVisible) {
        return null
      }

      return h('div', {
        class: ['expand-icon', {
          '__active': isExpandChildren
        }]
      }, [
        h(_YuumiIcon, mergeProps(expandIcon))
      ])
    }

    const getPrefixIcon = () => {
      const {
        depth,
        node
      } = this

      return h('div', {
        class: ['prefix-icon'],
        style: {
          paddingLeft: `${ node?.icon ? depth : depth + 1}em`
        }
      }, [
        h(_YuumiIcon, { icon: node?.icon })
      ])
    }

    const getNodeContentVNode = () => {
      const {
        $slots,
        node,
        nodeValue,
        nodeLabel,
        toggleExpand,
        isExpandChildren,
        selectedNodeValue,
        onMouseEnter,
        onMouseLeave
      } = this

      return h('div', {
        class: ['node-content', { __selected: selectedNodeValue === nodeValue}],
        onClick: toggleExpand,
        onMouseenter: onMouseEnter,
        onMouseleave: onMouseLeave
      }, $slots.default ? $slots.default({ node, isExpandChildren }) : [
        getPrefixIcon(),
        h('div', {
          class: 'content__label'
        }, [nodeLabel]),
        getExpandIcon()
      ])
    }

    const getNodeChildrenVNodes = () => {
      const { $props, $slots, children, childrenComponent, depth } = this
      if (!(children instanceof Array)) return

      return children.map((item, index) => {
        const _props = Object.assign({
          ref: (el: any) => childrenComponent[index] = el
        }, $props, {
          node: item,
          depth: depth + 1
        })
        return h(resolveComponent('YuumiMenuNode') as any, _props, {
          default: $slots.default
        })
      })
    }

    const {
      isLeaf,
      isExpandChildren,
      onBeforeEnter,
      onEnter,
      onAfterEnter,
      onBeforeLeave,
      onLeave,
      onAfterLeave
    } = this

    return h('div', {
      class: ['menu-node', { '__leaf': isLeaf }]
    }, [
      getNodeContentVNode(),
      isLeaf ? null : h(Transition, {
        name: 'node-children',
        onBeforeEnter,
        onEnter,
        onAfterEnter,
        onBeforeLeave,
        onLeave,
        onAfterLeave
      }, {
        default: () => withDirectives(
          h('div', { class: 'child-menu' }, getNodeChildrenVNodes()),
          [[vShow, isExpandChildren]]
        )
      })
    ])
  }
})
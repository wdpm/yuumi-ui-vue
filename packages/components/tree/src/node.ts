import { isDefined } from '../../../share/validator'
import { computed, defineComponent, getCurrentInstance, h, inject, mergeProps, resolveComponent, Transition, vShow, withDirectives } from 'vue'
import useHelper from './helper'
import useExpand from './expand-helper'
import useChildren from './children-helper'

export const injectKey = Symbol('tree')

export default defineComponent({
  name: 'YuumiTreeNode',
  props: {
    node: { type: Object }
  },
  emits: ['change'],
  setup (props, { emit, expose }) {
    const instance = getCurrentInstance()!

    const { rootProps, rootEmit }: any = inject(injectKey)

    const nodeLabel = computed(() => getNodeLabel())
    const nodeValue = computed(() => getNodeValue())
    const isDisabled = computed(() => getNodeDisabled())

    const {
      getNodeLabel,
      getNodeValue,
      getNodeChildren,
      getNodeDisabled,
      getNodeChecked,
      getNodeExpand
    } = useHelper(rootProps)

    const {
      childrenComponent,
      children,
      isLeaf,
      isChecked,
      isIndeterminate,
      loadingState,
      childrenLoadState,
      updateChildrenLoadState,
      nodeIsChecked
    } = useChildren({ getNodeChecked, getNodeChildren, rootProps })

    const {
      checkboxComponent,
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
        rootEmit('node-click', { instance })
      },
      expand: () => {
        // 异步未加载
        if (isDefined(rootProps.loadData)) {
          if (childrenLoadState.value === loadingState.value.loading) return Promise.reject('children is loading.')

          if (!isLeaf.value && childrenLoadState.value === loadingState.value.default) {
            updateChildrenLoadState('loading')

            return rootProps.loadData(instance.proxy).then((data: any) => {
              children.value = (children.value || []).concat(data || [])
              if (children.value.length === 0) return Promise.reject('children is empty.')
              updateChildrenLoadState('success')
            }).then(() => {
              // 如果节点是选中状态，设置children的选中状态
              if (isChecked.value) {
                updateChildrenChecked(childrenComponent.value, isChecked.value)
              }
            }).catch((err: Error) => {
              updateChildrenLoadState('default')
              return Promise.reject(err)
            })
          }
        }

        // 已加载
        return children.value && children.value.length > 0 ? Promise.resolve() : Promise.reject('children is empty.')
      },
      afterExpand: (expand) => {
        rootEmit('node-expand', { expand, instance })
      }
    })

    function updateCheckedValue (value: boolean) {
      isChecked.value = value
    }

    function onCheckedChange (detail: any) {
      emit('change', detail)
      updateChildrenChecked(childrenComponent.value, detail.checked)
      rootEmit('checked', {...detail, instance})
    }

    // 向下修改
    function updateChildrenChecked (children: any[], value: boolean) {
      children.forEach(child => {
        if (child.isChecked !== value) {
          child.isChecked = value
        }

        updateChildrenChecked(child.childrenComponent, value)
      })
    }

    // 向上修改
    function onChildCheckedChange () {
      const _checked = nodeIsChecked()

      if (_checked !== isChecked.value) {
        isChecked.value = _checked
        emit('change', { value: nodeValue, checked: isChecked.value })
      }
    }

    function getNodeData (): any {
      const _data: {[x:string]: any} = {
        value: nodeValue.value,
        label: nodeLabel.value,
        checked: isChecked.value,
      }

      if (childrenComponent.value.length) {
        _data.children = childrenComponent.value.map((item) => item.getNodeData())
      }

      return _data
    }

    function getCheckedNodes (): any[] {
      const nodes: any[] = []

      if (isChecked.value) {
        nodes.push({
          value: nodeValue.value,
          label: nodeLabel.value
        })
      }

      if (childrenComponent.value.length) {
        return childrenComponent.value.reduce((_nodes, item) => {
          return _nodes.concat(item.getCheckedNodes())
        }, nodes)
      }

      return nodes
    }

    const exposeRecord = {
      nodeLabel,
      nodeValue,
      isChecked,
      isIndeterminate,
      childrenComponent,
      getNodeData,
      getCheckedNodes
    }

    expose(exposeRecord)

    return Object.assign({
      nodeLabel,
      nodeValue,
      isDisabled,
      updateCheckedValue,
      onCheckedChange,
      onChildCheckedChange,
      checkable: computed(() => rootProps.checkable),

      // children
      children,
      childrenComponent,
      isLeaf,
      isChecked,
      loadingState,
      childrenLoadState,
      isIndeterminate,

      // expand
      expandIcon: computed(() => rootProps.expandIcon),
      expandIconVisible: computed(() => rootProps.expandIconVisible),
      checkboxComponent,
      isExpandChildren,
      toggleExpand,
      onBeforeEnter,
      onEnter,
      onAfterEnter,
      onBeforeLeave,
      onLeave,
      onAfterLeave,
    })
  },
  render () {
    if (!this.node) return

    const _YuumiIcon = resolveComponent('YuumiIcon') as any
    const _YuumiCheckbox = resolveComponent('YuumiCheckbox') as any

    const getExpandIcon = () => {
      const {
        expandIcon,
        expandIconVisible,
        isLeaf,
        isExpandChildren,
        loadingState,
        childrenLoadState
      } = this

      let _props: any = null

      if (childrenLoadState === loadingState.loading) {
        _props = mergeProps({ icon: 'line-loading' })
      } else if (!isLeaf && expandIconVisible) {
        _props = mergeProps(expandIcon)
      }

      return _props && h('div', {
        class: ['expand-icon', {
          '__active': isExpandChildren,
          '__loading': childrenLoadState === loadingState.loading
        }]
      }, [
        h(_YuumiIcon, _props)
      ])
    }

    const getNodeContentVNode = () => {
      const {
        $slots,
        node,
        checkable,
        nodeLabel,
        nodeValue,
        isDisabled,
        toggleExpand,
        isExpandChildren,
        isChecked,
        isIndeterminate,
        updateCheckedValue,
        onCheckedChange
      } = this

      return h('div', {
        class: 'node-content',
        onClick: toggleExpand
      }, $slots.default ? $slots.default({ node, isExpandChildren }) : [
        getExpandIcon(),
        checkable && h('div', { class: 'checkbox-icon' }, [
          h(_YuumiCheckbox, {
            ref: 'checkboxComponent',
            disabled: isDisabled,
            unique: nodeValue,
            modelValue: isChecked,
            indeterminate: isIndeterminate,
            'onUpdate:modelValue': updateCheckedValue,
            'onChange': onCheckedChange
          })
        ]),
        h('div', {
          class: 'content__label'
        }, [nodeLabel])
      ])
    }

    const getNodeChildrenVNodes = () => {
      const { $props, $slots, children, childrenComponent, onChildCheckedChange } = this
      if (!(children instanceof Array)) return

      return children.map((item, index) => {
        const _props = Object.assign({
          ref: (el: any) => childrenComponent[index] = el,
          onChange: onChildCheckedChange
        }, $props, { node: item })
        return h(resolveComponent('YuumiTreeNode') as any, _props, {
          default: $slots.default
        })
      })
    }

    const {
      checkable,
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
      class: ['tree-node', { '__leaf': isLeaf, '__checkable':  checkable }]
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
          h('div', { class: 'child-tree' }, getNodeChildrenVNodes()),
          [[vShow, isExpandChildren]]
        )
      })
    ])
  }
})
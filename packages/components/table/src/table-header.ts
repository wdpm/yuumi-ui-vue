import { getValueByPath } from '../../../share/helper'
import { isDefined, tableColumnType } from '../../../share/validator'
import { computed, defineComponent, h, inject, ref, resolveComponent, watch } from 'vue'
import type { ProvideState } from './provider-helper'
import type { ComputedRef, Ref } from 'vue'

export default defineComponent({
  name: 'TableHeader',
  setup () {
    const { columns, columnStickyPositions, rect, scrollbarState, scrollbarSize, staticWidth, selectionValue, selectionChanged } = inject('state') as ProvideState

    const indeterminate: ComputedRef<boolean> = computed(() => selectionValue.value === 0)
    const checked: Ref<boolean> = ref(selectionValue.value === 1)

    watch(selectionValue, (value, oldValue) => {
      if (value === oldValue) return

      const _checked = selectionValue.value === 1
      if (_checked !== checked.value) {
        checked.value = _checked
      }
    })

    return {
      checked,
      indeterminate,
      columns,
      columnStickyPositions,
      rect,
      scrollbarState,
      scrollbarSize,
      staticWidth,
      selectionChanged
    }
  },
  render () {
    const { checked, indeterminate, columns, columnStickyPositions, rect, staticWidth, scrollbarState, scrollbarSize, selectionChanged } = this
    const { hasX, hasY } = scrollbarState

    const getColgroup = () => {
      const children = columns.map(column => {
        const props = column.props || {}
        const typeProps = getValueByPath(column, 'type.props', {})

        let itemWidth = props.width || typeProps.width.default
        if (hasY.value) {
          itemWidth = itemWidth / staticWidth * (hasX.value ? staticWidth : rect.body.clientWidth)
        }

        return h('col', { width: itemWidth })
      })

      if (hasY.value) {
        children.push(h('col', { width: scrollbarSize[1] }))
      }

      return h('colgroup', {}, children)
    }

    const getTableHead = () => {
      const children = columns.map((column, index) => {
        const props = column.props || {}
        const stickyPosition = columnStickyPositions[index] as any

        const getColumnContent = () => {
          if (props.type === tableColumnType.selection) {
            const checkboxComponent = resolveComponent('YuumiCheckbox')

            return h(checkboxComponent, {
              indeterminate: indeterminate,
              unique: -1,
              modelValue: checked,
              style: {
                height: 'inherit'
              },
              'onUpdate:modelValue': (value: boolean) => {
                this.checked = value
              },
              'onChange': selectionChanged
            })
          }

          const slotHeader = getValueByPath<Function|undefined>(column, 'children.header')
          if (slotHeader) {
            return slotHeader({ $props: props })
          }

          return props.title || props.placeholder
        }

        return h('th', {
          class: [hasX.value && {
            'sticky__left': /left/.test(column.props!.fixed),
            'sticky__right': /right/.test(column.props!.fixed),
            'sticky__first': stickyPosition?.isFirst,
            'sticky__last': stickyPosition?.isLast
          }],
          style: {
            left: /left/.test(column.props!.fixed) ? `${stickyPosition.left}px` : null,
            right: /right/.test(column.props!.fixed) ? `${stickyPosition.right + scrollbarSize[1]}px` : null,
          }
        }, [
          h('div', {
            class: ['column', props.align && `_${props.align}`],
            style: {
              fontSize: isDefined(props.type) ? '0px' : null
            }
          }, [getColumnContent()])
        ])
      })

      if (hasY.value) {
        children.push(h('th', {
          class: ['__scrollbar'], style: {
            position: hasX.value ? 'sticky' : null,
            right: 0
          }
        }))
      }

      return h('thead', {}, children)
    }

    return h('div', {
      class: ['table--header'],
      ref: 'tableHeader'
    }, [
      h('table', { cellspacing: 0, cellpadding: 0, border: 0, style: {
        tableLayout: hasX.value || hasY.value ? 'fixed' : 'auto',
        minWidth: `${staticWidth}px`
      } }, [
        getColgroup(),
        getTableHead()
      ])
    ])
  }
})
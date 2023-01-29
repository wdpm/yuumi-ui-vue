import { getValueByPath } from '../../../share/helper'
import { isDefined, tableColumnType } from '../../../share/validator'
import { injectionKey, ProvideGetters } from './provide-helper'
import { computed, defineComponent, h, inject, ref, resolveComponent, VNode, watch } from 'vue'
import { Scrollbar } from './scollbar-helper'
import { TableSelection } from './selection-helper'

export default defineComponent({
  name: 'TableHead',
  setup () {
    const { getters, scrollbar, selection } = inject(injectionKey) as { getters: ProvideGetters, scrollbar: Scrollbar, selection: TableSelection }
    const { columns, columnsStickyPosition } = getters
    const { selectionValue, selectionChanged } = selection

    const checked = ref(selectionValue.value === 1)
    watch(selectionValue, (value, oldValue) => {
      if (value === oldValue) return

      const _checked = selectionValue.value === 1
      if (_checked !== checked.value) {
        checked.value = _checked
      }
    })

    return {
      columns,
      columnsStickyPosition,
      scrollbar,
      indeterminate: computed(() => selectionValue.value === 0),
      checked,
      selectionChanged
    }
  },
  methods: {
    getColumnContent (column: VNode) {
      const props = column.props || {}

      if (props.type === tableColumnType.selection) {
        const checkboxComponent = resolveComponent('YuumiCheckbox')

        return h(checkboxComponent, {
          indeterminate: this.indeterminate,
          unique: -1,
          modelValue: this.checked,
          style: {
            height: 'inherit'
          },
          'onUpdate:modelValue': (value: boolean) => {
            this.checked = value
          },
          'onChange': this.selectionChanged
        })
      }

      const slotHeader = getValueByPath<Function|undefined>(column, 'children.header')
      if (slotHeader) {
        return slotHeader({ $props: props })
      }

      return props.title || props.placeholder
    },
    getColums () {
      const children = this.columns.map((col: any, colIndex: number) => {
        const props = col.props || {}
        const stickyPosition = this.columnsStickyPosition[colIndex] as any
        const { hasX, width } = this.scrollbar

        return h('th', {
          class: [hasX.value && {
            'sticky__left': /left/.test(col.props!.fixed),
            'sticky__right': /right/.test(col.props!.fixed),
            'sticky__first': stickyPosition?.isFirst,
            'sticky__last': stickyPosition?.isLast
          }],
          style: {
            left: /left/.test(col.props!.fixed) ? `${stickyPosition.left}px` : null,
            right: /right/.test(col.props!.fixed) ? `${stickyPosition.right + width.value}px` : null,
          }
        }, [
          h('div', {
            class: ['column', props.align && `_${props.align}`],
            style: {
              fontSize: isDefined(props.type) ? '0px' : null
            }
          }, [this.getColumnContent(col)])
        ])
      })

      const { hasX, hasY } = this.scrollbar

      if (hasY.value) {
        children.push(h('th', {
          class: ['__scrollbar'], style: {
            position: hasX.value ? 'sticky' : null,
            right: 0
          }
        }))
      }

      return children
    },
    getCols () {
      const children = this.columns.map(column => {
        const props = column.props || {}
        const typeProps = getValueByPath(column, 'type.props', {})

        return h('col', {
          key: props.key,
          width:  props.width || typeProps.width.default
        })
      })

      const { hasY, width } = this.scrollbar
      if (hasY.value) {
        children.push(h('col', {
          width:  width.value
        }))
      }

      return children
    }
  },
  render () {
    const { hasX, hasY } = this.scrollbar
    return h('div', {
      class: ['table--head']
    }, [
      h('table', {
        cellspacing: 0,
        cellpadding: 0,
        border: 0,
        style: {
          tableLayout: hasX.value || hasY.value ? 'fixed' : 'auto'
        }
      }, [
        h('colgroup', {}, this.getCols()),
        h('thead', {}, [
          h('tr', {}, this.getColums())
        ])
      ])
    ])
  }
})
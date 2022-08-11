import { getValueByPath } from '../../../share/helper'
import { defineComponent, h, inject } from 'vue'
import type { ProvideState } from './provider-helper'

export default defineComponent({
  name: 'TableBody',
  props: {
    data: Array,
    onScroll: Function
  },
  setup () {
    const { tableInstance, columns, columnStickyPositions, scrollbarState, staticWidth } = inject('state') as ProvideState
    const { rowClassName,  cellClassName } = tableInstance.props as {
      rowClassName: Function
      cellClassName: Function
    }

    return {
      rowClassName,
      cellClassName,
      columns,
      columnStickyPositions,
      scrollbarState,
      staticWidth
    }
  },
  render () {
    const { data, rowClassName, cellClassName, columns, columnStickyPositions, scrollbarState, staticWidth } = this
    const { hasX } = scrollbarState

    return h('div', {
      class: ['table--body'],
      onScroll: this.onScroll,
      ref: 'tableBody'
    }, [
      h('table', { cellspacing: 0, cellpadding: 0, border: 0, style: {
        minWidth: `${staticWidth}px`,
        tableLayout: hasX.value ? 'fixed' : 'auto'
      } }, [
        h('colgroup', {}, columns.map(column => {
          const props = column.props || {}
          const typeProps = getValueByPath(column, 'type.props', {})

          return h('col', { width:  props.width || typeProps.width.default })
        })),
        h('tbody', {}, (data || []).map((row, rowIndex) => {
          return h('tr', {
            class: [rowClassName && rowClassName({ row, index: rowIndex })]
          }, columns.map((column, index) => {
            const stickyPosition = columnStickyPositions[index] as any

            return h('td', {
              class: [cellClassName && cellClassName({ column, index, row, rowIndex }), hasX.value && {
                'sticky__left': /left/.test(column.props!.fixed),
                'sticky__right': /right/.test(column.props!.fixed),
                'sticky__first': stickyPosition?.isFirst,
                'sticky__last': stickyPosition?.isLast
              }],
              style: {
                left: /left/.test(column.props!.fixed) ? `${stickyPosition.left}px` : null,
                right: /right/.test(column.props!.fixed) ? `${stickyPosition.right}px` : null,
              }
            }, [ h(column, { rowIndex, index }) ])
          }))
        }))
      ])
    ])
  }
})
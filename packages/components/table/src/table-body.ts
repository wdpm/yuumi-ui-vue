import { getValueByPath } from '../../../share/helper'
import { defineComponent, h, inject } from 'vue'
import type { ProvideState } from './provider-helper'

export default defineComponent({
  name: 'TableBody',
  props: {
    onScroll: Function
  },
  setup () {
    const { rootProps, columns, columnStickyPositions, scrollbarState, staticWidth } = inject('state') as ProvideState

    return {
      rootProps,
      columns,
      columnStickyPositions,
      scrollbarState,
      staticWidth
    }
  },
  render () {
    const { rootProps, columns, columnStickyPositions, scrollbarState, staticWidth } = this
    const { data, rowClassName, cellClassName } = rootProps
    const { hasX, hasY } = scrollbarState

    return h('div', {
      class: ['table--body'],
      onScroll: this.onScroll,
      ref: 'tableBody'
    }, [
      h('table', { cellspacing: 0, cellpadding: 0, border: 0, style: {
        minWidth: `${staticWidth}px`,
        tableLayout: hasX.value || hasY.value ? 'fixed' : 'auto'
      } }, [
        h('colgroup', {}, columns.map(column => {
          const props = column.props || {}
          const typeProps = getValueByPath(column, 'type.props', {})

          return h('col', {
            key: props.key,
            width:  props.width || typeProps.width.default
          })
        })),
        h('tbody', {}, (data || []).map((row: any, rowIndex: number) => {
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
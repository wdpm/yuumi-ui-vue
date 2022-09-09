import { getValueByPath } from '../../../share/helper'
import { injectionKey, ProvideGetters } from './provide-helper'
import { defineComponent, h, inject, ref } from 'vue'
import { Scrollbar } from './scollbar-helper'

export default defineComponent({
  name: 'TableBody',
  setup () {
    const { getters, scrollbar } = inject(injectionKey) as { getters: ProvideGetters, scrollbar: Scrollbar }
    const { columns, columnsStickyPosition, rootProps, staticWidth } = getters

    return {
      scrollbar,
      rootProps,
      columns,
      columnsStickyPosition,
      staticWidth
    }
  },
  render () {
    const { columns, columnsStickyPosition, rootProps, staticWidth } = this
    const { rowClassName, cellClassName } = this.rootProps
    const { hasX } = this.scrollbar

    return h('div', {
      class: ['table--body']
    }, [
      h('table', {
        cellspacing: 0,
        cellpadding: 0,
        border: 0,
        style: {
          minWidth: `${staticWidth}px`
        }
      }, [
        h('colgroup', {}, columns.map(column => {
          const props = column.props || {}
          const typeProps = getValueByPath(column, 'type.props', {})

          return h('col', {
            key: props.key,
            width:  props.width || typeProps.width.default
          })
        })),
        h('tbody', {}, rootProps.data.map((row: any, rowIndex: number) => {
          return h('tr', {
            class: [rowClassName && rowClassName({ row, rowIndex })]
          }, columns.map((col: any, colIndex: number) => {
            const stickyPosition = columnsStickyPosition[colIndex] as any

            return h('td', {
              class: [cellClassName && cellClassName({ col, colIndex, row, rowIndex }), hasX.value && {
                'sticky__left': /left/.test(col.props!.fixed),
                'sticky__right': /right/.test(col.props!.fixed),
                'sticky__first': stickyPosition?.isFirst,
                'sticky__last': stickyPosition?.isLast
              }],
              style: {
                left: /left/.test(col.props!.fixed) ? `${stickyPosition.left}px` : null,
                right: /right/.test(col.props!.fixed) ? `${stickyPosition.right}px` : null,
              }
            }, h(col, { rowIndex, colIndex }))
          }))
        }))
      ])
    ])
  }
})
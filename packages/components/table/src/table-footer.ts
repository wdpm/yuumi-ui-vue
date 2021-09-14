import { getValueByPath } from '../../../share/helper'
import { computed, defineComponent, h, inject } from 'vue'
import type { VNode } from 'vue'
import type { ProvideState } from './provider-helper'

interface SummaryMethodOptions {
  data: any[]
  columns: VNode[]
  summaryText: string
}

function defaultSummaryMethod ({ data, columns, summaryText }: SummaryMethodOptions) {
  const sum = Array(columns.length).fill(0)
  let sumStartIndex = -1

  data.forEach((row) => {
    columns.forEach((column, index) => {
      if (sumStartIndex < 0) {
        sumStartIndex = index
        sum[index] = summaryText
      }

      if (typeof sum[index] !== 'number' || index === sumStartIndex) return

      const itemValue = Number(getValueByPath(row, column.props?.prop))
      if (itemValue.toString() === 'NaN') {
        sum[index] = 'N/A'
        return
      }

      sum[index] += itemValue
    })
  })

  return sum
}

export default defineComponent({
  name: 'TableFooter',
  setup () {
    const { tableInstance, columns, columnStickyPositions, rect, staticWidth, scrollbarState, scrollbarSize } = inject('state') as ProvideState
    const { summaryMethod, summaryText, data } = tableInstance.props as any
    const sum = computed(() => {
      return summaryMethod ? summaryMethod({ data, columns: columns.value, summaryText }) : defaultSummaryMethod({ data, columns: columns.value, summaryText })
    })

    return {
      sum,
      columns,
      columnStickyPositions,
      rect,
      staticWidth,
      scrollbarState,
      scrollbarSize
    }
  },
  render () {
    const { sum, columns, columnStickyPositions, rect, staticWidth, scrollbarState, scrollbarSize } = this
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

    const getTableTfoot = () => {
      const children = columns.map((column, index) => {
        const props = column.props || {}
        const stickyPosition = columnStickyPositions[index] as any

        const getColumnContent = () => {
          const slotFooter = getValueByPath<Function|undefined>(column, 'children.footer')
          if (slotFooter) {
            return slotFooter({ $props: props, $value: sum[index] })
          }

          return sum[index]
        }

        return h('td', {
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
            class: ['column', props.align && `_${props.align}`]
          }, [ getColumnContent() ])
        ])
      })

      if (hasY.value) {
        children.push(h('td', {
          class: ['__scrollbar'],
          style: {
            position: hasX.value ? 'sticky' : null,
            right: 0
          }
        }))
      }

      return h('tfoot', {}, children)
    }

    return h('div', {
      class: ['table--footer'],
      ref: 'tableFooter'
    }, [
      h('table', { cellspacing: 0, cellpadding: 0, border: 0, style: {
        tableLayout: hasY.value ? 'fixed' : 'auto',
        minWidth: `${staticWidth}px`
      } }, [
        getColgroup(),
        getTableTfoot()
      ])
    ])
  }
})
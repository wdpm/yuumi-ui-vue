import { getValueByPath } from '../../../share/helper'
import { computed, defineComponent, h, inject, VNode } from 'vue'
import { injectionKey, ProvideGetters } from './provide-helper'
import { Scrollbar } from './scollbar-helper'

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
    const { getters, scrollbar } = inject(injectionKey) as { getters: ProvideGetters, scrollbar: Scrollbar }
    const { rootProps, columns, columnsStickyPosition } = getters
    const { summaryMethod, summaryText } = rootProps.value

    return {
      columns,
      columnsStickyPosition,
      scrollbar,
      sum: computed(() => {
        const params = { data: rootProps.value.data as any, columns: columns.value, summaryText }
        return summaryMethod ? summaryMethod(params) : defaultSummaryMethod(params)
      })
    }
  },
  methods: {
    getColgroup () {
      const children = this.columns.map(column => {
        const props = column.props || {}
        const typeProps = getValueByPath(column, 'type.props', {})

        return h('col', {
          key: props.key,
          width: props.width || typeProps.width.default
        })
      })

      const { hasY, width } = this.scrollbar
      if (hasY.value) {
        children.push(h('col', {
          width:  width.value
        }))
      }

      return h('colgroup', {}, children)
    },
    getTablefoot () {
      const { hasX, hasY, width } = this.scrollbar

      const children = this.columns.map((col, colIndex) => {
        const props = col.props || {}
        const stickyPosition = this.columnsStickyPosition[colIndex] as any

        const getColumnContent = () => {
          const slotFooter = getValueByPath<Function|undefined>(col, 'children.footer')
          if (slotFooter) {
            return slotFooter({ $props: props, $value: this.sum[colIndex] })
          }

          return this.sum[colIndex]
        }

        return h('td', {
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
  },
  render () {
    const { hasY } = this.scrollbar
    return h('div', {
      class: ['table--foot']
    }, [
      h('table', {
        cellspacing: 0,
        cellpadding: 0,
        border: 0,
        style: {
          tableLayout: hasY.value ? 'fixed' : 'auto',
        }
      }, [
        this.getColgroup(),
        this.getTablefoot()
      ])
    ])
  }
})

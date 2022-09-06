import { isValidTableSize } from '../../../share/validator'
import { defineComponent, getCurrentInstance, h, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import type { ComponentInternalInstance } from 'vue'
import useProvider from './provider-helper'
import TalbeHeader from './table-header'
import TableBody from './table-body'
import TableFooter from './table-footer'
import './index.scss'

export default defineComponent({
  name: 'YuumiTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    border: Boolean,
    stripe: Boolean,
    size: {
      type: String,
      validator: isValidTableSize,
      default: 'default'
    },
    rowClassName: Function,
    cellClassName: Function,
    summary: Boolean,
    summaryText: {
      type: String,
      default: '合计'
    },
    summaryMethod: Function,
    resetScroll: { type: Boolean }
  },
  emits: ['select', 'selectAll', 'selectionChange', 'scroll'],
  watch: {
    data: function () {
      this.onResize()
      if (this.resetScroll && this.tableBodyComponent) {
        this.tableBodyComponent.$refs.tableBody.scrollTop = 0
        this.tableBodyComponent.$refs.tableBody.scrollLeft = 0
      }
    }
  },
  setup (props, { emit, expose }) {
    const instance = getCurrentInstance() as ComponentInternalInstance
    const { columns, rect, updateRect, scrollbarState, updateScrollbarPositionState, selections, toggleRowsSelection, clearSelection } = useProvider(instance)
    const tableElement = ref()
    const tableHeaderComponent = ref()
    const tableBodyComponent = ref()
    const tableFooterComponent = ref()

    function onResize () {
      updateRect({
        table: tableElement.value,
        header: tableHeaderComponent.value?.$refs.tableHeader,
        body: tableBodyComponent.value?.$refs.tableBody,
        footer: tableFooterComponent.value?.$refs.tableFooter
      })

      updateScrollbarPositionState(tableBodyComponent.value.$refs.tableBody)
    }

    function onScroll (e: Event) {
      const target = e.target as HTMLElement

      updateScrollbarPositionState(target)

      tableHeaderComponent.value.$refs.tableHeader.scrollLeft = target.scrollLeft
      if (tableFooterComponent.value) {
        tableFooterComponent.value.$refs.tableFooter.scrollLeft = target.scrollLeft
      }

      emit('scroll', e)
    }

    onMounted(() => {
      onResize()

      window.addEventListener('resize', onResize, false)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize, false)
    })

    expose({
      selections,
      toggleRowsSelection,
      clearSelection
    })

    return {
      tableElement,
      tableHeaderComponent,
      tableBodyComponent,
      tableFooterComponent,
      columns,
      rect,
      scrollbarState,
      onScroll,
      onResize
    }
  },
  render () {
    const { scrollbarState, rect, data } = this
    const { positionIsStart, positionIsEnd, hasX, hasY } = scrollbarState

    return h('div', {
      class: ['yuumi-table', 'size__' + this.size, {
        '__border': this.border,
        '__stripe': this.stripe,
        '__scroll-start': hasX.value && positionIsStart.value,
        '__scroll-end': hasX.value && positionIsEnd.value
      }],
      ref: 'tableElement'
    }, [
      h(TalbeHeader, { ref: 'tableHeaderComponent' }),
      h(TableBody, {
        style: {
          height: hasY.value ? `${rect.table.height - rect.header.height - rect.footer.height}px` : null,
        },
        onScroll: this.onScroll,
        ref: 'tableBodyComponent'
      }),
      this.summary && h(TableFooter, { ref: 'tableFooterComponent' })
    ])
  }
})
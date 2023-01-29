import { isValidTableSize } from '../../../share/validator'
import { debounce } from '../../../share/helper'
import { ComponentInternalInstance, defineComponent, getCurrentInstance, h, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useProvide } from './provide-helper'
import { updateTableCellSize, updateTableWidth, updateTableWrapperSize } from './size-helper'
import TableHead from './table-head'
import TableBody from './table-body'
import TableFoot from './table-foot'
import './index.scss'

export default defineComponent({
  name: 'YuumiTable',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
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
  emits: ['select', 'selectAll', 'selectionChange','scroll'],
  setup (props, { emit, expose }) {
    const instance = getCurrentInstance() as ComponentInternalInstance
    const { getters, scrollbar, selection } = useProvide(instance)
    const { columns } = getters

    const tableWrapper = ref()
    const tableHeadComponent = ref()
    const tableBodyComponent = ref()
    const tableFootComponent = ref()

    function onScroll (e: Event) {
      const target = e.target as HTMLElement
      scrollbar.updateScrollPositon(target)

      tableHeadComponent.value.$el.scrollLeft = target.scrollLeft
      if (tableFootComponent.value) {
        tableFootComponent.value.$el.scrollLeft = target.scrollLeft
      }

      emit('scroll', e)
    }

    const onResize = debounce(updateSizes, 16)

    onMounted(() => {
      window.addEventListener('resize', onResize, false)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize, false)
    })

    function updateSizes () {
      updateTableCellSize(tableBodyComponent.value, tableHeadComponent.value, tableFootComponent.value)
      updateTableWidth(tableBodyComponent.value, tableHeadComponent.value, tableFootComponent.value)
      updateTableWrapperSize(tableWrapper.value, tableBodyComponent.value, tableHeadComponent.value, tableFootComponent.value)
      scrollbar.update(tableBodyComponent.value)
      scrollbar.updateScrollPositon(tableBodyComponent.value.$el)

      // 如果有垂直方向的滚动条
      if (scrollbar.hasY.value) {
        updateTableWidth(tableBodyComponent.value, tableHeadComponent.value, tableFootComponent.value, scrollbar.width.value)
      }
    }

    watch(() => props.data, () => {
      nextTick(updateSizes)
    }, { immediate: true })

    watch(() => columns.value, () => {
      nextTick(updateSizes)
    })

    expose({
      selections: selection.selections,
      toggleRowsSelection: selection.toggleRowsSelection,
      clearSelection: selection.clearSelection
    })

    return {
      tableWrapper,
      tableHeadComponent,
      tableBodyComponent,
      tableFootComponent,
      columns,
      scrollbar,
      onScroll
    }
  },
  render () {
    const { hasX, isScrollStart, isScrollEnd } = this.scrollbar
    return h('div', {
      class: ['yuumi-table', 'size__' + this.size, {
        '__border': this.border,
        '__stripe': this.stripe,
        '__scroll-start': hasX.value && isScrollStart.value,
        '__scroll-end': hasX.value && isScrollEnd.value
      }],
      ref: 'tableWrapper'
    }, [
      h(TableHead, { ref: 'tableHeadComponent' }),
      h(TableBody, {
        onScroll: this.onScroll,
        ref: 'tableBodyComponent'
      }),
      this.summary &&  h(TableFoot, { ref: 'tableFootComponent' }),
    ])
  }
})
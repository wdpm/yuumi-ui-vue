import { computed, nextTick, reactive, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'

function useStyle () {
  const rect: TableRect = reactive({
    table: {
      width: 0,
      height: 0
    },
    header: {
      width: 0,
      height: 0
    },
    body: {
      width: 0,
      height: 0,
      clientWidth: 0,
      clientHeight: 0,
      scrollWidth: 0,
      scrollHeight: 0
    },
    footer: {
      width: 0,
      height: 0
    }
  })

  const scrollbarState: ScrollbarState = {
    positionIsStart: ref(false),
    positionIsEnd: ref(false),
    hasX: computed(() => rect.body.width < rect.body.scrollWidth),
    hasY: computed(() => rect.table.height < rect.header.height + rect.body.scrollHeight + (rect.body.height - rect.body.clientHeight) + rect.footer.height)
  }

  const scrollbarSize = computed(() => {
    return [
      rect.body.height - rect.body.clientHeight,
      rect.body.width - rect.body.clientWidth
    ]
  })

  function updateScrollbarPositionState (element: Element) {
    scrollbarState.positionIsStart.value = element.scrollLeft === 0
    scrollbarState.positionIsEnd.value = element.scrollLeft + element.clientWidth === element.scrollWidth
  }

  function updateRect ({ table, header, body, footer }: updateRectOptions) {
    if (table) {
      rect.table.width = table.clientWidth
      rect.table.height = table.clientHeight
    }

    if (header) {
      rect.header.width = header.offsetWidth
      rect.header.height = header.offsetHeight
    }

    if (body) {
      rect.body.scrollWidth = body.scrollWidth
      rect.body.scrollHeight = body.scrollHeight

      nextTick(() => {
        rect.body.width = body.offsetWidth
        rect.body.height = body.offsetHeight

        nextTick(() => {
          rect.body.clientWidth = body.clientWidth
          rect.body.clientHeight = body.clientHeight
        })

        updateScrollbarPositionState(body)
      })
    }

    if (footer) {
      rect.footer.width = footer.offsetWidth
      rect.footer.height = footer.offsetHeight
    }
  }


  return { rect, updateRect, scrollbarState, updateScrollbarPositionState, scrollbarSize }
}

export default useStyle

export interface updateRectOptions {
  table?: HTMLElement
  header?: HTMLElement
  body?: HTMLElement
  footer?: HTMLElement
}

export interface ScrollbarState {
  positionIsStart: Ref<boolean>
  positionIsEnd: Ref<boolean>
  hasX: ComputedRef<boolean>
  hasY: ComputedRef<boolean>
}

export interface TableRect {
  table: { [key: string]: number }
  header: { [key: string]: number }
  body: { [key: string]: number }
  footer: { [key: string]: number }
}
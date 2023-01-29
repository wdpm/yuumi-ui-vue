import { Ref, ref } from 'vue'

export interface Scrollbar {
  hasX: Ref<boolean>
  hasY: Ref<boolean>
  width: Ref<number>
  height: Ref<number>
  isScrollStart: Ref<boolean>
  isScrollEnd: Ref<boolean>
  update: (tableBody: any) => void
}

export function useScrollbar () {
  const hasX = ref(false)
  const hasY = ref(false)
  const width = ref(0)
  const height = ref(0)
  const isScrollStart = ref(false)
  const isScrollEnd = ref(false)

  function update(tableBody: any) {
    const element = tableBody.$el
    width.value =  element.offsetWidth - element.clientWidth
    height.value = element.offsetHeight - element.clientHeight
    hasX.value = height.value > 0
    hasY.value = width.value > 0
  }

  function updateScrollPositon(element: HTMLElement) {
    isScrollStart.value = element.scrollLeft === 0
    isScrollEnd.value = element.scrollLeft + element.clientWidth === element.scrollWidth
  }

  return {
    hasX,
    hasY,
    width,
    height,
    isScrollStart,
    isScrollEnd,
    update,
    updateScrollPositon
  }
}
import { isDescendantElement } from '../../../share/validator'
import { nextTick, ref } from 'vue'
import type { Ref } from 'vue'

interface useExpandOption {
  getNodeExpand: () => boolean
  beforeExpand?: (e: Event) => void
  expand?: () => Promise<any>
  afterExpand?: (expand: boolean) => void
}

export default function useExpand ({ getNodeExpand, beforeExpand, expand, afterExpand }: useExpandOption) {
  const checkboxComponent: Ref<any> = ref()
  const isExpandChildren = ref(getNodeExpand())

  function toggleExpand (e: Event) {
    beforeExpand && beforeExpand(e)

    const target = e.target as HTMLElement
    if (checkboxComponent.value && isDescendantElement(target, checkboxComponent.value.$el, checkboxComponent.value.$el.parentElement)) return

    const promise = expand ? expand() : Promise.resolve()

    promise.then(() => {
      isExpandChildren.value = !isExpandChildren.value
      afterExpand && afterExpand(isExpandChildren.value)
    }).catch(() => {})
  }

  function onBeforeEnter (el: any) {
    el.style.height = '0px'
  }

  function onEnter (el: any) {
    nextTick(() => {
      el.style.height = `${el.scrollHeight}px`
    })
  }

  function onAfterEnter (el: any) {
    el.style.height = ''
  }

  function onBeforeLeave (el: any) {
    el.style.height = `${el.scrollHeight}px`
  }

  function onLeave (el: any) {
    nextTick(() => {
      el.style.height = '0px'
    })
  }

  function onAfterLeave (el: any) {
    el.style.height = ''
  }

  return {
    checkboxComponent,
    isExpandChildren,
    toggleExpand,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeLeave,
    onLeave,
    onAfterLeave
  }
}
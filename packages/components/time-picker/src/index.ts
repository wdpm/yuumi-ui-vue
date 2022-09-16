import { createRange, dateFormat } from '../../../share/helper'
import { isValidComponentSize } from '../../../share/validator'
import { computed, defineComponent, h, mergeProps, ref, resolveComponent, watch } from 'vue'
import type { Ref, PropType, VNode } from 'vue'
import times from './times.vue'
import useHelper from './helper'
import useClear from './clear-helper'
import useRestore from './restore-helper'

//TODO READ
export default defineComponent({
  name: 'YuumiTimePicker',
  inheritAttrs: false,
  components: {
    [times.name]: times
  },
  props: {
    modelValue: { type: [Date, Array] as PropType<any[]> },
    placeholder: { type: String, default: '请选择时间' },
    startPlaceholder: { type: String, default: '开始时间' },
    endPlaceholder: { type: String, default: '结束时间' },
    hyphen: { type: String, default: '至' },
    size: { type: String, validator: isValidComponentSize, default: 'md' },
    format: { type: String, default: 'hh:mm:ss' },
    range: { type: Boolean },
    readonly: { type: Boolean },
    disabled: { type: Boolean },
    disabledHours: { type: Function },
    disabledMinutes: { type: Function },
    disabledSeconds: { type: Function },
    clearable: { type: Boolean },
    immediate: { type: Boolean }
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    const { getValidDate, getValue } = useHelper()

    const popperComponent = ref()

    const startDate: Ref<any> = ref()
    const endDate : Ref<any> = ref()

    const startDateText = computed(() => {
      return startDate.value ? dateFormat(startDate.value, props.format) : ''
    })
    const endDateText = computed(() => {
      return endDate.value ? dateFormat(endDate.value, props.format) : ''
    })

    const isActivedState = computed(() => {
      if (!popperComponent.value) return false
      return popperComponent.value.visible as boolean
    })

    watch(() => props.modelValue, (value, oldValue) => {
      if ((value || []).toString() === (oldValue || []).toString()) return

      const [start, end] = value instanceof Array ? value : [value]
      startDate.value = getValidDate(start && new Date(start))
      endDate.value = getValidDate(end && new Date(end))

      if (!value && isActivedState.value) {
        tryHidePopper()
      }
    }, { deep: true, immediate: true })

    function endDisabledHours () {
      const _disabled = props.disabledHours ? props.disabledHours() : []
      return createRange(0, startDate.value.getHours()).concat(_disabled)
    }

    function endDisabledMinutes ({hours}: any) {
      const _disabled = props.disabledMinutes ? props.disabledMinutes(hours) : []

      if (hours === startDate.value.getHours()) {
        return createRange(0, startDate.value.getMinutes()).concat(_disabled)
      }
      return _disabled
    }

    function endDisabledSeconds ({hours, minutes}: any) {
      const _disabled = props.disabledSeconds ? props.disabledSeconds(minutes) : []

      if (minutes === startDate.value.getMinutes() && startDate.value.getHours() === hours) {
        return createRange(0, startDate.value.getSeconds()).concat(_disabled)
      }
      return _disabled
    }

    const { saveDateValue, restoreDateValue } = useRestore(startDate, endDate)

    function onBeforeOpen () {
      saveDateValue()

      if (!props.modelValue) {
        const _now = new Date()
        startDate.value = getValidDate(_now)
        endDate.value = getValidDate(new Date(_now.setHours(_now.getHours() + 1)))
      }
    }

    function onBeforeLeave () {
      if (!props.immediate) _updateModelValue()
    }

    function onTimeChange ({ value, method }: any, type: string) {
      if (type === 'end') {
        endDate.value = new Date(endDate.value[method](value))
      } else {
        startDate.value = new Date(startDate.value[method](value))
      }

      if (props.immediate) _updateModelValue()
    }

    function _updateModelValue () {
      const _value = getValue()
      emit('update:modelValue', _value)

      if ((_value||'').toString() !== (props.modelValue || '').toString()) {
        emit('change', _value)
      }
    }

    function tryHidePopper () {
      if (popperComponent.value) {
        popperComponent.value.visible = false
      }
    }

    function onCancel () {
      restoreDateValue()
      tryHidePopper()
    }

    function onConfirm () {
      tryHidePopper()
    }

    const { clearBtnVisible, clearHalk, tryHideClearBtn, tryShowclearBtn } = useClear()

    return {
      popperComponent,
      startDate,
      endDate,
      startDateText,
      endDateText,
      isActivedState,
      endDisabledHours,
      endDisabledMinutes,
      endDisabledSeconds,
      onBeforeOpen,
      onBeforeLeave,
      onTimeChange,
      onCancel,
      onConfirm,
      clearBtnVisible,
      onMouseenter: tryShowclearBtn,
      onMouseleave: tryHideClearBtn,
      onClear: (event: MouseEvent) => {
        event.stopPropagation()
        clearHalk(() => {
          if (isActivedState.value) {
            const now = new Date()
            return props.range ? [now, new Date(now.getTime() + 3600 * 1000)] : now
          }
        })
      }
    }
  },
  render () {
    const _YuumiIcon = resolveComponent('YuumiIcon') as any
    const _YuumiPopper = resolveComponent('YuumiPopper') as any
    const _PickerTimes = resolveComponent(times.name) as any

    const getPlaceholderVNode = () => {
      const { $props } = this
      const children: VNode[] = $props.range ? [
        h('span', { class: 'content-time' }, [$props.startPlaceholder]),
        h('span', { class: 'content-hyphen' }, [$props.hyphen]),
        h('span', { class: 'content-time' }, [$props.endPlaceholder])
      ] : [
        h('span', null, [$props.placeholder])
      ]

      return h('span', { class: 'placeholder'}, children)
    }

    const getContentVNode = () => {
      const { $props, startDateText, endDateText } = this

      let children: VNode[] = []

      if (startDateText) {
        children = children.concat(h('span', { class: 'content-time' }, [startDateText]))
      }

      if ($props.range && endDateText) {
        children = children.concat([
          h('span', { class: 'content-hyphen' }, [$props.hyphen]),
          h('span', { class: 'content-time' }, [endDateText])
        ])
      }

      if (children.length === 0) {
        children.push(getPlaceholderVNode())
      }

      return h('div', { class: 'picker__content' }, children)
    }

    const getTriggerVNode = () => {
      const { $props, $attrs, isActivedState, clearBtnVisible, onMouseenter, onMouseleave, onClear } = this

      const _props = mergeProps({
        class: [ 'yuumi-time-picker', `size__${$props.size}`, {
          '__focus': isActivedState,
          '__disabled': $props.disabled
        }],
        onMouseenter,
        onMouseleave,
        ref: 'timePicker'
      }, $attrs)

      return h('div', _props, [
        h('div', { class: 'picker__icon' }, [
          h(_YuumiIcon, { icon: 'line-clock' })
        ]),

        getContentVNode(),

        h('div', { class: 'picker__suffix' }, [
          clearBtnVisible && h(_YuumiIcon, {
            icon: 'line-circle-close',
            onClick: onClear
          })
        ])
      ])
    }

    const getDefaultVNode = () => {
      const { $props, startDate, endDate, endDisabledHours, endDisabledMinutes, endDisabledSeconds, onTimeChange, onCancel, onConfirm } = this

      const _startDateProps = mergeProps({
        format: $props.format,
        disabledHours: $props.disabledHours,
        disabledMinutes: $props.disabledMinutes,
        disabledSeconds: $props.disabledSeconds,
        onChange: (e: any) => onTimeChange(e, 'start')
      }, startDate ? {
        hours: startDate.getHours(),
        minutes: startDate.getMinutes(),
        seconds: startDate.getSeconds()
      } : {})

      const _endDateProps = mergeProps({
        format: $props.format,
        disabledHours: endDisabledHours,
        disabledMinutes: endDisabledMinutes,
        disabledSeconds: endDisabledSeconds,
        onChange: (e: any) => onTimeChange(e, 'end')
      }, endDate ? {
        hours: endDate.getHours(),
        minutes: endDate.getMinutes(),
        seconds: endDate.getSeconds()
      } : {})

      return h('div', {
        onClick: (e: MouseEvent) => { e.stopPropagation() }
      }, [
        h(_PickerTimes, _startDateProps),

        $props.range && h(_PickerTimes, _endDateProps),

        h('div', { class: 'time-picker-btns' }, [
          h('span', { onClick: onCancel }, '取消'),
          h('span', { onClick: onConfirm }, '确认')
        ])
      ])
    }

    return h(_YuumiPopper, {
      onBeforeOpen: this.onBeforeOpen,
      onBeforeLeave: this.onBeforeLeave,
      ref: 'popperComponent'
    }, {
      trigger: () => h(getTriggerVNode(), {
        readonly: this.readonly,
        disabled: this.disabled
      }),
      default: () => getDefaultVNode()
    })
  }
})

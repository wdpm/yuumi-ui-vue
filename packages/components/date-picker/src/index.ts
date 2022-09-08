import { isValidComponentSize, isValidDatePickerType } from '../../../share/validator'
import { dateFormat } from '../../../share/helper'
import { computed, defineComponent, h, mergeProps, ref, resolveComponent, watch} from 'vue'
import type { PropType, Ref, VNode } from 'vue'
import DatePanel from './dates.vue'
import useHelper from './helper'
import useRestore from './restore-helper'
import useClear from './clear-helper'

export default defineComponent({
  name: 'YuumiDatePicker',
  inheritAttrs: false,
  components: {
    DatePanel
  },
  props: {
    modelValue: [Date, Array] as PropType<Date|Date[]>,
    placeholder: { type: String, default: '请选择日期' },
    timePlaceholder: { type: String, default: '请选择时间' },
    startPlaceholder: { type: String, default: '开始日期' },
    startTimePlaceholder: { type: String, default: '开始时间' },
    endPlaceholder: { type: String, default: '结束日期' },
    endTimePlaceholder: { type: String, default: '结束时间' },
    hyphen: { type: String, default: '至' },
    size: { type: String, validator: isValidComponentSize, default: 'md' },
    format: String,
    readonly: Boolean,
    disabled: Boolean,
    disabledDates: Function,
    disabledHours: Function,
    disabledMinutes: Function,
    disabledSeconds: Function,
    clearable: Boolean,
    type: { type: String, validator: isValidDatePickerType, default: 'date' },
    maxdays: Number
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    const popperComponent = ref()

    const isRange = computed(() => /range/.test(props.type))
    const hasTime = computed(() => /time/.test(props.type))
    const formatRule = computed(() => props.format || (hasTime.value ? 'YYYY-MM-DD hh:mm:ss' : 'YYYY-MM-DD'))

    const startDate = ref()
    const startSelectDate = ref()
    const endDate = ref()
    const endSelectDate = ref()
    const wantEndSelectDate = ref()

    const selectDateFormatRule = computed(() => (formatRule.value.match(/.*?(?=\s+|$)/) || [''])[0])
    const startDateText = computed(() => startDate.value ? dateFormat(startDate.value, formatRule.value) : '')
    const startSelectDateText = computed(() => startSelectDate.value ? dateFormat(startSelectDate.value, selectDateFormatRule.value) : '')
    const endDateText = computed(() => endDate.value ? dateFormat(endDate.value, formatRule.value) : '')
    const endSelectDateText = computed(() => endSelectDate.value ? dateFormat(endSelectDate.value, selectDateFormatRule.value) : '')

    const errMsg = ref('')

    const isActivedState = computed(() => {
      if (!popperComponent.value) return false
      return popperComponent.value.visible as boolean
    })

    const { getValue, mergeDate, createPanelData, endDisabledHours, endDisabledMinutes, endDisabledSeconds } = useHelper({ startSelectDate, endSelectDate, wantEndSelectDate, isRange })

    const renderDate: Ref<Date> = ref(new Date())

    const panels = computed(() => {
      const _panels = [createPanelData(renderDate.value)]

      if (isRange.value) {
        const _renderDate = new Date(renderDate.value.getFullYear(), renderDate.value.getMonth() + 1, 1, 0, 0, 0)
        _panels.push(createPanelData(_renderDate))
      }

      return _panels
    })

    watch(() => props.modelValue, (value, oldValue) => {
      if (value?.toString() == oldValue?.toString()) return

      if (value instanceof Array) {
        startDate.value = value[0]
        endDate.value = value[1]
      } else if (value instanceof Date) {
        startDate.value = value
      } else {
        startDate.value = null
        endDate.value = null
      }

      // 如果面板打开了
      if (isActivedState.value) {
        startSelectDate.value = startDate.value ? new Date(startDate.value) : startDate.value
        endSelectDate.value = endDate.value ? new Date(endDate.value) : endDate.value
        wantEndSelectDate.value = null

        // 更新面板位置
        popperComponent.value.popper?.update()
      }
    }, { deep: true, immediate: true })

    function tryUpdateRenderDate () {
      const _renderDate = startDate.value ? new Date(startDate.value) : new Date()
      if (dateFormat(_renderDate, 'YYYYMM') !== dateFormat(renderDate.value, 'YYYYMM')) {
        renderDate.value = _renderDate
      }
    }

    function onUpdateStartSelectDate (value: Date) {
      startSelectDate.value = value
    }

    function onUpdateEndSelectDate (value: Date) {
      endSelectDate.value = value
    }

    function onStartSelectDateTimeChange () {
      if (startSelectDate.value.getTime() > endSelectDate.value.getTime()) {
        endSelectDate.value = new Date(startSelectDate.value)
      }
    }

    function onDateSelectWithRange (value: Date) {
      if (startSelectDate.value && endSelectDate.value) {
        endSelectDate.value = null
        startSelectDate.value = value
        return
      }

      if (!startSelectDate.value) {
        startSelectDate.value = value
        return
      }

      const _reverse = value.getTime() < startSelectDate.value.getTime()
      const _startStamp = _reverse ? value.getTime() : startSelectDate.value.getTime()
      const _endStamp = _reverse ? startSelectDate.value.getTime(): value.getTime()
      const { maxdays } = props

      if (maxdays && _endStamp - _startStamp >= maxdays * 24 * 3600 * 1000) {
        errMsg.value = `您最多选择可以选择${maxdays}天`
        return
      }

      if (errMsg.value) {
        errMsg.value = ''
      }

      if (_reverse) {
        endSelectDate.value = startSelectDate.value
        startSelectDate.value = value
      } else {
        endSelectDate.value = value
      }

      wantEndSelectDate.value = null
    }

    function onDateSelectNotRange (value: Date) {
      if (renderDate.value.getMonth() !== value.getMonth()) {
        renderDate.value = new Date(value)
      }

      startSelectDate.value = mergeDate(startSelectDate.value, value)
    }

    function onDateSelect (value: Date) {
      isRange.value ? onDateSelectWithRange(value) : onDateSelectNotRange(value)
    }

    function onDateItemEnter (value: Date) {
      if (!isRange.value) return
      if (!startSelectDate.value || endSelectDate.value) return

      wantEndSelectDate.value = value
    }

    function onChangeRenderDate (year: number, month: number) {
      renderDate.value = new Date (year, month, 1, 0, 0, 0)
    }

    const { saveDateValue, restoreDateValue } = useRestore(startSelectDate, endSelectDate)

    function onBeforeOpen () {
      const _value = getValue(startSelectDate.value, endSelectDate.value)

      if (_value?.toString() !== props.modelValue?.toString()) {
        if (props.modelValue instanceof Array) {
          startSelectDate.value = props.modelValue[0]
          endSelectDate.value = props.modelValue[1]
        } else if (props.modelValue instanceof Date) {
          startSelectDate.value = props.modelValue
          endSelectDate.value = null
        } else {
          startSelectDate.value = null
          endSelectDate.value = null
        }
      }

      saveDateValue()
      tryUpdateRenderDate()
    }

    function onBeforeLeave () {
      const _value = getValue(startSelectDate.value, endSelectDate.value)
      if (!_value) return

      emit('update:modelValue', _value)

      if (_value.toString() !== (props.modelValue || '').toString()) {
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
      isRange,
      hasTime,
      formatRule,

      startDate,
      startSelectDate,
      endDate,
      endSelectDate,
      wantEndSelectDate,
      startDateText,
      startSelectDateText,
      endDateText,
      endSelectDateText,
      errMsg,
      endDisabledHours,
      endDisabledMinutes,
      endDisabledSeconds,
      renderDate,
      panels,
      isActivedState,
      onUpdateStartSelectDate,
      onUpdateEndSelectDate,
      onStartSelectDateTimeChange,
      onDateSelect,
      onDateItemEnter,
      onChangeRenderDate,
      onBeforeOpen,
      onBeforeLeave,
      onCancel,
      onConfirm,
      clearBtnVisible,
      onMouseenter: tryShowclearBtn,
      onMouseleave: tryHideClearBtn,
      onClear: (event: MouseEvent) => {
        event.stopPropagation()
        clearHalk(() => {
          startSelectDate.value = null
          endSelectDate.value = null
        })
        tryHidePopper()
      }
    }
  },
  render () {
    const _YuumiPopper = resolveComponent('YuumiPopper') as any
    const _YuumiIcon = resolveComponent('YuumiIcon') as any
    const _YuumiTimePicker = resolveComponent('YuumiTimePicker') as any

    const getPlaceholderVNode = () => {
      const { $props, isRange } = this

      return h('span', { class: 'placeholder' }, isRange ? [
        h('span', { class: 'content-date' }, $props.startPlaceholder),
        h('span', { class: 'content-hyphen' }, $props.hyphen),
        h('span', { class: 'content-date' }, $props.endPlaceholder)
      ] : [
        h('span', null, $props.placeholder)
      ])
    }

    const getContentVNode = () => {
      const { $props, isRange, startDateText, endDateText } = this

      const children: VNode[] = []
      if (startDateText) {
        children.push(h('span', { class: 'content-date' }, startDateText))
      }

      if (isRange && startDateText) {
        children.push(h('span', { class: 'content-hyphen' }, $props.hyphen))
        children.push(h('span', { class: 'content-date' }, endDateText))
      }

      if (children.length === 0) {
        children.push(getPlaceholderVNode())
      }

      return h('div', { class: 'picker__content' }, children)
    }

    const getTriggerVNode = () => {
      const { $props, $attrs, isActivedState, clearBtnVisible, onMouseenter, onMouseleave, onClear } = this
      const _props = mergeProps({
        class: ['yuumi-date-picker', `size__${$props.size}`, {
          '__focus': isActivedState,
          '__disabled': $props.disabled
        }],
        ref: 'datePicker',
        onMouseenter,
        onMouseleave
      }, $attrs)

      return h('div', _props, [
        h('div', { class: 'picker__icon' }, [
          h(_YuumiIcon, { icon: 'line-calendar'})
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

    const getRangeTimeVNodes = () => {
      const {
        $props,
        startSelectDate, startSelectDateText,
        endSelectDate, endSelectDateText,
        endDisabledHours, endDisabledMinutes, endDisabledSeconds,
        onUpdateStartSelectDate, onUpdateEndSelectDate,
        onStartSelectDateTimeChange
      } = this

      const _endTimePickerProps = mergeProps({
        placeholder: $props.endTimePlaceholder
      }, endSelectDate ? {
        immediate: true,
        disabledHours: endDisabledHours,
        disabledMinutes: endDisabledMinutes,
        disabledSeconds: endDisabledSeconds,
        modelValue: endSelectDate,
        'onUpdate:modelValue': onUpdateEndSelectDate
      } : {
        disabled: !endSelectDate
      })

      return [
        h('span', { class: 'date-text' }, startSelectDateText || $props.startPlaceholder),
        h('span', { class: 'date-time' }, [
          h(_YuumiTimePicker, {
            immediate: true,
            placeholder: $props.startTimePlaceholder,
            disabled: !endSelectDate,
            disabledHours: $props.disabledHours,
            disabledMinutes: $props.disabledMinutes,
            disabledSeconds: $props.disabledSeconds,
            modelValue: startSelectDate,
            'onUpdate:modelValue': onUpdateStartSelectDate,
            onChange: onStartSelectDateTimeChange
          })
        ]),
        h('span', null, [ h(_YuumiIcon, { icon: 'line-arrow-right' }) ]),
        h('span', { class: 'date-text' }, endSelectDateText || $props.endPlaceholder),
        h('span', { class: 'date-time' }, [
          h(_YuumiTimePicker, _endTimePickerProps)
        ])
      ]
    }

    const getSingleTimeVNodes = () => {
      const { $props, startSelectDate, startSelectDateText, endSelectDate, onUpdateStartSelectDate } = this

      return [
        h('span', { class: 'date-text' }, startSelectDateText || $props.placeholder),
        h('span', { class: 'date-time' }, [
          h(_YuumiTimePicker, {
            immediate: true,
            placeholder: $props.timePlaceholder,
            disabled: !startSelectDate,
            disabledHours: $props.disabledHours,
            disabledMinutes: $props.disabledMinutes,
            disabledSeconds: $props.disabledSeconds,
            modelValue: startSelectDate,
            'onUpdate:modelValue': onUpdateStartSelectDate
          })
        ])
      ]
    }

    const getDateTimeVNode = () => {
      const { isRange, startSelectDate, endSelectDate } = this

      return h('div', {
        class: ['panel__times', {
          _range: isRange,
          _disabled: (!isRange && !startSelectDate) || (isRange && !endSelectDate)
        }]
      }, [
        isRange ? getRangeTimeVNodes() : getSingleTimeVNodes()
      ])
    }

    const getDatePanelDefaultVNode = (item: any, index: number) => {
      const { panels, onChangeRenderDate } = this

      let children: VNode[] = []

      if (index === 0) {
        children = children.concat([
          h(_YuumiIcon, {
            class: 'prev-year',
            icon: 'line-prev',
            onClick: () => onChangeRenderDate(panels[0].year - 1, panels[0].month)
          }),
          h(_YuumiIcon, {
            class: 'prev-month',
            icon: 'line-arrow-left',
            onClick: () => onChangeRenderDate(panels[0].year, panels[0].month - 1)
          })
        ])
      }

      if (index === panels.length - 1) {
        children = children.concat([
          h(_YuumiIcon, {
            class: 'next-year',
            icon: 'line-next',
            onClick: () => onChangeRenderDate(panels[0].year + 1, panels[0].month)
          }),
          h(_YuumiIcon, {
            class: 'next-month',
            icon: 'line-arrow-right',
            onClick: () => onChangeRenderDate(panels[0].year, panels[0].month + 1)
          })
        ])
      }

      children = children.concat(h('div', { class: 'slot__content' }, [
        h('span', { class: 'render__year' }, item.year),
        h('span', { class: 'render__month' }, item.monthText),
      ]))

      return h('div', { class: 'panel__slot' }, children)
    }

    const getDefaultVNodes = () => {
      const { hasTime, panels, onDateSelect, onDateItemEnter, onCancel, onConfirm, errMsg } = this

      return [
        hasTime && getDateTimeVNode(),
        h('div', { class: 'panels' }, panels.map((item, index) => h(DatePanel, {
          dates: item.data,
          onSelect: onDateSelect,
          onItemEnter: onDateItemEnter
        }, {
          default: () => getDatePanelDefaultVNode(item, index)
        }))),
        h('div', { class: 'date-picker-btns' }, [
          errMsg && h('span', { class: 'err-msg' }, errMsg),
          h('span', { onClick: onCancel }, '取消'),
          h('span', { onClick: onConfirm }, '确认')
        ])
      ]
    }

    return h(_YuumiPopper, {
      class: "date-picker-popper",
      onBeforeOpen: this.onBeforeOpen,
      onBeforeLeave: this.onBeforeLeave,
      ref: 'popperComponent'
    }, {
      trigger: () => h(getTriggerVNode(), {
        readonly: this.readonly,
        disabled: this.disabled
      }),
      default: () => getDefaultVNodes()
    })
  }
})
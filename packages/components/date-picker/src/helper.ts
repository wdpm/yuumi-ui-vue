import { dateParse, dateFormat, createRange } from '../../../share/helper'
import { computed, getCurrentInstance } from 'vue'
import type { Ref } from 'vue'

export default function useHelper ({
  startSelectDate,
  endSelectDate,
  wantEndSelectDate,
  isRange
}: {[x:string]: Ref<any>}) {
  const props = getCurrentInstance()!.props as {[x:string]: any}

  function getDateStartStamp (value?: Date) {
    if (!value) return NaN
    return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 0, 0, 0).getTime()
  }

  const startSelectDateStartStamp = computed(() => getDateStartStamp(startSelectDate.value))
  const endSelectDateStartStemp = computed(() => getDateStartStamp(endSelectDate.value || wantEndSelectDate.value))
  const points = computed(() => {
    if (!endSelectDateStartStemp.value) {
      return [startSelectDateStartStamp.value, endSelectDateStartStemp.value]
    }

    return [
      Math.min(startSelectDateStartStamp.value, endSelectDateStartStemp.value),
      Math.max(startSelectDateStartStamp.value, endSelectDateStartStemp.value)
    ]
  })

  function getValue (startDate?: Date, endDate?: Date) {
    let value = null

    if (isRange.value && startDate && endDate) {
      value = [new Date(startDate), new Date(endDate)]
    } else if (!isRange.value && startDate) {
      value = new Date(startDate)
    }

    return value
  }

  function mergeDate (origin: Date|undefined, target: Date) {
    if (!origin) {
      origin = target
    } else {
      const { hours, minutes, seconds } = dateParse(origin)
      target.setHours(hours)
      target.setMinutes(minutes)
      target.setSeconds(seconds)
      origin = target
    }

    return origin
  }

  function createMonthDates (value: Date) {
    const { year, month } = dateParse(value)
    const lastMonthLastDay = new Date(year, month, 0, 0, 0, 0).getDate()
    const currentMonthFirstDayWeek = new Date(year, month, 1, 0, 0, 0).getDay()
    const currentMonthLastDay = new Date(year, month + 1, 0, 0, 0, 0).getDate()

    function creatItemData (year: number, month: number, date: number): {[x:string]: any} {
      const _value = new Date(year, month, date, 0, 0 , 0)
      const _stamp = _value.getTime()

      const res = {
        value: _value,
        disabled: props.disabledDates ? props.disabledDates(_value) : false
      }

      if (isRange.value) {
        const [rangeStart, rangeEnd] = points.value

        return Object.assign(res, {
          inRange: rangeStart <= _stamp && _stamp <= rangeEnd,
          isRangeStart: rangeStart === _stamp,
          isRangeEnd: rangeEnd === _stamp
        })
      }

      return Object.assign(res, {
        isSelected: startSelectDateStartStamp.value === _stamp
      })
    }

    return ([] as any[])
      .concat(createRange(lastMonthLastDay - currentMonthFirstDayWeek + 1, lastMonthLastDay + 1, (item) => Object.assign({
        className: '_prev-month'
      }, creatItemData(year, month - 1, item))))
      .concat(createRange(1, currentMonthLastDay + 1, (item) => Object.assign({
        className: '_current-month'
      }, creatItemData(year, month, item))))
      .concat(createRange(1, 6 * 7 - currentMonthLastDay - currentMonthFirstDayWeek + 1, (item) => Object.assign({
        className: '_next-month'
      }, creatItemData(year, month + 1, item))))
  }

  function endDisabledHours () {
    let _disabled = props.disabledHours ? props.disabledHours() : []

    if (dateFormat(startSelectDate.value, 'YYYYMMDD') === dateFormat(endSelectDate.value, 'YYYYMMDD')) {
      _disabled = createRange(0, startSelectDate.value.getHours()).concat(_disabled)
    }

    return _disabled
  }

  function endDisabledMinutes ({hours}: any) {
    let _disabled = props.disabledMinutes ? props.disabledMinutes(hours) : []

    if (dateFormat(startSelectDate.value, 'YYYYMMDD hh') === dateFormat(endSelectDate.value, 'YYYYMMDD hh')) {
      _disabled = createRange(0, startSelectDate.value.getMinutes()).concat(_disabled)
    }

    return _disabled
  }

  function endDisabledSeconds ({hours, minutes}: any) {
    let _disabled = props.disabledSeconds ? props.disabledSeconds(minutes) : []

    if (dateFormat(startSelectDate.value, 'YYYYMMDD hhmm') === dateFormat(endSelectDate.value, 'YYYYMMDD hhmm')) {
      _disabled = createRange(0, startSelectDate.value.getSeconds()).concat(_disabled)
    }
    return _disabled
  }

  function createPanelData (value: Date) {
    return {
      year: value.getFullYear(),
      month: value.getMonth(),
      monthText: `0${value.getMonth() + 1}`.slice(-2),
      data: createMonthDates(value)
    }
  }

  return {
    getValue,
    mergeDate,
    createMonthDates,
    createPanelData,
    endDisabledHours,
    endDisabledMinutes,
    endDisabledSeconds
  }
}
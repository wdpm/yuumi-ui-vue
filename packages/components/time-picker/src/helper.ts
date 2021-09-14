import { isDefined } from '../../../share/validator'
import { getCurrentInstance } from 'vue'
import { dateParse, createRange } from '../../../share/helper'

export default function useHelper () {
  const instance = getCurrentInstance()!
  const props = (instance.props || {}) as {[x:string]: any}
  const proxy = instance.proxy as {[x:string]: any}

  function getValidDate (value?: Date) {
    if (!value) return value

    const data = dateParse(value)
    let { hours, minutes, seconds } = data

    const disabledHours = props.disabledHours ? props.disabledHours(data) : []
    if (disabledHours.indexOf(hours) > -1) {
      hours = createRange(0, 23).find(item => disabledHours.indexOf(item) === -1) || 0
      value.setHours(hours)
    }

    const disabledMinutes = props.disabledMinutes ? props.disabledMinutes(data) : []
    if (disabledMinutes.indexOf(minutes) > -1) {
      minutes = createRange(0, 59).find(item => disabledMinutes.indexOf(item) === -1) || 0
      value.setMinutes(minutes)
    }

    const disabledSeconds = props.disabledSeconds ? props.disabledSeconds(data) : []
    if (disabledSeconds.indexOf(seconds) > -1) {
      seconds = createRange(0, 59).find(item => disabledSeconds.indexOf(item) === -1) || 0
      value.setSeconds(seconds)
    }

    return value
  }

  function getValue (): Date[]|Date|undefined {
    const value = [proxy.startDate, proxy.endDate].filter(item => isDefined(item))
    return props.range ? value.length ? value : undefined : value[0]
  }

  return { getValidDate, getValue }
}
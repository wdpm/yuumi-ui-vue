<template>
  <div class="picker-times">
    <picker-time-item v-if="hourEnabled" type="hours" v-model="hoursValue"
                      :disabled="disabledHours && disabledHours()"></picker-time-item>
    <picker-time-item v-if="minuteEnabled" type="minutes" v-model="minutesValue"
                      :disabled="disabledMinutes && disabledMinutes({hours})"></picker-time-item>
    <picker-time-item v-if="secondEnabled" type="seconds" v-model="secondsValue"
                      :disabled="disabledSeconds && disabledSeconds({hours, minutes})"></picker-time-item>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, toRefs, watch} from 'vue'
import TimeItem from './time-item.vue'

export default defineComponent({
  name: 'PickerTimes',
  components: {
    [TimeItem.name]: TimeItem
  },
  props: {
    format: {
      type: String,
      required: true
    },
    disabledHours: Function,
    disabledMinutes: Function,
    disabledSeconds: Function,
    hours: Number,
    minutes: Number,
    seconds: Number
  },
  computed: {
    hourEnabled(): boolean {
      return /h/.test(this.format)
    },
    minuteEnabled(): boolean {
      return /m/.test(this.format)
    },
    secondEnabled(): boolean {
      return /s/.test(this.format)
    }
  },
  setup(props, {emit}) {
    const hoursValue = computed({
      get: () => props.hours,
      set: value => {
        if (value !== props.hours) {
          emit('change', {value, method: 'setHours'})
        }
      }
    })

    const minutesValue = computed({
      get: () => props.minutes,
      set: value => {
        if (value !== props.minutes) {
          emit('change', {value, method: 'setMinutes'})
        }
      }
    })

    const secondsValue = computed({
      get: () => props.seconds,
      set: value => {
        if (value !== props.seconds) {
          emit('change', {value, method: 'setSeconds'})
        }
      }
    })

    return {
      hoursValue,
      minutesValue,
      secondsValue
    }
  }
})
</script>

<style lang="scss">
@import "../../../theme.scss";

.picker-times {
  width: 160px;
  display: inline-table;

  &:not(:first-child) {
    border-left: 1px solid map-get($--color, "border");
  }
}
</style>

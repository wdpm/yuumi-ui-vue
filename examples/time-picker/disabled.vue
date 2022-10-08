<template>
  <YuumiTimePicker disabled style="margin: 0 10px 10px 0;"></YuumiTimePicker>
  <YuumiTimePicker disabled v-model="value" style="margin: 0 10px 10px 0;"></YuumiTimePicker>

  <YuumiTimePicker v-model="value1" :disabled-hours="disabledHours" style="margin: 0 10px 10px 0;"></YuumiTimePicker>
  <YuumiTimePicker v-model="value2" :disabled-hours="disabledHours" :disabled-minutes="disabledMinutes" style="margin: 0 10px 10px 0;"></YuumiTimePicker>
  <YuumiTimePicker v-model="value3" :disabled-hours="disabledHours" :disabled-minutes="disabledMinutes" :disabled-seconds="disabledSeconds" style="margin: 0 10px 10px 0;"></YuumiTimePicker>
</template>

<script>
export default {
  data () {
    return {
      value: new Date(2021, 8, 10, 0, 0, 0),
      value1: new Date(2021, 8, 10, 0, 0, 0),
      value2: new Date(2021, 8, 10, 0, 0, 0),
      value3: new Date(2021, 8, 10, 0, 0, 0),
    }
  },
  methods: {
    disabledHours () {
      return [0, 1, 2, 3, 4, 5]
    },
    disabledMinutes ({hours}) {
      if (hours === 6) return [0, 1, 2, 3, 4, 5]
      return [58, 59]
    },
    disabledSeconds ({minutes}) {
      if (minutes === 6) return [0, 1, 2, 3, 4, 5]
      return [58, 59]
    }
  }
}
</script>

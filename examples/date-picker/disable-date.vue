<template>
  <YuumiDatePicker v-model="value1" :disabled-dates="disabledBeforeDates" @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>

  <YuumiDatePicker v-model="value2" type="range" :disabled-dates="disabledAfterDates" @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>
</template>

<script>
  export default {
    data () {
      return {
        value1: null,
        value2: null
      }
    },
    methods: {
      log(type, value) {
        console.log(type, value)
      },
      disabledBeforeDates (value) {
        return value.getTime() < Date.now()
      },
      disabledAfterDates (value) {
        return value.getTime() > Date.now()
      }
    }
  }
</script>
<template>
  <YuumiDatePicker v-model="value1" type="range" @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>

  <YuumiDatePicker v-model="value2" type="rangetime" @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>
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
      }
    }
  }
</script>
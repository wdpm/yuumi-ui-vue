<template>
  <YuumiDatePicker v-model="value" type="range" :maxdays="7" @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>
</template>

<script>
  export default {
    data () {
      return {
        value: null
      }
    },
    methods: {
      log(type, value) {
        console.log(type, value)
      }
    }
  }
</script>
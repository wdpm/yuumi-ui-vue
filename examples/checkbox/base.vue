<template>
  <YuumiCheckbox v-model="value1" unique="香蕉" style="margin: 0 10px 10px 0;" @change="consoleLog($event, value1)">香蕉</YuumiCheckbox>
  <YuumiCheckbox v-model="value2" unique="苹果" style="margin: 0 10px 10px 0;" @change="consoleLog($event, value2)">苹果</YuumiCheckbox>
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
    onchange (e) {
      console.log(e)
    },
    consoleLog (detail, value) {
      console.log(detail, value)
    }
  }
}
</script>
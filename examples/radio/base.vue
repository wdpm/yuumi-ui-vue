<template>
  <YuumiRadio v-model="value" unique="香蕉" style="margin: 0 10px 10px 0;" @change="consoleLog">香蕉</YuumiRadio>
  <YuumiRadio v-model="value" unique="苹果" style="margin: 0 10px 10px 0;" @change="consoleLog">苹果</YuumiRadio>
  <div>当前选择的为：{{value}}</div>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
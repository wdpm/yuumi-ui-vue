<template>
  <YuumiRadioGroup v-model="value" @change="consoleLog" disabled>
    <YuumiRadio unique="香蕉" style="margin: 0 10px 10px 0;">香蕉</YuumiRadio>
    <YuumiRadio unique="苹果" style="margin: 0 10px 10px 0;">苹果</YuumiRadio>
  </YuumiRadioGroup>
  <div>当前选择的为：{{value}}</div>
</template>

<script>
export default {
  data () {
    return {
      value: '香蕉'
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
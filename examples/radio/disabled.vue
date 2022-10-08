<template>
  <YuumiRadio v-model="value" disabled unique="香蕉" style="margin: 0 10px 10px 0;" @change="consoleLog">香蕉</YuumiRadio>
  <YuumiRadio v-model="value" disabled unique="苹果" style="margin: 0 10px 10px 0;" @change="consoleLog">苹果</YuumiRadio>
  <YuumiRadio v-model="value" disabled unique="梨" style="margin: 0 10px 10px 0;" @change="consoleLog">梨</YuumiRadio>
  <YuumiRadio v-model="value" disabled unique="橘子" style="margin: 0 10px 10px 0;" @change="consoleLog">橘子</YuumiRadio>
  <YuumiRadio v-model="value" disabled unique="柚子" style="margin: 0 10px 10px 0;" @change="consoleLog">柚子</YuumiRadio>
  <div>当前选择的为：{{value}}</div>
</template>
<script>
export default {
  data () {
    return {
      value: '苹果'
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
<template>
  <YuumiCheckbox v-model="value" disabled unique="香蕉" style="margin: 0 10px 10px 0;" @change="consoleLog">香蕉</YuumiCheckbox>
  <YuumiCheckbox v-model="value" disabled unique="苹果" style="margin: 0 10px 10px 0;" @change="consoleLog">苹果</YuumiCheckbox>
  <YuumiCheckbox v-model="value" disabled unique="梨" style="margin: 0 10px 10px 0;" @change="consoleLog">梨</YuumiCheckbox>
  <YuumiCheckbox v-model="value" disabled unique="橘子" style="margin: 0 10px 10px 0;" @change="consoleLog">橘子</YuumiCheckbox>
  <YuumiCheckbox v-model="value" disabled unique="柚子" style="margin: 0 10px 10px 0;" @change="consoleLog">柚子</YuumiCheckbox>
  <div>是否选中：{{value}}</div>
</template>
<script>
export default {
  data () {
    return {
      value: true
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
<template>
  <div>你最喜欢的水果是？（多选）</div>
  <YuumiCheckboxGroup v-model="value" @change="consoleLog">
    <YuumiCheckbox unique="A" style="margin: 0 10px 10px 0;">A. 香蕉</YuumiCheckbox>
    <YuumiCheckbox unique="B" style="margin: 0 10px 10px 0;">B. 苹果</YuumiCheckbox>
    <YuumiCheckbox unique="C" style="margin: 0 10px 10px 0;">C. 柚子</YuumiCheckbox>
    <YuumiCheckbox unique="D" style="margin: 0 10px 10px 0;">D. 西瓜</YuumiCheckbox>
  </YuumiCheckboxGroup>
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
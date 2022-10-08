<template>
  <YuumiCheckbox v-model="value" unique="设置" style="margin: 0 10px 10px 0;" :checked-icon="{ icon: 'flat-lock' }" :unchecked-icon="{ icon: 'flat-unlock' }" @change="consoleLog">是否锁定</YuumiCheckbox>
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
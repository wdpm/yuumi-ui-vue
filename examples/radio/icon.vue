<template>
  <YuumiRadio v-model="value" :unique="false" style="margin: 0 10px 10px 0;" :checked-icon="{ icon: 'line-unlock' }" :unchecked-icon="{ icon: 'line-unlock' }" @change="consoleLog">不锁定</YuumiRadio>
  <YuumiRadio v-model="value" :unique="true" style="margin: 0 10px 10px 0;" :checked-icon="{ icon: 'flat-lock' }" :unchecked-icon="{ icon: 'flat-lock' }"  @change="consoleLog">锁定</YuumiRadio>
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
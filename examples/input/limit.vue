<template>
  <YuumiInput placeholder="只能输入数字" v-model="value1" :limit="onlyNumber" style="margin: 0 10px 10px 0;"></YuumiInput>
  <span>{{value1}}</span> <br/>

  <YuumiInput placeholder="不能输入数字" v-model="value2" :limit="excludeNumber" style="margin: 0 10px 10px 0;"></YuumiInput>
  <span>{{value2}}</span> <br/>

  <YuumiInput placeholder="不能输入空白字符" v-model="value3" :limit="notBlank" style="margin: 0 10px 10px 0;"></YuumiInput>
  <span>{{value3}}</span> <br/>
</template>

<script>
export default {
  data () {
    return {
      value1: '只能输入数字',
      value2: '2222',
      value3: ''
    }
  },
  computed: {
    onlyNumber () {
      return /^\d+$/
    },
    excludeNumber () {
      return (value) => /^[^\d]+$/.test(value)
    },
    notBlank () {
      return /^\S*$/
    }
  }
}
</script>
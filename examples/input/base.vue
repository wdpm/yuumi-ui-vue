<template>
  <YuumiInput v-model="value" placeholder="请输入" style="margin: 0 10px 10px 0;"></YuumiInput>
  <YuumiInput v-model="value" placeholder="请输入" v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" style="margin: 0 10px 10px 0;"></YuumiInput>
  <div>输入的内容为：{{value}}</div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
    }
  }
}
</script>
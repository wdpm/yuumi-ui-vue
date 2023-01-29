<template>
  <YuumiSelect :options="options" :default-value-options="defaultValueOptions" v-model="value1" style="margin: 0 10px 10px 0;" ></YuumiSelect>
  {{value1}}<br/>
  <YuumiSelect :options="options" :default-value-options="defaultValueOptions" v-model="value" style="margin: 0 10px 10px 0;" multiple></YuumiSelect>{{value}}
</template>

<script>
export default {
  data () {
    return {
      value: ['丑橘', '苹果'],
      value1: '丑橘',
    }
  },
  computed: {
    options () {
      return [
        { label: '香蕉', value: '香蕉' },
        { label: '苹果', value: '苹果' },
        { label: '梨', value: '梨' },
        { label: '奇异果', value: '奇异果' },
        { label: '榴莲', value: '榴莲' },
        { label: '芒果', value: '芒果' },
        { label: '橘子', value: '橘子' },
        { label: '樱桃', value: '樱桃' },
        { label: '柚子', value: '柚子' },
        { label: '西瓜', value: '西瓜' },
        { label: '哈密瓜', value: '哈密瓜' }
      ]
    },
    defaultValueOptions () {
      return [
        { label: '丑橘', value: '丑橘' },
      ]
    }
  }
}
</script>
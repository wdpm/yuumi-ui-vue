<template>
  <YuumiSelect :options="options" v-model="value" filterable style="width: 100px;margin: 0 10px 10px 0;"></YuumiSelect>
  <YuumiSelect :options="options" v-model="value" filterable :filter-method="filterMethod" style="width: 100px;margin: 0 10px 10px 0;"></YuumiSelect>
</template>

<script>
export default {
  data () {
    return {
      value: null,
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
  },
  methods: {
    filterMethod (item, keyword) {
      return item.label.indexOf(keyword) > -1
    }
  }
}
</script>
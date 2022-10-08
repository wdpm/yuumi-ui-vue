<template>
  <YuumiCheckbox v-model="value" unique="all" style="margin: 0 10px 10px 0;" :indeterminate="indeterminate" @change="onAllChanged">全选</YuumiCheckbox>

  <div>你最喜欢的水果是？（多选）</div>

  <YuumiCheckboxGroup v-model="selected" @change="onGroupChange">
    <template v-for="item in fruits" :key="item.key">
      <YuumiCheckbox :unique="item.key" style="margin: 0 10px 10px 0;">{{item.key}}. {{item.name}}</YuumiCheckbox>
    </template>
  </YuumiCheckboxGroup>

  <div>当前选择的为：{{selected}}</div>
</template>
<script>
export default {
  data () {
    return {
      value: false,
      fruits: [
        { key: 'A', name: '香蕉' },
        { key: 'B', name: '苹果' },
        { key: 'C', name: '柚子' },
        { key: 'D', name: '西瓜' }
      ],
      selected: []
    }
  },
  computed: {
    indeterminate () {
      return this.selected.length !== this.fruits.length && this.selected.length > 0
    }
  },
  methods: {
    onAllChanged (detail) {
      this.selected = detail.checked ? this.fruits.map(item => item.key) : []
    },

    onGroupChange () {
      if (this.selected.length === this.fruits.length && !this.value) {
        this.value = true
      } else if (this.selected.length !== this.fruits.length && this.value) {
        this.value = false
      }
    }
  }
}
</script>
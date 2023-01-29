<template>
  <YuumiTree :data="data"
    :load-data="loadData"
    @checked="onChecked"
    @node-expand="onNodeExpand"
    @node-click="onNodeClick"
  ></YuumiTree>
</template>
<script>
export default {
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.data = this.createChildren('')
  },
  methods: {
    createChildren (labelPrefix) {
      const max = Math.floor(5 * Math.random())
      const children = []

      for (let i = 0; i <= max; i++) {
        const _value = labelPrefix ? `${labelPrefix}-${i}` : `${i}`
        children.push({
          label: _value,
          value: _value
        })
      }

      return children
    },
    loadData (vm) {
      return new Promise((resolve) => {
        setTimeout(() => {
          Math.random() > 0.5 ? resolve(this.createChildren(vm.nodeLabel)) : resolve(null)
        }, 400)
      })
    },
    onChecked (detail) {
      console.log('onChecked', detail)
    },
    onNodeExpand (detail) {
      console.log('onNodeExpand', detail)
    },
    onNodeClick (detail) {
      console.log('onNodeClick', detail)
    }
  }
}
</script>

<template>
<YuumiButton @click="showAlert()" style="margin: 0 10px 10px 0;">自定义显示</YuumiButton>
</template>

<script>
import { createVNode } from 'vue'
export default {
  data () {
    return {}
  },
  methods: {
    showAlert() {
      this.$yuumi.createAlert({
        title: createVNode('span', {style: {color: 'red'}}, '自定义标题'),
        content: createVNode('span', {style: {color: 'green'}}, '自定义内容'),
        concanText: '撤销',
        confirmText: '保存',
      })
    }
  }
}
</script>
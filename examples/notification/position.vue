<template>
<div>
  <YuumiButton @click="createNotification('tl')" style="margin: 0 10px 10px 0;">top left</YuumiButton>
  <YuumiButton @click="createNotification('tr')" style="margin: 0 10px 10px 0;">top right</YuumiButton>
</div>
<div>
  <YuumiButton @click="createNotification('bl')" style="margin: 0 10px 10px 0;">bottom left</YuumiButton>
  <YuumiButton @click="createNotification('br')" style="margin: 0 10px 10px 0;">bottom right</YuumiButton>
</div>
</template>

<script>
import { h } from 'vue'
export default {
  methods: {
    createNotification (direction) {
      this.$yuumi.createNotification({
        direction,
        title: '选择位置',
        message: '选择位置'
      })
    }
  }
}
</script>
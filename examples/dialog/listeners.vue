<template>
<YuumiButton @click="showDialog">事件监听</YuumiButton>

<YuumiDialog title="dialog title" v-model="show"
  @close="onEvent($event, 'close')"
  @cancel="onEvent($event, 'cancel')"
  @confirm="onEvent($event, 'confirm')"
  @beforeEnter="onEvent($event, 'beforeEnter')"
  @afterEnter="onEvent($event, 'afterEnter')"
  @beforeLeave="onEvent($event, 'beforeLeave')"
  @afterLeave="onEvent($event, 'afterLeave')"
>
  <YuumiIcon icon="line-help" ></YuumiIcon>
  <span>事件监听</span>
</YuumiDialog>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    showDialog () {
      this.show = true
    },
    onEvent (e, type) {
      console.log(`on ${type} event.`, e)
    }
  }
}
</script>
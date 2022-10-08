<template>
  <YuumiButton @click="showDrawer()">默认(right)</YuumiButton>

  <YuumiDrawer v-model="show"
    @before-open="eventLog($event, 'before-open')"
    @after-open="eventLog($event, 'after-open')"
    @before-close="eventLog($event, 'before-close')"
    @after-close="eventLog($event, 'after-close')"
  >events</YuumiDrawer>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    showDrawer () {
      this.show = true
    },
    eventLog (el, type) {
      console.log(type, el)
    }
  }
}
</script>
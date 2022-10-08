<template>
<YuumiButton @click="showDialog">show dialog</YuumiButton>
<YuumiDialog title="dialog title" v-model="show" @close="onclose" @cancel="oncancel" @confirm="onconfirm">
  <YuumiIcon icon="line-help" ></YuumiIcon>
  <span>基本用法</span>
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
    onclose () {
      console.log('on close')
    },
    oncancel () {
      console.log('on cancel')
    },
    onconfirm () {
      console.log('on confirm')
    }
  }
}
</script>
<template>
  <YuumiButton @click="showLoading">show global loading</YuumiButton>
</template>

<script>
export default {
  methods: {
    showLoading () {
      const { createLoading, removeLoading } = this.$yuumi
      const vnode = createLoading()

      setTimeout(() => {
        removeLoading(vnode)
      }, 1000)
    }
  }
}
</script>
<template>
  <template v-for="item in ['right', 'left', 'top', 'bottom']" :key="item">
    <YuumiButton @click="showDrawer(item)" style="margin: 0 10px 10px 0;">{{item}}</YuumiButton>
  </template>

  <YuumiDrawer :position="position" v-model="show">{{position}}</YuumiDrawer>
</template>

<script>
export default {
  data () {
    return {
      position: 'right',
      show: false
    }
  },
  methods: {
    showDrawer (position) {
      this.position = position
      this.show = true
    }
  }
}
</script>
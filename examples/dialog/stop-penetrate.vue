<template>
<YuumiButton @click="showDialog">阻止穿透</YuumiButton>

<YuumiDialog title="dialog title" v-model="show" :stopPenetrate="true">
  <YuumiIcon icon="line-help" ></YuumiIcon>
  <span>阻止穿透</span>
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
    }
  }
}
</script>
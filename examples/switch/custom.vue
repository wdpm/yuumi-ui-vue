<template>
<YuumiSwitch v-model="value" style="margin: 0 10px 10px 0;" open-color="green" close-color="red">
  <template v-slot:open> 开</template>
  <template v-slot:close>关 </template>
</YuumiSwitch>
</template>

<script>
export default {
  data () {
    return {
      value: false
    }
  }
}
</script>

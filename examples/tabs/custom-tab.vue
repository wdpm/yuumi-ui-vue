<template>
  <YuumiTabs v-model="value">
    <YuumiTabItem label="北京市" value="京">
      <template #label="{ $props }">{{$props.label}}(首都)</template>

      北京市 简称 {{value}}
    </YuumiTabItem>
    <YuumiTabItem label="上海市" value="沪">上海市 简称 {{value}}</YuumiTabItem>
    <YuumiTabItem label="天津市" value="津">天津市 简称 {{value}}</YuumiTabItem>
    <YuumiTabItem label="重庆市" value="渝">重庆市 简称 {{value}}</YuumiTabItem>
  </YuumiTabs>
</template>

<script>
export default {
  data () {
    return {
      value: "京"
    }
  }
}
</script>


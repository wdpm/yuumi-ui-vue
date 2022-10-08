<template>
  <YuumiTabs v-model="value">
    <YuumiTabItem label="北京市" value="京">北京市 简称 {{value}}</YuumiTabItem>
    <YuumiTabItem label="上海市" value="沪">上海市 简称 {{value}}</YuumiTabItem>
    <YuumiTabItem label="天津市" value="津">天津市 简称 {{value}}</YuumiTabItem>
    <YuumiTabItem label="重庆市" value="渝">重庆市 简称 {{value}}</YuumiTabItem>
    <YuumiTabItem label="河北省" value="冀">河北省 简称 {{value}}</YuumiTabItem>
    <YuumiTabItem label="河南省" value="豫">河南省 简称 {{value}}</YuumiTabItem>
    <YuumiTabItem label="山东省" value="鲁">山东省 简称 {{value}}</YuumiTabItem>
    <YuumiTabItem label="浙江省" value="浙">浙江省 简称 {{value}}</YuumiTabItem>
    <YuumiTabItem label="新疆维吾尔自治区" value="新">新疆维吾尔自治区 简称 {{value}}</YuumiTabItem>
    <YuumiTabItem label="西藏自治区" value="藏">西藏自治区 简称 {{value}}</YuumiTabItem>
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

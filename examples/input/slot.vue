<template>
  <YuumiInput style="margin: 0 10px 10px 0;" placeholder="mobile">
    <template #prefixIcon>
      <YuumiIcon icon="line-mobile" style="color: #aaa;font-size: 16px;"></YuumiIcon>
    </template>
  </YuumiInput>

  <YuumiInput style="margin: 0 10px 10px 0;" placeholder="search">
    <template #suffixIcon>
      <YuumiIcon icon="line-search" style="color: green;font-size: 16px;"></YuumiIcon>
    </template>
  </YuumiInput>

  <YuumiInput style="margin: 0 10px 10px 0; width: 100%;" placeholder="search">
    <template #suffix>
      <YuumiButton style="line-height: 0; margin: -1px -8px; border:none; border-top-left-radius: 0px; border-bottom-left-radius: 0px;" theme="primary">
         <YuumiIcon icon="line-search" style="font-size: 16px;"></YuumiIcon>
      </YuumiButton>
    </template>
  </YuumiInput>


  <YuumiInput style="margin: 0 10px 10px 0; width: 100%;" placeholder="correct" clearable v-model="value">
    <template #prefix>
     <YuumiSelect style="display: table; margin: -1px -8px; border:none; border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
      :options="[{label: '百度', value: '百度'}, {label: 'Google', value: 'Google'}]"
      modelValue="Google"
     ></YuumiSelect>
    </template>

    <template #suffix>
      <YuumiButton style="line-height: 0; margin: -1px -8px; border:none; border-top-left-radius: 0px; border-bottom-left-radius: 0px;" theme="primary">
         <YuumiIcon icon="line-search" style="font-size: 16px;"></YuumiIcon>
      </YuumiButton>
    </template>
  </YuumiInput>

</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>
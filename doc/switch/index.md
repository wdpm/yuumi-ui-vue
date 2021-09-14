### 基本用法

```vue demo
<template>
<YuumiSwitch v-model="value" style="margin: 0 10px 10px 0;"></YuumiSwitch>
<YuumiSwitch v-model="value" style="margin: 0 10px 10px 0;"></YuumiSwitch>
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
```

### 设置大小

可选值为：`xl`、 `lg`、 `md`、 `sm`、 `xm`， 默认值 `md`。

```vue demo
<template>
  <YuumiSwitch v-for="size in ['xl', 'lg', 'md', 'sm', 'xm']" :key="size"
    style="margin: 0 10px 10px 0;"
    :size="size"
  ></YuumiSwitch>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  computed: {
    options () {
      return [
        { label: '香蕉', value: '香蕉' },
        { label: '苹果', value: '苹果' },
        { label: '梨', value: '梨' },
        { label: '奇异果', value: '奇异果' },
        { label: '榴莲', value: '榴莲' },
        { label: '芒果', value: '芒果' },
        { label: '橘子', value: '橘子' },
        { label: '樱桃', value: '樱桃' },
        { label: '柚子', value: '柚子' },
        { label: '西瓜', value: '西瓜' },
        { label: '哈密瓜', value: '哈密瓜' }
      ]
    }
  }
}
</script>
```

### 设置颜色和内容

```vue demo
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
```

### 只读和禁用

```vue demo
<template>
  <div>
    <YuumiSwitch style="margin: 0 10px 10px 0;" readonly></YuumiSwitch>
    <YuumiSwitch style="margin: 0 10px 10px 0;" open-color="green" close-color="red" readonly>
      <template v-slot:open> 开</template>
      <template v-slot:close>关 </template>
    </YuumiSwitch>
  </div>

  <div>
    <YuumiSwitch style="margin: 0 10px 10px 0;" disabled></YuumiSwitch>
    <YuumiSwitch style="margin: 0 10px 10px 0;" open-color="green" close-color="red" disabled>
      <template v-slot:open> 开</template>
      <template v-slot:close>关 </template>
    </YuumiSwitch>
  </div>
</template>
```

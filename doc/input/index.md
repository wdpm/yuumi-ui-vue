### 基本用法

```vue demo
<template>
  <YuumiInput v-model="value" placeholder="请输入" style="margin: 0 10px 10px 0;"></YuumiInput>
  <YuumiInput v-model="value" placeholder="请输入" v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" style="margin: 0 10px 10px 0;"></YuumiInput>
  <div>输入的内容为：{{value}}</div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
    }
  }
}
</script>
```

### 自动获取焦点 autoFocus

```vue demo
<template>
  <YuumiInput placeholder="请输入" auto-focus></YuumiInput>
</template>
```

### 设置最大输入长度 maxlength

```vue demo
<template>
  <YuumiInput placeholder="maxlength = 5" :maxlength="5" v-model="value"></YuumiInput>
</template>
<script>
export default {
  data () {
    return {
      value: '这是一段测试文字'
    }
  }
}
</script>
```

### 大小设置 size

可选值 `xl`、`lg`、`md`、`sm`、`xm`，默认为 `md`。

```vue demo
<template>
  <template v-for="(size, index) in ['xl', 'lg', 'md', 'sm', 'xm']" :key="size">
    <YuumiInput v-model="value" placeholder="请输入" style="margin: 0 10px 10px 0;" :size="size"></YuumiInput>
  </template>
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
```

### 禁用和只读 disabled and readonly

```vue demo
<template>
  <div>
    <YuumiInput placeholder="disabled" style="margin: 0 10px 10px 0;" disabled></YuumiInput>

    <YuumiInput v-for="(item, index) in ['primary', 'success', 'warn', 'error']" :key="index"
      placeholder="disabled"
      style="margin: 0 10px 10px 0;"
      :theme="item"
      disabled
    ></YuumiInput>
  </div>

  <div>
    <YuumiInput placeholder="readonly" style="margin: 0 10px 10px 0;" readonly></YuumiInput>

    <YuumiInput v-for="(item, index) in ['primary', 'success', 'warn', 'error']" :key="index"
      placeholder="readonly"
      style="margin: 0 10px 10px 0;"
      :theme="item"
      readonly
    ></YuumiInput>
  </div>
</template>
```

### 限制输入 limit

```vue demo
<template>
  <YuumiInput placeholder="只能输入数字" v-model="value1" :limit="onlyNumber" style="margin: 0 10px 10px 0;"></YuumiInput>
  <span>{{value1}}</span> <br/>

  <YuumiInput placeholder="不能输入数字" v-model="value2" :limit="excludeNumber" style="margin: 0 10px 10px 0;"></YuumiInput>
  <span>{{value2}}</span> <br/>

  <YuumiInput placeholder="不能输入空白字符" v-model="value3" :limit="notBlank" style="margin: 0 10px 10px 0;"></YuumiInput>
  <span>{{value3}}</span> <br/>
</template>

<script>
export default {
  data () {
    return {
      value1: '只能输入数字',
      value2: '2222',
      value3: ''
    }
  },
  computed: {
    onlyNumber () {
      return /^\d+$/
    },
    excludeNumber () {
      return (value) => /^[^\d]+$/.test(value)
    },
    notBlank () {
      return /^\S*$/
    }
  }
}
</script>
```

### 一键清除

```vue demo
<template>
  <YuumiInput placeholder="一键清除" v-model="value" clearable style="width: 100%;"></YuumiInput>
</template>
<script>
export default {
  data () {
    return {
      value: '这是一段测试文字'
    }
  }
}
</script>
```

### 插槽使用

使用 `prefixIcon`, `suffixIcon`, `prefix`, `suffix` 插槽实现更多功能

```vue demo
<template>
  <YuumiInput style="margin: 0 10px 10px 0;" placeholder="mobile">
    <template #prefixIcon>
      <YuumiIcon icon="line-mobile" style="color: #aaa;"></YuumiIcon>
    </template>
  </YuumiInput>

  <YuumiInput style="margin: 0 10px 10px 0;" placeholder="search">
    <template #suffixIcon>
      <YuumiIcon icon="line-search" style="color: green;"></YuumiIcon>
    </template>
  </YuumiInput>

  <YuumiInput style="margin: 0 10px 10px 0; width: 100%;" placeholder="search">
    <template #suffix>
      <YuumiButton style="line-height: 0; margin: -1px -8px; border:none; border-top-left-radius: 0px; border-bottom-left-radius: 0px;" theme="primary">
         <YuumiIcon icon="line-search"></YuumiIcon>
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
         <YuumiIcon icon="line-search"></YuumiIcon>
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
```


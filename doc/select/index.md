### 基本用法

```vue demo
<template>
  <YuumiSelect :options="options" v-model="value" style="margin: 0 10px 10px 0;" @change="log"></YuumiSelect>
  <YuumiSelect v-for="theme in ['primary', 'success', 'warn', 'error']" :key="theme"
    style="margin: 0 10px 10px 0;"
    :options="options"
    :theme="theme"
    v-model="value"
    @change="log"
  ></YuumiSelect>
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
  },
  methods: {
    log (detail) {
      console.log(detail)
    }
  }
}
</script>
```

### 设置大小

可选值为：`xl`、 `lg`、 `md`、 `sm`、 `xm`， 默认值 `md`。

```vue demo
<template>
  <YuumiSelect v-for="size in ['xl', 'lg', 'md', 'sm', 'xm']" :key="size"
    style="margin: 0 10px 10px 0;"
    :options="options"
    :size="size"
  ></YuumiSelect>
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

### 多选

```vue demo
<template>
  <YuumiSelect :options="options" v-model="value" style="margin: 0 10px 10px 0;" multiple></YuumiSelect>
  <YuumiSelect v-for="theme in ['primary', 'success', 'warn', 'error']" :key="theme" multiple
    style="margin: 0 10px 10px 0;"
    :options="options"
    :theme="theme"
    v-model="value"
  ></YuumiSelect>
</template>

<script>
export default {
  data () {
    return {
      value: ['香蕉', '苹果']
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

### 禁用和只读

```vue demo
<template>
  <div>
    <YuumiSelect :options="options" v-model="value1" style="margin: 0 10px 10px 0;" disabled ></YuumiSelect>
    <YuumiSelect :options="options" v-model="value" style="margin: 0 10px 10px 0;" theme="success" disabled multiple></YuumiSelect>
  </div>

  <div>
    <YuumiSelect :options="options" v-model="value1" style="margin: 0 10px 10px 0;" readonly ></YuumiSelect>
    <YuumiSelect :options="options" v-model="value" style="margin: 0 10px 10px 0;" theme="success" readonly multiple></YuumiSelect>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ['香蕉', '苹果'],
      value1: '香蕉',
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

### 初始值不包含在下拉选择项中

```vue demo
<template>
  <YuumiSelect :options="options" :default-value-options="defaultValueOptions" v-model="value1" style="margin: 0 10px 10px 0;" ></YuumiSelect>
  {{value1}}<br/>
  <YuumiSelect :options="options" :default-value-options="defaultValueOptions" v-model="value" style="margin: 0 10px 10px 0;" multiple></YuumiSelect>{{value}}
</template>

<script>
export default {
  data () {
    return {
      value: ['丑橘', '苹果'],
      value1: '丑橘',
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
    },
    defaultValueOptions () {
      return [
        { label: '丑橘', value: '丑橘' },
      ]
    }
  }
}
</script>
```

### 单选模式下可所搜

```vue demo
<template>
  <YuumiSelect :options="options" v-model="value" filterable style="width: 100px;margin: 0 10px 10px 0;"></YuumiSelect>
  <YuumiSelect :options="options" v-model="value" filterable :filter-method="filterMethod" style="width: 100px;margin: 0 10px 10px 0;"></YuumiSelect>
</template>

<script>
export default {
  data () {
    return {
      value: null,
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
    },
    defaultValueOptions () {
      return [
        { label: '丑橘', value: '丑橘' },
      ]
    }
  },
  methods: {
    filterMethod (item, keyword) {
      return item.label.indexOf(keyword) > -1
    }
  }
}
</script>
```

### 可清除

```vue demo
<template>
  <YuumiSelect :options="options" v-model="value" :option-key="optionKey" clearable style="margin: 0 10px 10px 0;"></YuumiSelect> <span>{{value}}</span>
</template>

<script>
export default {
  data () {
    return {
      value: '香蕉',
    }
  },
  computed: {
    optionKey () {
      return {
        label: 'name',
        value: 'text'
      }
    },
    options () {
      return [
        { name: '香蕉', text: '香蕉' },
        { name: '苹果', text: '苹果' },
        { name: '梨', text: '梨' },
        { name: '奇异果', text: '奇异果' },
        { name: '榴莲', text: '榴莲' },
        { name: '芒果', text: '芒果' },
        { name: '橘子', text: '橘子' },
        { name: '樱桃', text: '樱桃' },
        { name: '柚子', text: '柚子' },
        { name: '西瓜', text: '西瓜' },
        { name: '哈密瓜', text: '哈密瓜' }
      ]
    }
  }
}
</script>
```
### 其他

```vue demo
<template>
  <YuumiSelect :options="options" v-model="value" :option-key="optionKey" style="margin: 0 10px 10px 0;"></YuumiSelect> <span>{{value}}</span>
</template>

<script>
export default {
  data () {
    return {
      value: null,
    }
  },
  computed: {
    optionKey () {
      return {
        label: 'name',
        value: 'text'
      }
    },
    options () {
      return [
        { name: '香蕉', text: '香蕉' },
        { name: '苹果', text: '苹果' },
        { name: '梨', text: '梨' },
        { name: '奇异果', text: '奇异果' },
        { name: '榴莲', text: '榴莲' },
        { name: '芒果', text: '芒果' },
        { name: '橘子', text: '橘子' },
        { name: '樱桃', text: '樱桃' },
        { name: '柚子', text: '柚子' },
        { name: '西瓜', text: '西瓜' },
        { name: '哈密瓜', text: '哈密瓜' }
      ]
    }
  }
}
</script>
```
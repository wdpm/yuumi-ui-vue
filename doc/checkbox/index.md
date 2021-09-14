## checkbox 复选框

### 基本用法

```vue demo
<template>
  <YuumiCheckbox v-model="value1" unique="香蕉" style="margin: 0 10px 10px 0;" @change="consoleLog($event, value1)">香蕉</YuumiCheckbox>
  <YuumiCheckbox v-model="value2" unique="苹果" style="margin: 0 10px 10px 0;" @change="consoleLog($event, value2)">苹果</YuumiCheckbox>
</template>

<script>
export default {
  data () {
    return {
      value1: null,
      value2: null
    }
  },
  methods: {
    onchange (e) {
      console.log(e)
    },
    consoleLog (detail, value) {
      console.log(detail, value)
    }
  }
}
</script>
```

### 设置大小

可选值为：`xl`、 `lg`、 `md`、 `sm`、 `xm`， 默认值 `md`。

```vue demo
<template>
  <YuumiCheckbox v-model="value" size="xl" unique="香蕉" style="margin: 0 10px 10px 0;" @change="consoleLog">香蕉</YuumiCheckbox>
  <YuumiCheckbox v-model="value" size="lg" unique="苹果" style="margin: 0 10px 10px 0;" @change="consoleLog">苹果</YuumiCheckbox>
  <YuumiCheckbox v-model="value" size="md" unique="梨" style="margin: 0 10px 10px 0;" @change="consoleLog">梨</YuumiCheckbox>
  <YuumiCheckbox v-model="value" size="sm" unique="橘子" style="margin: 0 10px 10px 0;" @change="consoleLog">橘子</YuumiCheckbox>
  <YuumiCheckbox v-model="value" size="xm" unique="柚子" style="margin: 0 10px 10px 0;" @change="consoleLog">柚子</YuumiCheckbox>
  <div>是否选中：{{value}}</div>
</template>
<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
```

### 禁用

```vue demo
<template>
  <YuumiCheckbox v-model="value" disabled unique="香蕉" style="margin: 0 10px 10px 0;" @change="consoleLog">香蕉</YuumiCheckbox>
  <YuumiCheckbox v-model="value" disabled unique="苹果" style="margin: 0 10px 10px 0;" @change="consoleLog">苹果</YuumiCheckbox>
  <YuumiCheckbox v-model="value" disabled unique="梨" style="margin: 0 10px 10px 0;" @change="consoleLog">梨</YuumiCheckbox>
  <YuumiCheckbox v-model="value" disabled unique="橘子" style="margin: 0 10px 10px 0;" @change="consoleLog">橘子</YuumiCheckbox>
  <YuumiCheckbox v-model="value" disabled unique="柚子" style="margin: 0 10px 10px 0;" @change="consoleLog">柚子</YuumiCheckbox>
  <div>是否选中：{{value}}</div>
</template>
<script>
export default {
  data () {
    return {
      value: true
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
```


### 更改图标

```vue demo
<template>
  <YuumiCheckbox v-model="value" unique="设置" style="margin: 0 10px 10px 0;" :checked-icon="{ icon: 'flat-lock' }" :unchecked-icon="{ icon: 'flat-unlock' }" @change="consoleLog">是否锁定</YuumiCheckbox>
  <div>当前选择的为：{{value}}</div>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
```


## checkbox-group 复选组

### 基本用法

```vue demo
<template>
  <div>你最喜欢的水果是？（多选）</div>
  <YuumiCheckboxGroup v-model="value" @change="consoleLog">
    <YuumiCheckbox unique="A" style="margin: 0 10px 10px 0;">A. 香蕉</YuumiCheckbox>
    <YuumiCheckbox unique="B" style="margin: 0 10px 10px 0;">B. 苹果</YuumiCheckbox>
    <YuumiCheckbox unique="C" style="margin: 0 10px 10px 0;">C. 柚子</YuumiCheckbox>
    <YuumiCheckbox unique="D" style="margin: 0 10px 10px 0;">D. 西瓜</YuumiCheckbox>
  </YuumiCheckboxGroup>
  <div>当前选择的为：{{value}}</div>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
```

### 禁用

```vue demo
<template>
  <div>你最喜欢的水果是？（多选）</div>
  <YuumiCheckboxGroup v-model="value" disabled @change="consoleLog">
    <YuumiCheckbox unique="A" style="margin: 0 10px 10px 0;">A. 香蕉</YuumiCheckbox>
    <YuumiCheckbox unique="B" style="margin: 0 10px 10px 0;">B. 苹果</YuumiCheckbox>
    <YuumiCheckbox unique="C" style="margin: 0 10px 10px 0;">C. 柚子</YuumiCheckbox>
    <YuumiCheckbox unique="D" style="margin: 0 10px 10px 0;">D. 西瓜</YuumiCheckbox>
  </YuumiCheckboxGroup>
  <div>当前选择的为：{{value}}</div>
</template>

<script>
export default {
  data () {
    return {
      value: ['A']
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
```

### 中间状态

可以通过 `indeterminateIcon` 设置中间态的icon。

```vue demo
<template>
  <YuumiCheckbox v-model="value" unique="all" style="margin: 0 10px 10px 0;" :indeterminate="indeterminate" @change="onAllChanged">全选</YuumiCheckbox>

  <div>你最喜欢的水果是？（多选）</div>

  <YuumiCheckboxGroup v-model="selected" @change="onGroupChange">
    <template v-for="item in fruits" :key="item.key">
      <YuumiCheckbox :unique="item.key" style="margin: 0 10px 10px 0;">{{item.key}}. {{item.name}}</YuumiCheckbox>
    </template>
  </YuumiCheckboxGroup>

  <div>当前选择的为：{{selected}}</div>
</template>
<script>
export default {
  data () {
    return {
      value: false,
      fruits: [
        { key: 'A', name: '香蕉' },
        { key: 'B', name: '苹果' },
        { key: 'C', name: '柚子' },
        { key: 'D', name: '西瓜' }
      ],
      selected: []
    }
  },
  computed: {
    indeterminate () {
      return this.selected.length !== this.fruits.length && this.selected.length > 0
    }
  },
  methods: {
    onAllChanged (detail) {
      this.selected = detail.checked ? this.fruits.map(item => item.key) : []
    },

    onGroupChange () {
      if (this.selected.length === this.fruits.length && !this.value) {
        this.value = true
      } else if (this.selected.length !== this.fruits.length && this.value) {
        this.value = false
      }
    }
  }
}
</script>
```
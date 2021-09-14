### 基本用法

通过 `active` 指定当前的步骤，初始值为 0。

```vue demo
<template>
  <YuumiStep :active="1">
    <YuumiStepItem title="step 1">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="step 2">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="step 3">这里描述信息</YuumiStepItem>
  </YuumiStep>
</template>
```

### 自定义图标

```vue demo
<template>
  <YuumiStep :active="1">
    <YuumiStepItem title="设置账号" icon="edit">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="设置密码" icon="line-key">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="完成" :icon="completedIcon">这里描述信息</YuumiStepItem>
  </YuumiStep>
</template>

<script>
import { h } from 'vue'
import { YuumiIcon } from '../../packages'

export default {
  computed: {
    completedIcon () {
      return h('YuumiIcon', { icon: 'line-shield-correct' })
    }
  }
}
</script>
```

### mini版

```vue demo
<template>
  <YuumiStep :active="1" mini>
    <YuumiStepItem title="step 1">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="step 2">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="step 3">这里描述信息</YuumiStepItem>
  </YuumiStep>
</template>
```

### Error

```vue demo
<template>
  <YuumiStep :active="1" mini error>
    <YuumiStepItem title="step 1">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="Error">这里错误描述信息</YuumiStepItem>
    <YuumiStepItem title="step 3">这里描述信息</YuumiStepItem>
  </YuumiStep>
</template>
```

### 垂直的

```vue demo
<template>
<div style="height: 300px; display: inline-block; margin-right: 50px;">
  <YuumiStep :active="1" direction="vertical">
    <YuumiStepItem title="step 1">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="step 2">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="step 3">这里描述信息</YuumiStepItem>
  </YuumiStep>
</div>

<div style="height: 300px; display: inline-block;">
  <YuumiStep :active="2" direction="vertical" mini>
    <YuumiStepItem title="step 1">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="step 2">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="step 3">这里描述信息</YuumiStepItem>
  </YuumiStep>
</div>
</template>
```
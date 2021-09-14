### 基本用法

theme 可选值为 `primary`、 `success`、 `warn`、 `error`。

```vue demo
<template>
  <div>
    <YuumiButton style="margin: 0 10px 10px 0;">默认按钮</YuumiButton>
  </div>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" style="margin: 0 10px 10px 0;">{{theme}} button</YuumiButton>
  </div>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" outline style="margin: 0 10px 10px 0;">{{theme}} outline</YuumiButton>
  </div>
</template>
```

### 大小设置

可选值为 `xl`、 `lg`、 `md`、 `sm`、 `xm`，默认值为 `md`。

```vue demo
<template>
  <YuumiButton v-for="size in ['xl', 'lg', 'md', 'sm', 'xm']" :key="size" :size="size" style="margin: 0 10px 10px 0;">size {{size}}</YuumiButton>
</template>
```

### 开启点击效果

通过 `splash` 开启

```vue demo
<template>
  <YuumiButton splash style="margin: 0 10px 10px 0;">默认按钮</YuumiButton>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" splash style="margin: 0 10px 10px 0;">{{theme}} button</YuumiButton>
  </div>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" outline splash style="margin: 0 10px 10px 0;">{{theme}} outline</YuumiButton>
  </div>
</template>
```

### 禁用状态

```vue demo
<template>
  <YuumiButton disabled style="margin: 0 10px 10px 0;">默认按钮</YuumiButton>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" disabled style="margin: 0 10px 10px 0;">{{theme}} button</YuumiButton>
  </div>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" outline disabled style="margin: 0 10px 10px 0;">{{theme}} outline</YuumiButton>
  </div>
</template>
```

### 圆角和圆形

通过 `round` 和 `circle` 设置。

```vue demo
<template>
  <YuumiButton round style="margin: 0 10px 10px 0;">默认按钮</YuumiButton>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" round style="margin: 0 10px 10px 0;">{{theme}} button</YuumiButton>
  </div>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" outline round style="margin: 0 10px 10px 0;">{{theme}} outline</YuumiButton>
  </div>

  <YuumiButton circle style="margin: 0 10px 10px 0;">默</YuumiButton>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" circle style="margin: 0 10px 10px 0;">{{theme.slice(0,2)}}</YuumiButton>
  </div>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" outline circle style="margin: 0 10px 10px 0;">{{theme.slice(0,2)}}</YuumiButton>
  </div>
</template>
```
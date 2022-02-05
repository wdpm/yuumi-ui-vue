## 快速开始

```bash
npm install yuumi-ui-vue@latest
```

## 全局使用

```js
// main.js

import YuumiUIVue from 'yuumi-ui-vue'

const app = createApp(App)
app.use(YuumiUIVue)

```

## 按需引入

```js
// main.js

import {YuumiInput[, ...]} from 'yuumi-ui-vue'

const app = createApp(App)
app.use(YuumiInput)

```
### 基本用法

```vue demo
<template>
  <YuumiTree :data="data"
    @checked="onChecked"
    @node-expand="onNodeExpand"
    @node-click="onNodeClick"
  ></YuumiTree>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {"label":"一年级","value":1, "children":[
          {"label":"1班","value":101, checked: true},
          {"label":"2班","value":102,"disabled":true,"children":[
            {"label":"实验班","value":10201},
            {"label":"普通班","value":10202}
          ]},
          {"label":"3班","value":103}
        ]},
        {"label":"二年级","value":2, "children":[
          {"label":"1班","value":201},
          {"label":"2班","value":202}
        ]},
        {"label":"三年级","value":3, "expand": true, "children":[
          {"label":"1班","value":301},
          {"label":"2班","value":302},
          {"label":"3班","value":303}
        ]}
      ]
    }
  },
  methods: {
    onChecked (detail) {
      console.log('onChecked', detail)
    },
    onNodeExpand (detail) {
      console.log('onNodeExpand', detail)
    },
    onNodeClick (detail) {
      console.log('onNodeClick', detail)
    }
  }
}
</script>
```

### 异步加载

设置 `load-data` 返回 `Promise<node[]>`。

```vue demo
<template>
  <YuumiTree :data="data"
    :load-data="loadData"
    @checked="onChecked"
    @node-expand="onNodeExpand"
    @node-click="onNodeClick"
  ></YuumiTree>
</template>
<script>
export default {
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.data = this.createChildren('')
  },
  methods: {
    createChildren (labelPrefix) {
      const max = Math.floor(5 * Math.random())
      const children = []

      for (let i = 0; i <= max; i++) {
        const _value = labelPrefix ? `${labelPrefix}-${i}` : `${i}`
        children.push({
          label: _value,
          value: _value
        })
      }

      return children
    },
    loadData (vm) {
      return new Promise((resolve) => {
        setTimeout(() => {
          Math.random() > 0.5 ? resolve(this.createChildren(vm.nodeLabel)) : resolve(null)
        }, 400)
      })
    },
    onChecked (detail) {
      console.log('onChecked', detail)
    },
    onNodeExpand (detail) {
      console.log('onNodeExpand', detail)
    },
    onNodeClick (detail) {
      console.log('onNodeClick', detail)
    }
  }
}
</script>
```

### 不显示checkbox

将 `checkable` 设置为 `false`, 默认为 `true` 。

```vue demo
<template>
  <YuumiTree :data="data" :checkable="false"></YuumiTree>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {"label":"一年级","value":1, "children":[
          {"label":"1班","value":101, checked: true},
          {"label":"2班","value":102,"disabled":true,"children":[
            {"label":"实验班","value":10201},
            {"label":"普通班","value":10202}
          ]},
          {"label":"3班","value":103}
        ]},
        {"label":"二年级","value":2, "children":[
          {"label":"1班","value":201},
          {"label":"2班","value":202}
        ]},
        {"label":"三年级","value":3, "expand": true, "children":[
          {"label":"1班","value":301},
          {"label":"2班","value":302},
          {"label":"3班","value":303}
        ]}
      ]
    }
  }
}
</script>
```

### 不显示expandIcon

将 `expandIconVisible` 设置为 `false`, 默认为 `true` 。

```vue demo
<template>
  <YuumiTree :data="data" :expand-icon-visible="false"></YuumiTree>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {"label":"一年级","value":1, "children":[
          {"label":"1班","value":101, checked: true},
          {"label":"2班","value":102,"disabled":true,"children":[
            {"label":"实验班","value":10201},
            {"label":"普通班","value":10202}
          ]},
          {"label":"3班","value":103}
        ]},
        {"label":"二年级","value":2, "children":[
          {"label":"1班","value":201},
          {"label":"2班","value":202}
        ]},
        {"label":"三年级","value":3, "expand": true, "children":[
          {"label":"1班","value":301},
          {"label":"2班","value":302},
          {"label":"3班","value":303}
        ]}
      ]
    }
  }
}
</script>
```

### 自定义TreeNode

```vue demo
<template>
  <YuumiTree :data="data" :checkable="false">
    <template #default="{ node, isExpandChildren }">
      <div :class="['expand-icon', { '__active': isExpandChildren }]" v-if="node.children && node.children.length > 0">
        <YuumiIcon icon="flat-arrow-bottom"></YuumiIcon>
      </div>
      <YuumiIcon :icon="node.icon"></YuumiIcon>
      <div>{{node.label}}</div>
    </template>
  </YuumiTree>
</template>
<script>
export default {
  data () {
    return {
      data: [
        { icon: "line-calendar", label: '2021-12-11', value: '2021-12-11', children: [
          { icon: "line-clock", label: '06:00', value: '2021-12-11 06:00:00' },
          { icon: "line-clock", label: '08:00', value: '2021-12-11 08:00:00' },
          { icon: "line-clock", label: '10:00', value: '2021-12-11 10:00:00' }
        ]},
        { icon: "line-calendar", label: '2021-12-12', value: '2021-12-12', children: [
          { icon: "line-clock", label: '06:00', value: '2021-12-12 06:00:00' },
          { icon: "line-clock", label: '08:00', value: '2021-12-12 08:00:00' },
          { icon: "line-clock", label: '10:00', value: '2021-12-12 10:00:00' }
        ]}
      ]
    }
  }
}
</script>
```
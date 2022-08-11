### 基本用法

```vue demo
<template>
  <div style="width: 200px;">
    <YuumiMenu :data="data"
      :selected-node="selectedNode"
      @node-expand="onNodeExpand"
      @node-click="onNodeClick"
      @node-mouseenter="onEvent"
      @node-mouseleave="onEvent"
    ></YuumiMenu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {"label":"一年级","value":1, icon: "line-setting", "children":[
          {"label":"1班","value":101, checked: true},
          {"label":"2班","value":102,"disabled":true, icon: "line-setting", "children":[
            {"label":"实验班","value":10201},
            {"label":"普通班","value":10202}
          ]},
          {"label":"3班","value":103}
        ]},
        {"label":"二年级","value":2, icon: "line-setting", "children":[
          {"label":"1班","value":201},
          {"label":"2班","value":202}
        ]},
        {"label":"三年级","value":3, icon: "line-setting", "expand": true, "children":[
          {"label":"1班","value":301},
          {"label":"2班","value":302},
          {"label":"3班","value":303}
        ]}
      ],
      selectedNode: null
    }
  },
  methods: {
    onNodeExpand (detail) {
      console.log('onNodeExpand', detail)
    },
    onNodeClick (detail) {
      console.log('onNodeClick', detail)
      if (!detail.node.children) {
        this.selectedNode = detail.node
      }
    },
    onEvent (detail) {
      console.log('onEvent', detail)
    }
  }
}
</script>
```
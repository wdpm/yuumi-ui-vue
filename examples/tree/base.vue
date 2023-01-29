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

### 基本用法

```vue demo
<template>
<div style="overflow: hidden;">
  <div class="group-item" v-for="group in icons" :key="group.name">
    <div class="group-name" style="font-weight: bold; padding-bottom: 10px;">{{group.name}}</div>

    <div class="group-icons">
      <div style="display: inline-block; width: 120px; height: 100px; font-size: 28px; vertical-align: text-bottom; text-align: center; font-weight: bold;"
      v-for="icon in group.children" :key="icon"
      >
        <YuumiIcon :icon="icon"></YuumiIcon>
        <div style="font-size: 12px;">{{icon}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    iconCount () {
        return this.icons.reduce((acc, item) => {
          return acc + item.children.length
        }, 0)
    },
    icons () {
      return [{
        name: "常用类",
        children: [
          "add", "edit", "circle-loading", "correct", "line-close",
          "line-rect-correct", "flat-rect-correct",
          "line-edit", "flat-edit",
          "line-disabled","flat-disabled",
          "line-delete","flat-delete",
          "line-exit","flat-exit",
          "line-remove", "flat-remove",
          "line-search", "flat-search",
          "line-setting", "flat-setting",
          "line-like", "flat-like",
          "line-info", "flat-info",
          "line-help", "flat-help",
          "line-circle-correct", "flat-circle-correct",
          "line-circle-close", "flat-circle-close",
        ]
      }, {
        name: "表单",
        children: [
          "radio-unselect", "radio-select",
          "checkbox-unselect", "line-checkbox-indeterminate", "flat-checkbox-indeterminate", "line-checkbox-select", "flat-checkbox-select",
          "line-unlock", "flat-unlock",
          "line-lock",  "flat-lock",
          "line-key", "flat-key",
          "line-shield-correct", "flat-shield-correct",
          "line-shield-info", "flat-shield-info",
          "line-unfold", "flat-unfold",
          "line-fold", "flat-fold",
          "line-eye", "flat-eye",
          "line-eye-close", "flat-eye-close",
          "line-mobile", "flat-mobile",
          "line-calendar", "flat-calendar",
          "line-clock", "flat-clock",
        ]
      }, {
        name: "方向",
        children: [
          "line-left", "line-right", "line-top", "line-bottom",
          "flat-arrow-left-small", "flat-arrow-right-small", "flat-arrow-top-small", "flat-arrow-bottom-small",
          "flat-arrow-left", "flat-arrow-right", "flat-arrow-top", "flat-arrow-bottom",
          "line-prev", "line-next",
        ]
      }, {
        name: "文件",
        children: [
          "line-file", "flat-file",
          "line-file-add", "flat-file-add",
          "line-file-remove", "flat-file-remove",
          "line-file-disabled", "flat-file-disabled",
          "line-file-setting","flat-folder-setting",
        ]
      }, {
        name: "文件夹",
        children: [
          "line-folder", "flat-folder",
          "line-folder-add", "flat-folder-add",
          "line-folder-remove", "flat-folder-remove",
          "line-folder-disabled", "flat-folder-disabled",
          "line-folder-setting","flat-folder-setting",
        ]
      }, {
        name: "人员",
        children: [
          "line-user", "flat-user",
          "line-user-add", "flat-user-add",
          "line-user-disabled", "flat-user-disabled",
          "line-user-remove", "flat-user-remove",
          "line-user-setting","flat-user-setting",
          "line-users", "flat-users",
        ]
      }, {
        name: "状态",
        children: [
          "empty"
        ]
      }]
    }
  }
}
</script>
```
<template>
<div style="overflow: hidden;">
  <div class="group-item" v-for="group,index in icons" :key="group.name">
    <div class="group-name" style="font-weight: bold; padding-bottom: 10px;">{{group.name}}</div>

    <YuumiTabs v-model="type[index]">
      <YuumiTabItem label="线性" value="line">
        <div class="group-icons">
          <div style="display: inline-block; width: 20%; height: 100px; font-size: 28px; vertical-align: text-bottom; text-align: center; font-weight: bold;"
          v-for="icon in group.line" :key="icon"
          >
            <YuumiIcon :icon="icon"></YuumiIcon>
            <div style="font-size: 12px;">{{icon}}</div>
          </div>
        </div>
      </YuumiTabItem>

      <YuumiTabItem label="扁平" value="flat">
        <div class="group-icons">
          <div style="display: inline-block; width: 20%; height: 100px; font-size: 28px; vertical-align: text-bottom; text-align: center; font-weight: bold;"
          v-for="icon in group.flat" :key="icon"
          >
            <YuumiIcon :icon="icon"></YuumiIcon>
            <div style="font-size: 12px;">{{icon}}</div>
          </div>
        </div>
      </YuumiTabItem>
    </YuumiTabs>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      type: Array(10).fill('line')
    }
  },
  computed: {
    iconCount () {
        return this.icons.reduce((acc, item) => {
          return acc + item.children.length
        }, 0)
    },
    icons () {
      return [{
        name: "常用类",
        line: [
          "line-add",
          "line-edit",
          "line-loading",
          "line-correct",
          "line-rect-correct",
          "line-circle-correct",
          "line-close",
          "line-setting",
          "line-help",
          "line-info",
          "line-exit",
          "line-delete",
          "line-remove",
          "line-disabled",
          "line-search",
          "line-praise",
          "line-screen",
          "line-order",
          "line-catalog",
          "line-menu",
          "line-menu1",
          "line-share",
          "line-heart"
        ],
        flat: [
          "flat-add",
          "flat-edit",
          "flat-loading",
          "flat-correct",
          "flat-rect-correct",
          "flat-circle-correct",
          "flat-close",
          "flat-setting",
          "flat-help",
          "flat-info",
          "flat-exit",
          "flat-delete",
          "flat-remove",
          "flat-disabled",
          "flat-search",
          "flat-praise",
          "flat-screen",
          "flat-order",
          "flat-catalog",
          "flat-menu",
          "flat-menu1",
          "flat-share",
          "flat-heart"
        ]
      }, {
        name: "表单",
        line: [
          "radio-selected",
          "radio-unselected",
          "checkbox-selected",
          "checkbox-unselected",
          "line-checkbox-indeterminate",
          "line-mobile",
          "line-phone",
          "line-key",
          "line-lock",
          "line-unlock",
          "line-circle",
          "line-circle-dot",
          "line-circle-close",
          "line-rect",
          "line-fold",
          "line-unfold",
          "line-eye",
          "line-eye-close",
          "line-shield-info",
          "line-shield-correct",
          "line-calendar",
          "line-clock",
          "line-mail"
        ],
        flat: [
          "flat-checkbox-indeterminate",
          "flat-mobile",
          "flat-phone",
          "flat-key",
          "flat-lock",
          "flat-unlock",
          "flat-circle",
          "flat-circle-dot",
          "flat-circle-close",
          "flat-rect",
          "flat-fold",
          "flat-unfold",
          "flat-eye",
          "flat-eye-close",
          "flat-shield-info",
          "flat-shield-correct",
          "flat-calendar",
          "flat-clock",
          "flat-mail"
        ]
      }, {
        name: "方向",
        line: [
          "line-prev",
          "line-next",
          "line-arrow-top",
          "line-arrow-bottom",
          "line-arrow-left",
          "line-arrow-right"
        ],
        flat: [
          "flat-arrow-top",
          "flat-arrow-bottom",
          "flat-arrow-left",
          "flat-arrow-right"
        ]
      }, {
        name: "文件",
        line: [
          "line-file",
          "line-file-add",
          "line-file-setting"
        ],
        flat: [
          "flat-file",
          "flat-file-add",
          "flat-file-setting"
        ]
      }, {
        name: "文件夹",
        line: [
          "line-folder",
          "line-folder-add",
          "line-folder-setting"
        ],
        flat: [
          "flat-folder",
          "flat-folder-add",
          "flat-folder-setting"
        ]
      }, {
        name: "人员组织",
        line: [
          "line-user",
          "line-user-add",
          "line-user-setting",
          "line-user-disabled",
          "line-user-remove",
          "line-users",
          "line-user-order"
        ],
        flat: [
          "flat-user",
          "flat-user-add",
          "flat-user-setting",
          "flat-user-disabled",
          "flat-user-remove",
          "flat-users",
          "flat-user-order"
        ]
      }, {
        name: "状态",
        line: [
          "line-empty",
          "line-finger"
        ],
        flat: [
          "flat-empty",
          "flat-finger"
        ]
      }, {
        name: "交通",
        line: [
          "line-car",
          "line-steering-wheel"
        ],
        flat: [
          "flat-car",
          "flat-steering-wheel"
        ]
      }, {
        name: "证件",
        line: [
          "line-identity",
        ],
        flat: [
          "flat-identity"
        ]
      }, {
        name: "媒体",
        line: [
          "line-pause",
          "line-play",
          "line-voice",
          "line-muted",
          "line-fullscreen",
          "line-fullscreen-exit"
        ],
        flat: [
          "flat-pause",
          "flat-play",
          "flat-voice",
          "flat-muted",
          "flat-fullscreen",
          "flat-fullscreen-exit"
        ]
      }]
    }
  }
}
</script>
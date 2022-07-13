import { App, ComponentInternalInstance, getCurrentInstance, VNode } from 'vue'
import { createApp, defineComponent} from 'vue'

import { YuumiButton, YuumiDialog, YuumiIcon, YuumiWarning } from '../'

let pluginApp: App|null = null
let pluginAppComponentInstance: ComponentInternalInstance|null = null

export const pluginAppComponent = defineComponent({
  data () {
    return {
      alerts: [] as VNode[],
      messages: [] as VNode[],
      notifications: [] as VNode[],
      loadings: [] as VNode[]
    }
  },
  setup () {
    pluginAppComponentInstance = getCurrentInstance()
  },
  render () {
    return [this.alerts, this.messages, this.notifications, this.loadings]
  }
})

export function getPluginAppComponentInstance () {
  if (pluginApp) return pluginAppComponentInstance

  const pluginRootEl = document.createElement('div')
  pluginRootEl.setAttribute('style', 'width:0px; height:0px;')
  pluginRootEl.setAttribute('id', 'pluginApp')
  document.body.appendChild(pluginRootEl)

  pluginApp = createApp(pluginAppComponent)

  pluginApp.component(YuumiButton.name, YuumiButton)
  pluginApp.component(YuumiDialog.name, YuumiDialog)
  pluginApp.component(YuumiIcon.name, YuumiIcon)
  pluginApp.component(YuumiWarning.name, YuumiWarning)

  pluginApp.mount(pluginRootEl)
  return pluginAppComponentInstance
}
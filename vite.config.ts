const pkg = require("./package.json")
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vitePluginVuedoc, { vueDocFiles } from 'vite-plugin-vuedoc'

function getDefaultConfig () {
  return {
    base: '/yuumi-ui-vue/latest',
    plugins: [
      vitePluginVuedoc({
        highlight: {
          theme: "one-light"
        }
      }),
      vue({
        include: [...vueDocFiles]
      })
    ]
  }
}

function getLibraryConfig () {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'packages/index.ts'),
        name: 'YuumiUiVue',
        fileName: (format) => `yuumi-${format}.js`
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue', 'vue-router'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue'
          }
        }
      }
    },
    plugins: [
      vue()
    ]
  }
}

export default defineConfig(({ mode }) => {
  let config = {
    define: {
      __APP_VERSION__: `"${pkg.version}"`
    }
  }

  switch (mode) {
    case 'lib':
      return Object.assign(config, getLibraryConfig())
    default:
      return Object.assign(config, getDefaultConfig())
  }
})

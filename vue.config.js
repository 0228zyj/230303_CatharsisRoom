const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const themePath = path.join(__dirname, './src/theme.less')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false, // 关闭eslint的严格检查
  devServer:{
    host: '0.0.0.0',
    // https:true,
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量（不推荐）
            // 'tabs-line-height': '100px',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${themePath}";`,
          },
        },
      },
    },
  },
})

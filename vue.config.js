const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',    // 启动页地址
  outputDir: 'dist', // 打包的目录
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    proxy: {
      "/myShop": {
        target: "http://192.168.207.72:1024/api",
        changeOrigin: true,
        pathRewrite: {
          "^/myShop": ""
        }
      }
    }
  }
})
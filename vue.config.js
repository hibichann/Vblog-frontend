const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
        pathRewrite: { '^/api': '' }
      }
    }
  }
})

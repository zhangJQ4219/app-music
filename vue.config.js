const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  lintOnSave: true,

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('~', resolve('src/assets'))
      .set('api', resolve('src/api'))
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  }
}

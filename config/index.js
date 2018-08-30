var config = {
  'staticPath': 'test',                 
  'htmlPath': 'test'                    
}

/*
**********************打包配置*************************
*/

var path = require('path')
var _ = require('lodash')

var env = process.env.NODE_ENV 

// 开启代理: true || 关闭代理: false,只在开发模式下适用
var proxy = true


var map = {
  development: {
    port: 8083,
    proxyTable: {
      '/proxy': {
        target: 'http://api.douban.com/v2/',
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': ''
        }
      }
    },
    staticHost: '',
    host: proxy ? '/proxy' : 'http://api.douban.com/v2/'
  },
  qa: {
    staticHost: 'http://hostname',
    host: 'http://hostname'
  },
  rd: {
    staticHost: 'http://hostname',
    host: 'http://hostname'
  },
  production: {
    staticHost: 'http://hostname',
    host: 'http://hostname'
  },
  beta: {
    staticHost: 'http://hostname',
    host: 'http://hostname'
  },
  alpha: {
    staticHost: 'http://hostname',
    host: 'http://hostname'
  }
}

// 获取本机IP
function getIPAdress () {
  var interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

// 构建静态资源CDN路径
if (process.env.NODE_ENV !== 'development') {
  var staticPath = process.env.NODE_ENV === 'production' ? config.staticPath : config.htmlPath
  var assetsPublicPath = map[env].staticHost + staticPath + '/'
  // 设置静态资源环境变量
  process.env.STATIC = map[env].staticHost + staticPath

  console.log('构建环境: ' + env + '\n')
  console.log('静态资源目录: ' + staticPath + '\n')
  console.log('html文件目录: ' + config.htmlPath + '\n')
  console.log('静态资源路径: ' + assetsPublicPath + '\n')
  _.forEach(map[env], function (value, key) {
    console.log(key + '域名: ' + value + '\n')
  })
} else {
  // 默认静态资源环境变量
  process.env.STATIC = `http://${getIPAdress()}:${map.development.port}`
}


module.exports = {
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: assetsPublicPath,
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    port: map.development.port,
    proxyTable: map.development.proxyTable
  },
  path: config,
  host: map[env]
}




var path = require('path')
var utils = require('./utils')
var rm = require('rimraf')        // 清除目录插件
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')  // webpack 合并配置文件
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')                      // 复制静态文件
var HtmlWebpackPlugin = require('html-webpack-plugin')                      // 输出html模板
var ExtractTextPlugin = require('extract-text-webpack-plugin')              // 提取css样式
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')  // css压缩

var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')  // 友好的错误提示
var webpackConfig = {}
var copyConfig = [
  { // 复制静态资源
    from: path.resolve(__dirname, '../static'),
    to: config.build.assetsRoot + '/static',
    ignore: ['.*']
  }
]

// 开发构建
if (process.env.NODE_ENV === 'development') {
  // 添加热重载相关代码块
  Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
  })


  webpackConfig = merge(baseWebpackConfig, {
    // entry: {
    //   'app': ['webpack-hot-middleware/client?noInfo=true', './src/main.js']
    // },
    module: {
      rules: utils.styleLoaders({ sourceMap: true })
    },
    // 配置source-map
    devtool: '#cheap-module-eval-source-map',
    plugins: [
      // 定义环境变量
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          STATIC: JSON.stringify(process.env.STATIC),
          HOST: JSON.stringify(config.host)
        }
      }),

      // 使用ProvidePlugin加载使用频率高的模块  全局配置zepto
      // npm install webpack-zepto
      // new webpack.ProvidePlugin({
      //   $: 'webpack-zepto'
      // }),

      // 代码热替换 https://github.com/glenjamin/webpack-hot-middleware#installation--usage
      new webpack.HotModuleReplacementPlugin(),

      // 报错但不退出webpack进程
      new webpack.NoEmitOnErrorsPlugin(),

      // 生成html的插件 https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }),

      new FriendlyErrorsPlugin()  // 友好的错误提示
    ]
  })
}


// 生产构建
if (process.env.NODE_ENV !== 'development') {
  // 清除产出目录
  rm(config.build.assetsRoot, err => {
    if (err) throw err
  })

  webpackConfig = merge(baseWebpackConfig, {
    module: {
      rules: utils.styleLoaders({
        sourceMap: true,
        extract: true
      })
    },
    devtool: '#source-map',
    output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
      publicPath: config.build.assetsPublicPath // 配置静态资源cdn路径, 覆盖base文件配置
    },
    plugins: [
      // webpack环境变量
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          STATIC: JSON.stringify(process.env.STATIC),
          HOST: JSON.stringify(config.host)
        }
      }),

      // 使用ProvidePlugin加载使用频率高的模块  全局配置zepto
      // new webpack.ProvidePlugin({
      //   $: 'webpack-zepto'
      // }),

      // 代码压缩
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: true
      }),

      // 将js中引入的css分离的插件
      new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].[contenthash].css')
      }),

      // 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }),

      // 生成html的插件 https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: path.resolve(config.build.assetsRoot, 'index.html'), // 生成的html的文件名
        template: 'index.html', // 依据的模板
        inject: true, // 注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
        minify: { // 压缩配置
          removeComments: true, // 删除html中的注释代码
          collapseWhitespace: true, // 删除html中的空白符
          removeAttributeQuotes: true, // 删除html元素中属性的引号
          minifyJS: { // 压缩 html 内部 js
            compress: {
              warnings: false
            }
          }
          // 更多配置
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        chunksSortMode: 'dependency' // 按dependency的顺序引入
      }),

      // 隐似输出公共包
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module, count) {
          // npm资源和src/lib、/src/plugins下的文件打包为公共文件
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            (
              (module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0) ||
              (module.resource.indexOf(path.join(__dirname, '../src/lib')) === 0) ||
              (module.resource.indexOf(path.join(__dirname, '../src/plugins')) === 0)
            )
          )
        }
      }),

      // 保持公共包输出哈希值不变
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
      }),

      // 复制静态资源
      new CopyWebpackPlugin(process.env.NODE_ENV === 'production' ? copyConfig.slice(1) : copyConfig)
    ]
  })

  // webpack静态资源分析
  if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }
}


module.exports = webpackConfig

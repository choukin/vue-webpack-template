var path = require('path')
var config = require('../config')
var utils = require('./utils')

// 拼接路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    // 输出文件夹
    path: config.build.assetsRoot,
    filename: '[name].js',
    // 配置静态资源cdn路径, 默认为开发配置
    publicPath: '/'
  },
  resolve: {
    // 配置文件后缀名,引入模块的时候省略后缀名
    extensions: ['.js', '.vue', '.json', 'scss', 'sass'],
    // 添加别名，可以节省编译的搜索时间
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // 加入eslint约束代码规范
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        exclude: [/node_modules/, /lib/],   // eslint约束排除这个两个目录
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders({
            sourceMap: true,    // 资源地图
            extract: process.env.NODE_ENV !== 'development'     // 是否提取css
          }),
          postcss: [
            require('autoprefixer')({
              browsers: ['Android > 1', 'ChromeAndroid > 1', 'FirefoxAndroid > 1', 'Samsung > 1', 'and_uc > 1', 'iOS > 1']
            })
          ]
        }
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 限制大小小于10k的 转换为base64的字符串内嵌在生成的文件里
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

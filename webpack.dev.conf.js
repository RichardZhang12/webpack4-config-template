let config = require('./webpack.base');
const path = require('path');
const webpack = require('webpack');
// import config from './webpack.base';

let {
  smart
} = require('webpack-merge')
console.log('dev~~~~~~~~~~~~~~')
module.exports = smart(config, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/'
  },
  devServer: {
    port: 3001,
    // hot: true, //开启热替换
    compress: true, // 一切服务都使用gzip压缩
    progress: true, //打包进度条
  },
  module: {
    rules: [
      // new webpack.NamedModulesPlugin(), //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
      // new webpack.HotModuleReplacementPlugin() //模块热替换插件(HotModuleReplacementPlugin),永远不要在生产环境(production)下启用 HMR
    ]
  }
})
let config = require('./webpack.base');
let merge = require('webpack-merge');
let {
  CleanWebpackPlugin //删除output.path中定义的目录，在重新生成
} = require('clean-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin'); //生产模式下压缩css，副作用js不压缩
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack')
console.log(typeof merge(config, {}), '~~~~~~~~~~~~~~')
module.exports = merge(config, {
  output: {
    publicPath: 'file:///C:/Users/13087/Desktop/code/04webpack集合/dist/'

  },
  // watch: true, // 开启监听功能，此时npm run build 可持续监听进行重构
  // watchOptions: {
  //   poll: 1000, //每秒检查一次变动
  //   aggregateTimeout: 500, //重构前增加延时，这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里
  //   ignored: /node_modules/ //不监听node_modules下的文件夹
  // },
  //优化项
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        //If you use your own minify function please read the minify section for cache invalidation correctly.
        // cache: true, 缓存 
        // parallel: true, 多进程
        // sourceMap: true, 源码映射
      }),
      new OptimizeCssPlugin({}),
      new CleanWebpackPlugin(),
      // new CopyWebpackPlugin([ // 该插件不是用来复制构建过程中生成的文件，而是复制源树中已经存在的文件，作为构建过程的一部分。
      //   {
      //     from: 'doc',
      //     to: ''
      //   }
      // ]),
      new webpack.BannerPlugin("为chunk文件添加banner头")

    ]
  },
  mode: 'development',
});
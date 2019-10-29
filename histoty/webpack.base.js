const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin'); //将css使用link插入
let {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'dist') // path参数需是绝对路径
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-proposal-decorators", {
                "legacy": true
              }],
              ["@babel/plugin-proposal-class-properties", {
                "loose": true
              }],
              "@babel/plugin-transform-runtime"
              // "@babel/plugin-transform-runtime" //当只用这三个时，js文件使用class语法编译时报错，install @babel/runtime解决
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssPlugin.loader,
          'css-loader',
          'postcss-loader' //添加css前缀，需要postcss.config.js, autoprefixer,package.json文件添加 "browserslist"
        ]
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      filename: 'index.html' //模板生成的文件名
    }),
    new MiniCssPlugin({
      filename: 'public/css/aaa.css'
    }),
    new CleanWebpackPlugin()

  ]
}
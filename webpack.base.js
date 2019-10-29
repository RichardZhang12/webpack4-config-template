const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin'); //将css使用link插入
const webpack = require('webpack');
const happypack = require('happypack');


module.exports = {
  //优化项
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: { //将公共引入的js文件抽离
          chunks: 'initial', //同步
          minSize: 0, //最小字节，超过了就是抽离的条件之一
          minChunks: 2,
        },
        vendor: { //将公共引入的node_modules中的模块抽离出来
          priority: 1, //优先级，如果不加入，common中定义，执行完毕，这里的不会执行，将会把公共js和模块中的抽离到一个文件中
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
  entry: {
    index: './src/index.js',
    // index02: './src/index02.js'
  },
  devServer: {
    //1)使用proxy代理
    proxy: { // 重写的方式 把请求代理到express服务器上,前段接口请求添加/apic参数，
      '/api': {
        target: 'http://localhost:8000',
        pathRewrite: {
          '/api': ''
        } // /api/user => http://localhost:8000/user
      }
    },
  },
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'dist'), // path参数需是绝对路径
  },
  resolve: {
    alias: {
      bootstrap: 'bootstrap/dist/css/bootstrap.css'
    },
    // mainFields: ['style', 'main'],
    modules: [path.resolve('node_modules')], //webpack解析模块时搜索的目录
    extensions: ['.js', '.css'] //引入模块时，先找引入名称对应的js文件，再找css文件
  },
  module: {
    //不解析jquery中的package.json依赖关系，减少解析时间，TODO:这里跟下面暴露jquery到window冲突，选择使用
    // noParse: /jquery/, //防止webpack解析那些任何与给定正则表达式相匹配的文件，忽略的文件中不应该含有import，require，define的 调用
    rules: [{
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1, //单位字节，规定超过该字节使用file-loader加载
            outputPath: 'public/img/',
            name: '[name][hash:6].[ext]'
          }
        }
      },
      {
        test: /\.js$/,
        //添加下面两项既是一种优化，同时避免解析了node_modules一些模块时，出现的一些不必要错误
        include: path.resolve(__dirname, 'src'), // 解析src下的js文件，
        exclude: /node_modules/, // 排除node_modules下的文件,
        use: 'happypack/loader?id=js'

      },
      {
        test: /\.css$/,
        use: 'happypack/loader?id=css'
      },


    ]
  },
  plugins: [
    new happypack({
      id: 'js',
      use: [{
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
            "@babel/plugin-transform-runtime" //当只用这三个时，js文件使用class语法编译时报错，install @babel/runtime解决
          ]
        }
      }]
    }),
    new happypack({
      id: 'css',
      use: ['style-loader', 'css-loader']
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html' //模板生成的文件名
    }),
    //webapck配置多页面应用，多次实例化html-wepback-plugin
    // new HtmlWebpackPlugin({
    //   template: './src/index02.html',
    //   filename: 'index02.html'
    // }),
    new MiniCssPlugin({
      filename: 'public/css/aaa.css'
    }),
  ],
}
#### webpack基本功能 配置
- webpack,webpack-cli 配置入口，出口
- babel-loader,@babel/preset-env,@babel/core,es6=>es5,对于一些class什么语法，需要对应的babel去转换
- postcss-loader 给css针对不同浏览器加前缀.  需要配置postcss.config.js文件，  install autoprefixer 插件，给package.json文件添加 "browserslist",三步缺一不可
- css-loader,编译css
- style-loader,打包好的bundle文件中，使用函数在html中的head中创建一个style标签，将css插入
- mini-css-extract-plugin 可将css文件单独生成，使用link标签插入到html中
- 压缩css optimize-css-assets-webpack-plugin
- 使用optimize压缩css会使prod模式下，js不能压缩，添加uglifyjs-webpack-plugin插件，压缩js，该插件还可配置一些优化项
- html-webpack-plugin 将打包好的js文件插入到模板html中
- 解析图片 file-loader，我们使用url-loader代替file-loader,可以优化图片加载，同时在html文件中解析使用html-loader.
- 注意css引入背景图和直接在html中img引入图片时路径存在问题，开发环境和线上环境要在output设置不同的publicPath.避免图片显示不出来的错误。
- 引入jquery通过expose-loader暴露到window上
#### webpack 配置篇
- 多页面应用 01entry使用对象配置，02output设置出口，实例化多个html-webpack-plugin
- 开发环境设置devtool，源码映射。
- npm run build开启watch：true监听，使用watchOptions配置
- clean-webpack-plugin 进行删除dist目录中内容，在重新生成。
- copy-webpack-plugin该插件不是用来复制构建过程中生成的文件，而是复制源树中已经存在的文件，作为构建过程的一部分。
- webpack内置插件BannerPlugin给打包的js插入banner头
- webpack跨域 01在devserver中配置代理 02在服务端配置使用webpack-dev-middleware，将webpack和服务器设置为同一个端口。
- resolve解析 alias（别名）extensions： 扩展名添加
#### webpack 优化
- module.noParse 防止webpack解析那些任何与给定正则表达式相匹配的文件，忽略的文件中不应该含有import，require，define的调用
- webpack自带的IgnorePlugin插件，可忽略打包模块中不使用的功能，eg：moment语言模块。
 ```
 requestRegExp 匹配(test)资源请求路径的正则表达式。
 contextRegExp （可选）匹配(test)资源上下文（目录）的正则表达式。
 new webpack.IgnorePlugin(requestRegExp, [contextRegExp])
 ```
 - happypack配置多线程打包
 - webpack生产模式自带优化，（只引入模块中用到的函数-需要import引入，require不能产生优化效果，将多个变量加减的值，直接合并成一个结果，减少变量声明）
 - 抽离公共代码，将公共代码抽离出一份，不用在每个模块中都引入相同的代码了。optimization.splitChunks
- 懒加载，懒加载通过import().then,
- 热替换01devServer开启hot:true,02
```
   new webpack.NamedModulesPlugin(), //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.HotModuleReplacementPlugin() //模块热替换插件(HotModuleReplacementPlugin),永远不要在生产环境(production)下启用 HMR
```


#### 构建不同环境
- 采用webpack-merge，使用视频中解构 smart方法去合并，将base和dev或prod环境配置合并(它允许连接数组并合并对象，而不是覆盖组合)
#### webpack 优化篇

#### 至于各loader的配置rules.use还是rules.loader无所谓，能实现功能就行
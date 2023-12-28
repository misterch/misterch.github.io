---
title: webpack的其他一些配置
date: 2023-12-21
categories:
 - webpack
---

## context

```json
{
  context: path.resolve(__dirname,'./src'),
  entry: {
    main: './main.js'
  }
}
```

该配置会影响**入口**和**loader**的解析，它们的相对路径会以**context**的配置作为**基准路径**，这样，你的配置会独立于CWD（当前执行路径）

## output

### library

设置该配置以后，打包后的结果中，会将自执行函数的执行结果暴露给配置后的变量

一般是项目作为**库**，向外提供API使用

```json
{
  library:"jquery"
}
```

设置后，打包的结果中，会将自执行函数的执行结果返回给jquery，这样就可以使用jquery这个库了

### libraryTarget

该配置可以更加精细控制如何暴露入口包的导出结果

可用的值有：

- var：默认值，暴露给一个普通变量
- window：暴露给window对象的一个属性
- this：暴露给this的一个属性
- global：暴露给global的一个属性
- commonjs：暴露给export的一个属性

## target

设置打包结果最终运行的环境，常用值有：

- web：打包后的代码运行在web环境中
- node：打包后的代码运行在node环境中

## resolve

### modules

```json
modules:["node_modules"]
```

当解析模块时，如果遇到导入语句（`require("jquery")`），webpack会从下面的位置寻找依赖的模块

- 当前目录下的`node_modules`目录
- 上一级目录下的`node_modules`目录
- ......

### extensions

当解析模块是，遇到无具体后缀的导入语句，会根据这个配置来测试它的后缀名

```json
{
  extensions:[".js","json","ts"]
}
```

### alias

设置这个配置后，就可以更加方便地导入依赖，特别是遇到深层次的目录结构

```json
{
  alias:{
    "@":path.resolve(__dirname,'src')
  }
}
```

这样配置后就可以使用`@`来替代`../../`这样的写法

`require("@/test")相当于require("/project/src/test")`

## externals

如果希望打包的结果中不需要包含某些包的代码（缩减包的体积），而是使用cdn的方式引入包，可以配置这个插件

```json
{
  externals:{
    jquery:"$",
    lodash:"_"
  }
}
```

打包的结果将变成

```js
(function(){
  
})({
    "./src/index.js": function(module, exports, __webpack_require__){
        __webpack_require__("jquery")
        __webpack_require__("lodash")
    },
    "jquery": function(module, exports){
        module.exports = $;
    },
    "lodash": function(module, exports){
        module.exports = _;
    },
})
```

只是简单的exports一个属性

## webpack内置插件

webpack的内置插件是作为webpack的静态属性存在的

```js
const webpack = require("webpack")

new webpack.插件名(options)
```



### DefinePlugin

全局常量定义插件，使用该插件通常定义一些常量值，例如：

```js
new webpack.DefinePlugin({
    PI: `Math.PI`, // PI = Math.PI
    VERSION: `"1.0.0"`, // VERSION = "1.0.0"
    DOMAIN: JSON.stringify("duyi.com")
})
```

这样一来，在源码中，我们可以直接使用插件中提供的常量，当webpack编译完成后，会自动替换为常量的值

### ProvidePlugin

自动加载模块，而不必到处 import 或 require 

```js
new webpack.ProvidePlugin({
  $: 'jquery',
  _: 'lodash'
})
```



### BannerPlugin

它可以为每个chunk生成的文件头部添加一行注释，一般用于添加作者、公司、版权等信息

```js
new webpack.BannerPlugin({
  banner: `
  hash:[hash]
  chunkhash:[chunkhash]
  name:[name]
  author:yuanjin
  corporation:duyi
  `
})
```


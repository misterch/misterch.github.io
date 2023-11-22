---
title: Vue SSR
date: 2023-11-22
categories:
 - vue
 - node
tags:
 - ssr
---

## SSR本质

ssr+csr

![](./imgs/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

## 基本实现

实现vue服务端渲染，就是要在服务端将vue实例预先渲染成HTML，然后将其输出给前端

要将vue实例渲染成HTML需要使用`vue-server-renderer`实现服务端渲染

### server.js

```js
const express = require('express')
const Vue = reuqire('vue')
const serverRenderer = require('vue-server-renderer')
const fs = require('fs')
//创建express服务器
const server = express()

//创建渲染器
//使用指定的html模板，html文件中需要有特定的挂载点
const render = serverRenderer.createRenderer({
  template: fs.readFileSync('./index.html','utf-8')
})

//创建vue实例
const app = new Vue({
  data(){
    return {
      msg:'hello ssr'
    }
  },
  template:'<div>{{msg}}</div>'
})
//定义页面的相关信息
const desc = {
  title:'这是一个ssr页面',
  meta:'<meta name="description" content="Vue.js 服务端渲染指南"></meta>'
}

server.get('*',async (req,res)=>{
  try{
    //将vue实例转换为html字符串
    //renderToString(vue实例,页面配置对象)
  	const html = await render.renderToString(app,desc)
  	res.send(html)
  }catch(e){
    console.log(e)
  }
})

server.listen(8000,()=>{
  console.log('server is running at 8000')
})
```

### template.html

需要有一个注释节点`vue-ssr-outlet`

`{{}}`会将字符串进行**转义**

`{{{}}}`不会发生转义

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    {{{meta}}}
    <title>{{title}}</title>
  </head>
  <body>
    //页面模板的挂载点，之间不能有空格
		<!--vue-ssr-outlet-->
  </body>
</html>

```

**问题**

1. 页面失活
2. 无法写组件
3. 开发环境问题

## SSR环境搭建

### 依赖

webpack：webpack、webpack-cli、webpack-dev-server、webpack-merge

vue：vue-loader、vue-template-compiler、vue-server-renderer

js：babel-loader、@babel/core、@babel/preset-env

css：vue-style-loader、css-loader等

other：express、html-webpack-plugin

### 目录结构

```
|-public
	template.html				--vue的渲染模板
|-webpack
	webpack.base.js			--webpack打包基础配置
	webpack.client.js		--针对客户端的打包配置
	webpack.server.js		--针对服务端的打包配置
|-server
	index.js						--SSR服务器
	index.ssr.html			--vue-server-render挂载的模板
|-src
	main.js							--入口文件（创建vue实例方法的文件）
	app.vue							--vue根组件
	|-components				--vue组件
	|-entry
		client.entry.js		--客户端的入口文件（实例化vue）
		server.entry.js		--服务端的入口文件（实例化vue）
```

### src/main.js

定义vue实例的方法，给`client.entry`和`server.entry`使用

```js
import Vue from 'vue'
import App from './app.vue'
export default function(){
	const app = new Vue({
    //el: "#app", //服务端没有挂载，需要根据情况$mount()
    render: h=>h(App)
  })
  return {app}
}
```

### src/entry/client.entry

创建vue实例，并将实例挂载到app节点

```js
import createApp from '../main.js'
const {app} = createApp()
app.$mount('#app')
```

### src/entry/server.entry

需要导出成一个方法，方法也可以接收一些参数

```js
import createApp from '../main.js'
export default function(){
  const {app} = createApp()
  return app
}
```

###  webpack/webpack.base

根据客户端和服务端构建需要分别配置，也部分公共配置可以抽取出来，在不同的配置可以使用

```js
const VueLoaderPlugin = require('vue-loader')
const path = require('path')
module.export = {
  entry: path.resolve(__dirname,'../src/main.js'),
  output:{
    //根据chunk文件名设置打包后的文件名
    filename: '[name].bundle.js',
    path: path.resolve(__dirname,'../dist'),
    publicPath: '/' //项目打包后资源引用的基础路径
  },
  module:{
    rules:[
      {
        test:/.vue$/,
        use:'vue-loader'
      },
      {
        test:/.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        },
        exclude:/node_modules/
      },
      {
        test:/.css$/,
        use:['vue-style-loader','css-loader']
      }
    ]
  },
  plugins:[
    new VueLoaderPlugin()
  ]
}
```

### webpack/webpack.client

引入`src/entry/client.entry`作为打包构建的入口文件

```js
const {default:merge} require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugins = require('html-webpack-plugin')
const base = require('./webpack.base.js')
module.exports = merge(base,{
  entry:{
    client: path.resolve(__dirname,'../src/entry/client.js')
  },
  plugins:[
    new HtmlWebpackPlugins({
      filename:'index.html',
      template: path.resolve(__dirname,'../public/index.html')
    })
  ]
})
```

### webpack/webpack.server

引入`src/entry/server.entry`作为打包构建的入口文件

```js
const {default:merge} require('webpack-merge')
const path = require('path')
const base = require('./webpack.base.js')
module.exports = merge(base,{
  entry:{
    server: path.resolve(__dirname,'../src/entry/server.entry.js')
  },
  output:{
    //因为vue使用的是esmodule，要使用commonjs规范输出
    libraryTarget: 'commonjs2'
  },
  //打包的目标是node环境
  target: 'node'
})
```



### package.json

在package中设置script

```json
{
  "script":{
    "dev":"webpack-dev-server --config ./webpack/webpack.client.js --mode development",
    "build:client":"webpack --config ./webpack/webpack.client.js --mode production",
    "build:server":"webpack --config ./webpack/webpack.server.js --mode production"
  }
}
```

### index.ssr.html

```html:{8,10}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
		<!--vue-ssr-outlet-->
    <!-- 需要引入打包构建的客户端的js -->
    <script src="/client.bundle.js"></script>
  </body>
</html>

```

### server/index.js

执行`npm run build:server`打包构建后，在服务器中使用该构建

引入`server.bundle.js`

```js:{6,8,11-18}
const express = require('express')
const server = express()
const fs = require('fs')
const {createRenderer} = require('vue-server-renderer')
//引入打包构建好的服务端bundle
const {default:createApp} = require('../dist/server.bundle.js')
//静态资源服务
server.use(express.static(path.resolve(__dirname,'../dist'),{index:false}))
server.get('*',async (req,res)=>{
  try{
    //创建vue实例
  	const app = createApp()
  	//创建vue渲染器
  	const render = createRenderer({
    	template: fs.readFileSync('./index.ssr.html','utf-8')
  	})
  	//利用渲染器将vue实例转化成html字符串
    const html = await render.renderToString(app)
    res.send(html)
  }catch(err){
    console.log(err)
    res.status(500).send('服务器错误')
  }
})
server.listen(8000,()=>{
  console.log('server is running at 8000')
})
```

`node ./server/index.js`启动服务，虽然能正确输出页面内容，但并没有vue特性，需要结合客户端的构建结果才能客户端激活

所谓客户端激活，指的是 Vue 在浏览器端接管由服务端发送的静态 HTML，使其变为由 Vue 管理的动态 DOM 的过程。

### src/app.vue

这里一定要设置vue的挂载点id，否则找不到挂载点

`src/entry/client.entry`中`app.$mount('#app')`的作用就是挂载到**app.vue**

```vue
<template>
	<div id="app">
    
  </div>
</template>
```

## BundleRenderer

在每次编辑过应用程序源代码之后，都必须停止并重启服务。这在开发过程中会影响开发效率。此外，Node.js 本身不支持 source map。

`vue-server-renderer` 提供一个名为 `createBundleRenderer` 的 API，用于处理此问题

### webpack/webpack.client.js

```js:{4,11}
const {default:merge} require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugins = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const base = require('./webpack.base.js')
module.exports = merge(base,{
  entry:{
    client: path.resolve(__dirname,'../src/entry/client.js')
  },
  plugins:[
    new VueSSRClientPlugin()
    new HtmlWebpackPlugins({
      filename:'index.html',
      template: path.resolve(__dirname,'../public/index.html')
    })
  ]
})
```

### webpack/webpack.server.js

```js:{4,16}
const {default:merge} require('webpack-merge')
const path = require('path')
const base = require('./webpack.base.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
module.exports = merge(base,{
  entry:{
    server: path.resolve(__dirname,'../src/entry/server.entry.js')
  },
  output:{
    //因为vue使用的是esmodule，要使用commonjs规范输出
    libraryTarget: 'commonjs2'
  },
  //打包的目标是node环境
  target: 'node',
  plugins:[
    new VueSSRServerPlugin()
  ]
})
```

### server/index.js

```js:{5,7,8,15-18}
const express = require('express')
const server = express()
const fs = require('fs')
//使用createBundleRenderer不再使用createRenderer
const {createBundleRenderer} = require('vue-server-renderer')
//引入打包构建好的json文件
const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')
//这不再需要我们指定引入打包构建的文件去创建vue实例
//const {default:createApp} = require('../dist/server.bundle.js')
server.use(express.static(path.resolve(__dirname,'../dist'),{index:false}))
server.get('*',async (req,res)=>{
  try{
    //第一个参数传入serverBundle
  	const render = createBundleRenderer(serverBundle,{
    	template: fs.readFileSync('./index.ssr.html','utf-8'),
      clientManifest
  	})
    const html = await render.renderToString()
    res.send(html)
  }catch(err){
    console.log(err)
    res.status(500).send('服务器错误')
  }
})
server.listen(8000,()=>{
  console.log('server is running at 8000')
})
```

### index.ssr.html

```html:{8}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
		<!--vue-ssr-outlet-->
    <!-- 不需要手动引入，自动注入 -->
    <!--<script src="/client.bundle.js"></script>-->
  </body>
</html>
```

## 总结

1. 服务端完成vue转换成静态HTML输出给客户端
2. 在客户端vue接管服务端发送的静态HTML，使其变为由vue动态管理，完成客户端激活

## SSR环境搭建步骤总结

1. 导出一个创建vue实例的方法，该方法供客户端和服务端入口文件使用
2. `webpack`配置客户端打包，使用客户端入口文件，入口文件完成**vue实例的挂载**，根据`html-webpack-plugin`的配置挂载到HTML文件中的指定位置
3. `webpack`配置服务端打包，使用服务端入口文件，入口文件是一个创建vue实例的方法，方法**返回vue实例**
4. `express`服务器**引入服务端打包构建的文件（dist/server.bundle.js）**，该文件主要是返回一个创建vue实例的方法，在**服务器中创建vue实例**，使用`vue-server-renderer`的`createRenderer`渲染vue实例
5. 使用`createRenderer`需要指定一个HTML作为SSR渲染模板，HTML需要使用**特定的注释节点**`<!--vue-ssr-outlet-->`，这样就会将vue实例转换成HTML输出到这个位置
6. 完成SSR输出静态HTML到前端后，这时并不能使用vue的特性，需要在SSR渲染模板中手动**引入打包构建好的客户端js文件（dist/client.bundle.js）**和app.vue根组件**设置好挂载点id**才能完成客户端激活，由vue来动态接管
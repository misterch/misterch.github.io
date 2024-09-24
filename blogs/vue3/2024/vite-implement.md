---
title: Vite的实现原理
date: 2024-09-24
categories:
 - vite
tags:
 - 原理
---

## Vite概念

Vite是一个面向现代浏览器的一个更轻、更快的Web应用开发工具

Vite基于ECMAScript标准原生模块系统实现

|       | Vite                                                         | webpack                                                      |
| ----- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| serve | 浏览器请求一个单文件组件，**服务器编译**单文件组件并返回编译结果给浏览器，模块的处理是请求到服务端处理的<br />Vite利用现代浏览器原生支持的ES Module模块化特性，省略打包。对需要编译的文件即时编译，速度非常快（按需编译） | 打包所有模块，当模块太多时会影响打包速度，打包结果储存到内存中，然开开启web服务器，从内存中返回结果给浏览器<br />不管模块是否被使用到都会预先整个项目进行一次打包，编译速度受项目大小影响 |
| HMR   | 立即编译当前所修改的文件                                     | 以这个文件为入口重新build一次，所有涉及的依赖也都会被加载一遍 |
| build | 使用rollup打包，dynamic import可以进行代码切割然后动态导入（只适用现代浏览器） |                                                              |

## Vite的核心功能

### 静态Web服务器

需要一个开启静态web服务器的cli命令行工具，使用Koa进行开发

```json{3}
{
	"name": "vite-cli",
  "main":"index.js",
  "bin": "index.js"
  "dependencies":{
    "koa": "^2.13.0",
    "koa-send": "^5.0.1"
  }
}
```

#### 处理静态文件

```js
!# /usr/bin/env node
const Koa = require('koa')
const send = require('koa-send')
const app = new Koa()
//1.静态文件服务器
app.use(async (ctx,next)=>{
  await send(ctx,ctx.path,{
    // 当前运行node程序的根目录
    root: process.cwd(),
    index:'index.html'
  })
  await next()
})
app.listen(3000)
console.log('server running at http://localhost:3000')
```

在当前cli目录下执行`npm link`将cli注册到全局

在web项目根目录中执行`vite-cli`命令，开启web服务

服务成功开启，但是会发现有些模块文件无法加载编译，例如vue模块。因为浏览器不支持从node_module加载模块，需要服务器来处理好输出给浏览器

#### 修改第三方模块的路径

1. `ctx.body`属性是一个**流**，我们要对字符串进行处理，修改字符串中的路径，需要把流转换成字符串
2. 正则匹配指定路径`/(from\s+['"])(?![\.\/]))/g`，只匹配`from '`、`from "`和`非.`或`非/`开头的路径

```js
//把流转换为字符串
const streamToString = stream => new Promise((resolve,reject)=>{
  //存储buffer
  const chunks = []
  stream.on('data',chunk=>{
    chunks.push(chunk)
  })
  stream.on('end',()=>resolve(Buffer.concat(chunks).toString('utf-8')))
  stream.on('error',reject)
})
//2.修改第三方模块的路径
app.use(async (ctx,next)=>{
  if(ctx.type === 'application/jacascript'){
    //拿到请求的js文件的内容
    const contents = await streamToString(ctx.body)
    //通过正则匹配需要查找并替换的字符串
    ctx.body = contents.replace(/(from\s+['"])(?![\.\/]))/g,'$1/@modules/')
  }
})
```

#### 加载第三方模块

当请求过来后，判断路径是否含有`/@modules/`，是的话从`node_modules`加载模块

**在处理静态文件之前，**创建一个中间件，这个中间件处理当请求的路径是`/@modules/`，修改为`node_modules中对应的文件路径`，然后再交给处理静态文件的中间件

```js
const path = require('path')
//3.加载第三方模块，这一步需要写在静态文件服务器中间件之前
app.use(async (ctx,next)=>{
  //ctx.path --> /@modules/vue
  if(ctx.path.startWith('/@modules/')){
    const moduleName = ctx.path.substr(10)
    const pkgPath = path.join(process.cwd(),'node_modules',moduleName,'package.json')
    // 加载模块的package.json文件
    const pkg = require(pkgPath)
    // 模块的入口文件的路径
    ctx.path = path.join('/node_modules',moduleName,pkg.module)
  }
  // 模块路径修改完，交给处理静态文件中间件
  await next()
})
```

这时在浏览器中已经可以正常请求到JavaScript文件，但对于`.vue`文件和`.css`文件仍然无法请求到

### 编译单文件组件

浏览器无法处理main.js中使用import加载的单文件组件和样式文件，只能处理js文件，对于其他模块都需要服务端处理好。将单文件组件编译成js文件返回给浏览器

1. 第一次请求单文件组件

   如请求App.vue，请求返回的是一个**组件选项对象**

   ```js
   //在中间件1和2之间处理单文件组件
   //读取完静态文件之后处理
   //单文件组件可能含有第三方模块，在处理第三方模块之前处理单文件组件
   //4.处理单文件组件
   const compilerSfc = require('@vue/compiler-sfc')
   const {Readable} = require('stream')
   
   const stringToStream = (str)=>{
     const stream = new Readable()
     stream.push(txt)
     //标识流写完了
     stream.push(null)
     return stream
   }
   app.use(async (ctx,next)=>{
     if(ctx.path.endWith('.vue')){
       //将单文件组件的内容转换成字符串
       const contents = await streamToString(ctx.body)
       const {descriptor} = compilerSfc.parse(contents)
       let code
       //请求中不含type参数的单文件组件
       if(!ctx.query.type){
         code = descriptor.script.content
         code = code.replace(/export\s+default\s+/g,'const __script = ')
         code +=`
           import { render as __render }from "${ctx.path}?type=template
           __script.render = __render
           export default __script
         `
       }
       //将响应头的content-type设置成application/javascript
       ctx.type = 'application/javascript'
       //将字符串转换成流，因为下一个中间件(中间件2)是以流的形式处理的
       ctx.body = stringToStream(code)
     }
     await next()
   })
   ```

   

2. 第二次请求单文件组件的模板渲染函数

   如请求`App.vue?type=template`，请求返回一个render函数，挂载到组件选项对象的render属性中

   ```js
   //处理第二次单文件组件的请求
   if(ctx.query.type==='template'){
     const templateRender = compilerSfc.compilerTemplate({
       source: descriptor.template.content
     })
     code = templateRender.code
   }
   ```

   这时浏览器中请求`App.vue?type=template`已经有内容返回，但仍有一个报错，这个报错的原因是有的模块中使用了只在node环境才的对象，如process对象

   需要在中间件2中处理

   ```js
   //2.修改第三方模块的路径
   app.use(async (ctx,next)=>{
     if(ctx.type === 'application/jacascript'){
       //拿到请求的js文件的内容
       const contents = await streamToString(ctx.body)
       //通过正则匹配需要查找并替换的字符串
       ctx.body = contents
         .replace(/(from\s+['"])(?!\.\/))/g,'$1/@modules/')
       	.replace(/process\.env\.NODE_ENV/g,'"development"')
     }
   })
   ```

## 完整代码

这里只实现了`.vue`模块的加载，对于样式、图片等模块没有处理

```js
!# /usr/bin/env node
const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const compilerSfc = require('@vue/compiler-sfc')
const {Readable} = require('stream')

const app = new Koa()

//把流转换为字符串
const streamToString = stream => new Promise((resolve,reject)=>{
  //存储buffer
  const chunks = []
  stream.on('data',chunk=>{
    chunks.push(chunk)
  })
  stream.on('end',()=>resolve(Buffer.concat(chunks).toString('utf-8')))
  stream.on('error',reject)
})

//3.加载第三方模块，这一步需要写在静态文件服务器中间件之前
app.use(async (ctx,next)=>{
  //ctx.path --> /@modules/vue
  if(ctx.path.startWith('/@modules/')){
    const moduleName = ctx.path.substr(10)
    const pkgPath = path.join(process.cwd(),'node_modules',moduleName,'package.json')
    // 加载模块的package.json文件
    const pkg = require(pkgPath)
    // 模块的入口文件的路径
    ctx.path = path.join('/node_modules',moduleName,pkg.module)
  }
  // 模块路径修改完，交给处理静态文件中间件
  await next()
})
//1.静态文件服务器
app.use(async (ctx,next)=>{
  await send(ctx,ctx.path,{
    // 当前运行node程序的根目录
    root: process.cwd(),
    index:'index.html'
  })
  await next()
})

//在中间件1和2之间处理单文件组件
//读取完静态文件之后处理
//单文件组件可能含有第三方模块，在处理第三方模块之前处理单文件组件
//4.处理单文件组件
const stringToStream = (str)=>{
  const stream = new Readable()
  stream.push(txt)
  //标识流写完了
  stream.push(null)
  return stream
}
app.use(async (ctx,next)=>{
  if(ctx.path.endWith('.vue')){
    //将单文件组件的内容转换成字符串
    const contents = await streamToString(ctx.body)
    const {descriptor} = compilerSfc.parse(contents)
    let code
    //请求中不含type参数的单文件组件
    if(!ctx.query.type){
      code = descriptor.script.content
      code = code.replace(/export\s+default\s+/g,'const __script = ')
      code +=`
        import { render as __render }from "${ctx.path}?type=template
        __script.render = __render
        export default __script
      `
    }else if(ctx.query.type==='template'){
      const templateRender = compilerSfc.compilerTemplate({
        source: descriptor.template.content
      })
      code = templateRender.code
    }
    //将响应头的content-type设置成application/javascript
    ctx.type = 'application/javascript'
    //将字符串转换成流，因为下一个中间件(中间件2)是以流的形式处理的
    ctx.body = stringToStream(code)
  }
  await next()
})

//2.修改第三方模块的路径
app.use(async (ctx,next)=>{
  if(ctx.type === 'application/jacascript'){
    //拿到请求的js文件的内容
    const contents = await streamToString(ctx.body)
    //通过正则匹配需要查找并替换的字符串
    ctx.body = contents
      .replace(/(from\s+['"])(?!\.\/))/g,'$1/@modules/')
    	.replace(/process\.env\.NODE_ENV/g,'"development"')
  }
})
app.listen(3000)
console.log('server running at http://localhost:3000')
```


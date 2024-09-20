---
title: 免费部署平台（可CI/CD）
date: 2024-07-17
tags:
 - CI/CD
 - 部署
---

## GitHub Pages

> 前提需要有一个GitHub账号
>
> 只能托管静态项目

1. 新建一个仓库

   - 仓库名称为`[用户名].github.io`，则访问路径为`用户名.github.io`，没有子路径
   - 仓库名称并非用户名，则访问路径为`用户名.github.io/仓库名称`

2. 项目仓库——settings——pages

   - 选择需要作为github pages的分支，以后访问的就是该分支里的静态页面
   - 一般github page的分支是`gh-pages`，配置成这个分支就好

3. 个人--settings--生成一个token

   - 生成的这个token可以拥有设置的权限，例如可以访问仓库
   - 生成的token需要复制下来，因为只会显示一次
   - 在项目仓库——settings——secrets新增ACCESS_TOKEN变量，值为生成的token

4. 在项目中创建`.github/workflows/deploy.yml`

   - 这是持续集成的配置文件，当push（提交）修改到仓库，就会自动执行构建任务并，完成以后就看见更新后的页面，而且这个是临时的系统，构建完毕就会销毁，所以只能构建成静态页面

   - ```yml
     name: GitHub Actions Build and Deploy Demoname
     on:
     	# 上传代码到仓库触发push钩子
     	push:
     		branches:
     			# 只对master分支的代码起效
     			- master
     # 触发push后执行的任务
     jobs:
     	# 任务名称
     	build-and-deploy:
     		runs-on: ubuntu-latest
     		# 步骤
     		steps:
     			# 步骤名称
     		- name: Checkout
     			# 使用的action，把项目拉取下来
     			uses: actions/checkout@master
     		- name: Build and Deploy
     			# 这个action是构建项目
     			uses:JamesIves/github-pages-deploy-action@master
     			# 配置构建项目的环境参数
     			env:
     				# 这个变量是通过在项目settings--secrets中配置，ACCESS_TOKEN就是生成的token
     				ACCESS TOKEN: ${{ secrets.ACCESS_TOKEN }}
     				# 把项目构建完成后push到这个分支
     				BRANCH: gh-pages
     				FOLDER: dist
     				BUILD SCRIPT: npm install && npm run build
     ```

5. 配置项目的`publicPath`，根据实际页面访问路径配置

   - 如果github pages直接通过域名就可以访问得到仓库页面，则publicPath为'/'

   - 如果github pages配置的是域名下的子路径，则publicPath为'/子路径'

   - ```js
     // vue.config.js
     module.exports = {
       publicPath: process.env.NODE_ENV === 'production' ? '/github仓库名称' : '/'
     }
     ```

6. 完成项目，提交到仓库

   - github就会根据`.github/workflows/deploy.yml`的配置来执行构建
   - 构建完成，可通过github给的域名访问生成的静态站点

## Vercel

> 可以部署静态页面，nuxt、next和Node等开发的项目，serverless（Faas）

1. 全局安装vercel

   ```bash
   yarn global add vercel
   ```

2. 创建配置文件now.json或者vercel.json

   ```json
   {
     "version": 2,
     "builds":[
       {
         "src": "nuxt.config.js",
         "use":"@nuxtjs/now-builder"
       }
     ]
   }
   ```

3. .nowignore

   nuxt构建的文件（.nuxt）要忽略上传到vercel

4. 发布

   登录vercel，如果通过github登录，那么就通过github的邮箱接收邮件登录

   `vercel`或者 `vercel --prod`进行发布

## Serverless 

- Serverless是一种架构模式，无服务器架构

  对于使用Serverless架构进行开发的项目，开发者最明显的感受就是更关注应用的业务本身，不必再过多去关心服务器和运行平台的一系列问题

- 无服务器，并不是真的没有服务器，只是开发人员眼中不需要关注服务器。开发人员只需要按照一定的要求完成开发工作，剩下的所有事情全部交给Serverless容器完成

- 我们的引用主要由两大块组成，分别是逻辑与存储。Serverless中就通过两种方式解决了这两块的需求

  - 函数即服务（Faas）
  - 后端即服务（Baas）

- Serverless的优势

  - 不需要再考虑物理机/虚拟机，结合工作流的情况下，代码提交自动部署，直接运行
  - 没有服务器，维护成本自然大大降低，安全性稳定性更高
  - 都是弹性伸缩云，硬件资源需要多少分配多少，不用担心性能问题
  - 大多数Serverless服务商的计价方式都是按使用情况来收费

### Vercel Serverless

支持多种语言的**云函数**，每个云函数就是一个接口

```js
//使用node编写云函数
// hello.js
module.exports = (req,res) => {
  const {name = "World"} = req.query
  res.status(200).send(`Hello ${name}`)
}
```

通过服务端渲染html模板

```js
import axios from 'axios'
module.exports = async (req,res) => {
  const {data} = await axios.get('https://xxx.io/api/tags')
  let html = '<ul>'
  data.tags.forEach(item=>{
    html+=`<li>${item}</li>`
  })
  html+='</ul>'
  res.status(200).send(html)
}
```

无数据库，可以使用json文件来储存数据

使用`json-server`可以操作json文件的增删，`json-server`可以当工具（命令行）或者模块（代码中）使用

```json
// db.json
{
  "posts":[
    {"id":1,"title":"标题","author":"ben"}
  ],
  "comments":[
    {"id"：1,"content":"some comments","postId":1}
  ],
  "profile":{"name":"kjjkh"}
}
```

通过命令行

```bash
json-server --watch db.json
```

这样就会创建3个接口

```
http://localhost:3000/posts
http://localhost:3000/comments
http://localhost:3000/profile
```

通过模块来使用

```js
const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname,'../db.json'))
const middlewares = jsonServer.default()

server.use(middlewares)
server.use(router)
module.export = server
```

`now.json`或者`vercel.json`配置路由

```json
{
  "version": 2,
  "routes":[
    // src就是访问的api规则，dest就是将匹配到的api转发到server.js文件中
    {"src":"/api/server/(.*)","dest":"/api/server.js"}
  ]
}
```

本地调试

```bash
vercel dev
```


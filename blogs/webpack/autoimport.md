---
title: 自动化导入组件和路由
date: 2023-07-31
categories:
 - vue
 - webpack
tags:
 - 自动化
---
## require.context()

`require.context`是一个`webpack`的API,`require.context`函数获取一个特定的上下文,通过此方法实现**自动化导入模块**。

### 使用场景

`Vue`在使用高频组件的时候，每次在需要用到该组件的页面都要`import`一次，这样的操作显然是不优雅的。

利用`require.context`自动化全局注册组件，页面再也不用`import`组件就能够使用

## 分析require.context

语法：

```javascript
require.context(directory, useSubdirectories = true, regExp = /^\.\/.*$/);
```

方法接收3个参数

*   directory {String} -读取文件的路径
*   useSubdirectories {Boolean} -是否遍历文件的子目录
*   regExp {RegExp} -匹配文件的正则

```javascript
const requireComponent = require.context('./components/App',false,/\.vue$/)

// keys方法返回一个匹配文件的文件名组成的数组 ['./nav.vue','./tab.vue']
requireComponent.keys().forEach(key=>{
  console.log(requireComponent(key)) // 返回一个模块，这个模块就是真正需要的
  console.log(requireComponent.id) // ./src/components/App sync \.vue$
  console.log(requireComponent.resolve(key)) // ./src/components/App/nav.vue
  console.log(key) // ./nav.vue
})
```

返回一个带一个参数的函数，函数有三个属性（resolve,keys,id）

*   resolve {Function} -接受一个参数request,request为components文件夹下面匹配文件的相对路径,返回这个匹配文件相对于整个工程的相对路径
*   keys {Function} -返回匹配成功模块的名字组成的数组
*   id {String} -执行环境的id,返回的是一个字符串,主要用在module.hot.accept,应该是热加载?

`requireComponent(req)`函数接收一个参数，这个参数就是文件的相对路径，执行函数返回一个模块，读取模块的内容

## 自动化注册组件全局使用

```javascript
// 一个实现前端工程自动化，全局自动引入高频组件的插件
// 因为是一个插件，需要用到vue.use()注册
import Vue from 'vue'

// 首字母大写的方法
function changeStr(str){
  return str.charAt(0).toUpperCase()+str.slice(1)
}
/**
 * require.context是webpack提供的方法
 * 参数1：directory {String} -读取文件的路径
 * 参数2：useSubdirectories {Boolean} -是否遍历文件的子目录
 * 参数3：regExp {RegExp} -匹配文件的正则
 */
const requireComponent = require.context('./',false,/\.vue$/)

// 这是一个vue的插件，使用vue.use()注册插件，必须提供一个install方法
const install = vue => {
  requireComponent.keys().forEach(fileName=>{
    // 获取每个组件的配置
    let compConfig = requireComponent(fileName)
    let compName = changeStr(fileName.replace(/^\.\//,'').replace(/\.\w+$/,''))
    // 引入组件
    Vue.component(compName,compConfig.default || compConfig)
  })
}

export default {
  install
}
```

## 自动化导入路由文件

如果是一个庞大的项目，为了更好地管理路由文件，一般将路由分层处理，再将路由文件import使用

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const requireRoutes = require.context('./routes', false, /route\.js$/)
const routeMap = requireRoutes.keys().map(route => {
  return requireRoutes(route).default
})

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  ...routeMap
]
const router = new VueRouter({
  routes
})

export default router
```

```javascript
// mine.route.js
export default {
  path:'/mine',
  name:'Mine',
  component: ()=> import('../../views/mine/layout'),
  children:[
    {
      path: '',
      component:()=>import('../../views/mine')
    },
    {
      path: 'collect',
      component:()=>import('../../views/mine/collect')
    },
    {
      path: 'order',
      component:()=>import('../../views/mine/order')
    },
    {
      path: 'order/:id',
      component:()=>import('../../views/mine/order/detail')
    }
  ]
}
```


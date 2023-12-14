---
title: 【webpack核心】编译结果分析
date: 2023-12-13
categories:
 - webpack
tags:
 - 核心原理
---

## 以对象方式构建模块

webpack将每个模块构建成一个modules对象，key表示模块的路径，value表示模块内的内容，是一个函数

```js
var modules = {
  "./src/a.js":function(module,exports){
    console.log('module a')
    module.exports = 'a'
  },
  "./src/index.js":function(module,exports,require){
    console.log('index module')
    var a = require('./src/a.js')
  }
}
```

那么`module`，`exports`，`require`是从哪里来的呢？

这样定义的modules不是污染全局吗？

## 解决全局污染

有了这个`modules`对象，就可以传递给执行这些模块的函数了。

这个函数是一个IIFE函数，避免了全局污染问题

将`modules`对象不使用变量，直接将其以参数传入，也解决了污染全局问题

`module`，`exports`，`require`就是在立即执行函数中实现

```js
(function(modules){
  var moduleExports = {}//用于缓存模块的导出结果
  function require(moduleId){
    if(moduleExports[moduleId]){
      return moduleExports[moduleId]
    }
    var func = modules[moduleId]
    var module = {
      exports: {},
    }
    //运行模块
    func(module,module.exports,require)
    //得到模块的导出结果
    var result = module.exports
    moduleExports[moduleId] = result
    return result
  }
  //执行入口模块
  require('./src/index.js')
})({
  "./src/a.js":function(module,exports){
    console.log('module a')
    module.exports = 'a'
  },
  "./src/index.js":function(module,exports,require){
    console.log('index module')
    var a = require('./src/a.js')
    console.log(a)
  }
})
```

## 编译结果中的eval

> 原因：方便调试，因为在浏览器中eval函数的执行环境有别于正常的执行环境，eval函数中所写的代码如果出现报错，就可以在这个eval的执行环境中调试

```js
var a = '1'
var b = 2
eval("var d = null;\nd.abc();")
```

浏览器执行这段代码时报错，因为d没有abc函数
可以在浏览器中查看出错位置的源代码，是这样的

```js
var d = null;
d.abc();
```

代码中不存在`var a = '1';var b=2`

```js
eval("var d = null;\nd.abc();//# sourceURL=./src/a/js")
```

`//# sourceURL=./src/a/js`告诉浏览器源代码所在位置，方便开发者定位到代码所在文件
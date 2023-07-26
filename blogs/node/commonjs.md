---
title: CommonJS规范的原理
date: 2023-07-26
tags:
 - node
 - 原理
 - commonjs
---

```js
console.log(arguments)
//使用node执行该文件
//[exports,require,module,__filename,__dirname]
```

打印出来的三个参数分别是

1. `exports`对象，即`exports = module.exports = {}`
2. `require`方法
3. `module`对象，包含`exports`,`filename`,`path`,`paths`等属性
4. `__firename`当前文件的绝对路径
5. `__dirname`当前文件所在的目录

`commonjs`将模块的代码包装成**IIFE**(立即执行函数)，这样可以起到**隔离作用域**效果

```js
(function(exports,require,module,__filename,__dirname){
	//我在模块文件中写的代码
})()
```


---
title: Common.js和ESM对导入模块的修改是否影响原模块
date: 2024-11-20
categories:
 - 面试
tags:
 - 模块化
---

## Common.js

### 基本数据类型

```js
// a.js
let {count} = require('./b.js')
let b = require('./b.js')
console.log('a---load',count)
count=22
b.num2 = 33
console.log('a---modifiy-count,a的修改是否会影响b导出count的值',count)
console.log('在b对象新增属性',b)
setTimeout(()=>{
  console.log('观察b文件修改count是否影响a导入count的值',count)
  console.log('b文件修改输出--modify',b)
},1500)

// b.js
let count = 0,num=11
setTimeout(()=>{
  count++
  module.exports.num = num
  module.exports.count = count
  console.log('b---modify-count',count)
},1000)
module.exports = {
  count
}

```

#### 结果

```
a---load 0
a---modifiy-count,a的修改是否会影响b导出count的值 22
输出对象--load { count: 0, num2: 33 }
b---modify-count 1
观察b修改count是否影响a导入count的值 22
输出对象--modify { count: 1, num2: 33, num: 11 }
```

对于基本数据类型，无论在导出位置修改导出值还是在导入位置修改导入值，都不会影响到两个文件中导出导入值的变化

#### 结论

在Common.js中，导出的是`module.exports`，导入的是变量赋值。当`module.exports`的值是字符串、数字等原始数据类型时，赋值是值拷贝，所以无论在哪里修改都不会影响到其他地方导入该值的改变

### 引用数据类型

## ESM

## 结论

Common.js导出的是module.exports对象，Common.js的导入就是变量赋值，当module.exports的值是字符串、数字等原始数据类型时，赋值是值拷贝，所以才会产生修改导出的值不会导致

## 参考

[commonjs的导出是值拷贝吗?近期学习nodejs时，我发现不少网上比较commonjs和esmodule不同之处的 - 掘金](https://juejin.cn/post/6844904052841512973?from=search-suggest)

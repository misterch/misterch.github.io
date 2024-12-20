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

在Common.js中，导出的是`module.exports`，导入的是变量赋值。当`module.exports`的值是字符串、数字等原始数据类型时，赋值是**值拷贝**，所以无论在哪里修改都**不会影响**到其他地方导入该值的改变

### 引用数据类型

```js
// a.js
const objM = require('./b.js')
require('./c.js')
let {obj,changeName} = require('./b.js')

console.log('a模块--obj',obj)
changeName('ken')
obj.age = 222
console.log('a模块-obj-update',obj)
console.log('a模块-objM-update',objM.obj)

// b.js
let obj = {
  name:'ben',
  age:20
}
function changeName(name){
  obj.name = name
  console.log('changeName',obj)
}

const constant = 'hello'
module.exports = {
  obj,
  changeName
}

// c.js
const objM = require('./b.js')
setTimeout(() => {
  console.log('c---module',objM)
  console.log('c---module---基本数据类型',objM.constant)
}, 1500);
```

#### 结果

```
a模块--obj { name: 'ben', age: 20 }
changeName { name: 'ken', age: 20 }
a模块-obj-update { name: 'ken', age: 222 }
a模块-objM-update { name: 'ken', age: 222 }
c---module {
  obj: { name: 'ken', age: 222 },
  changeName: [Function: changeName],
  constant: 'hello'
}
```

#### 结论

在Common.js中，如果导出的引用数据类型，导入的是该数据的**引用**，无论在该对象所在的模块还是在导入该对象的模块修改引用数据类型中的数据，都会对别处**导入该对象的模块产生影响**

## ESM

```js
//a.js
import bModule,{b,modify} from './b.js'
import './c.js'
console.log('a模块--before',bModule.a,b)
modify(11,22)
console.log('a模块--after',bModule.a,b)
setTimeout(()=>{
  bModule.a='a模块修改了b导出的对象的属性a'
  console.log('a模块--修改bModule对象的a属性',bModule.a)
},500)


//b.js
let a = 1
export let b = 2
a=111
export default {
  a
}
export const modify = (value1,value2)=>{
  a=value1
  b=value2
}
setTimeout(()=>{
  modify(11,22)
},1000)

//c.js
import bModule,{b} from './b.js'
setTimeout(()=>{
  console.log('c模块---bModule',bModule,b)
},2000)
```

### 结果

```
a模块--before 111 2
a模块--after 111 22
a模块--修改bModule对象的a属性 a模块修改了b导出的对象的属性a
c模块---bModule a模块修改了b导出的对象的属性a 22
```

### 结论

1. `export`或`export default`的任何类型的数据，`import`后都**不可重新赋值**，数据是`只读`的
2. `export default`导出的是一个**对象的引用**，**任何模块可修改这个对象**，**导入该值使用时也会发生改变**
3. `export`基本数据类型，因为数据是只读的，只能通过导出该数据的模块中进行修改，可通过导出一个修改该数据的方法来修改基本数据类型。与common.js不同，修改后其他模块导入该数据也会改变
4. 无论基本数据类型还是引用数据类型，导出的值发生改变，其他模块导入该值使用时也会发生改变

## 总结

Common.js导出的是`module.exports`对象，Common.js的导入就是变量赋值，当`module.exports`的值是字符串、数字等原始数据类型时，赋值是值拷贝，所以才会产生修改导出的值不会导致

Common.js导出的值是对象时，导入的是对象的引用，无论哪个模块修改该对象，使用该对象的模块的数据也会发生改变

`export`导出的所有数据都是**只读**的

修改`export`导出的数据，如基本数据类型，可以通过导出一个方法来修改

`export default`导出的是一个**对象的引用**，可以对引用对象进行修改，但不能重新赋值

`export`导出的数据发生改变（无论基本数据类型还是引用数据类型），其他模块`import`数据使用时也会发生改变

## 参考

[commonjs的导出是值拷贝吗?近期学习nodejs时，我发现不少网上比较commonjs和esmodule不同之处的 - 掘金](https://juejin.cn/post/6844904052841512973?from=search-suggest)

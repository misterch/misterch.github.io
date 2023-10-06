---
title: 函数柯里化
date: 2023-10-05
tags:
 - 原理
categories:
 - javascript
---

## 什么是柯里化

把接受**多个参数的函数**变换成接受一个**单一参数**（最初函数的第一个参数）的函数，并且返回一个新的函数的技术，新函数**接受余下参数并返回运算结果**。

## 作用

**固定某些参数**，得到一个接收余下参数的函数

这样可以给我们带来这些

1. 参数复用，让我们少些部分重复的参数
2. 延迟执行，得到函数后，执行的是几点可以由我们决定

## 函数柯里化的实现

```js
//固定参数
function fixParamCurry(fn){
  //获取除了fn以外的所有参数
  let args = Array.prototype.slice.call(arguments,1)
  return function(){
    //调用传入的函数，并将调用fixParamCurry时传入的参数和调用fn传入的参数结合传入fn函数
    return fn.apply(this,args.concat(Array.prototype.slice.call(arguments,0)))
  }
}

function curry(fn,length){
  length = length || fn.length
  return function(){
    //传入的参数没有达到fn所需的参数数量
    if(arguments.length<length){
      //[fn,arg1,arg2,...]
  		const combine = [fn].concat(Array.prototype.slice.call(arguments,0))
      //调用fixParamCurry返回一个已经【固定部分参数】的函数
      return curry(fixParamCurry.apply(this,combine),length - arguments.length)
    }else{
      //已经达到fn所需的参数数量
      return fn.apply(this,arguments)
    }
  }
}

```



## 应用

### 参数复用

固定部分总是重复的参数

```js
function ajax(method,url,data){
  console.log(method,url,data)
}

const ajaxCurry = curry(ajax)
const postAjax = ajaxCurry('post')
const postServerAAjax = postAjax('http://www.serverA.com')
const postServerBAjax = postAjax('http://www.serverB.com')

postServerAAjax({name:'ben',age:'22'})
```

### bind函数

`bind` 函数就是一个很典型的柯里化使用场景，让我们先看一下 `bind` 的简单使用。

```js
const obj = { name: 'Alice' };
function sayHello(a,b) {  
    console.log(a)
    console.log(b)
    console.log(`Hello, ${this.name}`);
}
const boundFunc = sayHello.bind(obj, 1);
boundFunc(2); 
// 输出：
// 1
// 2
// Hello, Alice

```



## 优点

- 函数更加灵活和可重用。通过柯里化，可以将一个多参数的函数转换为一系列单参数的函数，使函数更加灵活和可重用。
- 可以**避免重复的代码**。通过柯里化，可以避免在调用函数时重复地传递参数，从而避免了重复的代码。

## 缺点

- 可能会降低性能。通过柯里化，函数的性能可能会降低，因为需要额外的内存来存储函数的返回值和参数。
- 可能会增加代码复杂度。通过柯里化，可能会增加代码的复杂度，因为需要处理额外的参数和函数返回值。
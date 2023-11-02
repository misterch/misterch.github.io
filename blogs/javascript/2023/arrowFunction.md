---
title: 箭头函数
date: 2023-11-02
categories: 
 - javascript
 - ecmascript
 - 面试
tags:
 - this
 - 原理
---

## this指向

- 通过对象调用函数，`this`指向对象
- 直接调用函数，`this`指向全局对象
- 如果通过`new`调用函数，`this`指向新创建的对象
- 如果通过`apply`、`call`、`bind`调用函数，`this`指向指定的对象
- 如果是DOM事件函数，`this`指向事件源

```js
const obj = {
  count:0,
  increase(){
    //obj调用increase，this指向obj
    console.log(this) // obj
    const _this = this
    setInterval(function(){
      //这个函数并非由obj调用，直接由js引擎调用，this指向全局
      console.log(this) // undefined
      _this.count++
    },1000)
  }
}
```

## 箭头函数语法

箭头函数是一个**函数表达式**，理论上，任何使用函数表达式的场景都可以使用箭头函数

## 注意细节

:::tip

1. 箭头函数的函数体中的`this`，取决于箭头函数**定义时的位置**的`this`指向，即定义**该函数时所在的作用域指向的对象**，与如何调用无关

2. 实际上，箭头函数不存在`this`，也不存在`arguments`、`new.target`，如果使用了这些属性，则使用的是箭头函数外层函数对象的`this`、`arguments`、`new.target`
3. 箭头函数没有原型
4. 箭头函数不能作为构造函数使用

:::

1. 在函数中使用箭头箭头函数 ，箭头函数中的this指向箭头函数外的函数中的this，arguments也是使用箭头函数外的函数的arguments

```js
const obj = {
  count:0,
  increase(){
    const increaseArgs = arguments
    setInterval(()=>{
      //箭头函数没有this，这里使用this取决于箭头函数定义时的位置的this指向，即这个箭头函数是在increase函数中定义，increase函数的this指向obj，箭头函数中使用的this就指向obj
      this.count++ // 1
      console.log(increaseArgs === arguments) //true
    },1000)
  }
}
```

在对象中使用箭头函数定义方法，箭头函数的函数体的this指向定义这个对象所在的作用域指向的对象，即this并非指向对象本身，而是指向这个对象所处的作用域的对象

```js
const obj = {
  count:0,
  increase:()=>{
    //箭头函数中的this指向obj所处的作用域的对象，这里是window
    console.log(this)//window
  }
}
```

:::tip

在对象中定义的方法**不能**使用箭头函数

:::

## 应用场景

1. 临时性使用的函数，如：事件处理函数，异步处理函数等等临时性函数
2. 为了绑定箭头函数外层函数的this
3. 在不影响其他代码的情况下，保持代码的简洁，如：数组方法中的回调函数回调函数
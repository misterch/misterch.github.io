---
title: 单例模式-创造型模式
date: 2023-11-08
categories:
 - 设计模式
---

## 定义

保证一个类仅有一个实例，并提供一个访问他的全局访问点

目的：节省资源

## 实现1

将单例挂载到构造函数的静态属性上

```js
function Singleton(name){
  if(typeof Singleton.instance === 'object'){
    return Singleton.instance
  }
  Singleton.instance = this
}
const ben = new Singleton('ben')
const ken = new Singleton('ken')
ben===ken //true ben.name === ken.name === 'ben'

// 实例被重置了
Singleton.instance = {}
const may = new Singleton('may')
```

缺点：不符合开闭原则，轻易被外部修改函数内部的功能

## 实现2

利用闭包将函数重新指向一个新的函数，新的函数返回闭包保存的第一次实例化的对象

```js
function Singleton(name){
  let instance = this
  this.name = name
  Singleton = function(){
    return instance
  }
}

const ben = new Singleton('ben')
const ken = new Singleton('ken')
Singleton.prototype.say=function(){
  console.log(this.name)
}

ben.say() // say is not a function
```

缺点：失去原型的意义，原来的构造函数在第一次实例化的时候被重新修改为另一个函数，该函数返回的是instance对象

## 最佳实现

关键：闭包，IIFE

优点：符合开闭原则

### 实现一个单例模式的函数

```js
var Singleton = (function(){
  let instance
  //返回一个构造函数
  return function(name){
    if(typeof instance === 'object'){
      return instance
    }
    instance = this
  	this.name = name
  }
})()
```

### 返回一个单例模式函数

将一个普通函数作为参数传入一个函数，返回一个单例模式函数

```js
function createAlert(text){
  const oDiv = document.createElement('div')
  oDiv.style.display = 'none'
  oDiv.innerText = text
  document.body.appendChild(oDiv)
  return oDiv
}

function getSingleton(fn){
  let result
  return function(){
    if(!result){
      result = fn.apply(this,arguments)
    }
    return result
  }
}

const singleAlert = getSingleton(createAlert)
singleAlert('hello')
```


---
title: defineProperty实现数据响应式
date: 2024-09-20
categories:
 - vue
 - 面试
tags:
 - 核心原理
---

## propertyResponse实现数据拦截

传递两个参数，分别是需要监听的对象和监听对象的属性

```js
function propertyResponse(obj,key){
  let val = obj[key]
  Object.defineProperty(obj,key,{
    get(){
      // 在获取对象属性时收集依赖
      return val
    },
    set(_val){
      // 在设置属性时执行收集的依赖
      val = _val
    }
  })
}
```

当访问`get`对象某个属性时需要`收集依赖`，设置`set`某个对象属性时触发`收集依赖`

## 依赖收集

在`get`中`收集函数`，称为依赖收集，意思是`收集依赖该属性的函数`

`依赖`就是`函数中用到了对象的哪些属性`，那么就称为函数依赖于哪些属性

与之相对应的是`派发更新`，就是`将收集的函数重新执行一遍`



```js
function propertyResponse(obj,key){
  let val = obj[key]
  let dep = new Dep()
  Object.defineProperty(obj,key,{
    get(){
      // 在获取对象属性时收集依赖
      dep.depend()
      return val
    },
    set(_val){
      // 在设置属性时执行收集的依赖
      val = _val
      dep.notify()
    }
  })
}

// 监听器，监听一个对象的所有属性和子属性
class Observer{
  constructor(obj){
    this.data = obj
    if(!Array.isArray(this.data)){
      this.walk()
    }
  }
  walk(){
    for(let key in this.data){
      propertyResponse(this.data,key)
    }
  }
}

// 依赖收集，收集的是一个个watcher，watcher中存放的副作用函数，当监听的属性变化时执行watcher
class Dep {
  constructor(){
    this.subs = new Set()
  }
  addSub(sub){
    this.subs.add(sub)
  }
  // 将window.target收集近集合中，target中存放的就是watcher
  depend(){
    if(globalThis.target){
      this.addSub(globalThis.target)
    }
  }
  // 触发收集到的所有依赖，触发的是watcher的update方法，以触发副作用函数
  notify(){
    for(let sub of this.subs){
      sub.update()
    }
  }
}

// 观察器，window.target中存放的就是观察器
class Watcher{
  constructor(fn,vm,...args){
    this.fn = fn
    this.vm = vm
    this.args = args
    globalThis.target = this
    fn.call(this.vm,this.args)
    globalThis.target = null
  }
  update(){
    this.fn.call(this.vm,this.args)
  }
}

const obj = {
  name:'ben',
  age:22
}
new Observer(obj)
function sayName(){
  console.log('hello,my name is ' + obj.name)
}
function sayAge(){
  console.log('hello,my age is ' + obj.age)
}
new Watcher(sayName)
new Watcher(sayAge)
obj.name = 'benjjj'
obj.age = 22
```

## 参考

[js通过Object.defineProperty实现数据响应式_defineproperty 响应式-CSDN博客](https://blog.csdn.net/qq_46244470/article/details/136047244)

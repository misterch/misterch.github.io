---
title: 观察者模式
date: 2023-11-20
categories: 
 - 设计模式
---

## 定义

定义对象间的一种**一对多**的依赖关系，当一个对象的状态发生变化时，所有依赖于它的对象都将得到通知

在DOM节点上绑定的事件函数，就是观察者模式的应用

## 实现

```js
function Event(){
  this.queue = {}
}

Event.prototype.on = function(event,handler){
  if(!this.queue[event]){
    this.queue[event]=[handler]
  }else{
    this.queue[event].push(handler)
  }
}
Event.prototype.emit = function(){
  const eventList = this.queue[arguments[0]]
  const args = [].slice.call(arguments,1)
  eventList.forEach(handler=>{
    handler.apply(this,args)
  })
}
Event.prototype.remove = function(event,handler){
  this.queue[event].filter(cb=>cb!==handler)
}
Event.prototype.empty = function(event){
  this.queue[event] = []
}


const test = new Event()
test.on('message',(msg)=>{
  console.log(msg)
})
test.emit('message','hello')
```


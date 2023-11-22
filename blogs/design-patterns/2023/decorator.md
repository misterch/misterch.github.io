---
title: 装饰者模式
date: 2023-11-18
categories:
 - 设计模式
---

## 定义

在不改变元对象的基础上，通过对其进行包装扩展（添加属性或者方法）

在不改变对象的自身基础上，在程序**运行期间**给对象**动态添加**职责。与继承相比，装饰者是一种更加轻便灵活的做法。可以当脚本运行时，在子类中增加行为会影响原有类所有的实例，给不同对象各自添加新行为和属性

### 实现

构造函数需要**一个装饰资源池**，提供相应的装饰方法，提供添加装饰方法的方法

```js
function PlaneFactory(){
  this.decorateQueue = []
}
// ...省略其他代码

//集合所有装饰方法
PlaneFactory.prototype.decorators = {
  eatOneLife(obj){
    obj.blood += 100
  },
  eatTwoLife(){
    obj.blood += 200
  },
  eatShrinkLife(){
    obj.blood -= 100
  }
}
//收集对某个对象的装饰描述
PlaneFactory.prototype.decorate = function(decorator){
  if(this.decorators[decorator]){
    this.decorateQueue.push(this.decorators[decorator])
  }
}
//让装饰方法作用在该对象身上  
PlaneFactory.prototype.update = function(){ 
	this.decorateQueue.forEach(decotator=>{
    decotator(this)
  })
}

const oSp = PlaneFactory.create('SmallPlane')
oSp.decorate('eatOneLife')
oSp.update()
```


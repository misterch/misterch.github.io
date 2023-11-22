---
title: 工厂模式
date: 2023-11-14
categories:
 - 设计模式
---

## 工厂模式

### 定义

 工厂模式定义创建对象的接口，但是让子类去正真地实例化。也就是工厂方法将类的实例化延迟到子类

### 优点

1. 工厂类集中了所有对象的创建，便于对象创建的统一管理
2. 对象的使用者仅仅是使用产品，实现了单一职责
3. 便于扩展，如果新增了一种业务，只需要增加相关的业务对象类和工厂类中的生产业务对象的方法，不需要修改其他的地方（违反了开闭原则）

```js
function SmallPlane(){
  this.blood=100
  this.name = 'SmallPlane'
  this.touch = function(){
    this.blood -= 50
    if(this.blood<=0){
      console.log('dead')
    }
  }
}
function BigPlane(){
  this.blood=200
  this.name = 'BigPlane'
  this.touch = function(){
    this.blood -= 50
    if(this.blood<=0){
      console.log('dead')
    }
  }
}

//创建一个工厂函数，用来实例化子类
function PlaneFactory(type){
  let newPlane
  switch(type){
    case 'SmallPlane':
      newPlane = new SmallPlane()
      break
    case 'BigPlane':
      newPlane = new BigPlane()
      break
  }
  newPlane.die = function(){
    console.log('boom!!')
  }
  return newPlane
}


const bigPlane = PlaneFactory('BigPlane')
```



## 工厂方法模式

### 定义

不再有一个唯一的工厂类去创建产品，而是将不同的产品交给对应的工厂子类去实现。每个产品有负责生产的子工厂来创造。如果添加新的产品，需要做的是添加新的子工厂和产品，而不需要修改其他的工厂代码

### 组成

1. 抽象工厂类：负责定义创建产品的公共接口
2. 产品子工厂：继承抽象工厂类，实现抽象工厂类提供的接口
3. 每一种产品有各自的产品类

### 实现

```js
//抽象工厂，提供公共接口
function PlaneFactory(){
  
}

//创建子类工厂的方法
PlaneFactory.create = function(type){
  if(!PlaneFactory.prototype[type]){
    throw `不存在${type}类型`
  }
  //继承抽象工厂类
  if(PlaneFactory.prototype[type].prototype.__proto__ !== PlaneFactory.prototype){
    PlaneFactory.prototype[type].prototype = new PlaneFactory()
  }
  //产品类需要的参数
  const args = [].slice.call(arguments,1)
  return new PlaneFactory.prototype[type](...args)
} 
//抽象工厂公共接口
PlaneFactory.prototype.touch = function(){
  this.blood-=50
  if(this.blood<=0){
    this.die()
  }
}
//抽象工厂公共接口
PlaneFactory.prototype.die = function(){
  console.log('boom')
}
//产品类
PlaneFactory.prototype.SmallPlane = function(x,y){
  this.x = x
  this.y = y
  this.width = 100
  this.height = 100
  this.blood=100
  this.name = 'SmallPlane'
}
//产品类
PlaneFactory.prototype.BigPlane = function(x,y){
  this.x = x
  this.y = y
  this.width = 150
  this.height = 150
  this.blood=200
  this.name = 'BigPlane'
}
//产品类
PlaneFactory.prototype.AttachPlane = function(x,y){
  this.x = x
  this.y = y
  this.width = 120
  this.height = 120
  this.blood=150
  this.name = 'AttachPlane'
  this.attach = function(){
    console.log('attach')
  }
}


const osp = PlaneFactory.create('SmallPlane')
const obp = PlaneFactory.create('BigPlane')
const oap = PlaneFactory.create('AttachPlane')
```

### 总结

代码比简单工厂模式复杂，引入了抽象层，还有子工厂，这会增加代码的复杂度和理解难度。但是相比简单工厂模式，代码的维护性和扩展性提高了，新增产品时，只需要增加对应的产品类和产品工厂类，不需要修改到抽象工厂类，不需要修改到抽象工厂类和其他子工厂。更符合面向对象的开放封闭原则
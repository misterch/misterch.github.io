---
title: 认识class
date: 2023-10-20
categories:
 - ecmascript
 - 面试
tags:
 - 原理
 - class
 - this
---

## 传统构造函数的问题

1. 属性和原型方法定义分离，降低可读性
2. 原型成员可以被枚举
3. 默认情况下，构造函数仍然可以被当做普通函数使用（通过new.target可判断是否使用new形式使用）

## 类的特点

1. 类声明不会被提升，与let和const一样，存在暂时性死区，要先声明后使用
2. 类中的所有代码均在严格模式下执行
3. 类的所有方法都是不可枚举的
4. 类的所有方法内部都无法被当做构造函数使用
5. 类的构造函数必须使用new来调用

## 类的其他书写方式

### 可计算的成员名

```js:{4}
const sayName = 'say'
class Person{
  constructor(){}
  [sayName](){
    console.log('hello')
  }
}
```



### getter和setter

```js
class Person{
  constructor(name){
    this.name = name
  }
	get name(){
    console.log('我叫'+this._name)
  }
  set name(name){
    this._name = name
    console.log('设置name成功')
  }
}
```



### 静态成员

只能通过构造函数（类）调用的函数称为静态成员，函数也是对象，所以可以给对象添加属性

通过类创建的对象不能访问不到类的静态成员

```js
class Person{}
Person.a = 123
const p = new Person()
p.a //错误
```

使用static关键字定义静态成员

```js
class Chess{
  static height = 50
  static handle(){}
}
```



### 字段初始化器

属性和方法并非在constructor中定义，但这个属性和方法却都是对象的实例属性和方法

```js
class Test{
  //实例属性，相当于在constructor中书写this.attr = 1
  attr = 1
  constructor(){}
  handle(){
    //这是原型上的方法，所有对象共享
  }
  method = () => {
    console.log(this)
    //这是实例方法，并不在原型上
    //相当于在constructor中定义的方法，this指向实例
  }
}
```



### 类表达式

```js
const A = class {
  
}
```



### 装饰器

```js
class Test{
  @Outdate
  print(){
    console.log('print方法')
  }
}
/**
* @param {object} target 类
* @param {string} methodName 成员名字
* @param {object} descriptor 对methodName的描述
*/
function Outdate(target,methodName,descriptor){
  
}
```


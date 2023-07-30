---
title: new操作符原理解析
date: 2023-07-28
categories:
 - javascript
tags:
 - 原理
 - prototype
categories:
 - 面试
---



new操作符用于创建一个给定构造函数的对象实例

```js
function Person(name.age){
	this.name = name
	this.age = age
}
const ben = new Person('ben',20)
ben = {
	name:'ben',
	age:20
}
```

## new关键字进行的操作

1. 创建一个空对象`obj`
2. 将`obj`的`__proto__`指向构造函数的原型对象，即`obj.proto__=constrc.prototype`
3. 将构造函数内部的`this`绑定到新建的对象`obj`,相当于`obj.constrc()`
4. 如果构造函数没有返回引用类型的值，则返回新建的对象（默认会添加`return this`）；否则返回引用类型的值

```js
function myNew(constrc,...args){
	let obj = {}
	//Object.create()可以根据提供的对象的原型对象创建新对象
	//obj.__proto__ = constrc.prototype
	obj = Object.create(constrc)
	//将构造函数的this绑定到新对象
	const result = constrc.apply(obj,args)
	//构造函数返回的是对象，则使用构造函数执行的结果，否则返回新创建的对象
	return result instanceof Object?result:obj
}
```
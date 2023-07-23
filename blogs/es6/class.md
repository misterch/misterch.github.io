---
title: class类的静态属性和实例属性
date: 2023-07-23
categories:
 - ES6
tags:
 - ES6
 - class
---
## 类的静态属性和静态方法

```javascript
class Person {
	static eyes = 2
	static sayHi(){
		console.log('hello')
	}
	constructor(){}
}
Person.sayHi()

//相当于

function Person{}
Person.eyes = 2
Person.sayHi = function(){
	console.log('hello')
}
```

## 类的实例属性和实例方法

```javascript
class Person{
	age = 20
	constructor(name){
		this.name = name
		this.age = 22
		//在构造函数里通过this定义的属性和方法都是属于实例的
		//this.instFn2 = function{}
		this.instFn2 = ()=>{
			//正确输出
			console.log(this.name,this.age)
		}
	}
	//在类中通过箭头函数定义的方法属于实例方法
	instFn1 = () => {
		//正确输出
		console.log(this.name,this.age)
	}
}

//相当于
function Person(name){
	this.name = name
	this.instFn = function(){
		console.log(this.name)
	}
}
```

## 类的公共属性和原型方法

```javascript
class Person{
	constructor(name){
		//实例属性
		this.name = name
	}
	//原型方法
	protoFn1() {
		//正确输出
		console.log(this.name,this.age)
	}
}
// 公共属性，每个实例都会继承
Person.prototype.eyes = 2

//相当于

function Person(name){
	this.name = name
}
Person.prototype.eyes = 2
Person.prototype.protoFn1 = function(){
	console.log(this.name,this.eyes)
}
```


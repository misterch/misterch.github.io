---
title: 装饰器
date: 2023-07-23
categories:
 - 面试
 - ecmascript
tags:
 - 装饰器
---
:::warning
是一项实验性特性，未来版本可能会发生改变

typescript中需要开启才能使用

装饰器只能用在类及类的属性和方法上，是与类相关的语法

Typescript使用装饰器需要开启 `experimentalDecoration: true`
:::

## 装饰器类型

### 类装饰器

将类的构造函数作为装饰器的第一个参数

在不破坏原本类的结构的基础上，扩展类的属性和方法

```typescript
const Base:ClassDecorator = (target) => {
	//target就是A的构造函数
	target.prototype.name = "A"
	target.prototype.sayHi = function(){
		console.log('hihi')
	}
}

//相当于Base(A)
@Base
class A {

} 
```

### 装饰器工厂

就是一个高阶函数

柯里化：将原本接收多个参数的函数变成每次只接收一个参数的函数

```typescript
const Base = (name:string) => {
	const deco:ClassDecorator = (target)=>{
		//target就是A的构造函数
		target.prototype.name = name
		target.prototype.sayHi = function(){
			console.log('hihi')
		}
	}
	return deco
}

//相当于Base(A)
@Base('ben')
class A {

} 
```

### 方法装饰器

方法装饰器有三个参数

1. 对于静态成员就是类的构造函数，对于实例对象就是类的原型对象
2. 成员的名字
3. 成员的属性描述符，value就是目对象的内容

可以修改类的方法

```typescript
const Get = (url:string) => {
	const deco:MethodDecorator = (target,key,desc:PropertyDescriptor)=>{
		axios.get(url).then(res=>{
			desc.value(res.data)
		})
	}
	return deco
}
class Http {
	@Get('http://www.test.com/api/getList?page=1')
	getList(data:any){
		//执行getList方法的时候就会执行Get装饰器，请求数据，然后返回给getList
		console.log(data)
	}
}
```

### 属性装饰器

### 参数装饰器

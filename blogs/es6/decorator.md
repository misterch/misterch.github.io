---
title: 装饰器
date: 2023-12-06
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

## 解决的问题

1. 分离关注点

关注点的问题：在定义某个东西时，应该最清楚该东西的情况

```js
class User{
  constructor(){
    this.loginId = loginId
    this.age = age
    this.loginpwd = loginpwd
  }
  
  validate(){
    //例如在定义loginid时是最清楚loginid的情况，但现在需要在该函数中对属性进行判断
  }
}
```

2. 重复代码

```js
class User{
  constructor(){
    this.loginId = loginId
    this.age = age
    this.loginpwd = loginpwd
  }
  
  validate(){
    if(this.loginid.length>=3 && this.loginid.length<=5){}
    //重复代码
    if(this.loginpwd.length>=6 && this.loginpwd.length<=12){}
  }
}
```

> 产生以上问题的根源：某些信息，在定义时，能够附加的信息量有限
>
> 例如定义了一个loginid，是一个string类型，但是无法告诉系统loginid长度在3-5之间

## 装饰器作用

为某些**属性、类、参数、方法**提供元数据信息

元数据：描述数据的数据

```ts
class User{
  @require //描述数据loginid的元数据
  @range(3,5)
  loginid:string
}
```

## 装饰器本质

在JS中，装饰器本质是一个**函数**

装饰器可以修饰类、属性、方法、参数

## 装饰器类型

### 类装饰器

#### 参数是类本身

装饰器本质是一个函数，类装饰器接收一个参数，这个**参数是类本身**

> 类装饰器的运行时间：在类定义后直接运行

```ts
function test(target: new ()=>object){
  console.log('定义一个类就会执行')
}

@test
class A{}
```

> `new ()=>object`表示约束`target`是一个构造函数（类）

#### 可以返回一个新的类

**返回的新的类会替换掉装饰目标**

类装饰器可以返回一个新的类，但不建议这么做，因为类装饰器是一个**通用**的函数，在继承target后无法知道继承了什么属性和方法，无法得到类型检查，会报错

```ts
function test(target: new ()=>object){
  //target无法确认是一个什么类型，B继承后也无法知道继承了什么属性和方法
  //target是在运行时才能确定的，是动态的
  return class B extends target {
    
  }
}
@test //报错
class A{
  prop1:string = 'A的属性'
}

const a = new A()
console.log(a.prop1)//可以调用，因为继承了A
//a是B的实例
```

#### 构造函数有参数

如果构造函数有参数，则需要这样写`new (...args:any[])=>object`来约束`target`

```ts
function test(target: new (...args:any[])=>object){}

@test
class A{
  constructor(public prop1:string){}
}
```

#### 给装饰器加额外信息（装饰器工厂）

装饰器是一个函数，函数接收类本身，如果在给类使用装饰器时就调用了装饰器，这时装饰器应该要返回一个函数，返回的这个函数才是类装饰器

[装饰器工厂](#装饰器工厂)：调用函数后返回一个装饰器

```ts
function test(msg:string){
  return (target:new (...args:any[])=>object)=>{
    //给类添加属性
    target.prototype.prop = msg
  }
}

@test('修饰A的装饰器')//调用了装饰器函数，就需要返回一个装饰器
class A{
  //开启索引签名，就可以访问类中未必有的属性
  [x: string]: any
  constructor(public name:string){
    console.log('my name is',this.name)
  }
}

const a = new A('ben')
//如果A中没有开启索引签名，会报错
console.log(a.name,a.prop) //ben 修饰A的装饰器
```

#### 多个装饰器

多个装饰器，执行顺序**由下往上**执行

```ts
type constructor = new (...args:any[])=>object

function d1(target:constructor){
  console.log('d1')
}
function d2(target:constructor){
  console.log('d2')
}

@d1
@d2
class A{}
//先输出d2后输出d1
```

如果调用了装饰器，按照调用顺序从上往下执行，调用返回了一个装饰器，装饰器执行顺序不变，依旧是从下往上执行

```ts
type constructor = new (...args:any[])=>object

function d1(){
  console.log('d1')
  return (target:constructor)=>{
    console.log('d1 deco')
  }
}
function d2(){
  console.log('d2')
  return (target:constructor)=>{
    console.log('d2 deco')
  }
}

@d1()
@d2()
class A{}
//先按照函数调用顺序执行输出d1，d2，后按照装饰器的调用顺序执行输出d2 deco，d1 deco 
//d1->d2->d2 deco->d1 deco 
```

从编译结果也可以看出来

```js
let A = class A{}
//调用d1返回装饰器，调用d2返回装饰器
A = __decorate([d1(),d2()],A)
```

### 属性装饰器

属性装饰器也是一个函数，函数需要**两个参数**

1. 如果是静态属性，则为类本身；如果是实例属性，则为类的原型（prototype）
2. 固定为一个字符串，表示属性名

#### 实例属性

装饰器的第一个参数target是类的原型对象

```ts
function d(target:any,prop:string){
  //属性是实例属性，target是类的原型对象
  console.log(target===A.prototype)
}

class A{
  @d
  prop1:string
  
  @d
  prop2:string
}

```

#### 静态属性

装饰器的第一个参数target是类本身

```ts
function d(target:any,prop:string){
  console.log(target,prop)
  
}

class A{
  @d
  static prop1:string
  
  @d
  prop2:string
}
```

### 方法装饰器

方法装饰器有三个参数

1. 对于静态成员就是类本身，对于实例对象就是类的原型对象
2. 方法的名字
3. 方法的属性描述符，value就是目对象的内容

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
//即将丢弃的函数
const outdated = (target:any,attr:string,desc:PropertyDescriptor)=>{
  const old = desc.value
  desc.value = function(...args:any[]){
    console.warn(`${attr}此方法即将丢弃`)
    old(...args)
  }
}
class Http {
	@Get('http://www.test.com/api/getList?page=1')
	getList(data:any){
		//执行getList方法的时候就会执行Get装饰器，请求数据，然后返回给getList
		console.log(data)
	},
  @outdated
  request(){}
}
```



### 装饰器工厂

产生装饰器的函数

是一个高阶函数，这个函数返回一个装饰器

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

@Base('ben')
class A {

} 
```



### 参数装饰器

---
title: TS中的typeof、keyof和in
date: 2023-12-07
categories:
 - typescript
---

## typeof

在TS中，书写的位置在类型约束的位置上，表示获取某个数据的类型

```ts
const users = [
  {
    name:'ben',
    age:22
  },{
    name:'kelly',
    age:12
  }
]

type Users = typeof users
//即
type User = {
  name:string
  age:number
}[]
```

:::tip

当**typeof作用于类**的时候，得到的类型，是该**类的构造函数**

:::

```ts
class User{
  username:string
  gender:'male'|'female'
  age:number
}
//需要传一个类作为参数给函数，由函数创建一个实例
function createUser(cls: typeof User):User{
  return new cls
}
```

## keyof

作用于类、接口、类型别名。用于获取其他类型中的所有**成员名组成的联合类型**

```ts
interface User {
  name:string
  age:number
  gender:'male'|'string'
}

type unionType = keyof User
//即
type unionType = 'name'|'age'|'gender'
```

### 应用

限制是某个类型所有字段当中的一个

```ts
interface User {
  name:string
  age:number
  gender:'male'|'string'
}

function getUserProp(obj:User,prop:keyof User){
  return obj[prop]
}

//keyof User
//相当于 'name'|'age'|'gender'

const ben:User={
  name:'ben',
  age:12,
  gender:'male'
}
//第二个参数在TS的检查下，只能使用User类型中的字段
getUserProp(ben,'age')


//通用方法
function getProp<T,K extends keyof T>(obj:T,prop:K){
  return obj[prop]
}
```

## in

通常和`keyof`联用，限制某个索引类型的取值范围

```ts
interface Person{
  name:string
  gender: 'male'|'string'
  age:number
}

//将Person类型的所有属性类型变成string类型产生新的PersonString类型
type PersonString = {
  [key in keyof Person]:string
}

//可以保持原来类型的属性类型，但现在要求所有属性是只读的
type CopyPerson = {
  //Person[key]=>Person['age']=number
  readonly [key in keyof Person]:Person[key]
}
```

### 应用

1. 将类型的属性修改为只读

```ts
interface Person{
  name:string
  gender: 'male'|'string'
  age:number
}

type PersonReadonly {
	readonly [key in keyof Person]: Person[key]
}

//由此可以得出一个通用的只读方法
type ReadOnly<T> = {
  readonly [key in keyof T]: T[key]
}
```

2. 将类型的属性修改为可选

```ts
interface Person{
  name:string
  gender: 'male'|'string'
  age:number
}
type PersonPartial {
	[key in keyof Person]?: Person[key]
}

//由此可以得出一个通用的可选方法
type Partial<T> {
	[key in keyof T]?: T[key]
}
```


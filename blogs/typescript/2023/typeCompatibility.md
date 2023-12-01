---
title: Typescript类型兼容
date: 2023-11-30
categories:
 - typescript
---

## 对象类型

### 鸭子辩型法

即子结构辩型法：目标类型需要某一些特征，赋值的类型只要能满足目标类型的特征就可以

**鸭子辩型法主要使用在对象类型**

```ts
interface Duck {
  sound: '嘎嘎嘎',
  swin():void
}

const person = {
  name: '伪装成鸭子的人',
  age: 20,
  sound: '嘎嘎嘎' as '嘎嘎嘎',
  swin(){
    console.log('我会模仿鸭子叫，我也会游泳')
  }
}

//可以正确赋值给Duck类型的变量
const duck:Duck = person
```

赋值类型子结构符合目标类型的特征，就可以正确赋值

#### 对象字面量赋值

如果直接使用**对象字面量**赋值时，会进行更加严格的判断

```ts
interface Duck {
  sound: '嘎嘎嘎',
  swin():void
}

//会对name属性和age属性报错，因为Duck不存在这些属性
const duck:Duck = {
  name: '伪装成鸭子的人',
  age: 20,
  sound: '嘎嘎嘎' as '嘎嘎嘎',
  swin(){
    console.log('我会模仿鸭子叫，我也会游泳')
  }
}
```

## 函数类型

```ts
interface Sum{
  (num1:number,num2:number):number
}

type Sum = (num1:number,num2:number)=>number
type Sum = {
  (num1:number,num2:number):number
}
```



### 参数

传递给目标函数的参数可以少但不能多

```ts
const arr = [1,2,3,4,5,6]
//forEach函数有三个参数，但可以根据需求要不要使用其他参数
//但是不能传多过3个参数
arr.forEach((item)=>{})
```

### 返回值

要求返回必须返回，且类型必须符合要求；不要求返回也可以返回
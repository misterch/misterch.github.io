---
title: Typescript面向对象
date: 2023-12-01
categories:
 - typescript
 - 设计模式
tags:
 - 面向对象
 - interface
 - class
---

##  什么是面向对象

面向对象是编程思想，它提出**一切以对象（划分类）为切入点**思考问题

其他编程思想

- 面向过程：以功能流程为思考切入点，不太适合大型应用
- 函数式编程：以数学运算为思考切入点

## 类的继承

### 继承的作用

继承可以描述类与类之间的关系

如果A和B都是类，并且可以描述为**A是B**，则A和B形成继承关系

- B是父类，A是子类
- B派生A，A继承自B
- B是A的基类，A是B的派生类

>  篮球是一个类，球是一个类，篮球是球，篮球继承了球

### 成员的重写

子类中覆盖父类的成员

子类重写父类的属性或方法，不能改变类型，需要保证类型的匹配

:::tip

:exclamation:注意：在继承关系中，this的指向是动态的，调用方法时，根据具体的调用者确定this指向

:exclamation:注意：在**子类方法**中，可以使用super访问父类的成员；如果子类没有重写父类成员，this和super都可以使用，但如果子类重写了父类成员，super访问的是父类成员，this访问的是子类成员

:::

### 类型匹配

使用鸭子辩型法

子类对象始终可以赋值给父类，面向对象中，这种现象叫里氏替换原则

```ts
class Tank{
  name:string = '坦克'
  life:number = 5
  shoot(){
    console.log('发射')
  }
}
class PlayerTank extends Tank {
  name:string = '玩家坦克'
  shoot(){
    console.log('发射')
  }
  sayHello(){
    //hello,我是玩家坦克
    console.log('hello,我是',this.name)
  }
}
//可以将子类对象赋值给父类对象
const tank:Tank = new PlayerTank()
//只能使用共同拥有的属性和方法，父类有的子类一定有，子类有的父类不一定有
tank.sayHello()
//需要使用instanceof来判断对象是否是具体子类的类型
if(tank instanceof PlayerTank){
  tank.sayHello()
}
```

### 单根性和传递性

单根性：每个类最多只能拥有一个父类

传递性：如果A是B的父类，并且B是C的父类，则可以认为A也是C的父类

## 抽象类

有时某个类只表示一个抽象概念，主要用于提取子类共有的成员，而不能直接创建他的对象。该类可以作为抽象类

`abstract class Tank{}`，给类加上`abstract `就表示这是一个抽象类

### 抽象成员

父类中，可能知道有些成员是必须存在的，但不知道该成员的值或实现是什么，因此，需要一种强约束，让继承该类的子类，必须实现该成员

在**抽象类中**的成员前加上`abstract`表示抽象成员，必须在子类中实现

```ts
abstract class Chess{
  x:number = 0
  y:number = 0
  abstract readonly name:string
  abstract move(targetX:number,targetY:number):boolean
}
```

### 设计模式——模板模式

有些方法所有的子类实现的流程完全一致，只是流程中的某个步骤具体实现不一致，可以将该方法提取到父类，在父类中完成整个流程的实现，遇到实现不一致的方法时，将该方法做成抽象方法

```ts
abstract class Chess{
  x:number = 0
  y:number = 0
  abstract readonly name:string
  move(targetX:number,targetY:number):boolean{
    console.log('边界判断')
    console.log('移动到的位置是否有己方棋子')
    if(this.rule(targetX,targetY)){
      this.x = targetX
      this.y = targetY
      return true
    }
    return false
  }
  protected abstract rule(targetX:number,targetY:number):boolean{}
}

class Horse extends Chess {
  readonly name:string = '马'
  //实现抽象方法
  protected rule(targetX:number,targetY:number){}
}
```

## 静态成员

附着在类上的成员，只能通过类调用，不属于实例对象

### 静态方法中的this

this指向当前类

```ts
class User{
  static login(){
    //this指向User
    console.log(this)
  }
}
```

### 设计模式——单例模式

```ts
class ChessBoard{
  private constructor(){}
  private static _board?:ChessBoard
  static createBoard():ChessBoard{
    if(this._board){
      return this._board
    }
    this._board = new ChessBoard()
    return this._board
  }
}

const b1 = ChessBoard.createBoard()
const b2 = ChessBoard.createBoard()
b1===b2
```

## 再谈接口

接口用于约束类、对象、函数，是一个类型契约

```ts
abstract class Animals{
  abstract type:string
  constructor(public name:string,public age:number){}
  sayHello(){
    console.log(`hello,我是${this.type},我叫${this.name},今年${this.age}岁`)
  }
}


class Dog extends Animals{
  type:string = '狗'
  //计算
  calculate(){}
  //跳舞
  dance(){}
}

class Lion extends Animals{
  type:string = '狮子'
  singleFire(){}
  doubleFire(){}
}

class Tiger extends Animals{
  type:string = '老虎'
  singleFire(){}
  doubleFire(){}
}

class Monkey extends Animals{
  type:string = '猴子'
  //平衡
  singlePlankBridge(){}
  //钢丝
  wireWalking(){}
}



const animals:Animals[] = [
  new Dog('二狗',1),
  new Monkey('悟空',5),
  new Lion('狮子王',8),
  new Tiger('王老虎',6)
]

animals.forEach(a=>{
  //根据判断类型来使用某种能力
  //类型中的能力可能会变化的，一旦能力变化可能就会出错
  if(a instanceof Lion || a instanceof Tiger){
    a.singleFire()
    a.doubleFire()
  }
})
```

每个类都有各自的能力，如果不使用接口实现时，会有一些问题

1. 对能力（成员函数）没有强约束力
2. 容易将类型和能力耦合在一起（使用能力前却要判断类型，会出现问题。类型的能力可能会变化）

> 面向对象领域中的接口的语义：表达了某个类是否拥有某种能力
>
> 某个类具有某种能力，就是实现了某种接口

```ts
export interface FireShow{
  singleFire():void
  doubleFire():void
}

export interface BalanceShow{
  singlePlankBridge():void
  wireWalking():void
}

export interface WisdomShow{
  calculate():void
  dance():void
}
```

类实现接口

```ts
class Dog extends Animals implement WisdomShow{
  type:string = '狗'
  //计算
  calculate(){}
  //跳舞
  dance(){}
}

class Lion extends Animals implement FireShow{
  type:string = '狮子'
  singleFire(){}
  doubleFire(){}
}

class Tiger extends Animals implement FireShow{
  type:string = '老虎'
  singleFire(){}
  doubleFire(){}
}

class Monkey extends Animals implement BalanceShow{
  type:string = '猴子'
  //平衡
  singlePlankBridge(){}
  //钢丝
  wireWalking(){}
}

const animals:Animals[] = [
  new Dog('二狗',1),
  new Monkey('悟空',5),
  new Lion('狮子王',8),
  new Tiger('王老虎',6)
]
```

### 类型保护函数

通过调用该函数，会触发TS的类型保护

书写类型保护函数时，判断某个对象是不是某个接口（类）的时候，这个对象不需要具体的类型，是object类型就可以

```ts
function hasFireShow(ani:object):ani is FireShow{
  if((ani as FireShow).singleFire && (ani as FireShow).doubleFire){
    return true
  }
  return false
}


animals.forEach(a=>{
  //a: Animals & FireShow
  if(hasFireShow(a)){
    a.singleFire()
    a.doubleFire()
  }
})
```

## 索引器

格式：`对象[值]`

在类中，索引器需要写在类的最顶端位置

在TS中，默认情况下，不对索引器做严格的类型检查

使用配置`noImplicitAny`开启对隐式any的检查

```ts
let User: {
  name:string
  age:number
  gender: 'male'|'female'
  [prop:string]: string|number|object
}

User['favor'] = ['football','music']
```

默认情况下，TS不允许**动态**给类增加成员

```ts
class User {
  [prop:string]: string|number|object
  constructor(public name:string,public age:number){}
}

const ben = new User('ben',22)
//动态增加属性
ben["favor"] = ['music','movie']
```



## this指向约束

```ts
const ben = {
  name: 'ben',
  age: 22,
  sayHello(){
    //this:any
    console.log(this.name,this.age)
  }
}

const benFn = ben.sayHello
benFn()//this指向windows


class User {
  constructor(public name:string,public age:number){
    
  }
  sayHello(){
    //this:User
    console.log(this.name,this.age)
  }
}
const b1 = new User()
const b1Fn = b1.sayHello
//在class中使用的是严格模式，在用非对象调用方法时，this指向undefined
b1Fn()//this指向undefined
```



配置`noImplicitThis`开启对隐式this的检查，当检查到this是any类型会报错

> 在TS中允许在书写函数时，手动声明函数中this的指向，将this作为函数的第一个参数，该参数只是用于约束this，并不是正真的函数参数，不会出现在编译结果中；参数可以写在this的后面

```ts:{5,25}
interface User{
  name:string
  age:number
  //this并非是函数的参数
  sayHello(this:User):void
}

const ben:User = {
  name:'ben',
  age: 23,
  sayHello(){
    //this指向User
  }
}

const benFn = ben.sayHello
benFn()//报错



class User {
  constructor(public name:string,public age:number){
    
  }
  sayHello(this:User){
    console.log(this.name,this.age)
  }
}
```






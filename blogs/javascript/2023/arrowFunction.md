---
title: 箭头函数及务必使用function的场景
date: 2023-11-02
categories: 
 - javascript
 - ecmascript
 - 面试
tags:
 - this
 - 原理
---

## this指向

- 通过对象调用函数，`this`指向对象
- 直接调用函数，`this`指向全局对象
- 如果通过`new`调用函数，`this`指向新创建的对象
- 如果通过`apply`、`call`、`bind`调用函数，`this`指向指定的对象
- 如果是DOM事件函数，`this`指向事件源

```js
const obj = {
  count:0,
  increase(){
    //obj调用increase，this指向obj
    console.log(this) // obj
    const _this = this
    setInterval(function(){
      //这个函数并非由obj调用，直接由js引擎调用，this指向全局
      console.log(this) // undefined
      _this.count++
    },1000)
  }
}
```

## 箭头函数语法

箭头函数是一个**函数表达式**，理论上，任何使用函数表达式的场景都可以使用箭头函数

### 注意细节

:::tip

1. 箭头函数的函数体中的`this`，取决于箭头函数**定义时的位置**的`this`指向，即定义**该函数时所在的作用域指向的对象**，与如何调用无关

2. 实际上，箭头函数不存在`this`，也不存在`arguments`、`new.target`，如果使用了这些属性，则使用的是箭头函数外层函数对象的`this`、`arguments`、`new.target`
3. 箭头函数没有原型
4. 箭头函数不能作为构造函数使用

:::

1. 在函数中使用箭头箭头函数 ，箭头函数中的this指向箭头函数外的函数中的this，arguments也是使用箭头函数外的函数的arguments

```js
const obj = {
  count:0,
  increase(){
    const increaseArgs = arguments
    setInterval(()=>{
      //箭头函数没有this，这里使用this取决于箭头函数定义时的位置的this指向，即这个箭头函数是在increase函数中定义，increase函数的this指向obj，箭头函数中使用的this就指向obj
      this.count++ // 1
      console.log(increaseArgs === arguments) //true
    },1000)
  }
}
```

在对象中使用箭头函数定义方法，箭头函数的函数体的this指向定义这个对象所在的作用域指向的对象，即this并非指向对象本身，而是指向这个对象所处的作用域的对象

```js
const obj = {
  count:0,
  increase:()=>{
    //箭头函数中的this指向obj所处的作用域的对象，这里是window
    console.log(this)//window
  }
}
```

:::tip

在对象中定义的方法**不能**使用箭头函数

:::

### 应用场景

1. 临时性使用的函数，如：事件处理函数，异步处理函数等等临时性函数
2. 为了绑定箭头函数外层函数的this
3. 在不影响其他代码的情况下，保持代码的简洁，如：数组方法(map、filter、forEach等)中的回调函数

## 使用function的场景

### 场景一：对象的方法

❌**错误示范（使用箭头函数）**

当我们定义一个对象的方法时，通常希望`this`指向该对象本身，一边访问其属性

```javascript
const person = {
    name:"老陈",
    sayName:()=>{
        // this指向全局作用域，而不是person对象，this.name输出undefined
        console.log(`大家好，我是${this.name}`)
    }
}
```

这个例子中，箭头函数`sayName`在`person`对象中定义，但它的`this`捕获的是定义`person`对象时的上下文，即全局作用域

✅ **正确姿势 (使用 function)**

```javascript
const person = {
    name:"老陈",
    sayName:function(){
        // this在调用时被动态绑定为person对象
        console.log(`大家好，我是${this.name}`)
    }
}
```

**结论：**当我们为对象定义一个需要引用该对象自身属性的方法时，使用`function`或ES6方法简写

### 场景二：DOM事件监听器

在使用`addEventListener`为DOM元素绑定事件时，我们常常需要访问触发该事件的元素本身（例如修改样式，内容等），传统`function`会自动将`this`绑定到该DOM元素上

❌ 错误示范 (使用箭头函数)

```javascript
const button = document.getElementById('myButton');

button.addEventListener('click', () => {
  // 这里的 this 依然是 window 或 undefined，而不是 button 元素
  this.classList.toggle('active'); // TypeError: Cannot read properties of undefined (reading 'classList')
});
```

箭头函数从外部作用域捕获this，导致我们无法直接操作点击的按钮

✅ 正确姿势 (使用 function)

```JavaScript
const button = document.getElementById('myButton');

button.addEventListener('click', function() {
  // 在这里，this 被正确地绑定为触发事件的 button 元素
  console.log(this); // <button id="myButton">...</button>
  this.classList.toggle('active'); // 正常工作
});
```

**结论：**在DOM事件监听回调中，如果我们需要用`this`来引用触发事件的元素，使用`function`

### 场景三：构造函数

箭头函数在设计上就不能作为构造函数使用。如果尝试使用`new`关键字来调用一个箭头函数，JavaScript会直接抛出错误。这是因为构造函数需要有自己的`this`来指向新创建的实例，并且需要一个`prototype`属性，而箭头函数两者都不具备

❌ 错误示范 (使用箭头函数)

```javascript
const Car = (brand)=>{
    this.brand = brand
}
const myCar = new Car('Zeekr') //UnCaught TypeError: Car is not a constructor
```

✅ 正确姿势 (使用 function 或 class)

```javascript
function Car(brand){
    this.brand = brand
}
const myCar = new Car('Zeekr')
console.log(myCar.brand) //Zeekr

class Car{
    constructor(brand){
        this.brand = brand
    }
}
```

**结论：** 永远不要用箭头函数作为构造函数。请使用 `function` 或 `class`

### 场景四：原型方法

与对象方法类似，当我们为构造函数的原型`prototype`添加方法时，我们也希望`this`指向调用该方法的实例

❌ 错误示范 (使用箭头函数)

```JavaScript
function Person(name){
    this.name = name
}
Person.prototype.greet = ()=>{
    //this捕获的是定义greet时的全局作用域window
    console.log(`Hello,我叫${this.name}`)
}
```

✅ 正确姿舍 (使用 function)

```JavaScript
function Person(name){
    this.name = name
}
Person.prototype.greet = function(){
    //this指向调用greet方法的实例
    console.log(`Hello,我叫${this.name}`)
}

const ben = new Person('ben')
ben.greet()
```

**结论：** 在 `prototype` 上定义方法时，请使用 `function`，以确保 `this` 指向类的实例

### 场景五：需要arguments对象的函数

箭头函数没有自己的`arguments`对象。`arguments`时一个类数组对象，包含了函数被调用时传入的所有参数。如果我们在箭头函数内部访问`arguments`，它只会访问到外层（如果存在）传统函数的`arguments`对象

❌ 错误示范 (使用箭头函数)

```JavaScript
const myFunc = ()=>{
    console.log(arguments) //Uncaught ReferenceError: arguments is not defined
}
myFunc(1,2,3)
```

✅ 正确姿势 (使用 function)

```javascript
function myFunc(){
    console.log(arguments) //Arguments(3)[1,2,3,callee:f,Symbol(Symbol.iterator)]
    const args = Array.from(arguments)
    console.log(args) // "1,2,3"
}
myFunc(1,2,3)
```

**注意**：在现代JavaScript中，更推荐使用**剩余参数（...args）**来处理不确定数量的参数。剩余参数是真正的数组，并且它在箭头函数和传统函数中都能正常工作。

```JavaScript
const myFuncWithRest = (...args)=>{
    console.log(args)//[1,2,3]
}
myFuncWithRest(1,2,3)
```


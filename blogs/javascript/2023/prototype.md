---
title: 构造函数，原型，实例对象
date: 2023-07-28
categories:
 - javascript
tags:
 - 原理
 - prototype
 - 构造函数
categories:
 - 面试
---

![](https://img-blog.csdnimg.cn/20190311194017886.png)

```js
function Foo(){}
let f1 = new Foo()
```

## \__proto__

:::tip

`__proto__`和`constructor`属性是**对象所独有的**

**函数也是一种对象**，函数也有`__proto__`和`constructor`属性

:::

`f1.__proto__`属性由**一个对象指向另一个对象**，这个对象是原型对象即父对象，这里是`Foo.prototype`

### \__proto__作用

当访问对象的属性时，如果该对象内部不存在该属性，那么就会去对象的`__proto__`属性指向的原型对象（父对象）里找，如果原型对象里也找不到，就继续往父对象的`__proto__`属性指向的原型对象（爷爷对象）里找，直到原型链顶端null，找不到就结束查找，报错。

### 原型链

通过`__proto__`属性连接对象直到null的一条链就是**原型链**

## prototype

:::tip

`prototype`属性是**函数**所独有的，由**一个函数指向一个对象**

`prototype`是这个函数的原型对象，也是这个函数所创建的**实例的原型对象**

:::

`f1.__proto__===Foo.prototype`

### prototype作用

包含特定类型的所有**实例共享**属性和方法

任何函数在创建的时候都会默认同时创建函数的原型对象

## constructor

- **对象所独**有的属性
- 从一个对象指向一个函数，指向的是该对象的构造函数
- 每个对象都有构造函数，本身拥有的或者继承而来的，继承来的通过`__proto__`属性查看
- `Function`对象比较特殊，构造函数就是它自己本身
- 所有对象和函数都是由`Function`构造函数得来
- `constructor`属性的重点就是`Function`函数

```js
//函数创建的对象，对象含有constructor,指向创建该对象的函数
f1.constructor = Foo
//函数也是对象，也有constructor属性
Foo.constructor === Function
//Function对象的构造函数是自己本身
Function.constructor === Function

//函数特有prototype属性，prototype.constructor指向函数本身
Foo.prototype.constructor === Foo
```

## 自实现继承函数

```js
function inherit(Child, Parent) {
     // 继承原型上的属性 
    Child.prototype = Object.create(Parent.prototype)
     // 修复 constructor
    Child.prototype.constructor = Child
    // 存储超类
    Child.super = Parent
    // 静态属性继承
    if (Object.setPrototypeOf) {
        // setPrototypeOf es6
        Object.setPrototypeOf(Child, Parent)
    } else if (Child.__proto__) {
        // __proto__ es6 引入，但是部分浏览器早已支持
        Child.__proto__ = Parent
    } else {
        // 兼容 IE10 等陈旧浏览器
        // 将 Parent 上的静态属性和方法拷贝一份到 Child 上，不会覆盖 Child 上的方法
        for (var k in Parent) {
            if (Parent.hasOwnProperty(k) && !(k in Child)) {
                Child[k] = Parent[k]
            }
        }
    }
}
```

## 参考资料

[帮你彻底搞懂JS中的prototype、__proto__与constructor（图解）码飞_CC的博客](https://blog.csdn.net/cc18868876837/article/details/81211729)
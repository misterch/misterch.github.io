---
title: 迭代器和生成器
date: 2023-10-12
categories:
 - javascript
 - ecmascript
tags:
 - 原理
 - 迭代器
 - 生成器
 - Symbol
---

## 迭代器（Iterator）

### 什么是迭代

从一个数据集合中按照一定的顺序，不断取出数据的过程

1. 迭代和遍历的区别？

​		迭代强调的是依次取数据，并不保证取多少，也不保证把所有的数据取完

​		遍历强调的是要把整个数据依次全部取出

2. 迭代器

​		对迭代过程的封装，在不同的语言中有不同的表现形式，通常为对象

3. 迭代模式

​		一种设计模式，用于统一迭代过程，并规范了迭代器规格：

- 迭代器应该具有得到下一个数据的能力

- 迭代器应该具有判断是否还有后续数据的能力

### JS中的迭代器

JS规定，如果一个对象具有next方法，并且该方法返回一个对象，该对象的格式如下：

```js
{value: 值, done: 是否迭代完成}
```

则认为该对象是一个迭代器

含义：

- next方法：用于得到下一个数据
- 返回的对象
  - value：下一个数据的值
  - done：boolean，是否迭代完成

```js
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8, 9];

// 迭代器创建函数  iterator creator
function createIterator(arr) {
  let i = 0;//当前的数组下标
  return { 
    next() {
    	var result = {
      	value: arr[i],
      	done: i >= arr.length
    	}
      i++;
      return result;
    }
  }
}

const iter1 = createIterator(arr1);
const iter2 = createIterator(arr2);
```

### 可迭代协议

ES6规定，如果一个对象具有知名符号属性```Symbol.iterator```，并且属性值是一个迭代器创建函数，则该对象是可迭代的（iterable）

:::tip

Q：如何知晓一个对象是否可迭代？

A：可迭代对象会有一个知名属性`Symbol.iterator`，这个属性是一个创建迭代器的方法，`obj[Symbol.iterator]`可以返回一个迭代器

:::

### for-of 循环

:::tip

`for-of`循环用于遍历可迭代对象，即含有知名属性`Symbol.iterator`的对象就可以使用`for-of`\

对象不是一个可迭代的对象，但通过给对象设置`Symbol.iterator`属性的方法就可以变成一个可迭代对象

:::

```js
var obj = {
    a: 1,
    b: 2,
    [Symbol.iterator]() {
        const keys = Object.keys(this);
        let i = 0;
        return {
            next: () => {
                const propName = keys[i];
                const propValue = this[propName];
                const result = {
                    value: {
                        propName,
                        propValue
                    },
                    done: i >= keys.length
                }
                i++;
                return result;
            }
        }
    }
}
```

## 生成器 (Generator)

### 什么是生成器？

生成器是一个通过构造函数Generator创建的对象，生成器既是一个迭代器（有`next`方法），同时又是一个可迭代对象（有`Symbol.iterator`）

如何创建生成器？

生成器的创建，必须使用生成器函数（Generator Function）

如何书写一个生成器函数呢？

```js
//这是一个生成器函数，该函数一定返回一个生成器
function* method(){

}
```

### 生成器函数内部是如何执行的？

生成器函数内部是为了给生成器的每次迭代提供的数据

每次调用生成器的next方法，将导致生成器函数运行到下一个yield关键字位置

`yield`是一个关键字，该关键字只能在生成器函数内部使用，表达“产生”一个迭代数据。

一般用法

```js
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8, 9];

// 迭代器创建函数  iterator creator
function* createIterator(arr) {
    for (const item of arr) {
        yield item;
    }
}

const iter1 = createIterator(arr1);
const iter2 = createIterator(arr2);
```

给next方法传参

```js
function* test() {
    console.log("函数开始")
    let info = yield 1;
    console.log(info)
    info = yield 2 + info;
    console.log(info)
}

const generator = test();
generator.next() // 执行到第3行停止，打印“函数开始”和返回{value:1,done:false}
generator.next(3) //yield 1返回3，执行到第5行停止，打印“3”和返回{value:5,done:false}
generator.next(9) //yield 2+info返回9，执行到第6行结束，打印“9”和返回{value:undefined,done:true}
```

生成器函数内部调用其他生成器函数

```js
function* t1(){
    yield "a"
    yield "b"
}

function* test() {
    yield* t1();
    yield 1;
    yield 2;
    yield 3;
}
//相当于
function* test() {
    yield "a"
    yield "b"
    yield 1;
    yield 2;
    yield 3;
}

const generator = test();
```

有哪些需要注意的细节？

1). 生成器函数可以有返回值，返回值出现在第一次done为true时的value属性中
2). 调用生成器的next方法时，可以传递参数，传递的参数会交给yield表达式的返回值
3). 第一次调用next方法时，传参没有任何意义
4). 在生成器函数内部，可以调用其他生成器函数，但是要注意加上*号

生成器的其他API

- return方法：调用该方法，可以提前结束生成器函数，从而提前让整个迭代过程结束，并且return的值作为value的值
- throw方法：调用该方法，可以在生成器中产生一个错误
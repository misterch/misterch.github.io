---
title: Javascript执行机制，事件循环(event loop)
date: 2023-07-24
tags:
 - 事件循环
 - 异步
categories: 
 - 面试
 - javascript
---

## Javascript执行机制

Javascript是一门单线程语言，Javascript语句是按照语句的执行顺序执行的

Javascript是单线程语言，**同一时刻只能执行一个代码片段**

Javascript虽然是单线程，但是可以将任务分成两类，**同步任务**和**异步任务**

Javascript执行完所有同步任务后，会就进入到事件循环(异步任务)

Javascript所有**同步任务都在主线程上执行**，形成一个执行栈

同步任务：需要执行的任务在主线程上排队，**一次执行**

### 总结

Javascript执行所有同步代码后，就会进入到事件循环（Event Loop）。事件循环中的任务队列（task queue）独立于主线程，所以任务添加到任务队列时不会阻塞主线程的运行。这些添加到任务队列的任务都是异步任务。任务队列至少有一个宏任务队列和微任务队列，一个循环执行一个宏任务和所有微任务，完成一次事件循环就会检查是否需要更新UI。

## 任务队列（task queue）

### 任务队列（task queue）

- 独立于主线程之外
- 用来添加异步任务到队列
- 检测和添加异步任务的行为独立于事件循环完成

### 异步任务

- 没有立即执行但需要被执行的任务，放在任务队列（task queue）里
- 事件是异步任务

## 事件循环

同步任务执行完成，进入事件循环，等待事件的发生

### 事件循环流程

1. 浏览器检查事件队列头
2. 检测到事件，取出事件执行响应的事件处理器
3. 事件执行完后，继续检测事件队列(事件循环)
4. 事件队列没有事件，继续检测

**事件循环有两个任务队列：宏任务和微任务**

### 事件循环基于两个基本原则

- 一次处理一个任务
  - 包括单次迭代处理队列**一个宏任务**
  - 包括单次处理队列**所有微任务**
- 一个任务开始后直到任务结束，不会被其他任务中断

### 宏任务：由node或浏览器发起的任务

- 创建主文档对象document
- 解析HTML
- 执行主线js代码，更改当前URL
- 各种事件（页面加载，鼠标事件，键盘事件，setTimeout，setInterval，网络事件）
- setImmediate
- I/O

### 微任务：由js引擎自身发起的任务

在下次浏览器渲染之前执行，更新应用程序的状态

- promise
  - resolve是在同步任务里，then加入到微任务
- async/await
  - 遇到await之前是同步的，遇到await执行await后面的函数，然后返回一个promise对象，await下面的代码放入到微任务
- process.nextTick
  - 优先级最高，最先执行
- Object.observe
- Proxy
- MutationObserver

```js
//1.同步执行输出script start
console.log('script start')
async function async1(){
  //2.同步执行输出async1 start
  console.log('async1 start')
  //遇到await执行后面的函数async2
  //await 下面的代码等待async2完成后执行，放入到微任务等待下一轮
  await async2()
  //事件循环开始，执行微任务
  //9.async2 end
  console.log('async2 end')
  //10.async1 end
  console.log('async1 end')
}
async function async2(){
  //3.执行输出async2
  console.log('async2')
}
//同步执行async1
async1()
new Promise(resolve=>{
    //4.同步执行输出promise1 start
    console.log('promise1 start')
  	//加入到微任务
    resolve()
  	//5.同步执行输出resolve1 end
    console.log('resolve1 end')
  }).then(res=>{
  	//10.recive resolve1
    console.log('recive resolve1')
  })
//加入到宏任务
//等待第一次微任务队列清空
//【11.recive resolve2】后微任务队列清空，开始执行一个宏任务
setTimeout(()=>{
  //12.setTimeout start
  console.log('setTimeout start')
  new Promise(resolve=>{
    //13.promise start
    console.log('promise start')
    //加入到微任务，等待第二次微任务队列执行
    resolve()
    //14.resolve end
    console.log('resolve end')
  }).then(res=>{
    //执行第二次微任务队列
    //16.recive resolve
    console.log('recive resolve')
  })
  //宏任务执行完毕，开始下一轮事件循环，执行第二次微任务队列
  //15.setTimeout end
  console.log('setTimeout end')
},0)
new Promise(resolve=>{
  	//6.同步执行输出promise2 start
    console.log('promise2 start')
  	//加入到微任务
    resolve()
  	//7.同步执行输出resolve2 end
    console.log('resolve2 end')
  }).then(res=>{
 		//11.recive resolve2
    console.log('recive resolve2')
  })
//8.同步执行输出script end
//同步代码在第8步这里执行完毕，开始事件循环
console.log('script end')
// script start,async1 start,async2,p1s,r1e,p2s,r2e,script end,async2 end,async1 end,rr1,rr2,setTimeout start,ps,re,setTimeout end,rr
```

[JS Visualizer 9000 (jsv9000.app)](https://www.jsv9000.app/)
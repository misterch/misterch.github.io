---
title: 事件循环（Event Loop）全解析
date: 2026-10-16
categories:
 - javascript
 - 面试
tags:
 - 事件循环
 - 异步
 - 浏览器原理
 - node
---

> 本文基于「前端博客知识库」中三篇笔记整理：\[Javascript执行机制，事件循环(event loop)\]\[1\]、\[事件循环\]\[2\]、\[Node的事件循环\]\[3\]，并补充关联内容 \[异步I/O\]\[4\]、\[浏览器渲染原理\]\[5\]。

---

## 一、为什么需要事件循环

### JS 是单线程

JavaScript 是一门**单线程语言**，语句按书写顺序执行，同一时刻只能执行一个代码片段。它运行在浏览器的**渲染主线程**中，而这个主线程只有一个。

渲染主线程承担的工作极其繁重：

- 解析 HTML、解析 CSS、计算样式、布局、处理图层
- 每秒刷新页面 60 次
- 执行全局 JS 代码、执行事件处理函数、执行计时器回调

**主线程无论如何都不能被阻塞**，否则页面就会卡死。

### 异步：解决阻塞的方案

代码执行过程中，会遇到一些**无法立即处理的任务**：

- 计时完成后需要执行的任务 —— `setTimeout`、`setInterval`
- 网络通信完成后需要执行的任务 —— `XHR`、`fetch`
- 用户操作后需要执行的任务 —— `addEventListener`

浏览器选择异步来解决：主线程遇到这类任务，就**交给其他线程处理**（计时线程、网络线程、交互线程），自身立即结束当前任务继续执行后续代码；其他线程完成后，把事先传入的回调函数**包装成任务，加到消息队列末尾**排队，等待主线程调度执行。

> 这种异步模式下，浏览器永不阻塞，从而最大限度保证单线程的流畅运行。\[2\]

---

## 二、进程与线程基础

| 概念 | 说明 |
| --- | --- |
| 进程 | 程序运行所需的专属内存空间，可理解为「一间房」。程序至少有一个进程，进程间相互独立 |
| 线程 | 运行代码的「人」。一个进程至少有一个线程（主线程）；一个进程可包含多个线程，线程共享进程内存 |
| 关系 | 创建线程比创建进程快（无需分配内存）；进程结束时线程随之结束；最后一个线程结束后进程才结束 |

浏览器是**多进程多线程**应用，主要进程：

1. **浏览器进程**：界面显示、用户交互、子进程管理
2. **网络进程**：加载网络资源
3. **渲染进程**：启动后开启**渲染主线程**，负责执行 HTML、CSS、JS。默认每个标签页一个渲染进程，互不影响 \[2\]

---

## 三、事件循环（消息循环）

> 在 Chrome 源码中，渲染主线程开启一个**不会结束的 for 循环**，每次循环从消息队列中取出第一个任务执行，其他线程只需在合适的时候把任务加到队列末尾即可。\[2\]

流程：

1. 最开始，渲染主线程进入一个**无限循环**
2. 每一次循环检查消息队列是否有任务 有 → 取出第一个任务执行，执行完进入下一次循环 没有 → 进入**休眠状态**
3. 其他线程（包括其他进程的线程）可随时向消息队列末尾添加任务；添加时若主线程在休眠，则唤醒它继续循环

整个过程就称之为**事件循环（消息循环）**。\[2\]

### 两条基本原则

1. **一次处理一个任务**：单次迭代处理一个宏任务，处理队列中所有微任务
2. **一个任务开始后直到结束，不会被其他任务中断** \[1\]

---

## 四、任务队列：旧分法 vs W3C 新分法

### 旧分法：宏任务 / 微任务

**宏任务**（由宿主环境 —— 浏览器或 Node 发起）：

- 创建主文档对象 `document`、解析 HTML、执行主线 JS 代码、更改当前 URL
- 各种事件（页面加载、鼠标事件、键盘事件、`setTimeout`、`setInterval`、网络事件）
- `setImmediate`、I/O

**微任务**（由 JS 引擎自身发起，在下次渲染之前执行，用于更新应用状态）：

- `Promise` —— `resolve` 在同步任务里，`then` 回调加入微任务
- `async/await` —— `await` 之前是同步的，遇到 `await` 执行其后的函数并返回一个 promise，`await` 下面的代码放入微任务
- `process.nextTick` —— 优先级最高，最先执行
- `Object.observe`、`MutationObserver` \[1\]

### 新分法：W3C 的多队列模型

任务本身**没有优先级**（队列内先进先出），但**队列有优先级**。随着程序日益复杂，宏/微两个队列已不够用。按 W3C 最新解释：

- 每个任务都有一个**任务类型**，同类型的任务必须在同一个队列，不同类型的任务可分属不同队列
- 一次事件循环中，浏览器可根据实际情况从**不同队列**取任务执行
- 浏览器**必须**准备一个**微队列**，微队列中的任务优先于其他任务执行

Chrome 至少包含这些队列：

| 队列 | 优先级 | 存放内容 |
| --- | --- | --- |
| 微队列 | 最高 | `Promise.then` 回调、`await` 之后的代码、`MutationObserver` |
| 交互队列 | 高 | 用户操作产生的事件处理任务 |
| 延时队列 | 中 | 计时器到达后的回调任务 |

> 事件循环执行完一次「取任务 → 执行」后，会检查是否需要更新 UI（渲染）。\[1\]\[2\]

---

## 五、经典例题：async/await + Promise + setTimeout

```js
console.log('script start')              // 1
async function async1() {
  console.log('async1 start')            // 2
  await async2()
  console.log('async2 end')              // 9
  console.log('async1 end')              // 10
}
async function async2() {
  console.log('async2')                  // 3
}
async1()
new Promise(resolve => {
  console.log('promise1 start')          // 4
  resolve()
  console.log('resolve1 end')            // 5
}).then(res => { console.log('recive resolve1') })   // 11

setTimeout(() => {                        // 宏任务
  console.log('setTimeout start')        // 12
  new Promise(resolve => {
    console.log('promise start')         // 13
    resolve()
    console.log('resolve end')           // 14
  }).then(res => { console.log('recive resolve') })  // 16
  console.log('setTimeout end')          // 15
}, 0)

new Promise(resolve => {
  console.log('promise2 start')          // 6
  resolve()
  console.log('resolve2 end')            // 7
}).then(res => { console.log('recive resolve2') })   // 11

console.log('script end')                // 8
```

输出顺序（`1-8` 为同步代码，`9-11` 为第一轮微任务，`12-16` 为宏任务及其微任务）：

```
script start → async1 start → async2 → promise1 start → resolve1 end
→ promise2 start → resolve2 end → script end
→ async2 end → async1 end → recive resolve1 → recive resolve2
→ setTimeout start → promise start → resolve end → setTimeout end → recive resolve
```

> 在线可视化工具：JS Visualizer 9000 (jsv9000.app) \[1\]

---

## 六、Node 的事件循环

Node 的事件循环由 **libuv** 实现，**每执行一次循环称为一个 Tick**，检查是否有事件待处理：有则取出事件及相关回调执行；没有则退出进程。这是典型的生产者/消费者模型 \[4\]。

### 六个阶段（循环顺序）

| 阶段 | 说明 |
| --- | --- |
| **timers** | 存放计时器回调。每次循环到达时检查计时是否结束，结束了才把回调推入队列 |
| **pending callbacks** | 执行上一轮延迟的 I/O 回调 |
| **idle, prepare** | 内部使用 |
| **poll**（轮询） | 除 timers、checks 外，绝大部分回调都在此：文件读取、`createServer()` 回调等 |
| **checks** | `setImmediate()` 的回调 |
| **close callbacks** | 关闭事件回调，如 `socket.on('close', ...)` |

### poll 阶段的运作方式

- 有回调 → 依次执行回调，直到清空队列
- 没有回调 → 等待其他队列出现回调，然后结束该阶段进入下一阶段；若其他队列也没有，则持续轮询等待

### 微任务不属于事件循环，但必须先清空

> 事件循环中，**执行一个回调前，必须先清空微任务队列**。优先级：`process.nextTick` > `Promise`。\[3\]

### Node 经典例题

```js
setImmediate(() => console.log(1))
process.nextTick(() => {
  console.log(2)
  process.nextTick(() => console.log(6))
})
console.log(3)
Promise.resolve().then(() => {
  console.log(4)
  process.nextTick(() => console.log(5))
})
// 输出：3 2 6 4 5 1
```

`timeout vs immediate`：

```js
// 顶层调用：顺序不确定
setTimeout(() => console.log('setTimeout'), 0)
setImmediate(() => console.log('setImmediate'))

// 放在 I/O 回调里：一定是 2 再 1
const fs = require('fs')
fs.readFile('./index.js', () => {
  setTimeout(() => console.log(1))
  setImmediate(() => console.log(2))
})
// 先输出 2，后输出 1
```

原因：文件读取完成时，循环正处于 poll 阶段，执行回调后 `setImmediate` 进 checks、`setTimeout` 进 timers；poll 发现其他队列有回调就结束本轮，先到 checks，所以先打印 2。\[3\]

> `setImmediate` 比 `setTimeout(fn, 0)` 高效得多 —— 后者还要检查计时是否结束，且最小执行时间是 4ms。\[3\]

---

## 七、面试高频问答

**Q：阐述一下 JS 的事件循环？**

事件循环又称消息循环，是浏览器渲染主线程的工作方式。Chrome 源码中开启一个不会结束的 for 循环，每次循环从消息队列取出第一个任务执行，其他线程在合适的时候把任务加到队列末尾。

过去把队列分为宏任务和微任务，如今已不够用。按 W3C 官方解释，每个任务有不同类型，同类型任务必须在同一队列，不同任务可分属不同队列；不同队列有不同优先级，一次事件循环中由浏览器自行决定取哪个队列的任务，但**浏览器必须有一个微任务队列，且微任务具有最高优先级，必须优先调度执行**。\[2\]

**Q：JS 中的计时器能做到精确计时吗？为什么？**

不能，三个原因：

1. 计算机硬件没有原子钟，无法做到精确计时
2. 操作系统的计时函数本身有少量偏差，JS 计时器最终调用的就是操作系统的函数
3. 按 W3C 标准，浏览器实现计时器时若嵌套层级超过 5 层，会带有 4 毫秒的最少时间 \[2\]

**Q：为什么说 JS 会阻碍渲染？**

```js
function delay(duration) {
  var start = Date.now()
  while (Date.now() - start < duration) {}
}
document.querySelector('button').onclick = function () {
  document.querySelector('h1').textContent = '我真帅'
  delay(3000)
}
```

点击后修改了 DOM，但**不会立即渲染**，渲染任务要排到事件队列末尾；而 `delay` 阻塞主线程 3 秒，3 秒后主线程才从队列里取到渲染任务，最后才把「我真帅」渲染到浏览器。\[2\]

**Q：如何理解 JS 的异步？**

JS 是单线程语言，因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。若用同步方式，极易导致主线程阻塞，一方面队列中其他任务得不到执行，另一方面页面无法及时更新，造成卡死。浏览器采用异步方式避免：遇到计时器、网络、事件监听等任务，主线程交给其他线程处理，自身立即结束，转而执行后续代码；其他线程完成后把回调包装成任务加入队列末尾，等待主线程调度。

---

## 八、延伸阅读（知识库内）

- \[浏览器渲染原理\]\[5\] —— 渲染时间点、解析 HTML/CSS、style/layout/layer/paint、合成线程、reflow
- \[异步I/O\]\[4\] —— 阻塞/非阻塞 I/O、Node 请求对象与线程池、事件驱动的高性能服务器
- \[手写Promise\]\[6\] —— Promise A+ 规范、链式调用、`runMicroTask` 兼容浏览器与 Node
- \[使用 requestAnimationFrame 制作动画\]\[7\] —— 每次重绘前执行，与 CSS 动画合并，只触发一次重排重绘

---

## 参考来源

\[1\] [Javascript执行机制，事件循环(event loop)](https://www.workbuddy.cn/space/d/UBljjANC0C9RI5YnTAUpZy) — 前端博客知识库\
\[2\] [事件循环](https://www.workbuddy.cn/space/d/liZJ5tuhSq7mcJGKqNLlV3) — 前端博客知识库\
\[3\] [Node的事件循环](https://www.workbuddy.cn/space/d/JOXnBWCqrU4AAFpJ641Poe) — 前端博客知识库\
\[4\] [异步I-O](https://www.workbuddy.cn/space/d/oS0IpmWwm27uDIfm47t42Z) — 前端博客知识库\
\[5\] [浏览器渲染原理](https://www.workbuddy.cn/space/d/dwkHs76rRkRJ1eNFGFPce3) — 前端博客知识库\
\[6\] [手写Promise](https://www.workbuddy.cn/space/d/ncyhd2LTSjmy7P3i2C2R0V) — 前端博客知识库\
\[7\] [使用requestAnimationFrame制作动画](https://www.workbuddy.cn/space/d/sDfQxWNrmmrcZEiefCXZ3Z) — 前端博客知识库

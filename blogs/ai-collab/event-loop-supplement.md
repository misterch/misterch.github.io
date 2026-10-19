---
title: 事件循环 — 知识库笔记尚未覆盖的补充点
date: 2026-10-16
categories:
 - javascript
 - 面试
tags:
 - 事件循环
 - 异步
 - 浏览器原理
 - node
 - 性能
---

> 对照知识库三篇笔记（\[Javascript执行机制，事件循环\]\[1\]、\[事件循环\]\[2\]、\[Node的事件循环\]\[3\]）后的查漏补缺，按「面试权重」排序。

---

## 一、概念层：两个容易说错的点

### 1. 「宏任务」不是规范术语

HTML 规范里只有 **task（任务）** 和 **microtask（微任务）** 两个词，「宏任务 macrotask」是社区约定俗成的说法，规范中并不存在。面试里可以补一句：「严格来说规范只区分 task 和 microtask，宏任务只是便于理解的说法」——这能立刻区分背书型和原理型候选人。

### 2. 微任务检查点只在调用栈为空时触发

微任务不是「随时插队」，而是 **JS 调用栈清空时才执行微任务检查点（perform a microtask checkpoint）**。所以：

- 同步递归 / 同步长任务执行期间，微任务**不会**插进来
- `await` 后面的代码之所以变成微任务，正是因为 await 让出了调用栈
- 清空微任务过程中**新产生的微任务**，会在本轮继续被清空（不是留到下一轮）

---

## 二、微任务细节（最高频的失分点）

### 3. `queueMicrotask()` —— 标准的入队 API

```js
queueMicrotask(() => console.log('micro'))
```

- 与 `Promise.then` 进的是同一个微任务队列，先入先出
- 区别：`queueMicrotask` 中抛出的错误会**直接冒泡到全局**，不会被 Promise 静默吞掉，调试更友好
- Node 也支持；Node 中它排在 `process.nextTick` 之后、`Promise` 同级

### 4. 微任务「饿死」浏览器

因为本轮要把微任务**清空**，所以：

```js
function loop() { queueMicrotask(loop) }  // 页面永久卡死，渲染与后续任务永不执行
```

后果：DOM 不再更新、交互无响应、后续宏任务永远排不上。Node 里同理，**递归 `process.nextTick` 会饿死事件循环**（官方明确警告：会让 I/O 永远得不到执行），所以递归要用 `setImmediate` 代替。

### 5. Promise 嵌套的「tick 数」—— 真正的难题

经典结论（现代 V8 / Node 12+）：

| 写法 | 额外消耗的微任务 tick |
| --- | --- |
| `Promise.resolve().then(f)` | 1 个 tick 后执行 `f` |
| `then` 回调里 `return` 一个**普通值** | 下游 `then` 再 +1 |
| `then` 回调里 `return` 一个 **Promise** | 下游 `then` **再 +2**（多一次 thenable 的 resolve job） |

```js
Promise.resolve().then(() => console.log(1))
  .then(() => console.log(2))
  .then(() => console.log(3))
  .then(() => console.log(4))
// 1 2 3 4 —— 每级各差 1 个 tick

Promise.resolve().then(() => Promise.resolve()).then(() => console.log('A'))
Promise.resolve().then(() => console.log('B'))
// 输出 B 再 A —— 返回 promise 多花 2 个 tick
```

> 版本坑：V8 7.2 之前，`await` 一个 promise 要消耗 **3 个 tick**；优化后为 **1 个 tick**。网上很多老题的答案因此已经过时，遇到争议题要先确认运行时版本。

### 6. `await` 的两个细节

- `await 非Promise值`（如 `await 1`）：仍会让出一次，等价于 `await Promise.resolve(1)`
- `async` 函数返回一个 promise 时，外层 `then` 同样要多等 2 个 tick（同第 5 条）

---

## 三、渲染与「一帧」的完整顺序

### 7. 一帧的完整流程（笔记只讲了「取任务执行」）

```
取出一个 task 执行
  ↓
清空所有微任务（含本轮新产生的）
  ↓
判断是否到了渲染时机（约 16.7ms，且有内容需要更新）
  ↓
是 → update the rendering：
     rAF 回调 → style → layout → paint → composite
  ↓
空闲期 → requestIdleCallback
```

关键点：**渲染不是每轮循环都发生**，浏览器会在微任务清空后自行决定是否更新 UI。

### 8. `requestAnimationFrame` 既不是宏任务也不是微任务

知识库里 rAF 只在「动画」笔记中出现，没讲它在事件循环中的位置：

- rAF 回调属于**渲染阶段（animation frame callbacks）**，在微任务清空之后、布局绘制之前执行
- 所以在**一轮循环内**改 DOM，只会在最后渲染一次 —— 这正是「读写分离避免布局抖动」的原理
- 标签页隐藏时 rAF **不执行**（笔记提到过这点）
- `setTimeout(0)` 与 rAF 谁先，**不保证**，取决于浏览器是否处于渲染时机，不要依赖这个顺序

### 9. `requestIdleCallback`

在浏览器空闲时段执行，回调收到 `deadline.timeRemaining()`；适合做日志上报、预加载等低优任务。**不要在回调里改 DOM**，那会重新触发 reflow，白白浪费空闲窗口。

### 10. `ResizeObserver` / `IntersectionObserver` 不在微任务队列

它们属于渲染阶段的回调（rAF 之后、绘制之后），**不是微任务**。而 `MutationObserver` 才是真正的微任务。

---

## 四、任务类型与调度（进阶）

### 11. `MessageChannel` —— 零延迟宏任务

```js
const ch = new MessageChannel()
ch.port1.onmessage = () => { /* 宏任务，但无 4ms 下限 */ }
ch.port2.postMessage(null)
```

- 比 `setTimeout(fn, 0)` 快且不受嵌套 5 层 4ms 限制
- **React Scheduler 就是用它做时间切片**：每 5ms 让出主线程给渲染/交互，避免长任务卡住页面

### 12. `scheduler.postTask()` / `scheduler.yield()`

Chrome 原生的优先级调度 API：`postTask(fn, { priority: 'user-blocking' | 'user-visible' | 'background' })`；`scheduler.yield()` 用于主动让出主线程并保持任务延续。这是「事件循环优先级」从浏览器内部走向开发者 API 的方向。

### 13. `dispatchEvent` 是同步派发

- 手工 `el.dispatchEvent(evt)`：在当前调用栈内**同步**执行监听器，不走队列
- 用户真实点击：由交互线程产生，进**交互队列**排队
- 这个区别常被用来解释「为什么手动触发事件和真实点击的输出顺序不一样」

### 14. 同步阻塞 API

`alert/confirm/prompt`、同步 XHR、`Atomics.wait` 会**直接冻结事件循环**（连渲染都停），属于必须规避的反模式。

---

## 五、并发：Worker

### 15. Web Worker 有独立的事件循环

Worker 运行在独立线程，拥有**自己的调用栈和消息队列**，与主线程并行，因此重计算不会卡住渲染。限制：无 DOM、`postMessage` 通信（对两端都是宏任务）、数据走结构化克隆。`SharedArrayBuffer` + `Atomics` 可共享内存，但 `Atomics.wait` 会阻塞。

---

## 六、Node 侧补充

### 16. 事件循环的退出条件不同（本质区别）

| 环境 | 无任务时 |
| --- | --- |
| 浏览器 | 主线程**休眠**，事件循环永不结束 |
| Node | 没有待处理回调和 handle 时，**退出进程** |

Node 里「进程为什么没退出」的经典答案：还有未 `unref` 的 timer / server / socket 在维持事件循环。

### 17. Node 11 前后微任务执行时机不同

- Node 11 之前：每个**阶段切换**时清空微任务
- Node 11 之后：**每个回调执行后**立即清空微任务（与浏览器行为对齐）

同一段代码在 Node 10 和 Node 12 上输出可能不同，这是老答案失效的重灾区。

### 18. `ref()` / `unref()`

`timer.unref()` 让这个定时器**不阻止进程退出**（仍会触发，若进程还活着）。常用于「保活但不希望拖住进程」的场景。

### 19. libuv 线程池默认只有 4 个线程

`UV_THREADPOOL_SIZE`（默认 4）影响的是：`fs`、`dns.lookup`、`crypto`、`zlib`；而**网络 I/O 不走线程池**（用 epoll/kqueue）。所以「Node 是单线程」的准确说法是：**JS 执行单线程，I/O 由 libuv 线程池 + 事件循环协作**。

### 20. `setTimeout` 的数值上限

超过 `2147483647` ms（约 24.8 天）会溢出并**立即执行**（置为 1ms）。这是个冷门但真实的坑。

### 21. 待核对：`setImmediate` 是否「每轮只执行一个回调」

笔记与《深入浅出 Node.js》的说法是「结果保存在链表中，每轮循环执行链表中的一个回调」。而**现代 Node 的 check 阶段会执行完 immediate 队列中的全部回调**（之后还会处理 `process.nextTick` 队列）。这两个说法来自不同版本，**建议以本机实测为准**，面试中不必主动提。

---

## 七、性能指标（把原理落地）

### 22. Long Task 与 INP

执行超过 **50ms** 的任务被定义为 Long Task —— 它会让用户交互的响应被推迟。由此引出优化手段，正好都能用事件循环解释：

- 长任务**切片**（`MessageChannel` / `scheduler.yield` / `setTimeout` 让出）
- 大计算搬到 **Web Worker**
- 用 **rAF** 对齐渲染节奏，避免无效重排

---

## 八、建议补充的练习题

1. 写出 `promise + 返回 promise` 嵌套的输出顺序（考第 5 条）
2. 解释为什么 `await` 之后的代码是微任务（考第 1、2 条）
3. 一个微任务里递归入队微任务，页面会怎样（考第 4 条）
4. `setTimeout(0)`、`Promise`、`rAF`、`queueMicrotask` 混排的顺序（考第 3、7、8 条）
5. Node 中 `nextTick` 递归的后果与替代方案（考第 4、16 条）

---

## 参考来源

\[1\] [Javascript执行机制，事件循环(event loop)](https://www.workbuddy.cn/space/d/UBljjANC0C9RI5YnTAUpZy)\
\[2\] [事件循环](https://www.workbuddy.cn/space/d/liZJ5tuhSq7mcJGKqNLlV3)\
\[3\] [Node的事件循环](https://www.workbuddy.cn/space/d/JOXnBWCqrU4AAFpJ641Poe)\
\[4\] [异步I-O](https://www.workbuddy.cn/space/d/oS0IpmWwm27uDIfm47t42Z)\
\[5\] [浏览器渲染原理](https://www.workbuddy.cn/space/d/dwkHs76rRkRJ1eNFGFPce3)

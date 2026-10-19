---
title: 《手写Promise》笔记解析
date: 2026-10-16
categories:
 - javascript
 - 笔记解析
tags:
 - Promise
 - 异步
 - 手写实现
 - 面试
---

> 原文：《手写Promise》（资料库文档，2023-10-11 创建）\
> 定位：面试向的 Promise 原理梳理 + 核心手写实现

## 一、笔记元信息

| 项 | 内容 |
| --- | --- |
| 日期 | 2023-10-11 |
| categories | javascript、ecmascript、面试 |
| tags | 原理、异步 |
| 篇幅 | 4 个小节 + 1 段完整代码 + 1 个 StackBlitz 演示 |
| 覆盖范围 | 仅核心部分（then / 状态机 / 微任务），不含 catch、finally、静态方法 |

## 二、内容结构

笔记按「规范 → 原理 → 实现 → 总结」四段推进，是一条完整的从理论到落地的链路：

1. **Promise 规范**：A+ 规定的四个基本约定
2. **链式调用**：then 的返回值与状态传递规则
3. **实现 Promise 核心部分**：可直接运行的手写代码
4. **总结**：四条结论性归纳

## 三、逐节解析

### 1. Promise 规范

把「所有异步场景」抽象为**异步任务**，用**任务对象（Promise）**表示，并给出四条规则：

- **两个阶段、三个状态**：未决（pending）→ 已决（fulfilled / rejected）。
- **状态不可逆**：任务总是从未决走向已决，从挂起走向完成或失败，「历史不可改写」——一旦 settled 就永久固定。
- **两个迁移动作**：`挂起 → 完成` 称为 `resolve`；`挂起 → 失败` 称为 `reject`。完成可能带**数据**，失败可能带**失败原因**。
- **两类后续处理**：完成后的处理叫 `onFulfilled`，失败后的处理叫 `onRejected`。

> 这一节是整篇笔记的「状态机定义」，后面的实现基本是它的直译。

### 2. 链式调用

核心结论两条：

- `then` **一定返回一个新的 Promise**——可理解为「后续处理本身也是一个任务」。
- **新任务的状态取决于后续处理**，分五种情况：

| 后续处理情况 | 新任务状态 |
| --- | --- |
| 没有对应的后续处理 | 与前任务一致，数据为前任务的数据 |
| 有后续处理但还没执行 | 新任务挂起（pending） |
| 处理执行成功（无错） | fulfilled，数据为**返回值** |
| 处理执行抛错 | rejected，数据为**异常对象** |
| 处理返回的又是一个任务对象 | 新任务状态与数据**与该任务对象一致** |

### 3. 实现 Promise 核心部分（代码解析）

代码由四块组成：

**① 常量**：`PENDING / FULLFILLED / REJECTED`（注意 `FULLFILLED` 是拼写笔误，应为 `FULFILLED`，因全局统一所以不影响运行）。

**② `runMicroTask(task)`**：微任务调度，按 Node → 浏览器 → 兜底三级降级：\
`process.nextTick` → `MutationObserver` → `setTimeout(task, 0)`。

**③ `isPromise(obj)`**：鸭子类型判断——是对象且 `then` 为函数。

**④ `class MyPromise`**，核心方法：

| 方法 | 作用 |
| --- | --- |
| `constructor(execute)` | 初始化 `_value / _state / _handlers`，try-catch 包裹执行器，同步抛错直接 `_reject` |
| `changeState(data, state)` | 状态机闸门：非 pending 直接 return；否则写值、写状态，然后触发队列 |
| `_resolve / _reject` | 对 `changeState` 的语义封装 |
| `then(onFulfilled, onRejected)` | 返回**新 MyPromise**，把两个回调入队，并主动触发一次队列 |
| `_pushToQueue(...)` | 把 `{executor, state, resolve, reject}` 压入 `_handlers` |
| `_runHandlers()` | pending 时不动；否则 while 循环 shift 出队逐个执行 |
| `_runOneHandler(...)` | 包进微任务后执行：状态不匹配→跳过；回调非函数→透传状态与值；回调正常返回→resolve；返回 Promise→`result.then(resolve, reject)` 接管；抛错→reject |

**设计要点**：这是典型的**发布订阅 + 状态机**模型。`then` 只负责「登记回调」和「尝试执行」，真正的执行时机由 **settled 事件**（`changeState`）驱动；两者都会调用 `_runHandlers()`，因此无论「先 then 后 resolve」还是「先 resolve 后 then」都能正确执行。

**演示用例**：`p → p2 → p3` 的三级链式，配合 `setTimeout` 校验 1s 后各 Promise 的最终状态，另附一个 StackBlitz 在线 demo（iframe）。

### 4. 总结（原文四条）

1. `then` 是把回调加入**微队列**，等状态确定为 settled 才执行。
2. 多次调用 `then` 会把回调依次入队，状态确定后**一次性执行完队列**。
3. **状态确定**或**调用 then** 都会触发队列执行。
4. `then` 的回调若不是函数，则状态与前一个 `then` 保持一致。

## 四、链式调用的状态传递实例

> 以下用例均已在 Node 环境实际运行，输出为真实结果。

### 判断流程

```
then 产生新任务 child
├─ 当前分支的回调不是函数 ──────────→ child 透传父任务状态和值
└─ 是函数
   ├─ 还未执行（微任务未到）────────→ child 处于 pending
   └─ 已执行
      ├─ 抛错 ──────────────────────→ child = rejected(异常)
      └─ 正常返回 v
         ├─ v 是 thenable/Promise ───→ child 跟随 v 的状态和值
         └─ 否则 ────────────────────→ child = fulfilled(v)
```

### 实例 1：没有对应后续处理 → 状态与数据完全透传

```js
// fulfilled 分支无回调
Promise.resolve('A').then().then(v => console.log(v));   // A
// rejected 分支无回调
Promise.reject('E').then().catch(e => console.log(e));   // E
```

关键点：`.then()` 没有传任何参数，两个分支都「不是函数」，所以原样透传状态与值。

### 实例 2：有后续处理但尚未执行 → 新任务挂起

```js
const p  = new Promise(r => setTimeout(() => r('A'), 100));
const p2 = p.then(v => v + '!');

console.log(p2);              // Promise { <pending> }   ← 同步时刻
p2.then(v => console.log(v)); // A!                      ← 100ms 后
```

关键点：`then` 返回时回调还没跑，`p2` 只能挂起；最终状态要等回调执行完才确定。

### 实例 3：后续处理执行成功 → fulfilled，数据为返回值

```js
Promise.resolve('A').then(v => v + 'B').then(v => console.log(v)); // AB
```

### 实例 4：后续处理执行抛错 → rejected，数据为异常对象

```js
Promise.resolve('A')
  .then(() => { throw new Error('boom') })
  .catch(e => console.log(e.message));   // boom
```

### 实例 5：后续处理返回任务对象 → 新任务跟随它

```js
// 5.1 返回已拒绝的 Promise
Promise.resolve('A').then(() => Promise.reject('E2'))
  .catch(e => console.log(e));                            // E2

// 5.2 返回挂起的 Promise
const p5 = Promise.resolve('A')
  .then(() => new Promise(r => setTimeout(() => r('late'), 500)));
console.log(p5);            // Promise { <pending> }
p5.then(v => console.log(v));  // late（500ms 后）

// 5.3 返回 thenable（非真 Promise 也认）
Promise.resolve('A').then(() => ({ then(res) { res('thenable'); } }))
  .then(v => console.log(v));                             // thenable
```

关键点：返回 Promise 时不只是「取值」，而是**等它 settled** 再同步状态，这也解释了为什么 `p5` 会多挂起 500ms。

### 两个容易踩的坑

**1. onRejected 分支同样适用整条规则**

```js
Promise.reject('E3').then(null, e => e + '!')
  .then(v => console.log(v));        // E3!   ← 失败被「恢复」为成功

Promise.reject('E4').then(v => v)
  .catch(e => console.log(e));       // E4    ← 只给了 onFulfilled，等同于无处理
```

**2. 返回自身会抛 TypeError（原生行为）**

```js
const p8 = Promise.resolve().then(() => p8);
p8.catch(e => console.log(e.constructor.name));  // TypeError
// 信息：Chaining cycle detected for promise
```

这正是第五节点评第 6 条提到的缺口——笔记里的 `MyPromise` 没有校验 `result === 新 Promise`，遇到循环引用会无限等待。

### 实例对照表

| 后续处理 | 新任务状态 | 数据来源 |
| --- | --- | --- |
| 无回调 / 回调非函数 | 与父任务一致 | 父任务的值 |
| 回调未执行 | pending | 暂无 |
| 回调返回普通值 | fulfilled | 返回值 |
| 回调抛错 | rejected | 异常对象 |
| 回调返回 Promise / thenable | 跟随该对象 | 该对象的值 |
| 回调返回自身 | rejected | TypeError |

## 五、问题与可改进点（Code Review）

| # | 位置 | 问题 | 建议 |
| --- | --- | --- | --- |
| 1 | `runMicroTask` | `if(process && process.nextTick)` 在浏览器中 `process` 未定义会抛 **ReferenceError**，导致直接落到 catch 之外的崩溃 | 改为 `typeof process !== 'undefined' && process.nextTick` |
| 2 | `runMicroTask` | `else if(MutationObserver)` 同理，非浏览器也是裸引用 | 改为 `typeof MutationObserver !== 'undefined'` |
| 3 | 常量 | `FULLFILLED` 拼写错误（fulfilled），易误导阅读者 | 统一改为 `FULFILLED` |
| 4 | `runMicroTask` | Node 下用 `process.nextTick`——它**优先级高于 Promise 微任务**，与原生 Promise 的执行时序不一致 | 面试讲解时可注明差异，或改用 `queueMicrotask` |
| 5 | `then` + `_runOneHandler` | 每次 `then` 把 onFulfilled/onRejected **都入队**，靠 state 匹配过滤、不匹配的直接丢弃，语义略绕且队列无谓翻倍 | 可改成按当前状态二选一入队，更贴近 A+ 描述 |
| 6 | 循环引用 | 未处理「回调返回当前 Promise 自身」的情况，A+ 要求抛 `TypeError` | 增加 `result === newPromise` 的守卫 |
| 7 | API 覆盖 | 只有核心部分，缺 `catch`、`finally`、`Promise.resolve/reject/all/race/allSettled/any` | 作为「手写 Promise 全量」需补齐；笔记已注明是「核心部分」，可接受 |
| 8 | 演示代码 | `return Promise.reject('p2执行错误')` 混用了**原生 Promise** 与 `MyPromise` | 改为 `MyPromise.reject(...)` 以验证自己的实现 |
| 9 | 图片资源 | 规范与链式调用小节用 `./img/20210618*.png` 相对路径引用，在资料库文档中**无法渲染**（图片丢失） | 重新上传图片或改为在线图床链接 |
| 10 | 文档结构 | front matter 被写成了正文列表（`title:/date:/categories:` 以纯文本散落在段落与列表中） | 若要保持 front matter 语义，应放在文档顶部并由编辑器识别 |

## 六、知识点小结（可迁移结论）

- **三状态两阶段 + 状态不可逆**，是 Promise 一切行为的地基。
- **回调队列（发布订阅）** 解决了「then 早于 resolve 调用」的时序问题。
- **微任务调度** 保证回调异步执行，不阻塞同步代码。
- **then 返回新 Promise** 是链式调用的关键，也是「后续处理即一个新任务」的落地方式。

## 七、原文位置速查

| 小节 | 内容类型 |
| --- | --- |
| Promise规范 | 2 个有序列表 + 4 张说明图（图片缺失） |
| 链式调用 | 1 张状态图（缺失）+ 2 条有序列表 |
| 实现Promise核心部分 | 1 段完整 JS 代码 + 1 个 StackBlitz iframe |
| 总结 | 4 段结论性文字 |

---
title: 不再手动try...catch，更优雅的async/await错误处理模式
date: 2026-04-14
categories: 
 - 工具函数
tags:
 - try...catch
 - async/await
---

`async/await` 是 ES7 中引入的语法糖，它彻底改变了 JavaScript 中异步编程的方式。它让我们能够以一种看似同步的方式编写异步代码，极大地提高了代码的可读性和可维护性。

然而，凡事皆有两面。当我们享受 `async/await` 带来的便利时，一个“老朋友”却如影随形，那就是 `try...catch`。

#### 问题的根源：无处不在的 `try...catch`

为了捕获 `await` 后面 Promise 的 `reject` 状态，我们必须将代码包裹在 `try...catch` 块中。让我们来看一个典型的例子，比如从服务器获取用户信息：

```javascript
import { fetchUserById } from './api';

async function displayUser(userId) {
  try {
    const user = await fetchUserById(userId);
    console.log('用户信息:', user.name);
    // ... 更多基于 user 的操作
  } catch (error) {
    console.error('获取用户失败:', error);
    // ... 相应的错误处理逻辑，比如显示一个提示
  }
}

```

这段代码本身没有问题，它能正常工作。但问题在于，如果你的业务逻辑稍微复杂一点，比如需要连续请求多个接口，代码就会变成这样：

```javascript
async function loadPageData(userId) {
 try {
    const user = await fetchUserById(userId);
    console.log('用户信息:', user.name);

    try {
      const posts = await fetchPostsByUserId(user.id);
      console.log('用户文章:', posts);

      try {
        const comments = await fetchCommentsForPosts(posts[0].id);
        console.log('文章评论:', comments);
      } catch (commentError) {
        console.error('获取评论失败:', commentError);
      }
    } catch (postError) {
      console.error('获取文章失败:', postError);
    }
  } catch (userError) {
    console.error('获取用户失败:', userError);
  }
}

```

#### 优雅的解决方案：Go 语言风格的错误处理

我们可以借鉴 Go 语言的错误处理模式。在 Go 中，函数通常会返回两个值：`result` 和 `error`。调用者通过检查 `error` 是否为 `nil` 来判断操作是否成功。

我们可以将这种思想引入到 JavaScript 的 `async/await` 中。创建一个辅助函数（我们称之为 `to`），它接收一个 Promise作为参数，并且**永远不会被 `reject`**。相反，它总是 `resolve` 一个数组，格式为 `[error, data]`。

- 如果 Promise 成功 `resolve`，它返回 `[null, data]`。
- 如果 Promise 失败 `reject`，它返回 `[error, null]`。

让我们来实现这个 `to` 辅助函数。

```typescript
function to<T>(promise:Promise<T>):Promise<[Error|null,T|undefined]>{
  return promise
  	.then<[null,T]>((data:T)=>[null,data])
  	.catch<[Error,undefined]>((err:Error)=>[err,undefined])
}
```

这个 `to` 函数非常小巧，但威力巨大。它将 `try...catch` 的逻辑**封装**在了内部，向我们暴露了一个统一、扁平的接口。

#### 新模式的优势总结

1. **代码更扁平、更清晰**：消除了 `try...catch` 的嵌套，让核心逻辑处于顶层作用域。
2. **减少样板代码**：将错误处理逻辑封装在可复用的 `to` 函数中。
3. **强制性的错误处理**：解构赋值 `const [error, data]` 迫使开发者正视 `error` 的存在，不容易遗漏错误处理。
4. **关注点分离**：通过卫语句将错误处理逻辑与成功逻辑分离开，代码更易于维护。





### 参考

[别再手动 try...catch 了：一种更优雅的 async/await 错误处理模式async/await 是 ES - 掘金](https://juejin.cn/post/7592127014188744704)


---
title: pinia的使用和最佳实践
date: 2023-10-23
categories:
 - vue3
tags:
 - pinia
---

## 安装 Pinia

首先第一步，需要安装 Pinia，可以通过下面的命令进行安装：

```js
npm install pinia
```

安装完毕后，需要在 Vue 应用中挂载 Pinia

```js
import { createPinia } from "pinia";
// 创建 pinia 实例
const pinia = createPinia();
createApp(App).use(router).use(pinia).mount("#app");
```

在 src 目录下面创建仓库目录 `store`，在该目录下面创建对应的仓库文件，注意名字一般是 **`useXXXStore`**

在仓库文件中，我们可以通过 `defineStore` 来创建一个 pinia 仓库，如下：

```js
// 仓库文件
import { defineStore } from "pinia";

// 第二个参数支持两种风格：options api 以及 composition api
export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      num: 0,
    };
  },
});
```

创建的时候支持两种风格，选项式 API 以及组合式 API。



## 选项式风格

该风格基本上和之前的 Vuex 是非常相似的，只不过没有 `mutation` 了，无论是同步的方法还是异步的方法，都写在 `actions` 里面。

```js
// 仓库文件
import { defineStore } from "pinia";

// 第二个参数支持两种风格：options api 以及 composition api
export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      num: 0,
    };
  },
  getters: {
    // 针对上面 state 的数据做一个二次计算
    // 可以看作是计算属性
    doubleCount: (state) => state.num * 2,
  },
  actions: {
    // 同步方法
    increment() {
      this.num++;
    },
    decrement() {
      this.num--;
    },
    // 异步方法
    async asyncIncrement() {
      // 等待 1 秒钟
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.increment();
    },
    async asyncDecrement() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.decrement();
    },
  },
});

```

在组件中使用仓库数据时，首先引入仓库方法，并执行该方法：

```js
import { useCounterStore } from "@/store/useCounterStore.js";
const store = useCounterStore(); // 拿到仓库
```

如果是要获取数据，为了保持数据的响应式，应该使用 **`storeToRefs`** 方法。

```js
import { storeToRefs } from "pinia";
// 接下来我们可以从仓库中解构数据出来
const { num, doubleCount } = storeToRefs(store);
```

如果是获取方法，直接从 `store` 里面解构出来即可。

```js
// 从仓库将方法解构出来
const { increment, asyncIncrement, asyncDecrement } = store;
```



另外，仓库还提供了两个好用的 api：

- store.$reset ：重置 state
- store.$patch：变更 state



## 组合式风格

组合式风格就和 Vue3 中的使用方法是一样的，通过 `ref` 或者 `reactive` 来定义仓库数据。

通过普通的方法来操作仓库数据。无论是数据还是方法最终需要导出出去。

通过 `computed` 来做 getter。

```js
import { defineStore } from "pinia";
import { reactive, computed } from "vue";

// 引入其他仓库
import { useCounterStore } from "./useCounterStore.js";

export const useListStore = defineStore("list", () => {
  const counterStore = useCounterStore();
  // 组合 api 风格

  // 创建仓库数据，类似于 state
  const list = reactive({
    items: [
      {
        text: "学习 Pinia",
        isCompleted: true,
      },
      {
        text: "打羽毛球",
        isCompleted: false,
      },
      {
        text: "玩游戏",
        isCompleted: true,
      },
    ],
    counter: 100,
  });

  // 使用 vue 里面的计算属性来做 getters
  const doubleCounter = computed(() => {
    return list.counter * 2;
  });
  // 接下来我们再来创建一个 getter，该 getter 使用的是其他仓库的数据
  const otherCounter = computed(() => {
    return counterStore.doubleCount * 3;
  });

  // 添加新的事项
  function addItem(newItem) {
    list.items.push({
      text: newItem,
      isCompleted: false,
    });
  }

  // 切换事项对应的完成状态
  function completeHandle(index) {
    list.items[index].isCompleted = !list.items[index].isCompleted;
  }

  // 删除待办事项对应下标的某一项
  function deleteItem(index) {
    list.items.splice(index, 1);
  }

  return {
    list,
    doubleCounter,
    otherCounter,
    addItem,
    completeHandle,
    deleteItem,
  };
});

```

在一个仓库中，可以使用其他仓库的 getter 数据。两种风格都可以使用。



## 真题解答

> 题目：是否使用过 Pinia？简单谈一下 Pinia 的使用？
> 参考答案：
>
> 在 Pinia 中，核心概念有
>
> - state：仓库的核心，主要是用于维护仓库的数据
> - getters：用于对数据做二次计算的，等同于 store 的 state 的计算值
> - actions ：对仓库状态进行操作的方法
>
> 相比 Vuex，Pinia 中没有 mutations，同步方法和异步方法都放在 actions 里面。Pinia 同时支持 Vue2 和 Vue3，内部支持两种编码风格，分别是：
>
> - 选项式 API ：编码风格基本就和之前的 Vuex 是相似的
> - 组合式 API ： 编码风格和 Vue3 非常相似，使用 ref 或者 reactive 来定义仓库数据，使用 computed 来做 getters，actions 里面的方法直接书写即可，最后将数据和方法通过 return 导出。

## 最佳实践

- 分离状态逻辑和业务逻辑

  这就是使用状态管理库的目的，为的就是将组件的状态分离出来，这样可以方便维护，也方便组件之间进行状态的共享

- 选择pinia来进行状态管理

- 避免直接操作store的状态

  虽然可以直接操作store的状态，但是要避免直接操作store，最好通过对应的getters来读取，actions来修改

  这样做的好处是可以提高代码的可维护性，数据的改变始终来源于actions的方法，而不是分散于各个组件中

- 使用typescript

  pinia本身是使用typescript编写的，因此我们在使用pinia的时候，能够非常方便非常自然的使用typescript，使用typescript可以更好地提供类型检查和代码提示，让我们的代码更加可靠和易于维护

- 将状态划分为多个模块

  在一个大型应用中，如果将所有组件的状态防止在一个状态仓库中，那么会显得该状态仓库非常臃肿。因此一般在大型项目中，是一定会将状态仓库进行拆分的。

  在早期vuex中，就已经支持将状态仓库按照不同的功能模块进行拆分，只不过在vuex时期，状态仓库拆分按照的是嵌套的方式进行代码组织

  在pinia中，组织状体仓库的形式不在采用像vuex一样的嵌套，二十采用扁平化设计，每个状态仓库都是独立的，这就是pinia名字的来源
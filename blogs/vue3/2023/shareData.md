---
title: vue3数据共享
date: 2023-10-23
categories:
 - vue3
 - 面试
tags:
 - vue3最佳实践
---

## vuex

```js
// ./store/loginUser.js
import * as userServ from "../api/user";
export default {
  namespaced: true,
  state: {
    user: null,
    loading: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async login({ commit }, { loginId, loginPwd }) {
      commit("setLoading", true);
      const user = await userServ.login(loginId, loginPwd);
      commit("setUser", user);
      commit("setLoading", false);
      return user;
    },
    async loginOut({ commit }) {
      commit("setLoading", true);
      await userServ.loginOut();
      commit("setUser", null);
      commit("setLoading", false);
    },
    async whoAmI({ commit }) {
      commit("setLoading", true);
      const user = await userServ.whoAmI();
      commit("setUser", user);
      commit("setLoading", false);
    },
  },
};


// ./store/index.js
import loginUser from "./loginUser";
import { createStore, createLogger } from "vuex";
export default createStore({
  modules: {
    loginUser,
  },
  plugins: [createLogger()],
});
```

在入口文件中导入仓库并在应用中使用仓库

```js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
createApp(App).use(router).use(store).mount("#app");
//可以脱离组件使用共享数据
store.dispatch("loginUser/whoAmI");
```



## 全局共享

使用vue3响应式API，可以做成一个返回响应式数据的函数供全局使用

```js:{5,9}
// src/store/userStore.js
import { reactive, readonly } from "vue";
import * as userServ from "../api/user"; // 导入api模块
// 创建默认的全局单例响应式数据，仅供该模块内部使用
const state = reactive({ user: null, loading: false });

// 对外暴露的数据是只读的，不能直接修改
// 也可以进一步使用toRefs进行封装，从而避免解构或展开后响应式丢失
export const loginUserStore = readonly(state);

// 登录
export async function login(loginId, loginPwd) {
  state.loading = true;
  const user = await userServ.login(loginId, loginPwd);
  state.user = user;
  state.loading = false;
}
// 退出
export async function loginOut() {
  state.loading = true;
  await userServ.loginOut();
  state.loading = false;
  state.user = null;
}
// 恢复登录状态
export async function whoAmI() {
  state.loading = true;
  const user = await userServ.whoAmI();
  state.loading = false;
  state.user = user;
}
```



## provide和inject

创建一个仓库，提供各种功能和安全的全局数据，使用vue3的`privide()`在全局应用注入

```js:{9,32-37}
// src/store/userStore.js
import { readonly, reactive, inject } from "vue";
import * as userServ from "../api/user";
const key = Symbol(); // Provide的key

// 在传入的vue应用实例中提供数据
export function provideStore(app) {
  // 创建默认的响应式数据
  const state = reactive({ user: null, loading: false });
  // 登录
  async function login(loginId, loginPwd) {
    state.loading = true;
    const user = await userServ.login(loginId, loginPwd);
    state.user = user;
    state.loading = false;
  }
  // 退出
  async function loginOut() {
    state.loading = true;
    await userServ.loginOut();
    state.loading = false;
    state.user = null;
  }
  // 恢复登录状态
  async function whoAmI() {
    state.loading = true;
    const user = await userServ.whoAmI();
    state.loading = false;
    state.user = user;
  }
  // 提供全局数据
  app.provide(key, {
    state: readonly(state), // 对外只读
    login,
    loginOut,
    whoAmI,
  });
}
// 提供数据
export function useStore(defaultValue = null) {
  return inject(key, defaultValue);
}
```

在store/index.js

```js
import {provideStore as provideLoginUserStore} from './useLoginUser'
export default function provideStore(app){
  provideLoginUserStore(app)
}
```

在入口文件中将仓库的数据提供到应用所有组件

```js:{5}
//main.js
import App from './App.vue'
import provideStore from './store'
const app = createApp(App).use(router)
provideStore(app)
app.mount('#app')
```

在组件中注入仓库提供的数据

```js
import {useStore} from './store/userLoginUser'
export default {
  setup(){
    const store = useStore()
    return {
      ...store //state,login,loginOut,whoAmI
    }
  }
}
```

:exclamation::exclamation::exclamation:**注意**：`provide`和`inject`不能脱离组件使用

## 对比

|              | vuex               | global state       | Provide&Inject     |
| ------------ | ------------------ | ------------------ | ------------------ |
| 组件数据共享 | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| 可否脱离组件 | :white_check_mark: | :white_check_mark: | :x:                |
| 调试工具     | :white_check_mark: | :x:                | :white_check_mark: |
| 状态数       | :white_check_mark: | 自行决定           | 自行决定           |
| 量级         | 重                 | 轻                 | 轻                 |


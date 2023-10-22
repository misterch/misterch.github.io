---
title: Vue3 API和响应式的变化
date: 2023-10-21
categories:
 - vue3
 - 面试
---

## 去掉了Vue构造函数

在vue2中，如果遇到一个页面有多个vue应用时，会遇到一些问题

```html
<div id="app1"></div>
<div id="app2"></div>
<script>
  //这些都会影响所有的Vue应用
  Vue.use()
  Vue.mixin()
  Vue.component()
  
	new Vue({}).$mount('#app1')
	new Vue({}).$mount('#app2')
</script>
```

在vue3中，去掉了`Vue`构造函数，通过`createApp`创建vue应用

vue3将vue2的Vue构造函数的静态方法放到了实例中

```html
<div id="app1"></div>
<div id="app2"></div>
<script>
	createApp(根组件).use().component().mount('#app1')
	createApp(根组件).use().mount('#app2')
</script>
```

### 应用实例的API

```js
const app = createApp()
app.mount()
app.unmount()
app.component()
app.directive()
app.use()
app.mixin()
app.privide()
app.runWithContext()

app.config
```



### 面试题

:::tip 面试题

Q：为什么vue3中去掉vue构造函数？

A：

vue2的全局构造函数带来了住多问题

1. 调用构造函数的静态方法会对所有vue应用生效，不利于隔离不同应用
2. vue2的构造函数集成了太多功能，不利于tree shaking，vue3把这些功能使用普通函数导出，能够充分利用tree shaking优化打包体积
3. vue2没有把组件实例和vue应用两个概念区分开，通过new Vue创建的对象，既是一个vue应用，同时又时一个特殊的vue组件。vue3中，把两个概念区别开，通过createApp创建的对象是一个vue应用，它内部提供的方法正对整个应用，而不再是一个特殊的组件

:::

## 组件实例中的API

组件实例中的API是除了应用实例外的属性和方法

### 选项式API

只有在组件创建之后（created）才能通过this获取到组件实例上的属性和方法

```js
$data
$props
$el
$options
$parent
$root
$slots
$attrs
$watch()
$emit()
$nextTick()
```

### 组合式API

#### setup

在`setup`函数中，**返回的对象会暴露给模板和组件实例**

`setup`自身不含有对组件实例的访问权，**即在`setup`中访问`this`是`undefined`**

`setup(props,context)`有两个参数

**props**：传给组件的响应式对象，解构`props`可以使用`toRefs()`和`toRef()`，否则直接解构失去响应性

**context**：`setup`上下文对象，非响应式，可直接解构

`context`对象含有的属性：`attrs`、`slots`、`emit`、`expose`等

#### 生命周期钩子

[组合式 API：生命周期钩子 | Vue.js (vuejs.org)](https://cn.vuejs.org/api/composition-api-lifecycle.html)

## 对比数据响应式

vue2和vue3都在相同的生命周期完成数据响应式，但做法不一样

vue2使用`Object.defineProperty()`对data对象中的属性逐个遍历实现响应式

vue3使用`proxy`代理`data`对象，无需遍历每个属性套上`Object.defineProperty`，效率极高

### 面试题

:::tip 面试

Q：对vue3数据响应式的理解

A：

vue3不再使用`Object.defineProperty()`的方式定义完成数据响应式，而是使用`Proxy`

除了Proxy本身效率比`Object.defineProperty()`更高之外，由于不必递归遍历所有属性，而是直接得到一个proxy对象。所以在vue3中，对数据的访问是动态的，当访问某个属性的时候，再动态获取和设置，这就几大地提升了在组件初始阶段的效率

同时，由于Proxy可以监控到成员的新增和删除，因此在vue3中新增成员、删除成员、索引访问等均可以触发重新渲染，而在vue2中难以做到

:::

---
title: Composition API
date: 2023-10-22
categories:
 - vue3
 - 面试
tags:
 - 原理
---

:::tip

不同于reactivity api，composition api提供的函数很多事与组件深度绑定的，不能脱离组件存在

:::

## setup

`setup`函数在**组件被赋值后立即执行**，**早于**所有生命周期钩子函数

在`setup`函数中，**返回的对象会暴露给模板和组件实例**

`setup`自身不含有对组件实例的访问权，**即在`setup`中访问`this`是`undefined`**

`setup(props,context)`有两个参数

**props**：传给组件的响应式对象，解构`props`可以使用`toRefs()`和`toRef()`，否则直接解构失去响应性

**context**：`setup`上下文对象，非响应式，可直接解构

`context`对象含有的属性：`attrs`、`slots`、`emit`、`expose`等

## 面试题

:::tip 面试题1

Q：组合式API比选项式API有哪些优势？

A：

1. 为了更好的逻辑复用和代码组织

有了组合式API，配合响应式API，可以在组件内部进行更加细粒度的控制，使得组件中不同的功能高度聚合，提升了代码的可维护性。对于不同组件的相同功能，也能够更好的复用。

2. 更好的类型推断

相比于选项式API，组合式API中没有了指向奇怪的this，所有API变得更加函数式，这有利于类型推断系统（比如TS深度配合）

:::
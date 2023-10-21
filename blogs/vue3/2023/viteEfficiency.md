---
title: vite效率的提升
date: 2023-10-21
categories:
 - vite
 - 面试
tags:
 - 优化
---

## 静态提升

vue3的预编译器（插件）在编译单文件组件的过程中将模板（template）编译成render函数。render函数会对**静态节点**和**静态属性**进行提升

静态节点

- 元素节点
- 没有板顶动态内容

静态属性

例如`<div class="user">{{user.name}}</div>`，虽然div是动态的（因为内容是动态的），但div上的属性是静态的，所以会将属性进行提升

render函数是经常需要调用的，一些不变的节点和属性可以提取出render函数以外，不用每次render运行时重复创建

```js
//vue2的静态节点
function render(){
  const hoisted = createVNode("h1",null,"hello world")
}

//vue3的静态节点
const hoisted = createVNode("h1",null,"hello world")
function render(){
  //直接使用hoisted即可
}
```



## 预字符串化

当编译器遇到大量连续的静态内容（一般是20个节点），会直接使用`createStaticVNode(template)`将其编译为一个普通字符串节点，即不会将template的静态内容编译成虚拟DOM，而是直接输出真实DOM

## 缓存事件处理函数

事件处理函数一般是不会改变的，所以vue3对事件进行了缓存处理，不需要每次render时都创建事件处理函数，直接从缓存中取出即可

## Block Tree

vue2在对比新旧树的时候，并不知道哪些节点是静态，哪些是动态的，因此只能一层一层比较，这就浪费了大部分时间在对比静态节点上

vue3编译器会对每个节点做标记，是静态节点还是动态节点，在根节点记录后代所有的动态节点，对比时通过根节点进行新旧对比

## PatchFlag
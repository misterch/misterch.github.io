---
title: 模块
date: 2023-09-04
---

## 为什么要模块化

1. 大大提高代码的可维护性，可被其他地方引用或用用别人写好的模块或引用node内置模块
2. 可以避免函数名和变量名冲突

## 模块规范的定义

一个js文件就是一个模块，**模块的作用域是私有的**，内部定义的变量和函数只在当前的文件可以用

当外部需要用到模块中的变量或函数，需要导出

## 导出方式

### module.exports

`module.exports.prop='value'`这种方式，则会映射到`exports`对象

### exports

`exports`是`module.exports`的引用

在`exports`对象上可以挂在任何属性和方法，且都反映到`module.exports`上

终端中没有`exports`对象

:::tip

`exports = {}`是不正确的使用方式，这会切断与`module.exports`的联系

`exports.key = val`这种才是正确的方式

:::

## this的指向

在模块文件中，this指向exports

在终端中，this指向global


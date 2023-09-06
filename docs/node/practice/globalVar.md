---
title: 全局变量
date: 2023-09-04
---

在node中使用`global`定义全局变量，定义的变量可以在引入的文件中访问到。

ECMA2020出现的`globalThis`全局变量可以根据node环境或者浏览器环境切换

## __dirname

当前文件模块所在绝对路径**不含文件名**

## __filename

当前文件模块所在绝对路径**含文件名**

## process

### process.argv

包含命令行参数的数组

数组第一个：nodejs的执行路径

数组第二个：当前执行的js文件的路径

之后的：传递给脚本的命令行参数

### process.env

包含当前**环境变量的对象**，通过这个对象访问操作环境变量

### process.cwd()

返回当前**工作目录**路径

### process.on(event,listener)

用于注册事件监听器。可以监听如exit、uncaughtException等事件，并在事件发生时执行相应的回调函数

### process.exit()

用于退出当前的nodejs进程。可以提供一个可选的退出码作为参数

### process.pid

这个属性返回当前进程的PID

## Buffer
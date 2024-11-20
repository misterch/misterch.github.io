---
title: <script>标签中的async和defer
date: 2024-11-20
categories:
 - 面试
tags:
 - 原理
---

## script

当浏览器正在执行解析HTML代码时，遇到默认`script`标签，就会**阻塞**`script`之后的**HTML代码的解析**，去加载`javascript`脚本，脚本加载完成之后会立即执行脚本，最后继续解析HTML代码

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/bf9ec50b4c1d472f8da3c26f7e2bf56a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5aSp5aSp6bit:q75.awebp?rk3s=f64ab15b&x-expires=1732524947&x-signature=he85Rduyr%2Bz5Cx93HNLIdbJu6IQ%3D)

:::tip

默认`script`会按顺序执行脚本，如果中间有一个脚本执行时间长，后续的脚本就会排队，HTML也停止解析等待执行完成，这是会有白屏情况出现

:::

## script async

当浏览器正在执行解析HTML代码时，遇到`script`标签且有`async`标识，**不会阻塞HTML代码的解析渲染**，而是会**异步请求去加载javascript脚本**，但脚本加载完成之后会立即执行脚本并且脚本执行期间会阻塞HTML代码的解析，等待脚本执行完成之后才会继续解析HTML代码

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/11581a4cbb99403dacd8fbb39144c183~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5aSp5aSp6bit:q75.awebp?rk3s=f64ab15b&x-expires=1732524947&x-signature=6rOXZFZggCIAmd4O0faVNUARI5Y%3D)

:::tip async

1. `async`标识在javascript脚本**加载时不会阻塞**HTML解析
2. javascript脚本加载完成后立即执行
3. javascript脚本在**执行时会阻塞**HTML解析

:::

## script defer

当浏览器正在执行解析HTML代码时，遇到`script`标签且有`defer`标识，不会阻塞HTML代码的解析，会异步请求加载javascript脚本，脚本加载完成后不会立即执行脚本，直到解析完HTML代码后再继续执行脚本

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/393299796c0a461c95b4fd1f796bc004~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5aSp5aSp6bit:q75.awebp?rk3s=f64ab15b&x-expires=1732524947&x-signature=hbvKawlg8j381sgUuAxhStu1i6g%3D)

:::tip async

1. `defer`标识在javascript脚本**加载时不会阻塞**HTML解析
2. javascript脚本加载完成后不会立即执行，而是继续解析HTML代码
3. 直到HTML代码解析完成，最后执行javascript代码

:::

## 总结

- 原生`script`阻塞`HTML`的解析，按顺序执行
- `defer`不阻塞`HTML`的解析，并且脚本按`HTML`的顺序执行，`HTML`解析完才执行脚本
- `async`有可能阻塞`HTML`的解析，脚本按网络请求顺序执行，谁先下载完就先执行谁，不可控

因此，理论上如果脚本独立的与其它资源加载没有关联可以选择`async`（可能会阻塞）， 但脚本之间存在依赖关系需要选择`defer`

**注意:** 如果同时存在`async`和`defer`属性，`async`优级更高

## 参考

[不是吧，最基本的async、defer都没搞清楚你就敢写熟练HTML啊？？这面试题目没有难度，但却可以体现一个前端的基本 - 掘金](https://juejin.cn/post/7435904232597536780)
---
title: 节流和防抖
date: 2023-07-19
categories:
 - 工具函数
tags:
 - utils
---
## 节流

> 只在开始执行一次，未执行完成过程中触发的忽略，核心在于开关锁🔒。
> 例如：**多次点击**按钮提交表单，**第一次有效**
>
> 规定时间内，有新的触发产生，除非之前的操作执行完，否则新的触发无效

```javascript:{4,8,10,11}
// 节流
function throttle(fn, delay) {
    var timer = null;
    return function () {
        if (timer) { return false;}
        var that = this;
        var args = arguments;
        fn.apply(that, args);
        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
        }, delay || 500);
    };
}

// 使用
function clickHandler() {
    console.log('节流click!');
}
const handler = throttle(clickHandler);
document.getElementById('button').addEventListener('click', handler);

```

## 防抖

> 只执行最后一个被触发的，清除之前的异步任务，核心在于**清零**。
> 例如： 页面滚动处理事件，搜索框输入联想
> **最后一次有效**
>
> 规定时间内，只要有新的触发产生，取消之前的操作，重新计时执行触发的操作

```javascript:{3,8-10}
// 防抖
function debounce(fn, delay) {
    var timer = null;
    return function () {
        var that = this;
        var args = arguments;
        clearTimeout(timer);// 清除重新计时
        timer = setTimeout(function () {
            fn.apply(that, args);
        }, delay || 500);
    };
}

// 使用
function clickHandler() {
    console.log('防抖click!');
}
const handler = debounce(clickHandler);
document.getElementById('button').addEventListener('click', handler);

```


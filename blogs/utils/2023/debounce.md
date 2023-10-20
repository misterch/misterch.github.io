---
title: 节流和防抖
date: 2023-07-19
categories:
 - 工具函数
tags:
 - 防抖节流
---
## 节流

> 持续触发，但不会持续执行，只会在一个时间段内执行一次
>
> 规定时间内，有新的触发产生，除非之前的操作执行完，否则新的触发无效

### 第一次延迟执行

第一次执行，等待指定时间触发第一次，下次触发也一样

```javascript
// 节流
function throttle(fn, delay) {
    var timer = null;
    return function () {
        if (timer) { return false;}
        var that = this;
        var args = arguments;
        timer = setTimeout(function () {
        		fn.apply(that, args);
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

### 第一次马上执行

第一次执行，马上触发一次，下次触发则等待一段时间才触发

```js
function throttle(fn,delay){
  let time
  return function(){
  	if(!time || Date.now()-time >= delay){
			fn.apply(null,arguments)
    	time = Date.now()
  	} 
  }
}
```



## 防抖

> 只执行最后一个被触发的，清除之前的异步任务，核心在于**清零**。
> 例如： 页面滚动处理事件，搜索框输入联想
> **最后一次有效**
>
> 规定时间内，只要有新的触发产生，取消之前的操作，重新计时执行触发的操作

```javascript:{3,8-12}
// 防抖
function debounce(fn, delay) {
    var timer = null;
    // 利用闭包，返回的函数拥有debounce函数作用域(VO)的引用
    return function () {
        var that = this;
        //在这里获取的函数参数
        var args = arguments;
        clearTimeout(timer);// 清除重新计时
        timer = setTimeout(function () {
        		//不能在这里使用arguments获取参数，因为这里的函数是setTimeout的回调函数，不是debounce函数执行返回的函数，返回的函数才是用户调用的，调用函数可以传递参数给fn使用
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


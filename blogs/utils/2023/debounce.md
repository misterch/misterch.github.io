---
title: 节流和防抖
date: 2023-07-19
categories:
 - 工具函数
tags:
 - 防抖节流
---
## 节流

> 对于高频操作，可以设定出发频率，让本来会执行很多次的事件触发，按照设定的频率减少触发的次数
>
> 规定时间内，有新的触发产生，除非之前的操作执行完，否则新的触发无效
>
> 例如：页面滚动处理事件，搜索框输入联想

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
function scrollHandler() {
    console.log('节流click!');
}
window.onscroll = throttle(scrollHandler)

```

### 第一次马上执行

第一次执行，马上触发一次，下次触发则等待一段时间才触发

```js
function throttle(fn,delay){
  let time
  return function(){
    const self = this
  	if(!time || Date.now()-time >= delay){
			fn.apply(self,arguments)
    	time = Date.now()
  	} 
  }
}

// 使用
function scrollHandler() {
    console.log('节流click!');
}
window.onscroll = throttle(scrollHandler)
```



## 防抖

> 对于高频操作来说，只希望执行一次，可以设定第一次或者最后一次，核心在于**清零**。
> 例如： 点击事件
> **连续点击只有一次有效**
>
> 规定时间内，只要有新的触发产生，取消之前的操作，重新计时执行触发的操作

```javascript
// 防抖
function debounce(fn, delay, immediate) {
		if(typeof fn !== 'function') throw new Error('handle must be a function')
  	if(typeof delay === 'undefined') delay = 300
  	if(typeof delay === 'boolean'){
      immediate = delay
      delay = 300
    }
  	if(typeof immediate !== 'boolean') immediate = false
  	
    var timer = null;
    // 利用闭包，返回的函数拥有debounce函数作用域(VO)的引用，timer是VO的变量
    return function (...args) {
        var self = this;
        //在这里获取的函数参数
        //var args = arguments;
      	let init = immediate && !timer
        clearTimeout(timer)
      	timer = setTimeout(function () {
          	//不能在这里使用arguments获取参数，因为这里的函数是setTimeout的回调函数，不是debounce函数执行返回的函数，返回的函数才是用户调用的，调用函数可以传递参数给fn使用
						timer = null
            !immediate?fn.call(self,...args):null
        }, delay)
      	//如果immediate是true，就表示立即执行
      	//如果想要实现只在第一次执行，那么就要设置timer为null作为判断
      	//因为只要timer为null就意味着没有第二次点击
      	init?fn.call(self,...args):null
    };
}

// 使用
function clickHandler() {
    console.log('防抖click!');
}
const handler = debounce(clickHandler);
document.getElementById('button').addEventListener('click', handler);

```



## 参考

拉勾大前端高薪训练营--javascript深度剖析---ES新特性与TS、JS性能优化--JS性能优化

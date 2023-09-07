---
title: 正则表达式-非捕获性分组、前瞻
date: 2023-09-07
categories:
 - 正则
tags:
 - 前瞻
 - 非捕获性分组
---

## 捕获性分组()

捕获性分组以小括号()来实现，会把**每个分组里匹配的值保存起来**

比如利用捕获性分组把hello world互换成world hello

### 通过exec函数

```js
var str = 'hello world';
var pattern = /([a-z]+)\s([a-z]+)/;
var arr = pattern.exec(str); // exec方法返回的是一个数组，包含匹配到的字符串以及分组(也称子串)里的值
console.log(arr); //['hello world','hello','world']  
console.log(arr[0]); //'hello world' 匹配到的字符串
console.log(arr[1]); //'hello' 第一个分组([a-z]+)的值
console.log(arr[2]); //'world' 第二个分组([a-z]+)的值

var n_str = arr[2]+' '+arr[1];
console.log(n_str) //world hello
```

### 通过属性$1-9

```js
var str = 'hello world';            
var pattern = /([a-z]+)\s([a-z]+)/; 
pattern.test(str); //这个地方必须运行正则匹配一次，方式不限，可以是test()、exec()、以及String的正则方式

console.log(RegExp.$1) //'hello' 第一个分组([a-z]+)的值
console.log(RegExp.$2) //'world' 第二个分组([a-z]+)的值

var n_str = RegExp.$2+' '+RegExp.$1;
console.log(n_str) //world hello

```

### 通过String的replace()

```js
var str = 'hello world'; 
var pattern = /([a-z]+)\s([a-z]+)/; 
var n_str = str.replace(pattern,"$2 $1"); //这里的$1、$2与方法二里的RegExp.$1、RegExp.$2作用是相同的。
console.log(n_str) //world hello
```

## 非捕获性分组(?:)

非捕获性分组工作模式下分组(?:)会作为匹配校验，并出现在匹配结果字符里面，但不作为子匹配返回。

```js
//先看用捕获性分组匹配会返回什么
var str1 = '000aaa111';             
var pattern = /([a-z]+)(\d+)/; //捕获性分组匹配
var arr = pattern.exec(str1);  
console.log(arr) //['aaa111','aaa','111']   结果子串也获取到了，这并不是我们想要的结果


//非捕获性分组
var str2 = '000aaa111';
var pattern2 = /(?:[a-z]+)(?:\d+)/; //非捕获性分组匹配
var arr2 = pattern.exec(str2);  
console.log(arr2) //['aaa111']  结果正确    
```

## 前瞻分组

:::tip

前瞻分组会作为匹配校验，但**不会出现在匹配结果**字符里面，且不作为子匹配返回

:::

### 正向前瞻(?=)

后面**必须有**，且值为`?=`后面所匹配到的字符

```js
//正向前瞻，匹配.jpg后缀文件名
var str = '123.jpg,456.gif,abc.jpg';
var reg = /\w+(?=\.jpg)/g
console.log(str.match(reg)) //[123,abc]
```

`(?=\.jpg)`表示匹配的字符串后面必须跟有**.jpg**的字符

### 反向前瞻(?!)

后面**不能有**，且值为`?=`后面所匹配到的字符

```js
//反向前瞻，匹配3个及以上的a，而且后面不能有000的字符
var str = 'aaa000 aaaa111 aaaaaaa222';
var partern = /a{3,}(?!000)/g; //反向前瞻匹配
console.log(str.match(partern)); //['aaaa', 'aaaaaaa']   返回结果正确，没有匹配aaa000

```

`(?!000)`表示匹配的字符串后面不能跟有**000**的字符串

## 总结

1. 捕获性分组使用`()`，每个分组匹配的值都会**保存起来**，可以使用$1，$2来访问分组匹配的字符
2. 非捕获性分组使用`(?:)`，分组会作为**匹配校验**，且**出现在匹配结果中**，不作为子匹配返回
3. 前瞻分组，分组只作为**匹配校验**，**不出现在匹配结果中**，不作为子匹配返回，一般使用**match()**
4. 正向前瞻使用`(?=jpg)`，匹配的字符**后面**必须**有**jpg
5. 反向前瞻使用`(?!jpg)`，匹配的字符**后面**必须**无**jpg

## 参考链接

[正则表达式------捕获性分组，非捕获性分组，前瞻，后瞻 - 学着总结，学会总结 - 博客园 (cnblogs.com)](https://www.cnblogs.com/xiuluo--angel/p/7100312.html)
---
title: 数组去重的几种方法
date: 2023/07/19
categories:
 - 面试
tags:
 - 去重
---
## 数组去重的几种方法

### 利用 Set 去重

```js
/* 
  1.返回值是一个去重的数组 
  2.注意 Number 和 String 类型
*/
var arr = ['one','two','three','one','three','two','four'];
let el = new Set(arr);
console.log(el); // ['one','two','three','four'];
```

### 利用 indexOf() 和 lastIndexOf() 去重

```js
/*
  indexOf：从左往右查找目标字符串，是否包含 Value;
           如果包含，返回第一次出现的索引;
           如果不包含，返回 -1
  indexOf 和 lastIndexOf() 方法一样
  步骤：
  1. 先声明一个空数组，用来存放去重后的数据
  2. 遍历数组，判断每一项
*/
let arr = ['one','two','three','one','three','two','four'];
let indexArr = [];
arr.forEach(item => {
   if(indexArr.indexOf(item)===-1){
      indexArr.push(item);
   };
});
console.log(indexArr); // ['one','two','three','four'];
```

### 利用 filter去重

```js
let arr = ['one','two','three','one','three','two','four'];
let el = arr.filter((item,index)=>arr.indexOf(item)===index);
console.log(el); // ['one','two','three','four'];
```

### 利用对象特性去重

使用`Object.keys`

<CodeGroup>

<CodeGroupItem title="for循环">

```js
/*
  1.声明一个对象 obj,利用对象特性
  2.循环每一项复印，使用 keys(values) 方法取出 key 值
*/
var arr = ['one','two','three','one','three','two','four'];
var obj = {};
for(var i=0;i<arr.length;i++){
    obj[arr[i]] = arr[i];
};
var el =  Object.keys(obj);
console.log(el) // ['one','two','three','four'];
```

</CodeGroupItem>

<CodeGroupItem title="forEach循环">

```js
/* 
   1. 和上面方法一致，只不过是使用了 forEach
*/
var arr = ['one','two','three','one','three','two','four'];
var obj = {};
arr.forEach(function(ele,index,arr){
    obj[arr[index]] = arr[index];
});
var el =  Object.keys(obj);
console.log(el) // ['one','two','three','four'];
```

</CodeGroupItem>

</CodeGroup>
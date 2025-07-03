---
title: 快速排序
date: 2023-10-25
categories:
 - 算法
 - LeetCode
tags:
 - 排序
---

## 快速排序

```js
function quickSort(arr){
  if(arr.length<=1) return arr
  const pivot = arr[0],left = [],right = []
  for(let i=1;i<arr.length;i++){
    if(pivot>arr[i]){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  return [...left,leader,...right]
}
```

**缺点：**

递归的时候需要创建非常多的数组，消耗性能

## 优化方案

### 1. 控制升序、降序

增加一个`order`参数，默认`asc`升序排序，`desc`降序排序

```javascript
function quickSort(arr,order='asc') {
  if (arr.length <= 1) return arr
  const pivot = arr[0]
  const left = [],
    right = []
  for (let i = 1; i < arr.length; i++) {
    if(order==='asc'){
      if (arr[i] < pivot) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }else if(order==='desc'){
      if(arr[i]>pivot){
        left.push(arr[i])
      }else{
        right.push(arr[i])
      }
    }
  }
  //递归的时候需要创建非常多的数组，消耗性能
  return [...quickSort(left,order), pivot, ...quickSort(right,order)]
}
```



### 2.传入比较函数

传入一个`compare`函数，更加灵活多变的排序方式

默认的比较函数是升序

```javascript
function quickSort(arr,compare = (a,b)=>a-b){
  if(arr.length<=1) return arr
  const pivot = arr[0],left=[],right=[]
  for(let i=1;i<arr.length;i++){
    if(compare(arr[i],pivot)<0){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  return [...quickSort(left,compare),pivot,...quickSort(right,compare)]
}
```


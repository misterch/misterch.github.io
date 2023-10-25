---
title: 选择排序
date: 2023-10-25
categories:
 - 算法
 - LeetCode
tags:
 - 排序
---

## 选择排序

嵌套2层循环，时间复杂度：
$$
O(n^2)
$$

```js:{12,13,15,18}
function compare(a,b){
  if(a>b) return true
  return false
}

function exchange(arr,a,b){
  [arr[a],arr[b]] = [arr[b],arr[a]]
}

function sort(arr){
  for(let i=0;i<arr.length;i++){
  	let maxIndex = 0
    for(let j=0;j<arr.length-i;j++){
      if(compare(arr[j],arr[maxIndex])){
        maxIndex = j
      }
    }
    exchange(arr,maxIndex,arr.length-1-i)
  }
}
```

i是循环的次数，j是循环数组下标

每次循环下标，可以得到最大值的下标，第i次循环结束后，就将本轮的最大值右移到指定的位置

数组：[7,4,1,9,3,0,8,2,5,6]

**第一次循环：i=0，maxIndex=0**

循环数组下标，逐个对比

arr[0]和arr[maxIndex]对比结果false

arr[1]和arr[maxIndex]对比结果true，maxIndex = 1

arr[2]和arr[maxIndex]对比结果false

arr[3]和arr[maxIndex]对比结果true,maxIndex = 3

......

i=0，这轮对比结束，得出maxIndex=3

移动最大值的位置，`arr.length-1`是数组最后一个的下标位置 [7,4,1,3,0,8,2,5,6,9] 

**第二次循环：i=1，maxIndex=0**

上次排序后的结果 [7,4,1,3,0,8,2,5,6,9] 

循环数组下标，逐个对比

因为`arr.length-i`位已经排好了，要忽略不能参与排序

arr[0]和arr[maxIndex]对比结果false

arr[1]和arr[maxIndex]对比结果true，maxIndex = 1

arr[2]和arr[maxIndex]对比结果false

arr[3]和arr[maxIndex]对比结果true,maxIndex = 3

......

直到`arr.length-i`停止

i=1，这轮对比结束，得出maxIndex=5

移动最大值的位置，9已经排好了，应该排在9的前一个位置即`arr.length-1-i`[7,4,1,3,0,2,5,6,8,9] 


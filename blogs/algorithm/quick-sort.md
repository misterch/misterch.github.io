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
  if(arr === null || arr.length===0) return []
  let leader = arr[0]
  let left = [],right = []
  for(let i=1;i<arr.length;i++){
    if(leader>arr[i]){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  left = quickSort(left)
  right = quickSort(right)
  return [...left,leader,...right]
}
```

缺点：

递归的时候需要创建非常多的数组，消耗性能

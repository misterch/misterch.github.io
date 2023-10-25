---
title: 冒泡排序
date: 2023-10-25
categories:
 - 算法
 - LeetCode
tags:
 - 排序
---

## 冒泡排序

```js:{13}
function compare(a,b){
  if(a>b) return true
  return false
}

function exchange(arr,a,b){
  [arr[a],arr[b]] = [arr[b],arr[a]]
}
function bubble(arr){
  for(let i=0;i<arr.length;i++){
    //arr.length-1是因为要取到当次循环的下一个值即arr[j+1]
    //arr.length-1-i是因为每次排序后的最后一位已经确定了位置，没有必要在参与比较，所以要去掉最后一位继续排序，这样效率就会越来越高
    for(let j=0;j<arr.length-1-i;j++){
      if(compare(arr[j],arr[j+1])){
        exchange(arr,j,j+1)
      }
    }
  }
}
```


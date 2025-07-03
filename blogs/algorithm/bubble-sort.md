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

```javascript
function compare(a,b){
  if(a>b) return true
  return false
}

function exchange(arr,a,b){
  [arr[a],arr[b]] = [arr[b],arr[a]]
}
function bubble(arr){
  for(let i=0;i<arr.length-1;i++){
    for(let j=0;j<arr.length-1-i;j++){
      if(compare(arr[j],arr[j+1])){
        exchange(arr,j,j+1)
      }
    }
  }
}
```

- 外层循环控制排序的轮数，共进行`len-1`轮
- 内层循环进行相邻元素的比较和交换，每次内层循环结束后，最大的元素会冒泡到数组的末尾
- 每轮排序后数组的最大值会冒泡到末尾，末尾的这个最大值在下一轮中无需再进行排序，因为已经确定位置
  - `len-1-i`是为了避免已排序的元素再次参与排序
  - 如数组共有5个数，进行5-1=4轮排序；首轮排序每项都进行比较，第二轮排序排除数组最后一个进行比较，第三轮排除数组最后两个进行比较，如此类推
  
    首轮：[3,2,4,1]  => [2,3,1,4]
  
    第二轮：从[2,3,1,4]排除最后一项即[2,3,1] => [2,1,3]
  
    第三轮：从[2,1,3]排除最后一项即[2,1] => [1,2]
  
    最后得到 [1,2,3,4]

## 优化方案

### 1. 数组已有序，提前终止排序

增加一个`swapped`标志，这个标志用来检测一轮内循环中是否发生了交换，如果没有发生，说明数组已经是有序的，可以提前终止排序

```javascript
function bubble(arr){
  for(let i=0;i<arr.length-1;i++){
    //每轮排序设置一个swapped标识，代表这轮排序是否发生过交换位置
    let swapped = false
    for(let j=0;j<arr.length-1-i;j++){
      if(arr[j]>arr[j+1]){
        [arr[j],arr[j+1]]=[arr[j+1],arr[j]]
        swapped = true
      }
    }
    // swapped=false，有一轮内循环两两比较没有发生交换，即代表数组有序，提前跳出循环
    if(!swapped){
      break
    }
  }
}
```

### 2.控制升序、降序

增加一个`order`参数，默认`asc`升序排序，`desc`降序排序

```javascript
function bubble(arr,order='asc'){
  const len = arr.length
  for(let i=0;i<len-1;i++){
    let swapped = false
    for(let j=0;j<len-1-i;j++){
      if(order==='asc'){
        if(arr[j]>arr[j+1]){
          [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
          swapped = true
        }
      }else if(order==='desc'){
        if(arr[j]<arr[j+1]){
          [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
          swapped = true
        }
      }
    }
    if(!swapped){
      break
    }
  }
  return arr
}
```

### 3.传入比较函数

传入一个`compare`函数，更加灵活多变的排序方式

默认的比较函数是升序

```javascript
function bubble(arr,compare=(a,b)=>a-b){
  const len = arr.length
  for(let i=0;i<len-1;i++){
    let swapped = false
    for(let j=0;j<len-1-i;j++){
      if(compare(arr[j],arr[j+1])>0){
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
        swapped = true
      }
    }
    if(!swapped){
      break
    }
  }
  return arr
}
```


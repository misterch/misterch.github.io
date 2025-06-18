---
title: 归并排序
date: 2025-06-17
categories:
 - 算法
 - LeetCode
tags:
 - 排序
---

## 归并排序

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}
// 对比排序，合并成数组
function merge(left, right) {
  const result = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  return result.concat(left, right)
}
```

## 优化方案

### 1.控制升序、降序

增加一个`order`参数，默认`asc`升序排序，`desc`降序排序

```javascript
function mergeSort(arr,order='asc'){
  if(arr.length<=1) return arr
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0,mid),compare)
  const right = mergeSort(arr.slice(mid),compare)
  return merge(left,right,compare)
}
function merge(left,right,compare){
  const result = []
  while(left.length && right.length){
    if(order==='asc'){
      if(left[0]<right[0]){
      	result.push(left.shift())
      }else{
        result.push(right.shift())
      }
    }else if(order==='desc'){
    	if(left[0]<right[0]){
        result.push(right.shift())
      }else{
        result.push(left.shift())
    	} 
    }
  }
  return result.concat(left,right)
}
```

### 2.传入比较函数

传入一个`compare`函数，更加灵活多变的排序方式

默认的比较函数是升序

```javascript
function mergeSort(arr,compare=(a,b)=>a-b){
  if(arr.length<=1) return arr
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0,mid),compare)
  const right = mergeSort(arr.slice(mid),compare)
  return merge(left,right,compare)
}
function merge(left,right,compare){
  const result = []
  while(left.length && right.length){
    if(compare(left[0],right[0])<0){
      result.push(left.shift())
    }else{
      result.push(right.shift())
    }
  }
  return result.concat(left,right)
}
```

### 3.递归版归并排序

递归的归并排序虽然直观，但存在**递归调用栈开销**，可能导致栈溢出（如数据量极大时）。迭代版本通过**自底向上**的方式合并子数组，避免了递归，更适合处理大规模数据。

迭代归并无需通过递归将数组拆分成一个元素形成一个数组，再归到一个大数组

```javascript
function mergeSortIterative(arr) {
  if (arr.length <= 1) return arr;

  const n = arr.length;
  // 临时数组用于合并（避免频繁创建新数组）
  const temp = new Array(n);
  // 初始子数组大小从 1 开始，逐步翻倍（1, 2, 4, 8...）
  for (let size = 1; size < n; size *= 2) {
    console.log('步长',size)
    // 遍历所有可能的子数组对
    for (let leftStart = 0; leftStart < n; leftStart = leftStart + 2 * size) {
      console.log('leftStart【左开始】',leftStart)
      const mid = Math.min(leftStart + size, n); // 中间点
      console.log('mid【中间点】',mid)
      const rightEnd = Math.min(leftStart + 2 * size, n); // 右边界
			console.log('rightEnd【右结束】',rightEnd)
      // 合并两个子数组 arr[leftStart...mid-1] 和 arr[mid...rightEnd-1]
      merge(arr, temp, leftStart, mid, rightEnd);
    }
  }

  return arr;
}

// 合并两个有序子数组（原地合并）
function merge(arr, temp, leftStart, mid, rightEnd) {
  let left = leftStart; // 左子数组起始索引
  let right = mid;      // 右子数组起始索引
  let tempIndex = leftStart; // 临时数组的写入位置
	console.log('tempIndex【临时数组指针】',tempIndex)
  console.log(`对数组[${arr.slice(left,rightEnd)}]排序`)
  // 比较左右子数组，按顺序放入 temp
  while (left < mid && right < rightEnd) {
    if (arr[left] <= arr[right]) {
      temp[tempIndex++] = arr[left++];
    } else {
      temp[tempIndex++] = arr[right++];
    }
  }

  // 处理剩余元素（左子数组或右子数组可能还有剩余）
  while (left < mid) {
    temp[tempIndex++] = arr[left++];
  }
  while (right < rightEnd) {
    console.log(temp[tempIndex],arr[right])
    temp[tempIndex] = arr[right];
    tempIndex++
    right++
  }
	console.log('已排序的临时数组',temp)
  console.log('--------------------------------------------')
  // 将合并后的数据从 temp 复制回原数组
  for (let i = leftStart; i < rightEnd; i++) {
    arr[i] = temp[i];
  }
}
```

迭代版本比递归版本更加适合大规模数据排序，且避免递归栈溢出

## **✅**优点

1. **稳定的时间复杂度**
   - **最佳、最坏、平均时间复杂度均为 O(n log n)**，适合大规模数据排序，性能稳定。、
2. **稳定排序**
   - 相同元素的相对顺序不会改变（`left[0] <= right[0]` 时优先取左），适用于需要保持原始顺序的场景（如按多字段排序）。
3. **适合链表和外排序**
   - 由于归并排序不依赖随机访问（只需顺序访问），**特别适合链表排序**。
   - 也适用于**外部排序（External Sorting）**（如大文件排序），因为可以分块读取数据并归并。
4. **并行化潜力高**
   - 分治策略使得归并排序可以**轻松并行化**（如多线程或分布式计算）。

## **❌ 缺点**

1. **空间复杂度高（O(n)）**
   - 需要额外的临时数组存储合并结果，**不是原地排序（In-place）**，内存占用较高。
2. **递归调用栈开销**
   - 递归实现可能导致**栈溢出（Stack Overflow）**（超深递归时），但可以用迭代方式优化。
3. **小规模数据效率较低**
   - 当数据量较小时（如 `n < 100`），归并排序的常数因子较大，可能比插入排序等简单算法慢。
4. **实现复杂度较高**
   - 相比快速排序或堆排序，代码实现稍复杂（需拆分、合并两个子数组）。

## **适用场景**

- **需要稳定排序时**（如数据库的多字段排序）。
- **处理大规模数据或外部存储数据**（如文件排序）。
- **链表排序**（优于快速排序）。
- **并行计算环境**（分治策略易于并行化）。

## **不适用场景**

- **内存受限环境**（因需额外 O(n) 空间）。
- **小规模数据排序**（插入排序可能更高效）。



```
arr=[3,1,2,5,4]

step = 1,i=0
[3,1,2]
tmp=[1,3,2]
arr=[1,3,2,5,4]
step = 1,i=
```



## 参考

[迭代归并：归并排序非递归实现解析-支付宝开发者社区](https://open.alipay.com/portal/forum/post/155001093)

[95归并排序（迭代实现）_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1XJ411i71R/?spm_id_from=333.337.search-card.all.click&vd_source=5eda1ee217379b7ba901a8228b16eee9)

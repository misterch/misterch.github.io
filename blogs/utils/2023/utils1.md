---
title: 一行代码搞掂的小众好用的技巧
date: 2023/07/18
categories:
 - utils
tags:
 - utils
---

转自：[simple_lau](https://juejin.cn/post/7228449980108423224)

## 数组

### 生成数组

当你需要要生成一个0-99的数组\
方案1

```js
const createArr = (n) => Array.from(new Array(n), (v, i) => i)
const arr = createArr(100) // 0 - 99 数组
```

方案2
```js
    const createArr = (n) => new Array(n).fill(0).map((v, i) => i)
    createArr(100) // 0 - 99数组
```
### 打乱数组

当你有一个数组，你需要打乱这个数组的排序

```js
const randomSort = list => list.sort(() => Math.random() - 0.5)
randomSort([0,1,2,3,4,5,6,7,8,9]) // 随机排列结果

```

### 数组简单数据去重

当你需要将数组中的所有重复的元素只保留一个

```js
const removeDuplicates = list => [...new Set(list)]
removeDuplicates([0, 0, 2, 4, 5]) // [0,2,4,5]

```

### 数组唯一值数据去重

根据唯一值对数组进行去重

```js
const duplicateById = list => [...list.reduce((prev, cur) => prev.set(cur.id, cur), new Map()).values()]
duplicateById([{id: 1, name: 'jack'}, {id: 2, name: 'rose'}, {id: 1, name: 'jack'}])
// [{id: 1, name: 'jack'}, {id: 2, name: 'rose'}]

```

### 多数组取交集

当你需要取多个数组中的交集

```js
const intersection = (a, ...arr) => [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)))

intersection([1, 2, 3, 4], [2, 3, 4, 7, 8], [1, 3, 4, 9])
// [3, 4]

```

### 查找最大值索引

但你需要找到一个数组中的最大值的索引

```js
const indexOfMax = (arr) => arr.reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0);
indexOfMax([1, 3, 9, 7, 5]); // 2

```

### 查找最小值索引

当你需要找到一个数组中的最小值的索引

```js
const indexOfMin = (arr) => arr.reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0)
indexOfMin([2, 5, 3, 4, 1, 0, 9]) // 5

```

### 找到最接近的数值

当你需要在一个数组中找到一个最接近的值

```js
const closest = (arr, n) => arr.reduce((prev, curr) => (Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev))
closest([29, 87, 8, 78, 97, 20, 75, 33, 24, 17], 50) // 33

```

### 压缩多个数组

当你需要将多个数组压缩成一个数组

```js
css复制代码const zip = (...arr) => Array.from({ length: Math.max(...arr.map((a) => a.length)) }, (_, i) => arr.map((a) => a[i]))
zip([1,2,3,4], ['a', 'b', 'c', 'd'], ['A', 'B', 'C', 'D'])
// [[1, 'a', 'A'], [2, 'b', 'B'], [3, 'c', 'C'], [4, 'd', 'D']]

```

### 矩阵交换行和列

当你需要将一个矩阵的行和列进行互相交换

```js
javascript复制代码const transpose = (matrix) => matrix[0].map((col, i) => matrix.map((row) => row[i]));
transpose(
    [              // [
        [1, 2, 3], //      [1, 4, 7],
        [4, 5, 6], //      [2, 5, 8],
        [7, 8, 9], //      [3, 6, 9],
     ]             //  ]
 ); 


```

## 数字转换

### 进制转换

将10进制转换成n进制，可以使用toString(n)

```js
const toDecimal = (num, n = 10) => num.toString(n) 
// 假设数字10要转换成2进制
toDecimal(10, 2) // '1010'

```

将n进制转换成10进制，可以使用parseInt(num, n)

```js
// 10的2进制为1010
const toDecimalism = (num, n = 10) => parseInt(num, n)
toDecimalism(1010, 2)

```

## 正则

### 手机号格式化

当你需要将手机号码格式化成xxx-xxxx-xxxx的形式

```js
javascript复制代码const formatPhone = (str, sign = '-') => str.replace(/(\W|\s)/g, "").split(/^(\d{3})(\d{4})(\d{4})$/).filter(item => item).join(sign)

formatPhone('13123456789') // '131-2345-6789'
formatPhone('13 1234 56 789', ' ') // '131 2345 6789'

```

### 去除多余空格

当你需要将一段文本中的多个空格合并成一个空格

```js
const setTrimOut = str => str.replace(/\s\s+/g, ' ')
const str = setTrimOut('hello,   jack') // 

```

## web

### 重新加载当前页面

```js
const reload = () => location.reload();
reload()

```

### 滚动到页面顶部

如果你需要将页面翻到最顶部

```js
const goToTop = () => window.scrollTo(0, 0);
goToTop()

```

### 元素滚动

如果你希望将一个元素顺滑的滚动到可视区域的起点

```js
const scrollToTop = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "start" })
scrollToTop(document.body)

```

如果你希望将一个元素顺滑的滚动到可视区域的终点

```js
const scrollToBottom = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "end" })
  scrollToBottom(document.body)

```

### 检查当前是否IE浏览器

```js
const isIE = !!document.documentMode;

```

### 从给定文本中剥离html

当你需要在某个文本中将里面的标签全部过滤掉

```js
const stripHtml = (html) => new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
stripHtml('<div>test</div>') // 'test'

```

### 重定向

当你需要跳转到其他页面

```js
const goTo = (url) => (location.href = url);

```

### 文本粘贴

当你需要复制文本到粘贴板上

```js
const copy = (text) => navigator.clipboard?.writeText && navigator.clipboard.writeText(text)
copy('你需要粘贴的文本')

```

## 日期

### 判断日期是否为今天

```javascript
const isToday = (date) => date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)

```

### 日期转换

当你需要将日期转换为为 YYYY-MM-DD 格式

```javascript
const formatYmd = (date) => date.toISOString().slice(0, 10);
formatYmd(new Date())

```

### 秒数转换

当你需要将秒数转换为 hh\:mm\:ss 格式

```javascript
const formatSeconds = (s) => new Date(s * 1000).toISOString().substr(11, 8)
formatSeconds(200) // 00:03:20

```

### 获取某年某月的第一天

当你需要获取某年某月的第一天

```javascript
javascript复制代码const getFirstDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), 1);
getFirstDate(new Date('2022-04')) // Fri Apr 01 2022 00:00:00 GMT+0800 (中国标准时间)

```

### 获取某年某月的最后一天

当你需要获取某年某月的最后一天

```javascript
const getLastDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
getLastDate(new Date('2023-03-04')) // Fri Mar 31 2023 00:00:00 GMT+0800 (中国标准时间)

```

### 获取某年月份天数

当你需要获取某年某个月份的总天数

```javascript
const getDaysNum = (year, month) => new Date(year, month, 0).getDate()  
const day = getDaysNum(2024, 2) // 29

```

## 函数

### 异步函数判断

判断一个函数是否属于异步函数

```javascript
const isAsyncFunction = (v) => Object.prototype.toString.call(v) === '[object AsyncFunction]'
isAsyncFunction(async function () {}); // true

```

## 数字

### 截断数字

当你需要将小数点后的某些数字截断而不取四舍五入

```javascript
const toFixed = (n, fixed) => `${n}`.match(new RegExp(`^-?\d+(?:.\d{0,${fixed}})?`))[0]
toFixed(10.255, 2) // 10.25

```

### 四舍五入

当你需要将小数点后的某些数字截断，并取四舍五入

```javascript
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
round(10.255, 2) // 10.26

```

### 补零

当你需要在一个数字num不足len位数的时候前面补零操作

```javascript
const replenishZero = (num, len, zero = 0) => num.toString().padStart(len, zero)
replenishZero(8, 2) // 08

```

## 对象

### 删除无效属性

当你需要删除一个对象中的属性值为null或undefined的所有属性

```javascript
javascript复制代码const removeNullUndefined = (obj) => Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});

removeNullUndefined({name: '', age: undefined, sex: null}) // { name: '' }

```

### 反转对象键值

当你需要将对象的键值对交换

```javascript
const invert = (obj) => Object.keys(obj).reduce((res, k) => Object.assign(res, { [obj[k]]: k }), {})
invert({name: 'jack'}) // {jack: 'name'}

```

### 字符串转对象

当你需要将一串字符串比如'{name: "jack"}'转换成对象时，直接使用JSON.parse将会报错。

```javascript
const strParse = (str) => JSON.parse(str.replace(/(\w+)\s*:/g, (_, p1) => `"${p1}":`).replace(/\'/g, "\""))

strParse('{name: "jack"}')

```

## 其他

### 比较两个对象

当你需要比较两个对象，js的等于只能判断对象的地址是否相同，当地址不相同的时候无法判断两个对象的键值对是否一致。

```javascript
php复制代码const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]))
isEqual({name: 'jack'}, {name: 'jack'}) // true
isEqual({name: 'jack'}, {name: 'jack1'}, {name: 'jack'}) // false

```

### 随机颜色生成

当你需要获取一个随机颜色

```javascript
const getRandomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
getRandomColor() // '#4c2fd7'

```

### 颜色格式转换

当你需要将16进制的颜色转换成rgb

```javascript
const hexToRgb = hex => hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`).substring(1).match(/.{2}/g).map((x) => parseInt(x, 16));
hexToRgb('#00ffff'); // [0, 255, 255]
hexToRgb('#0ff'); // [0, 255, 255]

```

### 获取随机ip

当你需要生成一个ip地址

```javascript
javascript复制代码const randomIp = () =>
    Array(4)
        .fill(0)
        .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
        .join('.');

```

### uuid

当你需要生成一个id

```javascript
const uuid = (a) => (a ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid))
uuid()

```

### 获取cookie

当你需要将cookie转换成对象

```javascript
const getCookie = () => document.cookie
    .split(';')
    .map((item) => item.split('='))
    .reduce((acc, [k, v]) => (acc[k.trim().replace('"', '')] = v) && acc, {})
getCookie()

```

### 强制等待

当你需要等待一段时间，但又不想写在setTimeout函数中，造成回调地狱

```javascript
const sleep = async (t) => new Promise((resolve) => setTimeout(resolve, t));
sleep(2000).then(() => {console.log('time')});
```


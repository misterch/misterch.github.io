---
title: 实用工具函数
date: 2023-07-18
categories:
 - 工具函数
tags:
 - 排序
 - 去重
 - 查找
 - 转换
 - 随机
---

转自：[simple_lau](https://juejin.cn/post/7228449980108423224)

## 数组

### 生成数组

当你需要要生成一个0-99的数组
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

### 数组排序

{type} 1：从小到大 2：从大到小 3：随机

```js
export const sort = (arr, type = 1) => {
    return arr.sort((a, b) => {
        switch (type) {
            case 1:
                return a - b;
            case 2:
                return b - a;
            case 3:
                return Math.random() - 0.5;
            default:
                return arr;
        }
    })
}
```

### 是否在数组中
<CodeGroup>
  <CodeGroupItem title="ES5">

  ```js:no-line-numbers
  export const contains = (arr, val) => {
    return arr.indexOf(val) != -1 ? true : false;
  }
  ```
  </CodeGroupItem>
	<CodeGroupItem title="ES6">

  ```js
//includes方法
const arr = [11,22,33,44,55]
arr.includes(22)

//find方法,返回匹配到的第一个值，之后的值不执行
const objArr = [{name:'ben',age:12},{name:'ken',age:22}]
arr.find((item)=>item.name==='ben')

//some方法，存在返回true，不存在返回false
arr.some((item)=>item.name==='ben')
  ```
  </CodeGroupItem>

</CodeGroup>

### 检查数组是否为空

检查数组是否为空的简单代码，结果将返回 true 或 false。

```js
const isNotEmpty = arr => Array.isArray(arr) && arr.length > 0;

isNotEmpty([1, 2, 3]);
// Result: true
```

### 数组简单数据去重

当你需要将数组中的所有重复的元素只保留一个

<CodeGroup>

 <CodeGroupItem title="兼容">

```
export const unique = (arr) => {
    if (Array.hasOwnProperty('from')) {
        return Array.from(new Set(arr));
    } else {
        var n = {}, r = [];
        for (var i = 0; i < arr.length; i++) {
            if (!n[arr[i]]) {
                n[arr[i]] = true;
                r.push(arr[i]);
            }
        }
        return r;
    }
}
```

 </CodeGroupItem>

 <CodeGroupItem title="Set">

```js:no-line-numbers
const unique = list => [...new Set(list)]
removeDuplicates([0, 0, 2, 4, 5]) // [0,2,4,5]
```

 </CodeGroupItem>

</CodeGroup>



### 数组唯一值数据去重

根据唯一值对数组进行去重

```js:no-line-numbers
const duplicateById = list => [...list.reduce((prev, cur) => prev.set(cur.id, cur), new Map()).values()]
duplicateById([{id: 1, name: 'jack'}, {id: 2, name: 'rose'}, {id: 1, name: 'jack'}])
// [{id: 1, name: 'jack'}, {id: 2, name: 'rose'}]
```

### 多数组取交集

当你需要取多个数组中的交集

<CodeGroup>

 <CodeGroupItem title="方法1">

```js:no-line-numbers
const intersection = (a, ...arr) => [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)))

intersection([1, 2, 3, 4], [2, 3, 4, 7, 8], [1, 3, 4, 9])
// [3, 4]
```

</CodeGroupItem>

<CodeGroupItem title="方法2">

```js:no-line-numbers
export const intersection = (a, b) => {
    var _this = this;
    a = this.unique(a);
    return this.map(a, function (o) {
        return _this.contains(b, o) ? o : null;
    });
}
```

</CodeGroupItem>

</CodeGroup>

### 两数组并集

```js:no-line-numbers
export const union = (a, b) => {
    var newArr = a.concat(b);
    return [...new Set(newArr)];
}
```

### 删除数组某个元素

#### 删除第一个元素

<CodeGroup>

 <CodeGroupItem title="shift">

```js:no-line-numbers
let arr = [1,2,3,4]
//改变原数组
arr.shift()
```

</CodeGroupItem>

<CodeGroupItem title="slice">

```js:no-line-numbers
let arr = [1,2,3,4]
let newArr = arr.slice(1)
//结果
//原数组不变
//arr=[1,2,3,4]
//newArr=[2,3,4]
```

 </CodeGroupItem>

 <CodeGroupItem title="splice">

```js:no-line-numbers
let arr = [1,2,3,4]
let newArr = arr.splice(0,1)
//结果
//改变原数组
//arr=[2,3,4]
//newArr=[1]
```

 </CodeGroupItem>

</CodeGroup>

#### 删除最后一个元素

<CodeGroup>

 <CodeGroupItem title="pop">

```js:no-line-numbers
let arr = [1,2,3,4]
//改变原数组
arr.pop()
```

</CodeGroupItem>

<CodeGroupItem title="slice">

```js:no-line-numbers
let arr = [1,2,3,4]
let newArr = arr.slice(-1)
//结果
//原数组不会改变
//arr=[1,2,3,4]
//newArr=[1,2,3]
```

 </CodeGroupItem>

 <CodeGroupItem title="splice">

```js:no-line-numbers
let arr = [1,2,3,4]
let newArr = arr.splice(-1)
let newArr = arr.splice(-1,1)
let newArr = arr.splice(arr.length-1)
let newArr = arr.splice(arr.length-1,1)
//结果
//改变原数组
//arr=[1,2,3]
//newArr=[4]
```

 </CodeGroupItem>

 <CodeGroupItem title="length">

```js:no-line-numbers
let arr = [1,2,3,4]
arr.length = arr.length - 1
//改变原数组
//arr=[1,2,3]
```

 </CodeGroupItem>

</CodeGroup>

#### 删除指定下标元素

<CodeGroup>

 <CodeGroupItem title="splice">

```js:no-line-numbers
let arr = [1,2,3,4]
//改变原数组
const deleteIdx = 2
let deletedEl = arr.splice(deleteIdx,1)
```

</CodeGroupItem>

<CodeGroupItem title="forEach">

```js:no-line-numbers
let arr = [1,2,3,4], deleteIdx = 2,newArr = []

for(let i = 0;i<arr.length;i++){
    if(i!=deleteIdx){
        newArr.push(arr[i])
    }
}

//forEach循环时是无序的？
arr.forEach((val,idx)=>{
	if(idx!=deleteIdx){
        newArr.push(val)
    }
})
```

 </CodeGroupItem>

</CodeGroup>

### 删除数组指定元素

<CodeGroup>

 <CodeGroupItem title="splice">

```js:no-line-numbers
let arr = [1,2,3,4]
//改变原数组
const element = 3
arr.splice(arr.indexOf(element),1)
```

</CodeGroupItem>

<CodeGroupItem title="filter">

```js:no-line-numbers
let arr = [1,2,3,4], element = 2
arr = arr.filter(item=>item!=element)
```

 </CodeGroupItem>

<CodeGroupItem title="map">

```js:no-line-numbers
let arr = [1,2,3,4], element = 2,newArr = []
//foreach
arr.forEach(item=>(item!=element && newArr.push(item)))
//map
arr.map(item=>(item!=element && newArr.push(item)))
//for
```

 </CodeGroupItem>

<CodeGroupItem title="Set">

```js:no-line-numbers
let arr = [1,2,3,4], element = 2
let setArr = new Set(arr)
setArr.delete(element)
let newArr = [...setArr] 
```

 </CodeGroupItem>

</CodeGroup>

### 查找最大值索引

但你需要找到一个数组中的最大值的索引

```js:no-line-numbers
const indexOfMax = (arr) => arr.reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0);
indexOfMax([1, 3, 9, 7, 5]); // 2

```

### 查找最小值索引

当你需要找到一个数组中的最小值的索引

```js:no-line-numbers
const indexOfMin = (arr) => arr.reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0)
indexOfMin([2, 5, 3, 4, 1, 0, 9]) // 5

```

### 找到最接近的数值

当你需要在一个数组中找到一个最接近的值

```js:no-line-numbers
const closest = (arr, n) => arr.reduce((prev, curr) => (Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev))
closest([29, 87, 8, 78, 97, 20, 75, 33, 24, 17], 50) // 33

```

### 压缩多个数组

当你需要将多个数组压缩成一个数组

```js
const zip = (...arr) => Array.from({ length: Math.max(...arr.map((a) => a.length)) }, (_, i) => arr.map((a) => a[i]))
zip([1,2,3,4], ['a', 'b', 'c', 'd'], ['A', 'B', 'C', 'D'])
// [[1, 'a', 'A'], [2, 'b', 'B'], [3, 'c', 'C'], [4, 'd', 'D']]

```

### 矩阵交换行和列

当你需要将一个矩阵的行和列进行互相交换

```js
const transpose = (matrix) => matrix[0].map((col, i) => matrix.map((row) => row[i]));
transpose(
    [              // [
        [1, 2, 3], //      [1, 4, 7],
        [4, 5, 6], //      [2, 5, 8],
        [7, 8, 9], //      [3, 6, 9],
     ]             //  ]
 ); 
```

### 将类数组转换为数组

一般是将函数`arguments`参数转换成数组

```js:{6}
export const formArray = (ary) => {
    var arr = [];
    if (Array.isArray(ary)) {
        arr = ary;
    } else {
        arr = Array.prototype.slice.call(ary);
    };
    return arr;
}
```

## 数字

### 进制转换

将10进制转换成n进制，可以使用`toString(n)`

```js
const toDecimal = (num, n = 10) => num.toString(n) 
// 假设数字10要转换成2进制
toDecimal(10, 2) // '1010'
```

将n进制转换成10进制，可以使用`parseInt(num, n)`

```js
// 10的2进制为1010
const toDecimalism = (num, n = 10) => parseInt(num, n)
toDecimalism(1010, 2)
```

### 确认奇偶数

```js
const isEven = num => num % 2 === 0;

console.log(isEven(2));
// Result: True
```

### 求平均值

使用 reduce 方法找到多个数字的平均值。

```js
const average = (...args) => args.reduce((a, b) => a + b) / args.length;

average(1, 2, 3, 4);
// Result: 2.5
```

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

## 字符串

###  翻转字符串

使用split,reverse和join方法轻松翻转字符串。

```js
const reverse = str => str.split('').reverse().join('');

reverse('hello world');
// Result: 'dlrow olleh'
```

## 正则

### 手机号格式化

当你需要将手机号码格式化成xxx-xxxx-xxxx的形式

```js
const formatPhone = (str, sign = '-') => str.replace(/(\W|\s)/g, "").split(/^(\d{3})(\d{4})(\d{4})$/).filter(item => item).join(sign)

formatPhone('13123456789') // '131-2345-6789'
formatPhone('13 1234 56 789', ' ') // '131 2345 6789'
```

### 去除多余空格

当你需要将一段文本中的多个空格合并成一个空格

```js
const setTrimOut = str => str.replace(/\s\s+/g, ' ')
const str = setTrimOut('hello,   jack') // 
```

## 日期时间

### 判断日期是否为今天

```javascript
const isToday = (date) => date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)
```

### 从日期获取“时分秒”格式的时间

我们可以从日期中，获取到 hh: mm: ss格式的时间：

```js
const timeFromDate = date => date.toTimeString().slice(0, 8);

console.log(timeFromDate(new Date(2021, 0, 10, 17, 30, 0)));
// Result: "17:30:00"
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

### 获取某年某月的*第一天*

当你需要获取某年某月的第一天

```javascript
javascript复制代码const getFirstDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), 1);
getFirstDate(new Date('2022-04')) // Fri Apr 01 2022 00:00:00 GMT+0800 (中国标准时间)
```

### 获取某年某月的*最后一天*

当你需要获取某年某月的最后一天

```javascript
const getLastDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
getLastDate(new Date('2023-03-04')) // Fri Mar 31 2023 00:00:00 GMT+0800 (中国标准时间)
```

### 获取某年*月份天数*

当你需要获取某年某个月份的总天数

```javascript
const getDaysNum = (year, month) => new Date(year, month, 0).getDate()  
const day = getDaysNum(2024, 2) // 29
```

### 计算两个日期间*相差的天数*

```js
const dayDiff = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)

dayDiff(new Date("2020-10-21"), new Date("2021-10-22"))
// Result: 366
```

### 找出某一天所在一年中的第几天

```js
const dayOfYear = (date) =>
Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

dayOfYear(new Date());
// Result: 272
```

## 对象

### 删除无效属性

当你需要删除一个对象中的属性值为null或undefined的所有属性

```javascript
const removeNullUndefined = (obj) => Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});

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

## 随机算法函数

### 随机数范围

```js
export const random = (min, max) => {
    if (arguments.length === 2) {
        return Math.floor(min + Math.random() * ((max + 1) - min))
    } else {
        return null;
    }
}
```

### 随机颜色生成

当你需要获取一个随机颜色

```js
const getRandomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6,"0")}`
getRandomColor() // '#4c2fd7'
```

### 获取随机ip

当你需要生成一个ip地址

```js
const randomIp = () =>
    Array(4)
        .fill(0)
        .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
        .join('.');
```

### 洗牌算法随机

```js
export const shuffle = (arr) => {
    var result = [],
        random;
    while (arr.length > 0) {
        random = Math.floor(Math.random() * arr.length);
        result.push(arr[random])
        arr.splice(random, 1)
    }
    return result;
}
```

## 转换

### 颜色格式转换

#### 16进制转RGB

当你需要将16进制的颜色转换成rgb

```js
const hexToRgb = hex => hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`).substring(1).match(/.{2}/g).map((x) => parseInt(x, 16));
hexToRgb('#00ffff'); // [0, 255, 255]
hexToRgb('#0ff'); // [0, 255, 255]
```

#### RGB 转换为16进制

```js
const rgbToHex = (r, g, b) =>"#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

rgbToHex(0, 51, 255);
// Result: #0033ff`
```

### 阿拉伯数字转中文大写数字

```js:no-line-numbers
export const numberToChinese = (num) => {
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
    var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
                    .test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
            re = AA[0] + re;
        if (a[0].charAt(i) != 0)
            re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }

    if (a.length > 1) // 加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++)
            re += AA[a[1].charAt(i)];
    }
    if (re == '一十')
        re = "十";
    if (re.match(/^一/) && re.length == 3)
        re = re.replace("一", "");
    return re;
}
```

### 将数字转换为大写金额

```js:no-line-numbers
export const changeToChinese = (Num) => {
    //判断如果传递进来的不是字符的话转换为字符
    if (typeof Num == "number") {
        Num = new String(Num);
    };
    Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
    Num = Num.replace(/ /g, "") //替换tomoney()中的空格
    Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
    if (isNaN(Num)) { //验证输入的字符是否为数字
        //alert("请检查小写金额是否正确");
        return "";
    };
    //字符处理完毕后开始转换，采用前后两部分分别转换
    var part = String(Num).split(".");
    var newchar = "";
    //小数点前进行转化
    for (var i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
            return "";
            //若数量超过拾亿单位，提示
        }
        var tmpnewchar = ""
        var perchar = part[0].charAt(i);
        switch (perchar) {
            case "0":
                tmpnewchar = "零" + tmpnewchar;
                break;
            case "1":
                tmpnewchar = "壹" + tmpnewchar;
                break;
            case "2":
                tmpnewchar = "贰" + tmpnewchar;
                break;
            case "3":
                tmpnewchar = "叁" + tmpnewchar;
                break;
            case "4":
                tmpnewchar = "肆" + tmpnewchar;
                break;
            case "5":
                tmpnewchar = "伍" + tmpnewchar;
                break;
            case "6":
                tmpnewchar = "陆" + tmpnewchar;
                break;
            case "7":
                tmpnewchar = "柒" + tmpnewchar;
                break;
            case "8":
                tmpnewchar = "捌" + tmpnewchar;
                break;
            case "9":
                tmpnewchar = "玖" + tmpnewchar;
                break;
        }
        switch (part[0].length - i - 1) {
            case 0:
                tmpnewchar = tmpnewchar + "元";
                break;
            case 1:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 2:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 3:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 4:
                tmpnewchar = tmpnewchar + "万";
                break;
            case 5:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 6:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 7:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 8:
                tmpnewchar = tmpnewchar + "亿";
                break;
            case 9:
                tmpnewchar = tmpnewchar + "拾";
                break;
        }
        var newchar = tmpnewchar + newchar;
    }
    //小数点之后进行转化
    if (Num.indexOf(".") != -1) {
        if (part[1].length > 2) {
            // alert("小数点之后只能保留两位,系统将自动截断");
            part[1] = part[1].substr(0, 2)
        }
        for (i = 0; i < part[1].length; i++) {
            tmpnewchar = ""
            perchar = part[1].charAt(i)
            switch (perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "贰" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叁" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陆" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            if (i == 0) tmpnewchar = tmpnewchar + "角";
            if (i == 1) tmpnewchar = tmpnewchar + "分";
            newchar = newchar + tmpnewchar;
        }
    }
    //替换所有无用汉字
    while (newchar.search("零零") != -1)
        newchar = newchar.replace("零零", "零");
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("零元", "元");
    newchar = newchar.replace("零角", "");
    newchar = newchar.replace("零分", "");
    if (newchar.charAt(newchar.length - 1) == "元") {
        newchar = newchar + "整"
    }
    return newchar;
}
```



## 其他

### 从 URL 获取查询参数

通过 window.location 或原始 URL 轻松查询 goole.com?search=easy&page=3 的参数

```js
const getParameters = (URL) => {
URL = JSON.parse('{"' + decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +'"}');
return JSON.stringify(URL);
};


const query = new URLSearchParams(window.location.search)
[...query.entries()]
getParameters(window.location)
// Result: { search : "easy", page : 3 }
```

### 清除所有 Cookie

通过使用 document.cookie 可以轻松清除存储在网页中的所有 cookie 。

```js
const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.\*/, `=;expires=${new Date(0).toUTCString()};path=/`));
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

### 获取cookie某个值

使用 document.cookie 来获取 Cookie 的值

```js
const cookie = name => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();

cookie('_ga');
// Result: "GA1.2.1929736587.1601974046"
```

### 比较两个对象

当你需要比较两个对象，js的等于只能判断对象的地址是否相同，当地址不相同的时候无法判断两个对象的键值对是否一致。

```javascript
const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]))
isEqual({name: 'jack'}, {name: 'jack'}) // true
isEqual({name: 'jack'}, {name: 'jack1'}, {name: 'jack'}) // false
```

### uuid

当你需要生成一个id

```javascript
const uuid = (a) => (a ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid))
uuid()
```

### 强制等待

当你需要等待一段时间，但又不想写在setTimeout函数中，造成回调地狱

```javascript
const sleep = async (t) => new Promise((resolve) => setTimeout(resolve, t));
sleep(2000).then(() => {console.log('time')});
```


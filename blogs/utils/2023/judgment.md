---
title: 判断工具函数
date: 2023-07-19
categories:
 - 工具集
tags:
 - utils
---
## JS基本类型和引用类型判断

### 是否字符串

```js
export const isString = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}
```

### 是否数字

```js
export const isNumber = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}
```

### 是否boolean

```js
export const isBoolean = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}
```

### 是否函数

```js
export const isFunction = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}
```

### 是否为null

```js
export const isNull = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}
```

### 是否undefined

```js
export const isUndefined = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
}
```

### 是否对象

```js
export const isObj = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}
```

### 是否数组

```js
export const isArray = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}
```

### 是否时间

```js
export const isDate = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}
```

### 是否正则

```js
export const isRegExp = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
}
```

### 是否错误对象

```js
export const isError = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}
```

### 是否Symbol函数

```js
export const isSymbol = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}
```

### 是否Promise对象

```js
export const isPromise = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
}
```

### 是否Set对象

```js
export const isSet = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}
export const ua = navigator.userAgent.toLowerCase();
```

### 是否异步函数

判断一个函数是否属于异步函数

```javascript
const isAsyncFunction = (v) => Object.prototype.toString.call(v) === '[object AsyncFunction]'
isAsyncFunction(async function () {}); // true

```

## 其他判断函数

### 是否邮箱

```js
export const isEmail = (s) => {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}
```

### 手机号码

```js
export const isMobile = (s) => {
    return /^1[0-9]{10}$/.test(s)
}
```

### 电话号码

```js
export const isPhone = (s) => {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}
```

### 是否URL地址

```js
export const isURL = (s) => {
    return /^http[s]?:\/\/.*/.test(s)
}
```

### 是否是微信浏览器

```js
export const isWeiXin = () => {
    return ua.match(/microMessenger/i) == 'micromessenger'
}
```

### 是否是移动端

```js
export const isDeviceMobile = () => {
    return /android|webos|iphone|ipod|balckberry/i.test(ua)
}
```

### 是否是QQ浏览器

```js
export const isQQBrowser = () => {
    return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
}
```

### 是否是爬虫

```js
export const isSpider = () => {
    return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(ua)
}
```

### 是否ios

```js
export const isIos = () => {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {  //安卓手机
        return false
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        return true
    } else if (u.indexOf('iPad') > -1) {//iPad
        return false
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
        return false
    } else {
        return false
    }
}
```

### 是否为PC端

```js
export const isPC = () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
```
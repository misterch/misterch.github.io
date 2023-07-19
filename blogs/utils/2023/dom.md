---
title: DOM工具函数
date: 2023-07-19
categories:
 - 工具集
tags:
 - utils
---

### 动态引入js

```js
export const injectScript = (src) => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = src;
    const t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
}
```

### el是否包含某个class

```
export const hasClass = (el, className) => {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}
```

### el添加某个class

```
export const addClass = (el, className) => {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}
```

### el去除某个class

```
export const removeClass = (el, className) => {
    if (!hasClass(el, className)) {
        return
    }
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
    el.className = el.className.replace(reg, ' ')
}
```

### 获取滚动的坐标

```JS
export const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});
```

### el是否在视口范围内

<CodeGroup>

 <CodeGroupItem title="IntersectionObserver">

```js
const vEntry:Directive<HTMLImageElement,string> = async function(el,binding){
  const defaultImg = await import('../../public/vite.svg')
  el.src = defaultImg.default
  // 重点：使用IntersectionObserver
  const observer = new IntersectionObserver(entry=>{
    if(entry[0].intersectionRatio>0){
      console.log('show')
      setTimeout(() => {
        el.src = binding.value
      }, 2000);
      observer.unobserve(el)
    }
  })
  observer.observe(el)
}
```

 </CodeGroupItem>

 <CodeGroupItem title="ES5">

```js
export const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
        ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}
```

 </CodeGroupItem>

</CodeGroup>

### 检测用户是否处于暗模式

使用以下代码检查用户的设备是否处于暗模式。

```js
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

console.log(isDarkMode) // Result: True or False
```

### 获取用户选定的文本

使用内置 getSelection 属性获取用户选择的文本。

```js
const getSelectedText = () => window.getSelection().toString();
getSelectedText();
```

### 重新加载当前页面

```js
const reload = () => location.reload();
reload()
```

### 回到顶部

使用 window.scrollTo(0, 0) 方法自动回到顶部。将 x 和 y 都设置为 0。

```js
const goToTop = () => window.scrollTo(0, 0);
goToTop()
```

### 元素顺滑滚动

如果你希望将一个元素顺滑的滚动到可视区域的起点

```js
const scrollToTop = (element) => element.scrollIntoView({ behavior: "smooth", block: "start" })
scrollToTop(document.body)
```

如果你希望将一个元素顺滑的滚动到可视区域的终点

```js
const scrollToBottom = (element) => element.scrollIntoView({ behavior: "smooth", block: "end" })
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

---
title: 滚动页面时执行动画
date: 2024-10-03
tags:
 - 动画
---

想要实现的效果

设置一个起始滚动位置和结束滚动位置，在这段范围内元素从初始值变化到结束值；也就是说元素的位置是根据滚动而变化的

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }
  .header {
    height: 650px;
    font-size: 60px;
    text-align: center;
    line-height: 600px;
  }
  .playground {
    position: relative;
    height: 2000px;
    background: pink;
  }
  .animation-container {
    position: sticky;
    top: 0;
    height: 100vh;
    background: blue;
  }
  .list {
    height: inherit;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(2, 120px);
    align-content: center;
    align-items: center;
    justify-items: center;
  }
  .list-item {
    height: 80px;
    width: 80px;
    border-radius: 10px;
  }
  .list-item:nth-child(3n-1) {
    background: red;
  }
  .list-item:nth-child(3n-2) {
    background: pink;
  }
  .list-item:nth-child(3n) {
    background: green;
  }
  .other {
    height: 1000px;
  }
</style>
<body>
	<div class="header">HEADER</div>
  <div class="playground">
    <div class="animation-container">
      <div class="list">
        <div data-order="0" class="list-item"></div>
        <div data-order="1" class="list-item"></div>
        <div data-order="2" class="list-item"></div>
        <div data-order="3" class="list-item"></div>
        <div data-order="3" class="list-item"></div>
        <div data-order="2" class="list-item"></div>
        <div data-order="1" class="list-item"></div>
        <div data-order="1" class="list-item"></div>
        <div data-order="2" class="list-item"></div>
        <div data-order="3" class="list-item"></div>
        <div data-order="3" class="list-item"></div>
        <div data-order="2" class="list-item"></div>
        <div data-order="1" class="list-item"></div>
        <div data-order="0" class="list-item"></div>
      </div>
    </div>
  </div>
  <div class="footer">FOOTER</div>
</body>
```



## 核心函数

函数返回一个函数，返回的函数接收一个滚动值，在给出的滚动范围内，根据滚动值计算出元素的位置变化

滚动比值：
$$
滚动比=\frac{已滚动的值-动画起始滚动位置}{动画结束滚动位置-动画起始滚动位置}
$$

```js
function createAnimation(scrollStart,scrollEnd,valueStart,valueEnd){
  return (scroll)=>{
    //已滚动的值未达到动画起始滚动位置，则返回动画开始的值
    if(scroll<=scrollStart){
      return valueStart
    }
    //已滚动的值超过动画结束滚动位置，则返回动画结束的值
    if(scroll>=scrollEnd){
      return valueEnd
    }
    // 在给定的这个滚动范围内计算出元素的变化值
    return valueStart + (valueEnd - valueStart) * ((scroll - scrollStart) / (scrollEnd - scrollStart))
  }
}
```

## 为元素创建动画函数

### 创建一个映射

因为不单只有一个元素变化，一个元素也不止一个属性变化，需要一个映射，以DOM元素作为键，以CSS属性变化作为对象

```
dom1 --> {opacity: function(scroll),transform: function(scroll)}
dom2 --> {opacity: function(scroll),transform: function(scroll)}
```

```js
const animationMap = new Map()
```

### 初始化每个元素的动画函数

1. 计算动画执行的滚动位置，记为动画起始滚动位置

   当**元素顶部**滚动到**视口顶部**位置时，动画开始执行，元素设置到初始值（valueStart）

   元素顶部到视口顶部的距离（`ele.getBoundingClientRect().top`），如果页面向上滚动，那么元素离视口顶部变近（或向上滚出视口），top值变小

   要计算出**元素顶部**距离**页面顶部**的距离，还需要知道页面被滚动了的距离值`window.scrollY`

   `scrollStart = ele.getBoundingClientRect().top + window.scrollY`

2. 计算动画结束的滚动位置，记为动画结束滚动位置

   当**元素底部**滚动到**视口底部**位置时，动画执行结束，元素已经到达设定的最终目标值（valueEnd）

   计算元素底部到页面顶部的距离，如果`window.scrollY=0`，那么

   `scrollEnd = ele.getBoundingClientRect().bottom - window.innerHeight + window.scrollY`

```js
const playground = document.querySelector(".playground");
const list = document.querySelector(".list");
const items = document.querySelectorAll(".list-item");

// 创建css属性动画函数，返回css属性组成的对象
function getDomAnimation(scrollStart, scrollEnd, dom) {
  // 根据元素上设置的order，设置元素在哪个起始位置开始动画
  scrollStart += dom.dataset.order * 100;
  const opacityAnimation = createAnimation(scrollStart, scrollEnd, 0, 1);
  const opacity = opacityAnimation;

  const transform = (scroll) => {
    const scaleAnimation = createAnimation(
      scrollStart,
      scrollEnd,
      0.2,
      1
    );
    const xAnimation = createAnimation(
      scrollStart,
      scrollEnd,
      //将元素初始位置设置为水平中间位置
      list.clientWidth / 2 - dom.clientWidth / 2 - dom.offsetLeft,
      0
    );
    const yAnimation = createAnimation(
      scrollStart,
      scrollEnd,
      //将元素初始位置设置为垂直居中位置
      list.clientHeight / 2 - dom.clientHeight / 2 - dom.offsetTop,
      0
    );
    return
    `translate(${xAnimation(scroll)}px,${yAnimation(scroll)}px)
     scale(${scaleAnimation(scroll)})
    `;
  };

  return {
    opacity,
    transform,
  };
}

function updateMap() {
  //可能会反复调用updateMap，例如当浏览器窗口大小改变时，需要重新执行该函数，避免位置错乱
  animationMap.clear();
  const playgroundRect = playground.getBoundingClientRect();
  // 计算动画的起始位置
  // 当元素的顶部滚动到视口顶部位置时，动画开始执行
  //playgroundRect.top：元素顶部到视口顶部的距离，如果页面向上滚动，那么元素离视口顶部变近，top值变小
  //要计算出元素顶部距离页面顶部的距离，还需要知道页面被滚动了的距离值即window.scrollY
  const scrollStart = playgroundRect.top + window.scrollY;
  // 计算动画的结束位置
  // 当滚动超过scrollEnd，动画执行结束
  const scrollEnd = playgroundRect.bottom - window.innerHeight + window.scrollY;
  for (let dom of items) {
    animationMap.set(dom, getDomAnimation(scrollStart, scrollEnd, dom));
  }
}
//初始化执行一次，为每个元素创建动画函数
updateMap();
```

## 滚动时执行动画

监听页面滚动事件，执行animationMap中所有元素的CSS属性值动画函数

```js
function updateStyle() {
  const scrollY = window.scrollY;
  for (let [dom, value] of animationMap) {
    for (let cssProp in value) {
      dom.style[cssProp] = value[cssProp](scrollY);
    }
  }
}
// 初始化执行一次元素的动画函数
updateStyle()
//监听滚动，执行动画
window.addEventListener("scroll", updateStyle);
```


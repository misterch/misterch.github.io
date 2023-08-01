---
title: FLIP实现动画
date: 2023-08-01
tags:
 - 动画
---
## 什么是FLIP？

FLIP不是动画插件库，不是方法，而是一个实现动画的思想

### 核心思想

flip核心思想是把动画翻转invert过来，先获取元素first动画开始前的DOM和last动画结束后的DOM，然后动态计算first和last差值invert，在play配置invert动画平滑过渡，以低成本动画播放，提升动画性能

F：First；记录起始位置，使用getBoundingClientRect方法获取元素位置

L：Last；记录结束位置

I：Invert；翻转元素到起始位置，计算first和last之间的位置变化

P：Play；播放动画回到结束位置，调用元素animate方法，设置动画

### 示例


<iframe height="300" style="width: 100%;" scrolling="no" title="flip实现动画demo1" src="https://codepen.io/misterch/embed/gOQZjme?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/misterch/pen/gOQZjme">
  flip实现动画demo1</a> by Ben (<a href="https://codepen.io/misterch">@misterch</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

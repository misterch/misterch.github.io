---
title: CSS中的BFC解析
date: 2024-01-07
categories:
 - css
---

## 什么是BFC

BFC是块级格式化上下文，是一个独立的渲染区域，只有block-level box参与，它规定了内部的block-level box如何布局，并且与这个区域外部毫不相干

总结：BFC是一个独立的布局环境，BFC内部的元素布局与外部互不影响

## BFC的特点

1. 内部的box会在垂直方向一个接一个排列
2. 
3. 同属于一个BFC的两个相邻元素的margin会发生重叠
4. 每个元素的左外边距与包含块的左边界相接触，即使浮动元素也是如此。说明BFC中子元素不会超出它的包含块，而absolute的元素可以超出它的包含块边界
5. BFC的区域不会与float的元素区域重叠
6. 计算BFC高度时，浮动子元素也参与计算
7. BFC就是页面上的一个隔离的独立容器，容器内部元素的布局不会影响容器外部的其他元素的布局

## 如何触发BFC

1. body天生就是一个BFC
2. 设置float浮动，none除外
3. absolute或者fixed
4. display为inline-block、tabel-cell、flex、grid
5. 设置overflow，visible除外

## BFC解决的的问题

### 浮动元素令父元素高度坍塌

方法：给父元素开启BFC

原理：计算BFC高度时，浮动子元素也参与计算

```html
<div class='father'>
  <div class='child'>
  </div>
</div>
```

```css{3}
.father{
  //父元素开启BFC，这样father就能被撑高
	overflow: hidden
}
.child{
  float:left;
  width:100px;
  height:100px;
  background:pink;
}
```



### 非浮动元素被浮动元素覆盖

方法：非浮动元素开启BFC

原理：BFC元素不予float重叠

```html
<div class='box1'></div>
<div class='box2'></div>
```

```css
.box1{
  width:100px;
  height:100px;
  background:pink;
  //非浮动元素开启BFC，否则会被浮动元素覆盖
  overflow: hidden;
}
.box2{
  width:100px;
  height:100px;
  background:green;
  float: left;
}
```

### 外边距重叠

方法：上元素或者下元素包裹多一层元素，并给该元素开启BFC

原理：同属于一个BFC的两个相邻的元素margin发生重合

```html
<div class='box1'></div>
<div class='bfc'>
  <div class='box2'>
    
  </div>
</div>
```

```css
.box1{
  width:100px;
  height:100px;
  margin:20px;
  background:pink;
}
.box2{
  width:100px;
  height:100px;
  margin:20px;
  background:pink;
}
.bfc{
  overflow:hidden;
}
```


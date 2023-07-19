---
title: 自适应布局
date: 2023-07-20
tags:
 - 布局
 - 自适应布局
 - postcss
---
设计稿宽度为iphone6物理像素宽度750px

物理像素：750px

设备像素比DPR：2

逻辑像素：375px

> css的px单位是逻辑像素，并非物理像素（DPR=1时，逻辑像素=物理像素）

## vw

vw是viewport视窗的宽度单位，1vw等于window\.innerWidth的1%，100vw会出现滚动条，innerWidth包括滚动条的宽度

设备物理宽度750px时，1vw=7.5px

## dpr设备像素比

物理像素/逻辑像素=dpr

从设计稿落实到css，需要通过dpr转换成逻辑像素，设计稿宽度/dpr=css像素

## postcss-px-to-viewport转换成vw

直接使用postcss-px-to-viewport插件，根据设计稿的分辨率将单位为px的属性转换为vw

### 设计稿750px

```javascript
"postcss-px-to-viewport":{
	unitToConvert:'px',
    // 750px=100vw=100%
    // 7.5px=1vw=1%
    // 100px/1vw相当于100px/7.5px=13.3333vw
    // 缺点：当在pc等宽度较大的屏幕，字体会放大,就算设置媒体查询超出宽度范围固定body宽度，也无法阻止字体变大
    // 设计稿元素是多少，css写多少，无需关心转换
	viewporWidth:750,//设计稿的宽度
	viewportUnit:'vw'//转换后的单位
	fontViewportUnit: 'vw'//字体的单位也使用vw，根据宽度会令字体缩放
	unitPrecision:13 //将制定px单位的值转换为vw单位的值保留13位小数
}
```

100vw=750px

1vw=7.5px=1%

设计稿中宽度为100px的元素，转换为以vw为单位后的值，计算如下：

$$
100px \div 7.5px/vw = 13.33333vw
$$


### 优点

1.  直接使用设计稿的值，无需关心单位换算
2.  适合移动端屏幕，主要是手机屏幕

### 缺点

1.  因为vw是按比例放大缩小的，在pc等宽度较大的屏幕会变得非常大，浪费大屏能显示更多内容的优点

可以设置**媒体查询**超出宽度**固定body宽度**，但字体仍会随宽度变化而变大缩小

```css
//超过768px的屏幕，body的宽度限制在768px
@media screeb and (min-width:768px) {
	html{
		max-width: 768px
	}
}
```

## postcss-px-to-viewport转换成rem

### 设置html的root fontsize

设置html的root fontsize为16px，使所有浏览器都设置为统一的字体大小，以此字体大小适配转换成rem

```html
<html lang="en" style="font-size: 16px">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 配置postcss-px-to-viewport

1.  设计稿为750px
2.  屏幕逻辑像素为375px,dpr为2，对应物理像素为375\*2=750px,可以与设计稿对应上
3.  设置html的fontsize为16px，即16px=1rem=16px/rem
4.  屏幕逻辑像素为375px，100vw=375px,3.75px/vw
5.  1px = 0.0625rem = 0.26667vw
6.  vw是rem的0.26667/0.0625=4.26667倍
7.  375px的屏幕，相当于100vw，vw是rem的4.26667倍，所以375\*4.26667=1600，或者23.4375 \* 16 \* 4.26667 = 1600
8.  公式：viewporWidth = 100vw /（屏幕逻辑像素 / 1rem对应的字体大小）\* 设计稿物理像素

```javascript
"postcss-px-to-viewport":{
	unitToConvert:'px',
    // root-fontsize:16px
    // 750px=100vw=(750px/16px)=46.875rem
	viewporWidth:1600,
	viewportUnit:'rem'//转换后的单位
	fontViewportUnit: 'rem'//字体的单位也使用vw，根据宽度会令字体缩放
	unitPrecision:13 //将制定px单位的值转换为vw单位的值保留13位小数
}
```

### 设置媒体查询

可以设置媒体查询，设置根字号大小来响应不同**逻辑分辨率**的屏幕

也可以设置媒体查询，限制最大宽度

```css
// postcss-px-to-viewport + rem方案
// 默认按照手机逻辑分辨率为375，根字号16px编写
// 其他分辨率的手机，按照媒体查询设置跟字号大小
// 390*16/375
@media screen and (min-width:390px){
  html{
    font-size: 16.64px!important;
  }
}
@media screen and (min-width:414px){
  html{
    font-size: 17.664px!important;
  }
}
@media screen and (min-width:428px){
  html{
    font-size: 18.261px!important;
  }
}
@media screen and (min-width:640px){
  html{
    font-size: 27.3px!important;
  }
}
```

## rem结合vw，不借助任何插件

将root fontsize设置为100px,即1rem=100px，这样好换算

将100px换算成vw方式，这样就能在不同屏幕分辨率下仍保持100px，即html的fontsize设置成100px/设计稿宽度

如设计稿375px，即100px换算成vw：100 / 375 = 26.66667vw

设置好后就能在不同屏幕保持比例显示，只是大屏幕时会浪费大屏显示更多内容的优势

可以设置媒体查询，不同屏幕大小设置符合要求的fontsize

[参考链接1](https://juejin.cn/post/6867874227832225805)

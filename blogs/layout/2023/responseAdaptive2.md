---
title: 移动端适配——适配方案
date: 2023-11-27
tags:
 - 移动端
 - 布局
 - 自适应布局
---

在前面，我们已经介绍了移动端的一些基础知识，以及 *viewport* 视口，接下来我们就要来说一说什么是移动端适配了。

所谓适配，其实概念很简单，就是在任意手机中我们的网页显示都是正常的。

举个例子：

```html
<div class="container"></div>
```

```css
*{
    margin: 0;
    padding: 0;
}
.container{
    width: 375px;
    height: 50px;
    background-color: red;
}
```

上面的页面，如果在 *iPhone6/7/8* 中进行查看，一切正常，因为 *iPhone6/7/8* 的设备宽度就是 *375px*。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-28-063934.png" alt="image-20220228143933168" style="zoom:50%;" />

但是倘若换到 *iPhone6/7/8 Plus* 中，由于设备宽度为 *414px*，就会导致 *375px* 的宽度并不能占满整个屏幕。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-28-063956.png" alt="image-20220228143955961" style="zoom:50%;" />

因此，正如前面所说，适配的任务就是要让我们的网页在各个设备中都能显示正常，包括：

1. 字体
2. 宽高
3. 间距
4. 图像（图标、图片）	

常见的适配方案很多，这里列举出常用的 *5* 种适配方案，分别是：

- 百分比适配
- *viewport* 缩放适配
- *DPR* 缩放适配
- *rem* 适配
- *vw、vh* 适配

## 百分比适配

首先我们来看第一种适配方案，百分比适配。

在 *CSS* 中盒子的宽度可以设置为一个百分比值，表示根据父级宽度的百分比来计算宽度。因此我们可以通过百分比的方式让一个盒子在任何设备中宽度占比都是一样的。

```html
<div></div>
<div></div>
<div></div>
<div></div>
```

```css
* {
    margin: 0;
    padding: 0;
}

div {
    width: 25%;
    height: 100px;
    float: left;
}

div:nth-child(1) {
    background: red;
}

div:nth-child(2) {
    background: green;
}

div:nth-child(3) {
    background: blue;
}

div:nth-child(4) {
    background: pink;
}
```

在上面的代码中，我们设置了 *4* 个盒子，每个盒子的宽度占比为 *25%*。由于设置的是百分比，因此这在任何设备中显示的比例都是一样的。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-28-064021.png" alt="image-20220228144020887" style="zoom:50%;" />

例如在 *360* 的移动端网页（ *https://m.360.cn/* ）中，就采用了这种适配方案。

![image-20220228144038800](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-28-064039.png)

但是这种方案往往需要配合其他适配方案一起使用。

## *viewport* 缩放适配

接下来是 *viewport* 缩放适配，这种适配方案的原理就是把所有机型的 *CSS* 像素（设备宽度）设置成一致的。

通过前面的学习，我们已经知道不同的设备，*CSS* 像素是不一样的。例如 *iPhone 6/7/8* 为 *375px*，而 *iPhone 6/7/8 Plus* 为 *414px*。那么，我们可以通过设置 *viewport* 的缩放，来使页面显示正常。

举个例子，现在有如下的代码：

```html
<div class="container"></div>
<div class="list">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
```

```css
* {
    margin: 0;
    padding: 0;
}

.container {
    width: 375px;
    height: 50px;
    background-color: #333;
    margin-bottom: 15px;
}

.list div {
    width: 93.75px;
    height: 100px;
    float: left;
}

.list div:nth-child(1) {
    background: red;
}

.list div:nth-child(2) {
    background: green;
}

.list div:nth-child(3) {
    background: blue;
}

.list div:nth-child(4) {
    background: pink;
}
```

在上面的代码中，我们按照 *iPhone 6/7/8* 的设备宽度来设置的，因此在 *iPhone 6/7/8* 中显示正常，但是到了 *iPhone 6/7/8 Plus* 就出现了问题。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-28-064105.png" alt="image-20220228144105042" style="zoom:50%;" />

此时，我们就可以通过缩放 *viewport* 的形式来让网页显示正常。

那么问题来了，缩放多少呢？由于我们在书写网页时，页面的宽度是按照 *375px* 去写的，因此缩放比应该按照 *375px* 去计算。也就是 *414/375 = 1.104*

于是我们在设置 *viewport* 的 *meta* 标签中添加 *id* 属性，值为 *view*，然后仍然在 *head* 标签中添加如下的 *script* 代码：

```html
<script>
    var view = document.getElementById('view');
    view.content = 'initial-scale=' + 1.104 + ',user-scalable=no,minimum-scale=' + 1.104 + ',maximum-scale=' + 1.104 + '';
</script>
```

之后我们可以发现此时在 *iPhone 6/7/8 Plus* 中就显示正常了。不过，如果切换另一个手机，此时就又不正常了，原因也很简单，不同的设备其设备宽度是不一样的，因此我们不能够将设备宽度写死为 *414*，而是要获取当前设备的宽度，然后再来计算缩放比。

代码如下：

```js
(function(){
	//获取css像素（viewport没有缩放）
	var curWidth=document.documentElement.clientWidth;
	
	console.log(curWidth);

	var targetWidth=375;
	var scale=curWidth/targetWidth;
	console.log(scale);

	var view=document.getElementById('view');
	console.log(view.content);

	view.content='initial-scale='+scale+',user-scalable=no,minimum-scale='+scale+',maximum-scale='+scale+'';
})();
```

看样子是解决了问题，但是这种适配方案也有其本身的缺点，主要有两点：

- 就像在viewport设置宽度的时候，可以把宽度设置成一个固定值一样，会出现所有的手机看上去都是同样的大小，没有分别了，不太好，厂商特意做出各种大小的手机，还要弄成一样，那人家买大屏机有什么意义
- 算出的的值在一些有小数的情况下可能会出现误差（无关紧要），因为设备独立像素不能有小数
- 对设计稿的测量存在问题

## *DPR* 缩放适配

后面渐渐的又出现了根据 *DPR* 的形式来进行缩放。首先回顾一下 *DPR*，指的是像素比（物理像素 / *CSS* 像素）。

还是以 *iPhone6/7/8* 来举例，*iPhone6/7/8* 物理像素为 *750px*，*CSS* 像素（设备宽度）为 *375px*，*DPR* 比例为 *2.0*。此时假设 UI 要给我们一张图占满整个屏幕的图，她是按照 *750px* 起稿还是 *375px* 起稿？

答案是按照物理像素 *750px* 进行起稿。

![image-20220228144131072](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-28-064131.png)

如上图：对于 *dpr=2* 的 *retina* 屏幕而言，*1* 个位图像素对应于 *4* 个物理像素，由于单个位图像素不可以再进一步分割，所以只能就近取色，从而导致图片模糊（注意上述的几个颜色值）。

所以，对于图片高清问题，比较好的方案就是两倍图片（*@2x*）

如：*200×300(css pixel)img* 标签，就需要提供 *400×600* 的图片。

如此一来，位图像素点个数就是原来的 *4* 倍，在 *retina* 屏幕下，位图像素点个数就可以跟物理像素点个数形成 *1 : 1* 的比例，图片自然就清晰了。

这里就还有另一个问题，如果普通屏幕下，也用了两倍图片，会怎样呢？

很明显，在普通屏幕下，*200×300(css pixel)img* 标签，所对应的物理像素个数就是 *200×300* 个，而两倍图片的位图像素个数则是 *200×300×4*，所以就出现一个物理像素点对应 *4* 个位图像素点，所以它的取色也只能通过一定的算法（显示结果就是一张只有原图像素总数四分之一，我们称这个过程叫做 *downsampling*），肉眼看上去虽然图片不会模糊，但是会觉得图片缺少一些锐利度，或者是有点色差（但还是可以接受的）。

用一张图片来表示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-28-064241.png" alt="image-20220228144240755" style="zoom:50%;" />

明白了这个点之后，接下来我们来看基于 *DPR* 的缩放适配方式，其原理就是将把 *CSS* 像素缩放成与设备像素一样大的尺寸。

因为在实际开发中，设计者为了页面的高清，都是采用物理像素的值来进行设计。例如比如 *iPhone6/7/8* 的设备宽度为 *375px*，我们将其缩放为 *750px*。

常见的设计稿尺寸有：*640x960、640x1136、750x1134*

对应的代码如下：

```js
(function () {
    var meta = document.querySelector('meta[name="viewport"]');
    // window.devicePixelRatio 获取 DPR 的值
    // 以 iPhone 6/7/8 为例
    // 750px * 缩放值 = 375px => 缩放值 = 375px/750px => 缩放值 = 1/DPR
    var scale = 1 / window.devicePixelRatio;

    if (!meta) {
        //这个条件成立说明用户没有写meta标签，我需要创建一个
        meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width,initial-scale=' + scale + ',user-scalable=no,minimum-scale=' + scale + ',maximum-scale=' + scale + '';
        document.head.appendChild(meta);
    } else {
        meta.setAttribute('content', 'width=device-width,initial-scale=' + scale + ',user-scalable=no,minimum-scale=' + scale + ',maximum-scale=' + scale + '');
    }
})();
```

好，接下来我们来看效果：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-28-064304.png" alt="image-20220228144303364" style="zoom:50%;" />

纳尼？按照 *DPR* 缩放为 *750px* 后，反而占不满了，因为我们给的宽度为 *375px*，因此只占了一半。

那么这种缩放方式有啥意义呢？

实际上这种方式最大的意义就是开发者和设计者的像素都是统一的，因为设计者是按照 *750px* 来设计的（*iPhone 6/7/8* 为例），那么我们前端在量图的时候，也是以 *750px* 为基准。通过 *DPR* 缩放，我们量出来是多少，在写代码时就可以设置多少。

但是这种方案好像并没有解决适配的问题，假设设计稿给的是 750px 像素，我测量出来也的确是 750px，但是如果此时我将宽度设置为 750px，只能保证在 iPhone 6/7/8 中没有问题，如果换成 *iPhone 6/7/8 Plus*，仍然存在适配问题，那么怎么解决呢？

此时就需要我们使用 *rem* 适配了。

## *rem* 适配

接下来就要介绍目前在移动端适配中比较主流的方案 - *rem* 适配了。

在介绍具体的 *rem* 适配之前，我们先来回顾一下 *rem* 是什么。

*rem* 英语全称 *font size of the root element*，是 *CSS3* 新增的一个相对单位，是指相对于根元素的字体大小的单位，它就是一个相对单位。

来看一个简单的例子：

```html
<p>Lorem ipsum dolor sit amet.</p>
<div></div>
```

```css
:root{
    font-size: 20px;
}
p{
    font-size: 2rem;
}
div{
    width: 2rem;
    height: 2rem;
    background-color: red;
}
```

在上面的示例中，我们设置根元素的字体为 *20px*，之后所有的元素设置 *rem* 单位表示根据根元素字体大小来缩放。例如 *p* 元素的字体大小是 *2rem*，也就是 *2 x 20px = 40px*

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-03-010326.png" alt="image-20220303090325791" style="zoom:50%;" />

而下面的 *div* 并没有设置字体大小，在设置宽度时也使用的是 *rem*，*2rem* 仍然等于 *2 x 20px = 40px*。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-03-010352.png" alt="image-20220303090351602" style="zoom:50%;" />

接下来我们来看一下 *rem* 实现适配的原理。

*rem* 适配的原理，就是把所有的设备都分成相同的若干份，再计算元素宽度**所占的份数**。

举个例子，*iPhone5* 和 *iPhone6* 对应的设备宽度分别为 *320px* 和 *375px*，现在我们将其分为 *100* 列，那么对应每一列为 *3.2px* 和 *3.75px*。看见没，不同的设备宽度，对应的每一列的宽度就不一样。之后我们再设置元素的宽度时，以列为媒介即可。

比如同样一个 *div*，我们设置它的宽度为 *10* 列，那么在 *iPhone5* 中该 *div* 的宽就是 *32px*，而在 *iPhone6* 中该 *div* 的宽度就是 *37.5px*。你看，通过这种方式是不是就实现了不同设备宽度的设备中，一个元素的大小可以等比例的缩放。

当然，讲到这里有的同学会说，不对呀？我们从设计稿量出来都是像素呀？假设我从设计稿量出来是 *100px*，我怎么知道这是多少列呢？

没错，此时就需要一个转换了，我们需要算出测量出来的宽度在总宽度中究竟占几列。

假设设计稿是按照 *750px*（*iPhone 6/7/8* 尺寸）设计的，我们测量出来的是 *100px*物理像素，那么换算成逻辑像素就是 *50px*。而一列的宽度我们是知道的，因此 *50/3.75* 约等于 *13.33* 列，后面在设置盒子宽度时，就可以设置为 *13.33* * 一列的宽度。

再来举一个例子：

```
iPhone5 逻辑像素320px 物理像素640px
iPhone6 逻辑像素375px 物理像素750px
dpr=物理像素/逻辑像素
将320或者375分成100列，每列宽度为3.2或者3.75
现在设计师按照物理像素 750px 起稿，有一个元素，我们测量出来是 375px（物理像素），dpr为2
转换【逻辑像素的宽度】就是 375/2 = 187.5
接下来计算列数：187.5/3.75 = 50(rem)
之后，我们只需要设置该元素的宽度为 50 * 一列宽度即可
在 iPhone5 中：50 * 3.2 = 160
在 iPhone6 中：50 * 3.75 = 187.5
```

而这个一列的宽度，实际上就是 *rem*。也就是说，*rem* 的适配方式，就是根据屏幕的宽度配合列数算出一列的宽度，之后设置 *HTML* 文档根元素的 *font-size* 就为此宽度即可。

下面是基于此适配原理的一种实现方案：

```js
(function () {
    var html = document.documentElement; // HTML 根元素
    var width = html.clientWidth; // CSS 像素(逻辑宽度)
    html.style.fontSize = width / 16 + 'px'; // 把屏幕分成了 16 列
})();
```

这种方案虽然按照我们上面所讲的，将屏幕分为了 *16* 列，然后将根字体大小设置为了每一列的宽度。例如：

```html
<body>
    <!-- 假设测量出来为 375px，换算为逻辑宽度为 187.5px
    然后计算出占用多少列 187.5/23.4375 = 8 -->
    <div></div>
</body>
```

```js
(function () {
    var html = document.documentElement; // HTML 根元素
    var width = html.clientWidth; // CSS 像素(逻辑宽度)
    html.style.fontSize = width / 16 + 'px'; // 把屏幕分成了 16 列
    // 每一列的宽度为 23.4375
    // 因此设置根元素的字体大小为 23.4375px
})();
```

```css
* {
    margin: 0;
    padding: 0;
}
div {
    width: 8rem;
    height: 8rem;
    background-color: red;
}
```

效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-03-010417.png" alt="image-20220303090416842" style="zoom:50%;" />

但是上面的实现方案比较麻烦的是我们在测量设计稿后要将设计稿上的宽度转为列数。

目前一种比较流行的方式如下：

```js
(function (doc, win, designWidth) {
    var html = doc.documentElement;
    function refreshRem() {
        var clientWidth = html.clientWidth;
        if (clientWidth >= designWidth) {
            // 如果设备宽度都大于设计稿了，那么测量出来是多少就是多少
            html.style.fontSize = '100px';
        } else {
            // 计算出比例
            // 拿 iPhone6 为例，375/750=0.5
            // 相当于每一列的宽度为 0.5px，分成了 750 列
            // 但是浏览器是不允许这么小的字体大小的，因此乘上一个 100
            // 变成每一列的宽度为 50px
            // 之后在将设计稿尺寸转换为列数时，也不需要繁杂的计算
            // 假设设计稿量出来为 375px => 187.5(CSS像素) => 187.5/50(每一列宽度) = 3.75(所占列数)
            html.style.fontSize = 100 * (clientWidth / designWidth) + 'px';
        }
    };
    doc.addEventListener('DOMContentLoaded', refreshRem);
})(document, window, 750);
```

上面这种方案，最方便的便是设计稿量出来的尺寸和列数之间的转换关系，只需要将量出来的尺寸小数点往前移动两位即可。

## *vw、vh* 适配

*CSS3* 除了带来 *rem* 单位，还带来了和 *Viewport* 相关的 *4* 个单位，分别为 *vw、vh、vmin* 和 *vmax*。

- *vw* 是 *Viewport's width* 的简写，*1vw* 等于 *window.innerWidth* 的 *1%*

- *vh* 和 *vw* 类似，是 *Viewport's height* 的简写，*1vh* 等于 *window.innerHeihgt* 的 *1%*

- *vmin* 的值是当前 *vw* 和 *vh* 中较小的值

- *vmax* 的值是当前 *vw* 和 *vh* 中较大的值

具体如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-03-010445.png" alt="image-20220303090445243" style="zoom:50%;" />

有没有发现，*vw* 相当于直接将屏幕分为了 *100* 列，*1vw* 就是 *1* 列。

那么按照 *iPhone 6/7/8* 逻辑宽度为 *375px*，因此 *1vw* 就是 *3.75px*。而根据我们上面的公式：

```js
html.style.fontSize = 100 * (clientWidth / designWidth) + 'px';
```

将元素的字体大小设置为 *50px*，此时和设计稿测量出来的尺寸转换会非常的和谐，只需要小数点往前移动 *2* 位即可。因此我们需要计算 *50px* 对应多少 *vw*。

由于 *1vw* 对应的宽度为 *3.75px*，所以我们可以很轻松的计算出 *50/3.75 = 13.33333333vw*。

测试如下：

```html
<body>
    <div></div>
</body>
```

```css
* {
    margin: 0;
    padding: 0;
}
:root{
    font-size: 13.33333333vw;
}
div {
    width: 3.75rem;
    height: 3.75rem;
    background-color: red;
}
```

效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-03-010514.png" alt="image-20220303090513909" style="zoom:50%;" />

可以看到，使用 *vw* 的一个最大优点就是不需要再使用前面那一大段 *JS* 来做处理了，因为分列的工作 *vw* 已经帮我们做了。唯一需要做的就是计算根元素字体应该设置多少 *vw*，之后从测量稿量出来的尺寸仍然是小数点前移 *2* 位即可。

## 使用第三方库进行适配

一直以来，移动端适配问题都困扰着移动端的开发者，这也不乏民间出现了许多第三方库来解决适配问题。其中比较有名的就是 *hotcss* 移动端布局开发解决方案。

*github* 地址：*https://github.com/imochen/hotcss*

下面是一个 *hotcss* 的简单示例。

首先从 *hotcss* 的 *github* 地址下载对应的文件，我们需要的主要有 *hotcss.js、px2rem.scss* 这 *2* 个文件。

接下来创建如下的目录：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-03-021240.png" alt="image-20220303101239916" style="zoom:50%;" />

```html
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./index.css">
    <script src="./hotcss.js"></script>
</head>

<body>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</body>
```

在上面的 *HTML* 文件中，我们引入了 *hotcss.js* 以及 *index.css*，其中 *index.css* 是由 *scss* 自动生成的。

这里推荐大家按照一个 *VSCode* 的插件：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-03-021303.png" alt="image-20220303101302281" style="zoom:50%;" />

该插件在书写完 *Sass、Scss* 代码后只需要保存一下就会在当前目录下生成转译后的 *CSS* 文件，非常的方便。

```scss
@import 'px2rem.scss';
$designWidth:750;

*{
    margin: 0;
    padding: 0;
}

body{
    display: flex;
}

div{
    width:px2rem(187.5);
    height:px2rem(187.5);
    border: 1px solid;
}

div:nth-child(1){
    background-color: red;
}
```

在上面的 *Scss* 文件中，首先引入 *px2rem.scss*，该文件导出了一个 *px2rem* 的函数，负责将 px 转换为 rem。之后设置 *$designWidth* 为 *750* 为设计稿的宽度。

然后我们就可以愉快的书写代码了，从设计稿测量出来的是多少像素，就直接书写多少像素，不过用 *px2rem* 方法包一下即可。*Scss* 进行转译的时候会自动转换为 *rem* 单位。

另外阿里早期也开源的一个移动端适配解决方案 *flexible*

*github* 地址：*https://github.com/amfe/lib-flexible*

不过随着 *vw、vh* 这种基于视口的单位得到越来越多浏览器的支持，所以官方也已经不再维护这个库，有兴趣的同学可以自行了解。

---

-*EOF*-

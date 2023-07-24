---
title: 使用requestAnimationFrame制作动画
date: 2023-07-24
tags:
 - 动画
---

JavaScript 动画可以处理 CSS 无法处理的事情。

例如，沿着具有与 Bezier 曲线不同的时序函数的复杂路径移动，或者实现画布上的动画。

## [使用 requestAnimationFrame](https://zh.javascript.info/js-animation#shi-yong-requestanimationframe)

假设我们有几个同时运行的动画。

如果我们单独运行它们，每个都有自己的 `setInterval(..., 20)`，那么浏览器必须以比 `20ms` 更频繁的速度重绘。

每个 `setInterval` 每 `20ms` 触发一次，但它们相互独立，因此 `20ms` 内将有多个独立运行的重绘。

这几个独立的重绘应该组合在一起，以使浏览器更加容易处理。

换句话说，像下面这样：

```javascript
setInterval(function() {
  animate1();
  animate2();
  animate3();
}, 20)
```

……比这样更好：

```javascript
setInterval(animate1, 20);
setInterval(animate2, 20);
setInterval(animate3, 20);
```

还有一件事需要记住。有时当 CPU 过载时，或者有其他原因需要降低重绘频率。例如，如果浏览器选项卡被隐藏，那么绘图完全没有意义。

有一个标准[动画时序](http://www.w3.org/TR/animation-timing/)提供了 `requestAnimationFrame` 函数。

它解决了所有这些问题，甚至更多其它的问题。

语法：

```javascript
let requestId = requestAnimationFrame(callback);
```

这会让 `callback` 函数在浏览器每次重绘的最近时间运行。

如果我们对 `callback` 中的元素进行变化，这些变化将与其他 `requestAnimationFrame` 回调和 CSS 动画组合在一起。因此，只会有一次几何重新计算和重绘，而不是多次。

返回值 `requestId` 可用来取消回调：

```javascript
// 取消回调的周期执行
cancelAnimationFrame(requestId);
```

`callback` 得到一个参数 —— 从页面加载开始经过的毫秒数。这个时间也可通过调用 [performance.now()](https://developer.mozilla.org/zh/docs/Web/API/Performance/now) 得到。

通常 `callback` 很快就会运行，除非 CPU 过载或笔记本电量消耗殆尽，或者其他原因。

下面的代码显示了 `requestAnimationFrame` 的前 10 次运行之间的时间间隔。通常是 10-20ms：

```html
<script>
  let prev = performance.now();
  let times = 0;
  requestAnimationFrame(function measure(time) {
    document.body.insertAdjacentHTML("beforeEnd", Math.floor(time - prev) + " ");
    prev = time;
    if (times++ < 10) requestAnimationFrame(measure);
  });
</script>
```

## [结构化动画](https://zh.javascript.info/js-animation#jie-gou-hua-dong-hua)

现在我们可以在 `requestAnimationFrame` 基础上创建一个更通用的动画函数：

```javascript
function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction 从 0 增加到 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // 计算当前动画状态
    let progress = timing(timeFraction);

    draw(progress); // 绘制

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
```

`animate` 函数接受 3 个描述动画的基本参数：

- `duration`

  动画总时间，比如 `1000`。

- `timing(timeFraction)`

  时序函数，类似 CSS 属性 `transition-timing-function`，传入一个已过去的时间与总时间之比的小数（`0` 代表开始，`1` 代表结束），返回动画完成度（类似 Bezier 曲线中的 `y`）。

- `draw(progress)`

  获取动画完成状态并绘制的函数。值 `progress = 0` 表示开始动画状态，`progress = 1` 表示结束状态。这是实际绘制动画的函数。它可以移动元素：

  ```js
  function draw(progress) {
    train.style.left = progress + 'px';
  }
  ```

  ……或者做任何其他事情，我们可以以任何方式为任何事物制作动画。

让我们使用我们的函数将元素的 `width` 从 `0` 变化为 `100%`。

## [时序函数](https://zh.javascript.info/js-animation#shi-xu-han-shu)

上文我们看到了最简单的线性时序函数。

让我们看看更多。我们将尝试使用不同时序函数的移动动画来查看它们的工作原理。

### [n 次幂](https://zh.javascript.info/js-animation#n-ci-mi)

如果我们想加速动画，我们可以让 `progress` 为 `n` 次幂。

例如，抛物线：

```javascript
function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}
```

图像如下：

看看实际效果（点击激活）：

<iframe class="code-result__iframe" data-trusted="1" src="https://zh.js.cx/article/js-animation/quad/" style="display: block; border: 0px; width: 798px; height: 40px; background: var(--iframeBg);"></iframe>

……或者三次曲线甚至使用更大的 `n`。增大幂会让动画加速得更快。

下面是 `progress` 为 `5` 次幂的图像:

实际效果：

<iframe class="code-result__iframe" data-trusted="1" src="https://zh.js.cx/article/js-animation/quint/" style="display: block; border: 0px; width: 798px; height: 40px; background: var(--iframeBg);"></iframe>

### [圆弧](https://zh.javascript.info/js-animation#yuan-hu)

函数：

```javascript
function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}
```

图像：

<iframe class="code-result__iframe" data-trusted="1" src="https://zh.js.cx/article/js-animation/circ/" style="display: block; border: 0px; width: 798px; height: 40px; background: var(--iframeBg);"></iframe>

### [反弹：弓箭射击](https://zh.javascript.info/js-animation#fan-dan-gong-jian-she-ji)

此函数执行“弓箭射击”。首先，我们“拉弓弦”，然后“射击”。

与以前的函数不同，它取决于附加参数 `x`，即“弹性系数”。“拉弓弦”的距离由它定义。

代码如下：

```javascript
function back(x, timeFraction) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
}
```

**`x = 1.5` 时的图像：**

在动画中我们使用特定的 `x` 值。下面是 `x = 1.5` 时的例子：

<iframe class="code-result__iframe" data-trusted="1" src="https://zh.js.cx/article/js-animation/back/" style="display: block; border: 0px; width: 798px; height: 40px; background: var(--iframeBg);"></iframe>

### [弹跳](https://zh.javascript.info/js-animation#dan-tiao)

想象一下，我们正在抛球。球落下之后，弹跳几次然后停下来。

`bounce` 函数也是如此，但顺序相反：“bouncing”立即启动。它使用了几个特殊的系数：

```javascript
function bounce(timeFraction) {
  for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}
```

演示：

<iframe class="code-result__iframe" data-trusted="1" src="https://zh.js.cx/article/js-animation/bounce/" style="display: block; border: 0px; width: 798px; height: 40px; background: var(--iframeBg);"></iframe>

### [伸缩动画](https://zh.javascript.info/js-animation#shen-suo-dong-hua)

另一个“伸缩”函数接受附加参数 `x` 作为“初始范围”。

```javascript
function elastic(x, timeFraction) {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}
```

**`x=1.5` 时的图像：** ![img](https://zh.javascript.info/article/js-animation/elastic.svg)

`x=1.5` 时的演示

<iframe class="code-result__iframe" data-trusted="1" src="https://zh.js.cx/article/js-animation/elastic/" style="display: block; border: 0px; width: 798px; height: 40px; background: var(--iframeBg);"></iframe>

[JavaScript 动画](https://zh.javascript.info/js-animation#yuan-hu)
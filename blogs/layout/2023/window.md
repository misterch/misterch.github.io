---
title: offset，client，scroll，style属性
date: 2023-07-28
tags:
 - DOM
---

![](https://pic1.zhimg.com/v2-04dd7daf9ad4614f64d738b208e190b4_b.jpg)

![](https://pic3.zhimg.com/v2-385838d3bbc781a5c5a64ff8ff66299e_b.jpg)

## 元素偏移量offset

*   动态获取该元素的位置，大小
*   获取**元素距离父元素的位置**，父元素需要有定位，没有则向上找直到body
*   获取元素的宽高（**包含padding，border**），不带单位
*   element.offsetParent返回该元素带有定位的父级元素，没有则返回body

| 属性         | 作用              |
| ---------- | --------------- |
| offsetTop  | 元素相对于父元素的上边界偏移量 |
| offsetLeft | 元素相对于父元素的左边界偏移量 |

| offset                             | style                        |
| ---------------------------------- | ---------------------------- |
| 任意样式表中的样式值               | 只能得到行内样式表中的样式值 |
| 获取的数值**没有单位**             | 带有单位的字符串             |
| 宽高包含padding+border+content宽高 | **不包含**padding和border    |
| 宽高是**只读**属性                 | 宽高可读写                   |
| 获取大小和位置，offset更合适       | 更适合更改元素值             |

## 元素可视区client

*   获取该元素的边框大小，元素大小，不带单位

| 属性                 | 作用                        |
| -------------------- | --------------------------- |
| element.clientTop    | 元素**上边框**大小          |
| element.clientLeft   | 元素**左边框**大小          |
| element.clientWidth  | 元素宽度（padding+content） |
| element.clientHeight | 元素高度（padding+content） |

## 元素滚动scroll

*   动态获得该元素的大小、滚动距离等，不带单位

| 属性                   | 作用                         |
| -------------------- | -------------------------- |
| element.scrollTop    | 被卷上去的距离（内容顶部到元素上内边框的距离）    |
| element.scrollLeft   | 被卷去的左侧的距离（内容最左侧到元素左内边框的距离） |
| element.scrollWidth  | 自身实际的宽度（不含边框）              |
| element.scrollHeight | 自身实际的高度（不含边框）              |

## 元素event事件的client,page,offset,screen

*   获取鼠标相对于以上几个事件的X,Y的位置

| 属性    | 作用                                                         |
| ------- | ------------------------------------------------------------ |
| clientX | 鼠标相对于**浏览器窗口可视区**的X偏移量                      |
| clientY | 鼠标相对于浏览器窗口可视区的Y偏移量                          |
| pageX   | 鼠标相对于**文档**的X偏移量，与滚动相关，`e.pageX=e.clientX+element.scrollLeft` |
| pageY   | 鼠标相对于文档的Y偏移量，与滚动相关，`e.pageY=e.clientY+element.scrollTop` |
| offsetX | 鼠标相对于**事件源元素**(srcElement)的坐标                   |
| offsetY | 鼠标相对于事件源元素(srcElement)的坐标                       |
| screenX | 鼠标相对于**屏幕**的坐标                                     |
| screenY | 鼠标相对于屏幕的坐标                                         |


---
title: 原生实现移动端滚动选择器
date: 2023-09-06
categories:
 - css3
tags:
 - 滚动选择器
 - 组件
---

## 关键知识点

1. 使用scroll-snap-type和scroll-snap-type实现滚动交互，无需js
2. linear-gradient结合hsl实现从上下到中间位置的渐变效果
3. ::webkit-scrollbar隐藏滚动条
4. pointer-events可以让元素不监听任何事件，不作出反应
4. new Date(year,month,0)，第三个参数为0，可获取(month-1)这个月的最后一天，即总天数
4. document.createDocumentFragment()，创建虚拟节点对象

<CodeGroup>
 <CodeGroupItem title="html">

```html
<div class="date-picker">
  <div class="scroll-container">
    <div class="target-center"></div>
    <div class="mask"></div>
    <div class="wrapper year">
      <div class="scroll-wrapper"></div>
    </div>
  </div>
  <div class="scroll-container">
    <div class="target-center"></div>
    <div class="mask"></div>
    <div class="wrapper month">
      <div class="scroll-wrapper"></div>
    </div>
  </div>
  <div class="scroll-container">
    <div class="target-center"></div>
    <div class="mask"></div>
    <div class="wrapper day">
      <div class="scroll-wrapper"></div>
    </div>
  </div>
</div>
```

 </CodeGroupItem>

 <CodeGroupItem title="css">

```css{17,18,26,37,45-51}
.date-picker{
  display: flex;
  width: 100%;
  height: 250px;
  border: 1px solid #999;
  border-radius: 12px;
  overflow: hidden;
}
.scroll-container{
  position: relative;
  width: 100%;
  height: 100%;
}
.wrapper{
  width: 100%;
  height: 100%;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
.wrapper .item{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  scroll-snap-align: center;
}
.target-center{
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  pointer-events: none;
}
.mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(180deg,
  hsl(0 0% 100% / 1),
  hsl(0 0% 100% / .8),
  hsl(0 0% 100% / 0),
  hsl(0 0% 100% / .8),
  hsl(0 0% 100% / 1)
  );
  pointer-events: none;

}
::-webkit-scrollbar{
  display: none;
}
```

 </CodeGroupItem>

 <CodeGroupItem title="ts">

```ts
type Callback = (currentDate: number[]) => void;
interface IDatePciker {
  getCurrentDate(): number[];
  watch(callback: Callback): void;
}
enum DateMark {
  YEAR = "YEAR",
  MONTH = "MONTH",
  DAY = "DAY",
}
export default class DatePicker implements IDatePciker {
  private years: number[];
  private months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  private days: number[];
  private currentDate: number[] = new Array<number>(3);
  private oYear: HTMLElement = document.querySelector(".year")!;
  private oMonth: HTMLElement = document.querySelector(".month")!;
  private oDay: HTMLElement = document.querySelector(".day")!;
  private callback:Callback = ()=>{}

  constructor(years: number[], currentDate: number[]) {
    this.currentDate = currentDate;
    this.years = years;
    this.days = this.createDays(this.currentDate);
    this.initDOM();
    this.bindEvent();
  }
  getCurrentDate(): number[] {
    return this.currentDate;
  }
  watch(callback: Callback): void {
    typeof callback === 'function' && (this.callback = callback)
  }
  private bindEvent() {
    this.oYear.addEventListener(
      "scrollend",
      this.setCurrentDate.bind(this, this.oYear, DateMark.YEAR)
    );
    this.oMonth.addEventListener(
      "scrollend",
      this.setCurrentDate.bind(this, this.oMonth, DateMark.MONTH)
    );
    this.oDay.addEventListener(
      "scrollend",
      this.setCurrentDate.bind(this, this.oDay, DateMark.DAY)
    );
  }
  private createDays([year, month]:number[]): number[] {
    const count = getDayCount(year, month);
    const arr: number[] = [];
    for (let i = 1; i <= count; i++) {
      arr.push(i);
    }
    return arr;
  }
  private initDOM() {
    this.createItems(this.oYear, this.years);
    this.createItems(this.oMonth, this.months);
    this.createItems(this.oDay, this.days);
    this.initCurrentDate(this.currentDate);
  }
  private createItems(el: HTMLElement, arr: number[]) {
    const oFrag = document.createDocumentFragment();
    const oScrollWrapper: HTMLElement = el.querySelector(".scroll-wrapper")!;
    for (let i = 0; i < 2; i++) {
      const div = createPlaceholder();
      oFrag.appendChild(div);
    }
    arr.forEach((item) => {
      const div = createPlaceholder();
      div.innerText = item + "";
      oFrag.appendChild(div);
    });
    for (let i = 0; i < 2; i++) {
      const div = createPlaceholder();
      oFrag.appendChild(div);
    }
    oScrollWrapper.innerHTML = ''
    oScrollWrapper.appendChild(oFrag);
  }
  private initCurrentDate([year, month, day]: typeof this.currentDate) {
    const yearIndex = this.years.indexOf(year);
    const monthIndex = this.months.indexOf(month);
    const dayIndex = this.days.indexOf(day);
    setScrollY(this.oYear, yearIndex);
    setScrollY(this.oMonth, monthIndex);
    setScrollY(this.oDay, dayIndex);
  }
  private setCurrentDate(el: HTMLElement, field: DateMark) {
    const index = el.scrollTop / 50
    switch (field) {
      case DateMark.YEAR:
        this.currentDate[0]=this.years[index]
        this.days = this.createDays(this.currentDate)
        this.createItems(this.oDay,this.days)
        this.callback(this.currentDate)
        break;
      case DateMark.MONTH:
        this.currentDate[1]=this.months[index]
        this.days = this.createDays(this.currentDate)
        this.createItems(this.oDay,this.days)
        this.callback(this.currentDate)
        break;
      case DateMark.DAY:
        this.currentDate[2]=this.days[index]
        this.callback(this.currentDate)
        break;
      default:
        break;
    }
  }
}
function getDayCount(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}
function createPlaceholder() {
  const div = document.createElement("div");
  div.classList.add("item");
  return div;
}
function setScrollY(el: HTMLElement, index: number) {
  el.scrollTo({ top: index * 50 });
}

```

 </CodeGroupItem>

</CodeGroup>

## 创建一个类

这个类需要必须实现`IDatePicker`接口

创建实例时需要传入两个参数，分别是**年份的数组**和**指定的日期**

```ts
type Callback = (currentDate:number[]) => void
interface IDatePicker {
  getCurrentDate():number[]
  watch(callback:Callback):void
}
class DatePicker {
  private years:number[]
  private months:number[]=[1,2,3,4,5,6,7,8,9,10,11,12]
  private days:number[]
  private currentDate:[number,number,number]
	constructor(years:number[],currentDate:[number,number,number]){
    this.years = years
    this.currentDate = currentDate
  }
  getCurrentDate():number[]{}
  watch(callback:Callback):void{}
}
```

watch函数是一个实例的方法，函数的参数传入一个回调函数，回调函数的参数是选中的年月日组成的数组，当实例调用时可以监听到当前选中的日期

## 计算每月的总天数

```ts
private createDays([year, month]:number[]): number[] {
  const count = getDayCount(year, month);
  const arr: number[] = [];
  for (let i = 1; i <= count; i++) {
    arr.push(i);
  }
  return arr;
}
function getDayCount(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}
```

`getDayCount`函数的两个参数分别是年和月，根据这两个参数通过`new Date(year,month,0).getDate()`就可以知道这个月的总天数

:::tip

`new Date(year,month).getDate()`，第三个参数默认为1，就是每月的一号

js中**月份是从0开始**的，所以0代表一月，以此类推

```js
new Date(2023,1).getDate()
//2023.2.1
```

`new Date(year,month,0).getDate()`第三个参数为0，返回上一个月的最后一天，即总天数

```js
new Date(2023,1,0).getDate()
//31，即1月份的总天数是31天
```

:::

## 渲染到HTML

现在已经知道所有年份，月份，和日期，便可进行渲染到HTML

```ts
//将item渲染到指定节点下
private createItems(el: HTMLElement, arr: number[]) {
  const oFrag = document.createDocumentFragment();
  const oScrollWrapper: HTMLElement = el.querySelector(".scroll-wrapper")!;
  for (let i = 0; i < 2; i++) {
    const div = createPlaceholder();
    oFrag.appendChild(div);
  }
  arr.forEach((item) => {
    const div = createPlaceholder();
    div.innerText = item + "";
    oFrag.appendChild(div);
  });
  for (let i = 0; i < 2; i++) {
    const div = createPlaceholder();
    oFrag.appendChild(div);
  }
  oScrollWrapper.innerHTML = ''
  oScrollWrapper.appendChild(oFrag);
}
//创建item
function createPlaceholder() {
  const div = document.createElement("div");
  div.classList.add("item");
  return div;
}
```

`createPlaceholder()`方法创建并返回一个class为item的节点

`createItems(el,arr)`方法接收两个参数

el：接收一个元素，该元素为子节点item的父元素，将节点渲染到该元素下

arr：需要渲染的数据数组

`document.createDocumentFragment()`创建一个虚拟的节点对象，对象包含所有属性和方法，它可以更安全改变文档的结构及节点

## 初始化指定的日期及渲染

```ts
private initCurrentDate([year, month, day]: typeof this.currentDate) {
  const yearIndex = this.years.indexOf(year);
  const monthIndex = this.months.indexOf(month);
  const dayIndex = this.days.indexOf(day);
  setScrollY(this.oYear, yearIndex);
  setScrollY(this.oMonth, monthIndex);
  setScrollY(this.oDay, dayIndex);
}

function setScrollY(el: HTMLElement, index: number) {
  el.scrollTo({ top: index * 50 });
}
```

年月日都是一个数组，给出了指定的年月日，通过`indexOf`就能获得指定数据所在数组的下标

将下标传入`setScrollY()`函数，因为已经知道**每个item元素的高度是50px**，`index*50`即可计算出下标index的元素滚动的位置

## 监听滚动事件并设置滚动到的日期

对指定元素进行滚动完毕监听`el.addEventListener('scrollend',callback)`

```ts
//对各个元素绑定scrollend事件
private bindEvent() {
  this.oYear.addEventListener(
    "scrollend",
    this.setCurrentDate.bind(this, this.oYear, DateMark.YEAR)
  );
  this.oMonth.addEventListener(
    "scrollend",
    this.setCurrentDate.bind(this, this.oMonth, DateMark.MONTH)
  );
  this.oDay.addEventListener(
    "scrollend",
    this.setCurrentDate.bind(this, this.oDay, DateMark.DAY)
  );
}

//设置当前选择到的日期，并渲染到HTML，并执行watch函数的回调
private setCurrentDate(el: HTMLElement, field: DateMark) {
  const index = el.scrollTop / 50
  switch (field) {
    case DateMark.YEAR:
      this.currentDate[0]=this.years[index]
      this.days = this.createDays(this.currentDate)
      this.createItems(this.oDay,this.days)
      this.callback(this.currentDate)
      break;
    case DateMark.MONTH:
      this.currentDate[1]=this.months[index]
      this.days = this.createDays(this.currentDate)
      this.createItems(this.oDay,this.days)
      this.callback(this.currentDate)
      break;
    case DateMark.DAY:
      this.currentDate[2]=this.days[index]
      this.callback(this.currentDate)
      break;
    default:
      break;
  }
}
```

`setCurrentDate`方法接收两个参数，节点对象和年月日标记

1. 根据节点滚动的距离`el.scrollTop`除以50就可知道下标位置
2. 根据指定标记和下标，就可获得对应的确切年月日
3. 年份滚动时，需要重新获取该年和月的总天数；月份滚动时也需要重新获取该月的总天数
4. `createItems`渲染到HTML
5. 执行`callback()`回调函数

## 实例的方法

### getCurrentDate

```ts
getCurrentDate(): number[] {
  return this.currentDate;
}
```

实例通过该方法可以返回当前滚动到的年月日组成的数组

```ts
//实例中使用
const dp = new DatePicker([2020,2021,2022,2023],[2022,3,24])
dp.getCurrentDate() //[2022,3,24]
```



### watch

将实例调用watch函数的回调函数赋值给类中的**callback函数**，callback函数会在`scrollend`监听事件中执行外部传入的函数

回调函数的参数是当前年月日currentDate

```ts
type Callback = (currentDate: number[]) => void;
watch(callback: Callback): void {
  typeof callback === 'function' && (this.callback = callback)
}
```

```ts
//实例中使用
const dp = new DatePicker([2020,2021,2022,2023],[2022,3,24])
dp.watch((currentDate)=>{
  console.log(currentDate)
})
```



## 参考链接

[【原生TS】完成滚动事件与结果监听_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1tj411q7BT)
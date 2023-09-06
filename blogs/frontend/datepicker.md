---
title: 原生实现移动端滚动选择器
date: 2023-09-06
tags:
 - 滚动选择器
 - 组件
---

## 关键知识点

1. 使用scroll-snap-type和scroll-snap-type实现滚动交互，无需js
2. linear-gradient结合hsl实现从上下到中间位置的渐变效果
3. ::webkit-scrollbar隐藏滚动条
4. pointer-events可以让元素不监听任何事件，不作出反应

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

```css
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
  scroll-behavior: smooth;
  overflow-y: scroll;
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

## 参考链接

[【原生TS】完成滚动事件与结果监听_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1tj411q7BT)
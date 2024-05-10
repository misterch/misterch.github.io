---
title: 通用的执行过渡动画工具函数
date: 2024-01-05
tags:
 - 动画
---

通过javascript来让元素从一个位置过渡到另一个位置，需要知道的变量有

- from：开始位置
- to：结束位置

这个动画过程要多少时间过渡完成，那么就需要知道动画持续的时间

- duration：动画持续的时间

这个时间内并非一次过从开始位置移动到结束位置，应该是将duration切割成一小段一小段时间，每隔一小段时间移动一小段位置，即需要给出一个间隔时间。这样就可以从视觉上观察到移动的过程，即动画效果

- interval：移动间隔时间

元素在持续时间里每间隔一个时间移动一次位置，要多少次才能移动到目标位置呢？

移动次数：$times=duration \div interval$

在间隔时间内，元素应该移动多少呢？

每次移动距离：$dis=(to-from) \div times$

通过以上给出的变量，就可以创建一个过渡动画方法

```ts
interface AnimateOption {
  from: number
  to: number
  interval?: number //动画过渡时间
  duration?: number //动画间隔时间
  onMove: (progress: number) => void
  onEnd?: () => void
}


/**
* requestAnimationFrame方式
*/
function createAnimate(options:AnimateOption){
  let from = options.from
  const to = options.to
  const duration = options.duration
  const interval = options.interval
  const times = duration / interval
  const dis = (to-from)/times
  let curTime = 0 //从0开始，记录执行次数，到达最大次数代表已到达目标位置
  //使用requestAnimationFrame
  function start(){
    requestAnimationFrame(()=>{
      //到达目标次数，即到达目标位置，停止继续执行
      if(curTime>=times){
        options.onMove(from)
        options.onEnd&&options.onEnd()
        return
      }
      //每次增加的量
      from+=dis
      curTime++
      options.onMove(from)
      //递归执行动画
      start()
    })
  }
}

/**
* setInterval方式
*/
function createAnimate(options:AnimateOption){
  let from = options.from
  const to = options.to
  const duration = options.duration
  const interval = options.interval
  const times = duration / interval
  const dis = (to-from)/times
  let timer: number
  let curTime = 0 //从0开始，记录执行次数，到达最大次数代表已到达目标位置
  timer = setInterval(()=>{
    from+=dis
    curTime++
    if(curTime>=times){
      clearInterval(timer)
      options.onMove(from)
      options.onEnd&&options.onEnd()
      return
    }
    options.onMove(from)
  },interval)
  
}
```


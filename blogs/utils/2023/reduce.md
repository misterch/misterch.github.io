---
title: reduce使用
date: 2023-07-19
categories:
 - 工具函数
---

reduce方法可对数组中每个元素执行一个由开发者提供的reduce函数，将其汇总为**单个返回值**。循环能做的reduce都可做。

数组求和，数组求积，数组中元素出现的个数，数组去重

```js
arr.reduce((prev,cur,index,arr)=>{},init)
//prev,累计器累计回调的返回值，【表示上一次回调的返回值】，或者【初始值init】
//cur,当前正在处理的元素
//index,当前处理元素的索引，默认【起始索引为1】，提供init，则为0
//arr,原始数组
//init，初始值
```

### 数组求和

```js
let arr = [1,2,3,4,5,6]
let sum = arr.reduce((prev,cur,index)=>{
    console.log(`第${index}次：${prev}+${cur}=${prev+cur}`)
    return prev+cur
})
//索引index从1开始，prev是数组第0为元素值，cur是数组第1位元素值
//返回的值将作为下次回调的prev的值
//第1次：1+2=3
//第1次：3+3=6
//第1次：6+4=10
//第1次：10+5=15
//第1次：15+6=21
```

### 数组去重

```js
let arr = ['ben','amy','amy','kenny','kenny','ben']
let names = arr.reduce((prev,cur)=>{
    //因为设置了初始值为[],prev=[];cur等于数组的第0位的元素
    //判断数组中是否存在cur元素，不存在则添加到数组并返回
    if(!prev.indexOf(cur)){
        prev.push(cur)
    }
    return prev
},[])
names=['ben','amy','kenny']
```

### 按照属性对Object分类

```js
var stu= [
    {
        name:'ben',
        sex:'male'
    },
    {
        name:'amy',
        sex:'female'
    },
    {
        name:'kenny',
        sex:'male'
    },
    {
        name:'otto',
        sex:'male'
    },
    {
        name:'sandy',
        sex:'female'
    },
]

function groupBy(objArr,property){
    return objArr.reduce((init,obj)=>{
        //要对那个属性分类
        let key=obj[property]
        //对象中属性不存在，则创建一个key为该属性的数组
        if(!init[key]){
            init[key] = []
        }
        //将对象添加到该属性的数组中
        init[key].push(obj)
        //返回对象
        return init
    },{})
}

const groupBySex = groupBy(stu,'sex')
//{female:[{},{}],male:[{},{},{}]}
```


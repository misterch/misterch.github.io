---
title:Vue3响应式系统原理
date: 2024-09-19
categories:
 - vue3
 - 面试
tags:
 - 原理
---

## 回顾Proxy

```js
const target = {
  foo:'abc',
  bar:123
}
// 在严格模式下，set,deleteProperty需要返回布尔值
const targetPoxy = new Proxy(target,{
  get(target,key,receiver){
    return Reflect.get(target,key,receiver)
  },
  set(target,key,val,receiver){
    return Reflect(target,key,val,receiver)
  },
  deleteProperty(target,key){
    return Reflect.deleteProperty(target,key)
  }
})
```

### Proxy和Reflect中使用receiver

Proxy中的receiver指的是proxy对象

Reflect中的receiver，如果target对象中设置了getter，**getter中的this**指向receiver，即proxy对象

```js{13,25}
const obj = {
  get foo(){
    console.log(this)
    return this.bar
  }
}
const objProxy = new Proxy(obj,{
	//receiver指向objProxy  
  get(target,key,receiver){
    if(key==='bar'){
      return 'value - bar'
    }
    return Reflect.get(target,key)
  }
})

objProxy.foo // this指向obj对象，输出obj对象和undefined

const objProxy2 = new Proxy(obj,{
	//receiver指向objProxy  
  get(target,key,receiver){
    if(key==='bar'){
      return 'value - bar'
    }
    return Reflect.get(target,key,receiver)
  }
})
objProxy2.foo //this指向receiver，即objProxy2，输出即objProxy2代理对象，this.bar访问的是objProxy2中的bar，所以输出'value - bar'
```

## reactive的实现

```js
const isObject = (val)=>val!==null && typeof val === 'object'
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.hasOwnProperty
const hasOwn = (target,key)=>hasOwnProperty.call(target,key)
function reactive(target){
  if(!isObject(target)) return target
  const handler = {
    get(target,key,receiver){
      console.log(`get ${key}`)
      //收集依赖，待写
      const result = Reflect.get(target,key,receiver)
      return convert(result)
    },
    set(target,key,value,receiver){
      const oldVal = Reflect.get(target,key,receiver)
      let result = true
      if(oldVal !== value){
      	console.log(`set ${key} ${value}`)
        //触发更新，待写
      	result = Reflect.set(target,key,value,receiver)
      }
      return result
    },
    deleteProperty(target,key){
      let result = true
      const hadKey = hasOwn(target,key)
      const result = Reflect.deleteProperty(target,key)
      if(hadKey && result){
        console.log('delete',key)
      }
      return result
    }
  }
  return new Proxy(target,handler)
}
```

## 收集依赖

## 参考

拉钩-大前端高薪训练营——part3-Vue——05模块五——Vue3响应式系统原理

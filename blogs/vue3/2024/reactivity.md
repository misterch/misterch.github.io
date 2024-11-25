---
title: Vue3响应式系统原理（reactive、ref、toRefs和computed的实现）
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
//this指向receiver，即objProxy2，输出即objProxy2代理对象
//this.bar访问的是objProxy2中的bar，所以输出'value - bar'
objProxy2.foo
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
      //将子对象都转换为响应式对象
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
      result = Reflect.deleteProperty(target,key)
      if(hadKey && result){
        console.log('delete',key)
      }
      return result
    }
  }
  return new Proxy(target,handler)
}
```

### 收集依赖

创建一个`track`函数，这个函数是`收集依赖的函数`

思路：

1. 创建一个effect函数，这个函数有一个回调函数作为参数
2. effect函数的作用是调用回调函数来触发响应式对象的getter调用track函数来收集依赖，这个依赖就是回调函数
3. 因为要在track函数中使用到effect中的回调函数，所以需要使用一个activeEffect变量来存放回调函数
4. 创建track函数，这个函数有两个参数，第一个参数是响应式对象，第二个参数是对象的属性
5. track函数的作用是收集effect函数的回调函数，track函数是在响应式对象的getter中被调用的

依赖的集合的结构是这样的

`targetMap = new WeakMap()`

| 响应式对象key        | 依赖集合value                         |
| -------------------- | ------------------------------------- |
| target（响应式对象） | depsMap（根据访问的属性收集到的依赖） |

`depsMap = new Map()`

| 属性key                 | 依赖函数集合value                            |
| ----------------------- | -------------------------------------------- |
| key（响应式对象的属性） | deps（通过effect函数收集到的依赖函数的集合） |

`deps = new Set()`

| set[]                                        |
| -------------------------------------------- |
| activeEffect（访问这个属性收集到的依赖函数） |



```js
// 储存副作用函数，即当响应式对象的属性被修改了，就会执行副作用函数 
let activeEffect = null
// 该函数用来执行副作用函数
function effect(callback){
  activeEffect = callback
  // 需要执行一遍回调函数，回调函数里面访问了响应式对象的属性，这时就可以触发依赖收集了
  callback()
  activeEffect = null
}
// 用来收集以【响应式对象】作为key，以【依赖集合depsMap】作为value的若引用weakMap
// depsMap是以【响应式对象的属性】作为key，【副作用函数set】作为value的map集合
let targetMap = new WeakMap()
// 收集副作用函数
function track(target,key){
  // 没有副作用函数不执行任何事情
  if(!activeEffect) return
  // 获取响应式对象的Map集合，集合中包含响应式对象的属性和收集到的依赖
  let depsMap = targetMap.get(target)
  if(!depsMap){
    targetMap.set(target,(depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if(!deps){
    depsMap.set(key,(deps = new Set()))
  }
  deps.add(activeEffect)
}
```

### 触发更新

trigger函数的作用：当响应式对象的属性被修改，且这个属性被effect函数的回调函数所依赖，就会在响应式对象的setter中调用trigger函数来触发收集到的所有依赖函数

```js
function trigger(target,key){
  const depsMap = targetMap.get(target)
  if(!depsMap) return 
  const deps = depsMap.get(key)
  if(deps){
    deps.forEach(effect=>{
			effect()
    })
  }
}
```



### 完整代码

```js
const isObject = (val)=>val!==null && typeof val === 'object'
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.hasOwnProperty
const hasOwn = (target,key)=>hasOwnProperty.call(target,key)
function reactive(target){
  if(!isObject(target)) return target
  const handler = {
    get(target,key,receiver){
      track(target,key)
      const result = Reflect.get(target,key,receiver)
      //将子对象都转换为响应式对象
      return convert(result)
    },
    set(target,key,value,receiver){
      const oldVal = Reflect.get(target,key,receiver)
      let result = true
      if(oldVal !== value){
      	result = Reflect.set(target,key,value,receiver)
        trigger(target,key)
      }
      return result
    },
    deleteProperty(target,key){
      let result = true
      const hadKey = hasOwn(target,key)
      result = Reflect.deleteProperty(target,key)
      if(hadKey && result){
        trigger(target,key)
      }
      return result
    }
  }
  return new Proxy(target,handler)
}

// 储存副作用函数，即当响应式对象的属性被修改了，就会执行副作用函数 
let activeEffect = null
// 该函数用来执行副作用函数
function effect(callback){
  activeEffect = callback
  // 需要执行一遍回调函数，回调函数里面访问了响应式对象的属性，这时就可以触发依赖收集了
  callback()
  activeEffect = null
}
// 用来收集以【响应式对象】作为key，以【依赖集合depsMap】作为value的若引用weakMap
// depsMap是以【响应式对象的属性】作为key，【副作用函数set】作为value的map集合
let targetMap = new WeakMap()
// 收集副作用函数
function track(target,key){
  // 没有副作用函数不执行任何事情
  if(!activeEffect) return
  // 获取响应式对象的Map集合，集合中包含响应式对象的属性和收集到的依赖
  let depsMap = targetMap.get(target)
  if(!depsMap){
    targetMap.set(target,(depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if(!deps){
    depsMap.set(key,(deps = new Set()))
  }
  deps.add(activeEffect)
}

function trigger(target,key){
  const depsMap = targetMap.get(target)
  if(!depsMap) return 
  const deps = depsMap.get(key)
  if(deps){
    deps.forEach(effect=>{
			effect()
    })
  }
}

export {
	reactive,
  effect,
  trigger,
  track
}
```

## ref的实现

```js
function ref(raw){
  // 判断raw是否是对象且是ref创建的对象
  if(isObject(raw) && raw.__v_isRef) return
  // raw是引用数据类型返回通过reactive包装的响应式对象，raw是基本数据类型则按原值赋值给value
  let value = convert(raw)
  const r = {
    __v_isRef:true,
    get value(){
      track(r, 'value')
      // 返回的实际上是value变量
      return value
    },
    set value(newVal){
      if(newVal!==value){
        raw = newValue
        value = convert(raw)
        trigger(r,'value')
      }
    }
  }
  // 返回的r是响应式对象，无论raw是引用数据类型还是基本数据类型的值
  return r
}

//响应式对象num
const num = ref(300)
//通过num.value来访问
num.value
```

## toRefs的实现

```js
function toRefs(proxy){
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}
  for(key in proxy){
    ret[key] = toProxyRef(proxy,key)
  }
  return ret
}
function toProxyRef(proxy,key){
  const r = {
    __v_isRef: true,
    get value(){
      // 不需要收集依赖，因为proxy是一个响应式对象，已经做了收集处理
      return proxy[key]
    },
    set value(newVal){
      proxy[key] = newVal
    }
  }
  return r
}

//测试
function useProduct(){
  const product = reactive({
    name:'iphone',
    price:8000,
    count:3
  })
  // 通过使用toRefs将响应式对象里面的所有属性都变为ref响应式属性，这样就算解构也保持响应性
  return toRefs(product)
}
const {name,price} = useProduct()
name.value //iphone
```

## computed的实现

```js
function computed(getter){
  // result.value = undefined
  // result是响应式数据
  const result = ref()
  // 在effect函数中执行getter，将getter执行的结果储存到result.value
  // 通过effect来监听getter函数内部的响应式数据的变化
  // 因为在effect中，执行getter的时候访问响应式数据的属性会收集依赖函数
  // 当数据变化后会重新触发依赖函数effect，把getter结果储存到result.value中
  effect(()=>(result.value = getter()))
  return result
}
```



## 总结

1. ref可以把基本数据类型转换成响应式对象
2. ref返回的对象，**重新赋值成对象仍然是响应式的**
3. reactive返回的对象，**重新赋值丢失响应性**
4. reactive返回的对象不可以解构，丢失响应性



## 参考

拉钩-大前端高薪训练营——part3-Vue——05模块五——Vue3响应式系统原理

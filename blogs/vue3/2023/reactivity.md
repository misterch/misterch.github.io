---
title: reactivity API 响应式API
date: 2023-10-21
categories:
 - vue3
 - 面试
tags:
 - 原理
---

## 获取响应式数据

| API      | 传入               | 返回        | 备注                                                         |
| -------- | ------------------ | ----------- | ------------------------------------------------------------ |
| reactive | plain-object       | 对象代理    | 深度代理对象中的所有成员                                     |
| readonly | plain-object/proxy | 对象代理    | 只能读取代理对象中的成员                                     |
| ref      | any                | {value:...} | 对value的访问是响应式的<br />如果value的值是一个对象，则会通过reactive函数代理<br />如果已经是代理，则直接返回代理 |
| computed | function           | {value:...} | 当去读value值时，会根据情况决定是否要运行函数                |

:::tip ref

Proxy只能代理对象，对于基本数据类型不能使用reactive

ref可以代理任何数据，当数据是对象时，其内部调用reactive函数

对于基本数据类型，ref其实是通过getter和setter实现数据响应式的

```js
function ref(value){
    let _value = value
    return {
        get value(){
            console.log('获取value')
            return _value
        },
        set value(value){
            _value = value
            console.log('value设置成功')
        }
    }
}
```

:::

## 监听数据变化

### watchEffect

`watchEffect`返回一个函数，调用返回的函数可以停止监听

`watchEffect`函数会立即执行，然后监听函数中用到的响应式数据，响应式数据变化后再次执行

```js
const stop = watchEffect(()=>{
  //该函数会立即执行，然后监听函数中用到的响应式数据，响应式数据变化后再次执行
})

stop()
```



### watch

相当于vue2中的`$watch`

可以监听单个或者多个数据的变化

监听的是**响应式数据**

`watch(state.count,()={})`是错误的写法，`state.count`是一个表达式，得到的一个普通的值，不能监听到

如果要监听对象中的一个属性，要传入一个函数返回响应式对象的属性`watch(()=>state.count,()=>{})`

```js
const state = reactive({count:0})
//监听单个数据变化
watch(()=>state.count,(newVal,oldVal)=>{},options)

const countRef = ref(0)
watch(countRef,(newVal,oldVal)=>{},options)

//监听多个数据的变化
watch([()=>state.count,countRef],([countNew,countRefNew],[countOld,countRefOld])=>{})
```

应用：除非遇到以下场景，否则均建议选择`watchEffect`

- 不希望回调函数一开始就执行
- 数据改变时，需要参考就值
- 需要监控一些回调函数中不会用到的数据

:::tip 注意

无论是`watchEffect`还是`watch`，当依赖项变化时，回调函数的运行都是异步的（微队列）

:::



## 判断

| API        | 含义                                         |
| ---------- | -------------------------------------------- |
| isProxy    | 判断某个数据是否是由reactive或readonly创建的 |
| isReactive | 判断某个数据是否通过reactive创建             |
| isReadonly | 判断某个是否通过readonly创建                 |
| isRef      | 判断某个数据是否是一个ref对象                |



## 转换

### unref

相当于：`isRef(val)?val.value:val`

### toRef

得到一个响应式对象某个属性的ref格式

```js
const state = reactive({
  foo:1,
  bar:2
})
const fooRef = toRef(state,'foo')
fooRef.value++ 
console.log(state.foo) //2
```

### toRefs

把一个响应式对象的所有属性转换为ref格式，然后包装到一个plain-object中返回

```js
const state = reactive({
  foo:1,
  bar:2
})
//stateToRefs不是proxy对象
const stateToRefs = toRefs(state)
stateToRefs.foo.value
```

应用

如果要将响应式对象解构或者展开，会失去响应性，这时可以使用`toRefs`

```js
setup(){
	const state1 = reactive({a:1,b:2})
	const state2 = reactive({c:1,d:2})
  return {
    ...toRefs(state1),
    ...toRefs(state2)
  }
}
```

## 最佳实践：组合式函数

所有的**composition function**均以`ref`的结果返回，以保证`setup`函数的返回结果中不包含`reactive`或`readonly`直接产生的数据

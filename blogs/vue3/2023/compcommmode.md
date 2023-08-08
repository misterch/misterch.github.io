---
title: Vue3组件通信方式
date: 2023-08-05
categories:
 - vue3
tags:
 - 组件通信
---
## props

:::tip

父组件向子组件传递数据

:::

向组件传递数据，需要在宏编译 `defineProps`声明注册，`defineProps`接收一个props数组，返回一个对象

```vue{4,8,9}
<template>
  <div>
    <div>我是子组件</div>
    <div>{{fatherName}}</div>
  </div>
</template>
<script setup>
  const props = defineProps(['fatherName'])
  console.log(props.fatherName)
</script>
```

父组件中向子组件传递数据，使用 `v-bind:xxx`指令或者简写 `:xxx`方式传递数据

```vue
<template>
  <div>
    <div>我是父组件</div>
    <Child :fatherName='name'></Child>
  </div>
</template>
<script setup>
  import Child from './compoents/child.vue'
  import {ref} from 'vue'
  const name = ref('我的名字叫父组件')
</script>
```

## 自定义事件

:::tip

通过自定义事件的方式，实现子组件向父组件传递数据

在 `<template>`中可以使用 `$emit`方法触发自定义事件

在 `<script setup>`中，不能使用`$emit`方法，但可以使用`defineEmits()`方法返回相同作用的函数给我们使用

:::

**子组件**

触发事件函数可以传递额外的参数，参数可通过在父组件使用监听器时接收

<CodeGroup>
  <CodeGroupItem title="$emit">

  ```vue
  <template>
    <div @click="$emit('moneyToBaba',10)">给爸爸10块</div>
  </template>
  ```
  </CodeGroupItem>
	<CodeGroupItem title="defineEmits">

  ```vue
  <template>
    <div @click="handler">给爸爸10块</div>
  </template>
  <script setup>
    const emits = defineEmits(['moneyToBaba'])
    function handler(){
      emits('moneyToBaba',10)
    }
  </script>
```
  </CodeGroupItem>

</CodeGroup>

**父组件**

父组件通过`v-on`,缩写为`@`来监听事件

:::tip
在模板中推荐使用 kebab-case 形式来编写监听器。
:::

```vue{3,8-10}
<template>
  <div>我有{{money}}块</div>
  <Child @money-to-baba="receive"/>
</template> 
<script setup>
  import {ref} from 'vue'
  const money = ref(100)
  function receive(childMoney){
    money.value = money.value + childMoney
  }
</script>
````

## 事件总线

通过事件总线，无论父子组件、兄弟组件、祖孙组件等任意组件都可以自由传递数据

Vue3中已经没有了vue构造函数，也没有原型对象，组合式API也没有this，导致不能像Vue2那样使用全局事件总线

但是可以通过第三方插件`mitt`来实现全局事件总线

## v-model

### v-model的实现
`v-model`其实就是`:modelValue`与`@update:modelValue`实现的语法糖

```vue
<input v-model="searchText" />
```
等价于
```vue
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```
而当使用在一个组件上时，v-model 会被展开为如下的形式：
```vue
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

实现`CustomeInput`组件需要做两件事

1. 将内部原生 <input> 元素的 value attribute 绑定到 modelValue prop
2. 当原生的 input 事件触发时，触发一个携带了新值的 update:modelValue 自定义事件

:::tip v-model的参数
默认情况下，`v-model`在组件上都是使用`modelValue`作为prop，并以`update:modelValue`作为对应的事件

也可以给`v-model`指定一个参数来更改名字
:::
```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```
现在v-model可以在组件上正常工作了
```vue
<CustomInput v-model="searchText" />
```

### 绑定多个v-model

利用v-model指定参数与事件名的技巧，可以在单个组件上实例上创建多个v-model

```vue
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```
```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

## useAttrs

`useAttrs`方法可以获取组件上的属性和事件，这样就可以不许用用props接收

父组件中传递数据给子组件
```vue
<Child :first-name="firstName" :last-name="lastName" :gender="gender"></Child>
```

在子组件中

:::tip
如果使用`defineProps()`注册声明了props，那么`useAttrs()`方法就不会包含声明了的props

`useAttrs()`也可以接收到父组件传来的事件方法
:::

```vue
<template>
  <div>{{$attrs.firstName}} {{$attrs.lastName}}</div>
  <div>{{gender}}</div>
</template>
<script>
  import {useAttrs} from 'vue'
  defineProps(['gender'])
  //$attrs对象中不会含有gender属性
  const $attrs = useAttrs()
</script>
```

## ref与$parent

### ref

ref()不但可以创建响应式ref对象，也可以用来实现模板引用，即获得DOM节点或者组件实例

要实现这点，需要在模板中使用ref attribute，并为了可以通过组合式API获得该模板引用，需要声明一个同名的ref
```vue
<template>
  <div ref="main"></div>
  <Child ref="childDom"/>
</template>
<script setup>
import {ref} from 'vue'
const main = ref()
const childDom = ref()
</script>
```
:::tip
默认情况下，组件内部数据对外是关闭不能访问的，需要通过`defineExpose`方法对外暴露
:::
```vue
//Child.vue
<template>
  <div></div>
</template>
<script setup>
import {ref} from 'vue'
const name = ref('ben')
defineExpose({
  name
})
</script>
```
### $parent

在子组件中通过$parent方法可以获取到父组件的实例，同时也需要父组件通过defineExpose方法对外暴露

## provide与inject

`provide()`可以为组件后代提供数据
```vue
<script>
  import {provide} from 'vue'
  provide('message','系统信息')
</script>
```
后代组件要获取上层组件提供的数据，使用`inject()`函数

如果提供的值是一个`ref`，注入进来的会是该`ref`对象，**不会自动解包**出其内部的值，使的注入方组件能够通过ref对象保持了和提供方的响应性链接
```vue
<script>
  import {inject} from 'vue'
  const msg = inject('message')
  //可以设置默认值，如果上层没有提供值，则使用默认值
  const data = inject('data',{name:'ben'})
</script>
```

除了可以在组件中为后代组件提供数据，也可以在整个应用层面提供依赖数据
```js

import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')

```
在应用级别提供的数据在该应用内的所有组件中都可以注入。这在你编写插件时会特别有用，因为插件一般都不会使用组件形式来提供值。
## pinia

## slot

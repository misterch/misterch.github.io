---
title: vue组件二次封装
date: 2025-10-29
cagtegories:
 - vue3
tags:
 - 组件
---

> 有时候组件库提供的组件不能满足我们的需求，这时我们就可以对其进行二次封装，加一些我们自定义的内容



二次封装需要考虑的：

1. 属性
2. 事件
3. 插槽
4. 方法
5. 类型

## 属性和事件

通过`v-bind="$attrs"`就能将`MyInput`组件的所有**没有在`MyInput`的组件中定义**的**属性**和**事件**透传给`ElInput`组件

对于自定义的属性和事件，则不会透传

如果要对`ElInput`组件的属性或事件进行自定义，那么也不会透传

```vue
// MyInput.vue
<template>
  <h1 @click="test">{{title}}</h1>
  <ElInput v-bind="$attrs"></ElInput>
</template>
<script setup lang="ts">
  import {ElInput} from 'element-plus'
  // 不会通过$attrs透传给ElInput
  const props = defineProps<{
      title: string
  }>()
  const emits = defineEmit<{
      (e:'getTitle',title:string):void
  }>()
  const test = ()=>{
      emits('getTitle',props.title)
  }
</script>
```

父组件使用`MyInput`

```vue
// Index.vue
<template>
  <MyInput @getTitle="getTitle" placeholder="二次封装组件" v-model="modelVal"></MyInput>
</template>
<script setup lang="ts">
  import {MyInput} from '@components/MyInput.vue'
  const modelVal = ref('hello')
  const getTitle = title=>{
      console.log(title)
  }
</script>
```

## 插槽

插槽有的使用遍历所有插槽，但还有一个更好的方式是使用**动态组件**和**虚拟节点h**，h函数可以接收组件，属性，插槽作为参数，这样就能轻松透传属性、事件、插槽了

### h()

```typescript
// 完整参数签名
function h(
  type: string | Component,
  props?: object | null,
  children?: Children | Slot | Slots
): VNode
```

封装`MyInput`组件

```vue
// MyInput.vue
<template>
  <h1 @click="test">{{title}}</h1>
  <component :is="h(ElInput,$attrs,$slots)"></component>
</template>
<script setup lang="ts">
  import {h} from 'vue'
  import {ElInput} from 'element-plus'
</script>
```

## 方法

组件有时候需要通过暴露一些方法给父组件调用，那么二次封装的组件如何获取得到`ElInput`组件暴露的方法呢？

1. 将`ElInput`组件的ref设置为一个函数，这个函数的参数包含组件暴露的所有方法
2. `changeRef`方法将包含所有组件暴露的方法挂载到实例的`exposed`上面，这样就能实现将`ElInput`组件的所有方法暴露出去

> `defineExpose()`这个宏做的事情其实就是将一个对象暴露给父组件
>
> `defineExpose({a:1})`
>
> 相当于`vm.exposed = {a:1}`

```vue{4,13}
// MyInput.vue
<template>
  <h1>我封装的组件</h1>
  <component :is="h(ElInput,{...$attrs,ref:changeRef},$slots)"></component>
</template>
<script setup lang="ts">
  import {h,getCurrentInstance} from 'vue'
  import {ElInput} from 'element-plus'
  
  const vm = getCurrentInstance()
  
  function changeRef(exposed){
  	vm.exposed = exposed
  }
</script>
```

在父组件中使用

```vue
// Index.vue
<template>
  <MyInput v-model="modelVal" @ref="inpRef"></MyInput>
</template>
<script setup lang="ts">
  import {useTemplateRef} from 'vue'
  import {MyInput} from '@components/MyInput.vue'
  const modelVal = ref('hello')
  const ipt = useTemplateRef('inpRef')
  setTimeout(()=>{
      ipt.value.clear()
  },1000)
</script>
```

## 类型

要实现二次封装的组件有类型提示，需要使用`defineExpose`宏

- 那么在`changeRef`函数设置了`exposed`，使用`defineExpose`又设置一次`exposed`，岂不是覆盖了？

其实不然，`defineExpose`是在`MyInput`组件`setup`时调用的，然后执行`render`渲染模板，渲染时创建`ElInput`组件，设置ref属性为`changeRef`函数，`ElInput`组件挂载完成后，触发`changeRef`函数，`changeRef`接收到`exposed`参数覆盖之前`defineExpose`设置的空对象

```vue{15}
// MyInput.vue
<template>
  <h1>我封装的组件</h1>
  <component :is="h(ElInput,{...$attrs,ref:changeRef},$slots)"></component>
</template>
<script setup lang="ts">
  import {h,getCurrentInstance} from 'vue'
  import {ElInput} from 'element-plus'
  
  const vm = getCurrentInstance()
  
  function changeRef(exposed){
  	vm.exposed = exposed
  }
  defineExpose({} as ComponentInstance<typeof ElInput>)
</script>
```

> 可惜的是，这种方式只支持VS Code，因为它是基于Real language tools
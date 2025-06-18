---
title: 使用infer封装通用类型工具
date: 2025-02-08
categories:
 - typescript
tags:
 - infer
---

在Typescript中，`infer`是一个用于**条件类型**中的关键字，通常与`extends`结合使用。他的作用是从一个类型中推断出某个部分的类型，并将推断出的类型赋值给一个类型变量。`infer`主要用于泛型类型推导，尤其是在处理复杂类型（函数、数组、Promise等）时非常有用。

## 基本语法

`infer`通常出现在条件类型的`extends`子句中

```typescript
T extends infer U ? X : Y
```

`infer U`表示从`T`中推断出一个类型`U`，如果推断成功，则返回`X`，否则返回`Y`

## 使用场景

`infer`最常见的用途是从复杂类型中提取出某个部分的类型，以下是典型的使用场景

1. 提取函数返回值类型

   现在有一个函数类型，我想提取它的返回值类型

   ```typescript
   //函数类型
   type Sum = (a:number,b:number)=>number
   //封装一个工具，用来提取函数的返回值类型
   type Return<T> = T extends (...args: any[]) => infer R ? R : T
   let sumResult = Return<Sum> // number
   ```

   - `T extends (...args: any[]) => infer R`：检查T是否是一个函数类型
   - `infer R`：如果T是函数类型，则使用`infer`来推断出它的返回值类型，并将其赋值给R
   - `?R:T`：如果推断是函数，返回R（即函数返回值类型），否则类型本身

   **使用示例**

   ```typescript
   function foo(){
     return 11
   }
   // 获取foo函数的返回值类型，结果得到是number类型
   type FooReturnType = Return<typeof foo> // number
   ```

   

2. 提取Promise的泛型类型

   现在有一个`Promise`类型，我想提取它的泛型参数类型

   ```typescript
   type UnpackPromise<T> = T extends Promise<infer U> ? U : never
   
   // 如果Promise返回值还是一个Promise，需要得到最终不是Promise的返回值类型
   type UnpackPromise2<T> = T extends Promise<infer U> ? UnpackPromise<U> : never
   ```

   - `T extends Promise<infer U>`：检查 `T` 是否是 `Promise` 类型。
   - `infer U`：如果 `T` 是 `Promise` 类型，则推断出它的泛型参数类型，并将其赋值给 `U`。
   - `? U : never`：如果推断成功，返回 `U`，否则返回 `never`。

   **使用示例**

   ```typescript
   type PromiseType = Promise<string>
   type Unpacked = UnpackPromise<PromiseType> //string
   
   type Unpacked2 = UnpackPromise<Promise<Promise<string>>> // Promise<string>
   type Unpacked3 = UnpackPromise2<Promise<Promise<string>>> // string
   ```

   

3. 提取数组的成员类型

   现在又一个数组类型，我想提取它的成员类型

   ```typescript
   type ElementType<T> = T extends (infer U)[] ? U : never
   ```

   - `T extends (infer U)[]`：检查 `T` 是否是数组类型。
   - `infer U`：如果 `T` 是数组类型，则推断出它的成员类型，并将其赋值给 `U`。
   - `? U : never`：如果推断成功，返回 `U`，否则返回 `never`。

   **使用示例**

   ```typescript
   type ArrayType = number[];
   type Element = ElementType<ArrayType>; // number
   ```

   

4. 提取元祖的类型

   假设我们有一个元组类型，我们想提取它的某个位置的类型：

   ```typescript
   type FirstElement<T> = T extends [infer U, ...any[]] ? U : never;
   ```

   - `T extends [infer U, ...any[]]`：检查 `T` 是否是元组类型，并且至少有一个元素。
   - `infer U`：如果 `T` 是元组类型，则推断出第一个元素的类型，并将其赋值给 `U`。
   - `? U : never`：如果推断成功，返回 `U`，否则返回 `never`。

   **使用示例**

   ```typescript
   type TupleType = [string, number, boolean];
   type First = FirstElement<TupleType>; // string
   ```

## 注意事项

1. **`infer` 只能在条件类型的 `extends` 子句中使用**，不能单独使用。
2. **`infer` 推断的类型是局部的**，只能在当前条件类型的分支中使用。
3. **`infer` 可以嵌套使用**，用于处理更复杂的类型推导。
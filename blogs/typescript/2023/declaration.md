---
title: Typescript类型声明文件
date: 2023-08-28
categories:
 - typescript
tags:
 - 声明文件
---

## 声明文件

以`.d.ts`为后缀的文件是声明文件，为**js代码**提供类型声明，使用时得到类型提示

## 声明文件的位置

### include包含的目录

`tsconfig.json`中只要`include`配置了目录，那么该目录下的声明文件就会生效

### 手动配置

配置`tsconfig.json`中的`typeRoots`，告诉它声明文件的目录在哪里

:::tip

如果配置了`typeRoots`，那么`include`和`node_modules/@types`就会失效

解决：`typeRoots:['node_modules/@types','./types','./src']`

:::

### node_modules/@types

### 与JS代码所在目录相同，文件名也相同的文件

这是使用typescript书写的工程发布后的格式

```
-|src
		index.js
		index.d.ts
		header.js
		header.d.ts
```

## 编写声明文件

### 自动生成

工程使用typescript开发的，编译后的是javascript文件，如果可以让别人使用，同时可以**获得类型检查**，还需要配置`tsconfig.json`的`compilerOptions.declaration:true`编译生成声明文件

### 手动编写

1. 对已有的库，库是使用javascript编写的，可以手动为该库编写声明文件
2. 对第三方库，使用javascript编写，并且第三方库没有提供声明文件，可以手动为该库编写声明文件

## 手动编写

### 全局声明

**没有顶层import、export**的文件认为是一般脚本，运行在**global** scope上，顶层定义的变量、函数、类都存在于**全局作用域上，外部模块和脚本都可访问**

```ts
interface Console {
  log(message?:any):void
  error(errMsg?:any):void
}
declare const console:Console
```

### 模块声明

例如使用lodash这个第三方库，这是一个适用js编写的库，没有类型提示，我们可以手动为这个模块编写声明文件

```ts
//lodash.d.ts
declare module 'lodash' {
  export function chunk<T>(array:T[],size:number):T[][]
  export const camelCase:(val:string)=>string
}
```

编写后，在使用lodash这个库时，只要该声明文件包含在tsconfig.json配置的声明文件所在目录，系统就会查找到lodash的声明文件，声明文件无需导入

```ts
import {chunk,camelCase} from 'lodash'
```

如果要导出lodash对象，那么声明文件需要这么写

```ts
//lodash.d.ts
declare module 'lodash' {
  interface Lodash {
     chunk: <T>(array:T[],size:number)=>T[][],
  	 camelCase: (val:string)=>string
  }
  const lodash:Lodash
  export default Lodash
}

//或者
declare module 'lodash' {
  export function chunk<T>(array:T[],size:number):T[][]
  export const camelCase:(val:string)=>string
  export default {
    chunk，
    camelCase
  }
}
```

:::tip

手动为第三方库编写的声明文件，如果在开发时使用了`ts-node`来执行ts文件会出现找不到声明文件的错误，因为`ts-node`会忽略`tsconfig.json`的`files`、`include`、`exclude`

解决：

```json
{
  "compilerOptions": {
    "typeRoot": ["./node_modules/@types","./types"]
  }
}
```

:::

#### 为文件类型定义声明文件

```ts
//声明png文件类型
declare module '*.png' {
  const url: string
  export default url
}

//声明Vue文件类型
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
```



### 模块文件

以`.ts`为后缀的文件

typescript中规定***顶层*存在import、export关键字**的代码文件被认为是一个模块

如果想要达到类型提示，则需要导入声明文件模块

以下属于模块，需要引入才能使用，顶层存在**export**

```ts{2,8}
//test.ts
export interface Friend {
  name: string
  male: 'male' | 'female'
  job: string
  age: number
}
export interface Test {
  name: string
  arr: Friend[]
}
```

## 声明文件的来源

### 自动生成

### 内置声明文件

内置声明文件卫浴Typescript按抓个目录的`lib`文件中，文件名统一以`lib.[description].d.ts`形式，可以通过编译选项lib来指定加载哪些内置声明文件；noLib选项会禁止加载任何内置声明文件

```json
//tsconfig.json
{
  "complilerOptions":{
    "target":"ES2020",
    "lib":["dom"]
  }
}
```



### 外部模块的类型声明文件

- 库自带类型声明文件

  一般库源码中就包含了，声明文件和库文件名一般相同，形如`moment`这个库的类型声明文件为`moment.d.ts`，`package.json`一般会通过types选项来指定类型声明文件

- 库没有自带，通过社区找到类型声明文件

  社区提供的库类型声明文件，会发布到`npm`的`@types`名称空间下

  typescript会自动加载`node_modules/@types`目录下的类型声明模块，也可以使用编译选项`typeRoots`修改声明文件所在目录

  `types`设置`typeRoots`目录下需要包括在编译之中的类型模块。默认情况下，该目录下的所有类型模块，都会自动包括在编译之中。

  ```json
  //tsconfig.json
  {
    "compilerOptions":{
      "typeRoots":["./typings","./vendor/types"],
      "types":["jquery"]
    }
  }
  ```

  

- 自己写

  可以自己为没有类型声明模块的库编写类型声明模块，是模块，即有export，import

## 拓展

### 拓展全局变量

通过声明合并，就可以扩展全局变量类型

也可以使用`declare namespace`给已有的命名空间添加类型声明

### npm包或UMD库中扩展全局变量类型

对于npm包或UMD库，如果**导入此库后会拓展全局变量**，需要使用`declare global`

```ts{9}
// types/foo/index.d.ts

declare global {
    interface String {
        prependHello(): string;
    }
}

export {};
```

:bangbang:注意：虽然声明文件没有导出任何东西，但仍需要导出一个空对象，告诉编译器这是一个模块，而不是一个全局变量的声明文件

### 扩展模块插件

`declare module`可以用来**扩展原有模块**的类型

:::tip

如果是需要扩展原有模块的话，需要在类型声明文件中**先引用原有模块，再使用 `declare module`** 扩展原有模块

`declare module` 也可用于在**一个文件**中一次性声明**多个模块**的类型

:::

```ts
// types/moment-plugin/index.d.ts

import * as moment from 'moment';

declare module 'moment' {
    export function foo(): moment.CalendarKey;
}
```

## ///三斜杠命令

只能用在文件的头部，用作其他地方会被当做普通的注释

声明文件的内容非常多，可以拆分多个文件，然后在入口文件中使用三斜杠加载其他拆分后的文件

三斜杠命令也可用于普通脚本加载类型声明文件

只有以下几个场景才需要使用三斜杠命令**代替import**

1. 书写一个全局变量的声明文件
2. 需要依赖一个全局变量的声明文件

### 书写一个全局变量的声明文件

我们知道全局变量声明文件时不允许有import或者export关键字出现的，否则就被视为一个模块，不再是全局的。当我们书写一个全局变量声明文件时**需要引入另一个库的类型**，就需要用到三斜杠命令

### **依赖**一个全局变量的声明文件

当我们需要依赖一个全局变量的声明文件时，由于全局变量不支持通过 `import` 导入，当然也就必须使用三斜线指令来引入了

### 声明文件不在TS编译的目录

无论这个声明文件是全局声明文件还是模块声明文件，因为不在`tsconfig.json`所配置的编译目录下，所以不会找到这个声明文件。

如果要使用这个声明文件，可以在TS能够编译的目录中的声明文件中使用///三斜杠命令将其加载进来

```ts
// ./src/index.d.ts
/// <reference path="../lodash.d.ts">
```



### `/// <reference path="" />`

常用来声明当前脚本依赖的类型文件

```ts
/// <reference path="./lib.ts" />

let count = add(1, 2);
```

上面示例表示，当前脚本依赖于`./lib.ts`，里面是`add()`的定义。编译当前脚本时，还会同时编译`./lib.ts`。编译产物会有两个 JS 文件，一个当前脚本，另一个就是`./lib.js`。

下面的例子是当前脚本依赖于 Node.js 类型声明文件。

```ts
/// <reference path="node.d.ts"/>
import * as URL from "url";
let myUrl = URL.parse("https://www.typescriptlang.org");
```

编译器会在预处理阶段，找出所有三斜杠引用的文件，将其添加到编译列表中，然后一起编译。

`noResolve`编译选项打开了，则忽略三斜杠指令

### `/// <reference types="" />`

types 参数用来告诉编译器当前脚本依赖某个 DefinitelyTyped 类型库，通常安装在`node_modules/@types`目录。

types 参数的值是类型库的名称，也就是安装到`node_modules/@types`目录中的子目录的名字。

```
/// <reference types="node" />
```

上面示例中，这个三斜杠命令表示编译时添加 Node.js 的类型库，实际添加的脚本是`node_modules`目录里面的`@types/node/index.d.ts`。

可以看到，这个命令的作用类似于`import`命令。

注意，这个命令只在你自己手写类型声明文件（`.d.ts`文件）时，才有必要用到，也就是说，只应该用在`.d.ts`文件中，普通的`.ts`脚本文件不需要写这个命令。如果是普通的`.ts`脚本，可以使用`tsconfig.json`文件的`types`属性指定依赖的类型库。

### `/// <reference lib="" />`

`/// <reference lib="..." />`命令允许脚本文件显式包含内置 lib 库，等同于在`tsconfig.json`文件里面使用`lib`属性指定 lib 库。

前文说过，安装 TypeScript 软件包时，会同时安装一些内置的类型声明文件，即内置的 lib 库。这些库文件位于 TypeScript 安装目录的`lib`文件夹中，它们描述了 JavaScript 语言和引擎的标准 API。

库文件并不是固定的，会随着 TypeScript 版本的升级而更新。库文件统一使用“lib.[description].d.ts”的命名方式，而`/// <reference lib="" />`里面的`lib`属性的值就是库文件名的`description`部分，比如`lib="es2015"`就表示加载库文件`lib.es2015.d.ts`。

```
/// <reference lib="es2017.string" />
```

上面示例中，`es2017.string`对应的库文件就是`lib.es2017.string.d.ts`

## declare

### declare module和decalre namespace

在这里面，加不加export关键字都可以

:::tip

declare 关键字的另一个用途，是为外部模块添加属性和方法时，给出新增部分的类型描述，对模块进行类型扩展

:::

```ts
import { Foo as Bar } from 'moduleA';

declare module 'moduleA' {
  interface Bar extends Foo {
    custom: {
      prop1: string;
    }
  }
}
```

```ts
// a.ts
export interface A {
  x: number;
}

// b.ts
import { A } from './a';

declare module './a' {
  interface A {
    y: number;
  }
}

const a:A = { x: 0, y: 0 };
```

:bangbang:对模块进行类型扩展时，有两点需要注意

1. `declare module NAME`语法里面的模块名`NAME`，跟 import 和 export 的模块名规则是一样的，且必须跟当前文件加载该模块的语句写法（上例`import { A } from './a'`）保持一致。
2. **不能创建新的顶层类型**。也就是说，只能对`a.ts`模块中已经存在的类型进行扩展，不允许增加新的顶层类型，比如新定义一个接口`B`。
3. 不能对默认的`default`接口进行扩展，只能对 export 命令输出的命名接口进行扩充。这是因为在进行类型扩展时，需要依赖输出的接口名。

### declare global

:::tip

必须在顶层有导出语句，因为`declare global`必须用在模块里面

`declare global` 只能扩充现有对象的类型描述，不能增加新的顶层类型。

:::

```ts{2}
//必须作为模块，所以有export关键字
export {}
//这样在global中定义的类型就可以全局使用
declare global {
  interface Friend {
    name: string
    male: 'male' | 'female'
    job: string
    age: number
  }
  interface Test {
    name: string
    arr: Friend[]
    attr: AttrValue
  }
}
```



## 总结

1. 声明文件中**顶层**有`export`或者`import`关键字，称为模块，需要导入使用；否则是全局的脚本声明文件，无需导入使用
2. npm或UMD扩展全局变量使用`declare global`；扩展插件的类型使用`declare module '插件名称'`
2. 书写全局的声明文件引用其他库，使用三斜杠代替import；全局声明文件需要引入其他库同理；拆分同理
2. 三斜杠的types用于声明对另一个库的依赖；path用于声明对另一个文件的依赖

## 参考链接

[TypeScript 教程 - 网道 (wangdoc.com)](https://wangdoc.com/typescript/)

[声明文件 · TypeScript 入门教程 (xcatliu.com)](http://ts.xcatliu.com/basics/declaration-files.html)

[TypeScript 中的 Module知识点 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/640255494)
---
title: tsconfig配置解析
date: 2023-08-28
category:
 - typescript
tags:
 - tsconfig
---
## include

`include`属性指定所要编译的文件列表，既支持逐一列出文件，也支持通配符。文件位置相对于当前配置文件而定。

```ts
//tsconfig.json
{
  "include":[
    "src/**/*.ts"
  ]
}
```

include支持三种通配符

- ?：指代单个字符
- *：指代任意字符，不含路径分隔符
- **：指定任意目录层级

如果不指定后缀名，默认包括`.ts`、`.tsx`、`.d.ts`，打开`allowJs`，则还包括`.js`和`.jsx`



## typeRoots

`typeRoots`设置类型模块所在的目录，默认是`node_modules/@types`。

`typeRoots`用来指定声明文件或文件夹的路径列表，如果指定了此项，则只有在这里列出的声明文件才会被加载

## types

`types`设置`typeRoots`目录下需要包括在编译之中的类型声明模块。默认情况下，该目录下的所有类型模块，都会自动包括在编译之中。

如果设置了这个选项，那么只有指定的类型声明模块才会被包括，否则typeRoots设置的目录下的其他类型声明模块不会被包括

:bangbang:注意：

1. 必须为`.d.ts`类型声明模块
2. 这是**声明模块**，是有`export`和`import`的


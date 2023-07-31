---
title: npm create发生了什么？
date: 2023-07-25
categories:
 - vite
tags:
 - npm
---
> 现在许多框架和库都会有相应的脚手架工具，用于初始化项目，例如create-vite,create-vue,create-react-app等等

## npm create/init命令

`npm init` 命令除了可以创建`package.json`文件外，还可以用来执行一个包的命令，后面可以接一个`<initializer>`参数

*   `npm create`命令是`npm init`命令的别名

```bash
npm init <initializer>
#等同于
npm create <initializer>
```

*   参数initializer是npm包的名字，包名的格式是create-\<initializer>。

执行`npm init <initializer>`将会转换为相应的`npm exec`操作，使用`npm exec`命令来运行`create-<initializer>`包中对应命令，对应的是`package.json`中`bin`字段指向的文件

```bash
npm init vite my-vite-project
#等同于
npm exec create-vite my-vite-project
```

## npm create vite发生了什么

1.  执行后，先补全包名为create-vite
2.  转换为使用npm exec命令执行,`npm exec create-vite`
3.  命令根据package.json的bin字段指向的文件开始运行

    ```javascript
    //package.json
    {
      //bin:"script.js",
      bin:{
        "create-vite":"script.js"
      }
    }
    ```


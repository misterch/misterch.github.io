---
title: webpack的配置文件
date: 2023-12-13
categories:
 - webpack
---

> 配置文件以`CommonJS`模块化方式导出一个配置对象，因为webpack是在node环境中执行的

webpack在打包的时候不会执行源代码，只会分析源代码，遇到`Commonjs`、`ES Module`等模块化代码会识别依赖，将源代码转换成可以在浏览器中运行的代码

```js
module.exports = {
  
}
```


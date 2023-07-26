---
title: path的join和resolve方法
date: 2023-07-26
tags:
 - node
 - path
categories:
 - node
---

`node`在读取文件或者操作文件的时候，如果发现路径是**相对路径**，会使用`process.cwd()`来将相对路径拼接成绝对路径；

但是如果***不是在项目根目录**处执行node，且路径是**相对路径**，最终会拼接成一个错误的路径*

`process.cwd()`：是获取node执行时所在的目录路径

所以如果***不是在项目根目录**处执行node，且路径是**相对路径**，最终会拼接成一个错误的路径*

`__dirname`：获取当前文件所在的目录路径

## path.resolve()

将路径拼接成**绝对路径**

`/`开头则表示为**根目录**，当遇到以/开头的路径就以这个路径为绝对路径的根路径

```js
//test.js
//当前文件所在目录C:/project/test/

// 遇到/开头则以/作为根拼接
path.resolve("/a","b") // C:/a/b
path.resolve("a","/b","c") // C:/b/c

// 如果是’./‘或者’a/‘的写法，则拼接在当前文件路径的后面
path.resolve("a","b") // C:/project/test/a/b
path.resolve("a","./b","c") // C:/project/test/a/b/c

path.resolve("/a/b","/c/d") // C:/c/d

path.resolve("../a",'b') // C:/project/a/b

path.resolve(__dirname,'./main.js')
//C:/project/test/main.js
```



## path.join()

将路径拼接成**相对路径**

不管是以`/`，`./`，`x/`开头，都不会影响最终拼接出来的结果

```js
path.join('a','b','c') // a/b/c
path.join('/a','/b','./c') // a/b/c
path.join('a','../b','c') // b/c

//使用__dirname获取当前文件所在目录，拼接绝对路径
path.join(__dirname,'a','/b','./c')
//C:/project/test/a/b/c
```
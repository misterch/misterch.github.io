---
title: 内置模块
date: 2023-09-04
---

## path

`process.cwd()`：是获取node执行时所在的目录路径

`__dirname`：获取当前文件所在的目录路径

### path.join

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



### path.resolve

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



### path.basename

`path.basename(path[,suffix])`
作用：获取路径path最后的一部分，可能是文件名
参数：suffix要删除的可选后缀

### path.extname

## fs

fs.readFile()

fs.writeFile()

fs.readFileSync()

fs.writeFileSync()

fs.renameSync(oldname,newname)

## http

### request对象

来自客户端的请求

#### get

使用node的url库的`url.parse(request.url)`可以解析出请求参数

**原生node的request没有query对象**

#### post

通过`on('data')`事件获取post请求参数

获得的参数对象是buffer类型对象，需要`toString()`转换

:::tip 乱码

出现中文乱码问题，需要设置响应头

`Content-type:"text/html;charset=utf-8"`

:::
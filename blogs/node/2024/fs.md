---
title: Node核心模块--FS模块
date: 2024-11-13
tags:
 - fs
categories:
 - node
---

## 常见flag操作符

`r`:可读

`w`:可写

`s`:同步

`+`:执行相反操作

`x`:排他操作

`a`:追加操作

`u`：只有超级用户才能修修改

`i`：不可修改

## 权限表示

```bash
drwxr-xrwr-x
```

### 权限字符表示

| 权限符号表示 | 说明           | 八进制 | 二进制 |
| ------------ | -------------- | ------ | ------ |
| r--          | 只读           | 4      | 100    |
| -w-          | 仅可写         | 2      | 010    |
| --x          | 仅可执行       | 1      | 001    |
| rw-          | 可读可写       | 6      | 110    |
| -wx          | 可写可执行     | 3      | 011    |
| r-x          | 可读可执行     | 5      | 101    |
| rwx          | 可读可写可执行 | 7      | 111    |
| ---          | 无权限         | 0      | 000    |

### 用户角色

根据用户所属角色分配文件操作权限，分为文件所有者、用户组和其他用户

| 访问者     | 文件所有者           | 组用户     | 其他用户   |
| ---------- | -------------------- | ---------- | ---------- |
| 权限       | drwx                 | r-x        | r-x        |
| 权限意义   | 文件夹可读可写可执行 | 可读可执行 | 可读可执行 |
| 八进制表示 | 7                    | 5          | 5          |

| 组权限    | 八进制 | 十进制 |
| --------- | ------ | ------ |
| rwxrwxrwx | 777    | 511    |
| rwxr-xr-x | 755    | 493    |
| rw-rw-rw- | 666    | 438    |

## 文件操作API

### readFile

> 从指定文件中读取数据

```js
const fs = require('fs')
const path = require('path')
fs.readFile(path.resolve('data.txt'),'utf-8',(err,data)=>{
  if(!err){
    console.log(data)
  }
})
```

### writeFile

> 向指定文件中写入数据

```js
const fs = require('fs')
const path = require('path')
fs.writeFile(path.resolve('data.txt'),'hello world',(err,data)=>{
  if(!err){
    console.log('写入成功')
  }
})
```

配置

flag

默认w+：可读写并且清空内容再写入

r+：可读写文件，在已有内容前写入

```js
const fs = require('fs')
const path = require('path')
fs.writeFile(
  path.resolve('data.txt'),
  'hello world',
  {
    mode: 438, //权限位，用八进制是666（用户、用户组、其他用户都只有读写权限），转换成十进制就是438
    flag: 'r+',//写入方式
    encoding: 'utf-8'
  },
  (err,data)=>{
    if(!err){
      console.log('写入成功')
    }
})
```

### appendFile

> 追加的方式向指定文件中写入数据

```js
const fs = require('fs')
const path = require('path')
fs.appendFile(path.resolve('data.txt'),'拉勾教育',(err,data)=>{
  if(!err){
    console.log('追加写入成功')
  }
})
```



### copyFile

> 将某个文件中的数据拷贝至另一文件

```js
const fs = require('fs')
const path = require('path')
fs.copyFile(path.resolve('data.txt'),path.resolve('copy.txt'),err=>{
  if(!err){
    console.log('拷贝成功')
  }
})
```

:::tip

以上的文件操作API是一次性操作，即一次性将所有数据读到内存中，然后再一次性从内存中写进文件中，不适用大文件操作，因为可能会导致内存占满或溢出

:::

### watchFile

> 对指定文件进行监控

```js
fs.watchFile('data.txt',{interval:20},(cur,prev)=>{
  // mtime=modify修改时间
  if(cur.mtime === prev.mtime){
    console.log('文件被修改')
    //取消监听
    fs.unwatchFile('data.txt')
  }
})
```

### open和read

> 所谓的读操作就是将数据从磁盘文件中写入到buffer缓冲区中

`fs.read(fd,buffer,offset,length,position,callback)`

从**当前打开的文件**中从position位置开始读取length长度的数据，将数据**从buffer偏移offset个位置**开始写入到buffer缓冲区中

`fd`：定位当前被打开的文件

`buffer`：用于表示当前缓冲区

`offset`：表示当前从buffer的哪个位置开始执行写入

`length`：表示当前次写入的长度

`position`：表示当前从文件的哪个位置开始读取操作

```js
//data.txt的数据时1234567890
const buf = Buffer.alloc(10)
fs.open('data.txt','r',(err,rfd)=>{
  console.log(rfd) //打开成功为3
  fs.read(rfd,buf,1,4,3,(err,readBytes,data)=>{
    console.log(readBytes) // 4
    console.log(data) // <Buffer 00 34 35 36 37 00 00 00 00 00>
    console.log(data.toString()) // [空]4567
  })
})
```

### write

> 所谓的写（就是读）就是将缓冲区里的内容读出来，写入到磁盘文件中

`fs.write(fd,buffer,offset,length,position,callback)`

将缓冲区的数据偏移offset个位置开始读取length长度的数据，将数据从文件的position个位置开始写入到文件中

`fd`：定位当前被打开的文件

`buffer`：用于表示当前缓冲区

`offset`：表示当前从buffer的哪个位置开始读取数据

`length`：表示当前次写入的长度

`position`：表示当前从文件的哪个位置开始写入操作，一般不动（0），会出现乱码

```js
const buf = Buffer.from('1234567890')
fs.open('new_data.txt','w',(err,wfd)=>{
  fs.write(wfd,buf,1,4,0,(err,written,buffer)=>{
    console.log(written) // 4，写入文件的长度
    // new_data.txt内容 === 2345
    fs.close(wfd)
  })
})
```

### 实现大文件的拷贝

针对大文件的拷贝，利用buffer缓冲区，实现边读边写，边写边读，减轻内存的消耗，提高性能

```js
const buf = Buffer.alloc(10)
const BUFFER_SIZE = buf.length
let readOffset = 0
fs.open('a.txt','r',(err,rfd)=>{
  fs.open('b.txt','w',(err,wfd)=>{
    function next(){
      //将a文件的数据读取BUFFER_SIZE长度到buf缓冲区中
      fs.read(rfd,buf,0,BUFFER_SIZE,readOffset,(err,readBytes)=>{
        if(!readBytes){
          fs.close(rfd,()=>{})
          fs.close(wfd,()=>{})
          console.log('拷贝完成')
          return 
        }
        //每次读取完后需要移动readOffset来更新从文件中哪个位置开始读取数据
        readOffset+=readBytes
        //将缓冲区的数据取出BUFFER_SIZE长度写入到文件中
        fs.write(wfd,buf,0,BUFFER_SIZE,(err,written)=>{
          //写完之后递归调用，直至数据复制完为止
          next()
        })
      })
    }
    next()
  })
})
```

## 目录操作API

### access

> 判断文件或目录是否具有操作权限

### stat

> 获取目录及文件信息

### mkdir

> 创建目录

### rmdir

> 删除目录

### readdir

> 读取目录中内容

### unlink

> 删除指定文件

## 基本操作类

### stat

### read

### write

createWriteStream()

### watcher

watch()

## 常用方法

### 权限操作

1. chmod
2. chgrp

### 文件增删改查

打开/关闭

读取

写入

删除



## 参考

拉勾大前端高薪训练营--Node全栈开发--模块一--核心模块
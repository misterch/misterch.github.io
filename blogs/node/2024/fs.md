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

## 基本操作类

### stat

### read

readFile

```js
const fs = require('fs')
const path = require('path')
fs.readFile(path.resolve('data.txt'),'utf-8',(err,data)=>{
  if(!err){
    console.log(data)
  }
})
```

createReadStream()

### write

writeFile

```js
const fs = require('fs')
const path = require('path')
fs.writeFile(path.resolve('data.txt'),'hello world',(err,data)=>{
  if(!err){
    console.log('写入成功')
  }
})
```

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
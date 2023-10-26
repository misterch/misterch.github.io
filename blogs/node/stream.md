---
title: Node文件流
date: 2023-10-26
categories: 
 - node
---

## 什么是流

流是只数据的流动，数据从一个地方缓缓地流动到另一个地方

流是有方向的

可读流（Readable）：数据从源头流向内存

可写流（Writable）：数据从内存流向源头

双工流（Duplex）：数据既可从源头流向内存，又可从内存流向源头

## 为什么需要流

### 其他介质和内存的数据规模不一致

磁盘可储存数据量巨大，内存可储存数据量有限

如果一下子将磁盘中的数据读到内存中，内存压力会十分大

### 其他介质和内存的数据处理能力不一致

磁盘、网卡等可读写速度比内存慢得多

如果内存将数据高速存到磁盘，磁盘就有可能满载来处理内存流过来的数据，这时候磁盘处理其他任务就会十分缓慢

## 什么是文件流

内存数据和磁盘文件数据之间的流动

## 文件流的创建

### 创建文件可读流

`fs.createReadStream(path[,options]):fs.ReadStream`

`options`：

- `encoding`：编码方式（不指定则返回Buffer）
- `start`：起始字节
- `end`：结束字节
- `highWaterMark`：每次读取数量（默认读64kb字节数）
  - 如果`encoding`有值，该数量表示一个字符数
  - 如果`encoding`为`null`，该数量表示字节数
- `autoClose`：文件读完后自动关闭

返回`Readable`的子类`ReadStream`的实例

`ReadStream`实例方法

- `rs.pause()`：暂停读取，触发pause事件
- `rs.resume()`：恢复读取，触发resume事件

`ReadStream`实例事件

`rs.on('open')`：文件打开事件，文件被打开后触发

`rs.on('data',chunk=>{})`：

- 读取到一部分数据后触发
- 注册`data`事件后，才会真正开始读取
- 每次读取`highWatermark`指定的数量
- 回调函数中会附带读取到的数据

`rs.on('error')`：读文件出错

`rs.on('end')`：读文件结束，end触发后才会触发close

`rs.on('close')`：文件被关闭后触发，可通过`rs.close()`手动关闭，或文件读取完成后自动关闭



```js
const fs = require('fs')
const rs = fs.createReadStream('./test.js',{
  encoding:'utf-8'
})

rs.on('open',()=>{
  console.log('文件被打开了')
})
let str = ''
rs.on('data',chunk=>{
  console.log('根据highWatermark读取到的内容',chunk)
  //每次读取一部分数据到变量中，即读取到内存中
  str+=chunk
})

rs.on('close',()=>{
  // 可以手动关闭
  // 可以在on('data')事件完成后自动触发
})
```



### 创建文件可写流

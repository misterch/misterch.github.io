---
title: Node核心模块--Stream
date: 2024-12-20
categories:
 - node
tags:
 - fs
 - stream
---

Nodejs诞生之初就是为了解决I/O密集型性能问题，**提高I/O性能**

其中最常用的两个模块，**文件操作系统**和**网络模块**正是**流操作**的深度应用者

Nodejs中的流就是处理流式数据的抽象接口，Stream模块则提供了用于实现流接口的对象

## 为什么使用流

应用程序中为什么使用流来处理数据？

例如，用户要下载一部1G的电影，客户端通过网络请求服务端，如果服务端通过`readFile`的方式来读取文件，存在以下问题

1. 同步读取资源文件，用户需要等待数据读取完成再通过网络传输才能看到内容
2. 资源文件最终**一次性加载至内存**，开销很大

解决以上问题，可以使用**流**

每次读取一个固定大小片段的数据到缓存区中，通过一些方式来取出缓存区中的数据并经过一些加工处理，完成这部分大小的数据后输出，如此反复直到数据读取处理完成，可以大大减轻内存的负担，对内存更加友好，而且用户也不需要等待太久时间，可以边传输边看已传输的内容

## 流处理数据的优势

- 时间效率：流的分段处理可以同时操作多个数据chunk
- 空间效率：同一时间流无需占据大内存空间，每次只往内存缓存指定大小的数据
- 使用方便：流配合管道，扩展程序变得简单

## 流的分类

- `Readable`：可读流，能够实现数据的读取
- `Writeable`：可写流，能够实现数据的写操作
- `Duplex`：双工流，既可写又可读
- `Transform`：转换流，可读可写，还能实现数据转换

## 流的特点

- `Stream`模块实现了四个具体的抽象
  - `fs`、`net`、`http`模块已经实现了`Stream`模块的具体实现，可以调用具体模块的API来生产或消费数据操作
- 所有流都继承了`EventEmitter`

```js
const fs = require('fs')
const rs = fs.createReadStream('./test.txt')
const ws = fs.createWriteStream('./copy.txt')
rs.pipe(ws)
```

## 可读流createReadStream()

继承了`Readable`类和`EventEmitter`类的内置API

```txt
0123456789
```

### 创建可读流

创建一个可读流读取txt文件

```js
const fs = require('fs')
const rs = fs.createReadStream('./test.txt',{
  flags； 'r', //可读
  encoding:null, //字符编码设置，不设置则为buffer
  fd: null,//文件标识符，0：输入，1：输出，2：错误
  mode: 438,//0o666
  aotuClose: true,
  start: 0, //从哪个位置开始读取
  end: 3, //从哪个位置读取结束
  highWaterMark: 2 //每次读多少个字节数据，在readable接口默认时16kb，createReadStream是64kb
})
```

### 消费可读流

- 使用`data`事件消费数据

```js
//可通过data事件来读取数据
rs.on('data',(chunk)=>{
  console.log(chunk.toString())
  rs.pause()//每读2字节暂停
  setTimeout(()=>{
    rs.resume() //隔1秒继续读
  },1000)
  //输出
  // 01
  // 23
  //从0位置开始读取数据，每次读取2字节，读到结束位置为3为止
})
```

- 使用`readable`事件消费数据

`rs.read(highWaterMark)`，`highWaterMark`：每次读多少字节数据

```js
rs.on('readable',()=>{
  //let data = rs.read() //buffer数据
  let data
  while((data = rs.read(1)) !== null){
    console.log(data.toString())
    console.log('-------',rs._readableState.length)
  }
})
```

```
// 这里设highWaterMark=4，缓存4个字节
0
-------3
1
-------2
2
-------1
3
-------0
4
-------3
5
-------2
6
-------1
7
-------0
8
-------1
9
-------0

```

### 事件与应用

#### open

创建了可读流对象后就会触发`open`事件

```js
rs.on('open',(fd)=>{
	console.log(fd,'文件打开了')
})
```

#### close

默认情况下，并**不会主动触发**，要等待数据被消费之后才会触发

```js
rs.on('close',()=>{
	console.log('文件关闭了')
})
//数据被消费后，才会触发close事件
rs.on('data',chunk=>{
  console.log(chunk)
})
```

#### end

`end`事件在`close`事件**之前**执行，数据被清空后才关闭文件

```js
rs.on('end',()=>{
  console.log('数据被清空')
})
```

#### error

```js
rs.on('error',e=>{
  console.log('出错了',e)
})
```

```js
const fs = require('fs')
const rs = fs.createReadStream('./test.txt',{
  flags； 'r', 
  encoding:null,
  fd: null,
  mode: 438,
  aotuClose: true,
  start: 0, 
  highWaterMark: 4 
})
rs.on('open',(fd)=>{
	console.log(fd,'文件打开了')
})
rs.on('close',()=>{
	console.log('文件关闭了')
})
rs.on('end',()=>{
  console.log(Buffer.concat(bufferArr).toString())
  console.log('数据被清空')
})
let bufferArr = []
rs.on('data',chunk=>{
  bufferArr.push(chunk)
})
//3,文件打开了
//0123456789
//数据被清空
//文件关闭了

```

## 可写流createWriteStream()

### 创建可写流

```js
const fs = require('fs')
const ws = fs.createWriteStream('./test.txt',{
  flags: 'w', //默认以写（w）方式
  mode: 438,
  encoding: 'utf-8',
  fd: null,
  start: 0,
  highWaterMark: 3,//默认16kb
})
```

### 消费可写流

```js
ws.write('hello world',()=>{
  console.log('数据写已写完---1')
})
ws.write('123456',()=>{
  console.log('数据写已写完---2')
})

//test.txt文件内容：hello world123456
```

`write`虽然是异步操作，但执行有先后

:::tip

对于**文件可写流**，要求传入的数据是`string`、`Buffer`或者`Uint8Array`类型

:::

```js
// 报错，数据并非是要求的类型
ws.write(111,()=>{})

const buf = Buffer.from(123)
ws.write(buf,()=>{
  console.log('写入完成')
})
```

### 事件

#### close

```js
ws.on('open',(fd)=>{
  console.log('文件打开了',fd)
})
ws.write('hello')
ws.on('close',()=>{
  console.log('文件关闭了')
})
ws.end()

//文件打开了 3
//文件关闭了
```

`close`事件需要等待`end`方法执行之后才会触发，`end`执行之后就意味着数据写入操作完成

### end方法

```js
ws.write('hello')
ws.end()
//end方法后不能再执行写入操作
ws.write('write again')
```

:::tip

`end`方法之后不能再执行`write`写入，触发`error`错误

:::

`end`方法可以传参，会写入到文件中

参数跟`write`要求的数据类型一样

```js
ws.write('hello')
ws.end('end')
```

### write的执行流程

`write`方法返回一个布尔值

```js
const fs = require('fs')
const ws = fs.createWriteStream('./test.txt',{
  flags: 'w', //默认以写（w）方式
  mode: 438,
  encoding: 'utf-8',
  fd: null,
  start: 0,
  highWaterMark: 3,//默认16kb
})
let flag = ws.write('1')
console.log(flag)
let flag = ws.write('2')
console.log(flag)
let flag = ws.write('3')
console.log(flag)

//true true false
```

`flag`为false并不代表数据不能被执行写入

1. 第一次调用`write`方法时是将数据写入到文件中
2. 第二次开始`write`方法就是将数据写入到缓存中
3. 生产速度和消费速度不一样，一般情况下生产速度要比消费速度快很多
4. 当`flag`为`false`之后并不意味着当前次的数据不能被写入了，但是我们应该告知数据的生产者，当前的消费速度已经跟不上生产速度了，所以这个时候，一般我们会将可写流的模块修改为暂停模式
5. 当数据生产者暂停之后，消费者会慢慢的消化它内部缓存中的数据，直到可以再次被执行写入操作
6. 当缓冲区可以继续写入数据时如何让生产者知道？使用`drain`事件

write方法的缺点：

针对大容量文件，write方式写入对内存不友好，因为第一次是直接写入到文件，会出现短时间撑满的情况

可通过`drain`事件结合`highWaterMark`来控制写入速度

```js
const fs = require('fs')
const ws = fs.createWriteStream('./test.txt',{
  highWaterMark: 3 //每个汉字3个字节，相当于每次最多写入一个汉字
})
const source = '拉勾教育'.split('')
let num = 0,flag = true
function executeWrite(){
  flag = true
  while(num!==source.length && flag){
    flag = ws.write(source[num])
    num++
  }
}
//执行一次之后，flag变成false，因为highWaterMark为3，每次写入一个汉字占用3个字节
executeWrite()
//当flag=false时触发drain事件的执行
ws.on('drain',()=>{
  console.log('drain执行了')
  executeWrite()
})
```


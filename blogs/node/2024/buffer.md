---
title: Node.js中的Buffer类及字符编码
date: 2024-11-13
tags:
 - buffer
 - 字符编码
categories:
 - node
---

## Buffer

简单来说所谓的**Buffer**就是Node在**V8堆内存**之外分配的**一块固定大小**的内存空间。当**Buffer**被**console.log**打印出来时，会以**字节**为单位，打印出一串以**十六进制**表示的值。

**Buffer** 类是 JavaScript [`Uint8Array`](https://web.nodejs.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) 类的子类

可以将Buffer看成是一个储存**二进制的数组**，数组中的每一项，可以保存**8位二进制**：0000 0000

:::tip

Q: 为什么是8位呢？

A: 

1. 在计算机中，很少情况会直接操作一位二进制，因为一位二进制储存的数据是非常有限的
2. 通常会将8位二进制合成一个单元，这个单元称之为一个字节（byte）
3. 1Byte=8bit，1KB=1024B(2^10)=8192bit，1MB = 1024KB = 1024 * 1024B  = 1024 * 1024B * 8bit
4. 很多变成语言中int类型是4个字节，long类型是8个字节
5. TCP传输的字节流，在写入和读取时都需要说明字节的个数
6. RGB的值分别都是`2^8`，一个像素占3Byte（3*8bit=24bit），所以本质上在计算机中都是用一个字节储存的

:::

## 创建Buffer

### Buffer.alloc()

创建指定长度的buffer对象

```js
const buf1 = Buffer.alloc(3)
const buf2 = Buffer.from(buf1)
console.log(buf1) //<Buffer 00 00 00>
console.log(buf2) //<Buffer 00 00 00>
buf1[0]=1
console.log(buf1) //<Buffer 01 00 00>
console.log(buf2) //<Buffer 00 00 00>
```

通过向Buffer.from传入指定长度的buffer，并非共享一段内存空间 ，而是对旧内存空间的值的拷贝或者利用了旧空间的长度创建出一段新空间

## Buffer实例方法

### fill(value,start,end)：使用数据填充buffer

1. 字符串填充

如果传递的参数值的字节小于创建buffer的字节长度，就会重复写入数据直到填满

```js
const buf = Buffer.alloc(6)
buf.fill('123')
console.log(buf) // <Buffer 31 32 33 31 32 33>
console.log(buf.toString())  //123123
```

fill的第二个参数start，表示从第几个下标开始填充，第三个参数end，表示结束位置，结束位置无法填充

```js
const buf = Buffer.alloc(6)
buf.fill('123',1,3)
console.log(buf) // <Buffer 00 31 32 00 00 00>
console.log(buf.toString())  //12
```

2. 数字填充

将数字转换为utf8中对应的符号

```js
const buf = Buffer.alloc(6)
buf.fill(123)
console.log(buf) // <Buffer 7b 7b 7b 7b 7b 7b>
console.log(buf.toString())  //{{{{{{
```

### write(value,start,length)：向buffer中写入数据

```js
const buf = Buffer.alloc(6)
buf.write('123')
console.log(buf) // <Buffer 31 32 33 00 00 00>
console.log(buf.toString())  //123
```

设置从下标位1的位置开始写入，写入的长度为3

```js
const buf = Buffer.alloc(6)
buf.write('123',1,3)
console.log(buf) // <Buffer 00 31 32 33 00 00>
console.log(buf.toString())  // 123
```

### toString(encoding,start,end)：从buffer中提取数据

end：不包括end位置

```js
const buf = Buffer.from('你好世界')
console.log(buf) // <Buffer e4 bd a0 e5 a5 bd e4 b8 96 e7 95 8c>
// 使用默认utf8编码将buffer转换成字符
console.log(buf.toString()) //你好世界
console.log(buf.toString('utf8',3,6))// 好
```

### slice(start,end)：截取buffer

不含end位置

```js
const buf = Buffer.from('你好世界')
let b1 = buf.slice(3,6)
console.log(b1) // <Buffer e5 a5 bd>
console.log(b1.toString()) // 好
//从后往前开始数3个下标的位置
let b2 = buf.slice(-3) //界
```

### indexOf(value)：在buffer中查找数据

```js
const buf = Buffer.from('你好世界，我是世一')
let b1 = buf.indexOf('世') // 6
let b2 = buf.indexOf('世',b1+1) //21
```



### copy(target,targetStart,sourceStart,sourceEnd)：拷贝buffer中的数据

```js
const buf1 = Buffer.alloc(6)
const buf2 = Buffer.from('你好')
// 将buf2拷贝到buf1
buf2.copy(buf1)
```

## Buffer静态方法

### concat(buffer[],length)

```js
const buf1 = Buffer.from('你好')
const buf2 = Buffer.from('世界')
const b = Buffer.concat([buf1,buf2])
console.log(b.toString())
const b2 = Buffer.concat([buf1,buf2],9)
console.log(b.toString())//你好世
```

### isBuffer

判断传入的数据是否是buffer对象

### 自定义split

```js
ArrayBuffer.prototype.split = function(sep){
  const len = Buffer.from(sep).length//分割符号的长度
  let ret = []
  let start = 0 //从哪个位置开始截取
  let offset = 0 //偏移量
  while(offset = this.indexOf(sep,start) !== -1){
    ret.push(this.slice(start,offset))
    start = offset + len
  }
  ret.push(this.slice(start))
  return ret
}
```



## Buffer和字符串

Buffer相当于是一个字节的数组，数组中的**每一项对应一个字节**的大小，Buffer中的**每一项用16进制**表示

`Buffer.from(data,encoding)`，`data`可能的类型有`string`、`number[]`、`buffer`、`ArrayBuffer` ，`encoding`默认是`utf8编码`

### 字符串

给`from`传入字符串类型时，会根据字符串编码生成该字符串对应的二进制表示

一个字节就能储存所有英语符号，所以一个英语字符可以用一个字节表示

```js
const buf = Buffer.from('why')
console.log(buf) // <Buffer 77 68 79>
console.log(buf.toString()) //why
```

如果要表示中文

```js
const buf = Buffer.from('你好世界')
console.log(buf) // <Buffer e4 bd a0 e5 a5 bd e4 b8 96 e7 95 8c>
console.log(buf.toString()) // 你好世界
```

可以看出，4个中文字符，需要12个字节来表示，即1个中文字符需要用3个字节来表示，这是默认的utf8编码方式

### 数字类型数组

给`from`传入一个`number[]`，其实相当于传入一个buffer对象类似，数组中的每一项表示一个字节，每项可以用你想用的进制来表示

```js
const buf1 = Buffer.from([e4, bd, a0, e5, a5, bd, e4, b8, 96, e7, 95, 8c])
console.log(buf1.toString()) // 你好世界
// 十六进制e4bda0：你
// 十六进制e5a5bd：好
// 十六进制e4b896：世
// 十六进制e7958c：界

//十进制数组
const buf2 = Buffer.from([77, 68, 79])
console.log(buf2.toString()) // why

//二进制数组
const buf2 = Buffer.from([0b1110111, 0b1101000, 0b1111001])
console.log(buf2.toString()) // why
```



## 字符编码

### ASCII码

计算机内部所有信息最终都是一个二进制值，每个二进制位有两种状态`0`和`1`，8个二进制位可以表示有2^8=256种状态，每个状态可以对应一个符号，从`00000000`到`11111111`。

由美国制定的一套字符编码，对英语字符与二进制位之间的关系做了统一的规定，被称为ASCII码。

`ASCII码`一共规定了128个字符的编码（无符号正整数，二进制第一位始终为0），比如空格`SPACE`是32（二进制`00100000`），大写字母`A`是65（二进制`01000001`）。

### 非ASCII编码

英语用128个符号编码就够了，但是用来表示其他语言，128个符号是不够的。不同语言有分别有不同的字符编码方式

### Unicode

世界上存在多种编码方式，同一个二进制数字可以被解析成不同的符号。因此，要想打开一个文本文件，就必须知道它的编码方式，否则用错误的编码方式解读，就会出现乱码。

可以想象，如果有一种编码，将世界上所有的符号都纳入其中。每一个符号都给予一个独一无二的编码，那么乱码问题就会消失，这就是`Unicode`。

`Unicode`是一个很大的集合，现在的规模可以容纳100多万个符号。每个符号的编码都不一样，比如`U+0639`表示阿拉伯字母`Ain`，`U+0041`表示英语的大写字符A，`U+4E25`表示汉字`严`。

### Unicode的问题

需要注意的是，`Unicode` 只是一个符号集，它只规定了符号的二进制代码，却没有规定这个二进制代码应该如何存储。

比如，汉字`严`的 Unicode 是十六进制数`4E25`，转换成二进制数足足有15位（`100111000100101`），也就是说，这个符号的表示至少需要2个字节。表示其他更大的符号，可能需要3个字节或者4个字节，甚至更多。

这里就有两个严重的问题

第一个问题是，如何才能区别 Unicode 和 ASCII ？计算机怎么知道三个字节表示一个符号，而不是分别表示三个符号呢？

第二个问题是，我们已经知道，英文字母只用一个字节表示就够了，如果 Unicode 统一规定，每个符号用三个或四个字节表示，那么每个英文字母前都必然有二到三个字节是`0`，这对于存储来说是极大的浪费，文本文件的大小会因此大出二三倍，这是无法接受的。

它们造成的结果是：

1. 出现了 Unicode 的多种存储方式，也就是说有许多种不同的二进制格式，可以用来表示 Unicode。
2. Unicode 在很长一段时间内无法推广，直到互联网的出现。

### UTF-8

互联网的普及，强烈要求出现一种统一的编码方式。UTF-8 就是在互联网上使用最广的一种 Unicode 的实现方式。其他实现方式还包括 UTF-16（字符用两个字节或四个字节表示）和 UTF-32（字符用四个字节表示），不过在互联网上基本不用。**重复一遍，这里的关系是，UTF-8 是 Unicode 的实现方式之一。**

UTF-8 最大的一个特点，就是它是一种变长的编码方式。它可以使用1~4个字节表示一个符号，根据不同的符号而变化字节长度。

UTF-8 的编码规则很简单，只有二条：

1）对于单字节的符号，字节的第一位设为`0`，后面7位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。

2）对于`n`字节的符号（`n > 1`），第一个字节的前`n`位都设为`1`，第`n + 1`位设为`0`，后面字节的前两位一律设为`10`。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。

下表总结了编码规则，字母`x`表示可用编码的位。

> ```
> Unicode符号范围      |        UTF-8编码方式
> (十六进制)           |              （二进制）
> ----------------------+---------------------------------------------
> 0000 0000-0000 007F | 0xxxxxxx
> 0000 0080-0000 07FF | 110xxxxx 10xxxxxx
> 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
> 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
> ```

跟据上表，解读 UTF-8 编码非常简单。如果一个字节的第一位是`0`，则这个字节单独就是一个字符；如果第一位是`1`，则连续有多少个`1`，就表示当前字符占用多少个字节。

下面，还是以汉字`严`为例，演示如何实现 UTF-8 编码。

`严`的 Unicode 是`4E25`（`100111000100101`），根据上表，可以发现`4E25`处在第三行的范围内（`0000 0800 - 0000 FFFF`），因此`严`的 UTF-8 编码需要三个字节，即格式是`1110xxxx 10xxxxxx 10xxxxxx`。然后，从`严`的最后一个二进制位开始，依次从后向前填入格式中的`x`，多出的位补`0`。这样就得到了，`严`的 UTF-8 编码是`11100100 10111000 10100101`，转换成十六进制就是`E4B8A5`。

## 参考

[字符编码笔记：ASCII，Unicode 和 UTF-8 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)
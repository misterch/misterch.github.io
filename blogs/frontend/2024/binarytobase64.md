---
title: 二进制转换成base64
date: 2024-12-31
tags:
 - buffer
 - base64
 - 字符编码
---

## Buffer

`Buffer`类是JavaScript中`Uint8Array`的子类，可以将`Buffer`看成一个**储存二进制**的数组，数组中的每一项可以**保存8位二进制数**，即数组中每一项可以保存**1字节数据**

`1Byte`可以表示`00000000`至`11111111`，即`2^8=256种状态`

`Buffer`中的每一项使用**十六进制**表示

```js
//创建数组长度为3的Buffer对象，每项可以保存1个字节（8bit）的数据，总共可以保存3字节（24bit）的数据
const buf = Buffer.alloc(3)
buf.write('123')
console.log(buf) //<Buffer 31 32 33>
```

> `Uint8Array`：数组每项最多只能储存最大8bit（1byte）共`2^8=256`种状态
>
> - 二进制：0000 0000 - 1111 1111
> - 十六进制：00 - FF
>
> `Uint16Array`：数组每项最多只能储存最大16bit（2byte）共`2^16=65535`种状态
>
> - 二进制：0000 0000 0000 0000 - 1111 1111 1111 1111
> - 十六进制：0000 - FFFF
>
> 如果`Uint8Array(4)`的长度是`4byte（4*8=32bit）`，[0b1111111,0b1111111,0,0]=[127,127,0,0]
>
> 用`Uint16Array`表示长度为`2byte（23bit）`，[0b111111101111111,0,0]=[32639,0]
>
> 用`Uint32Array`表示长度为`1byte（32bit）`，[0b111111101111111]=[32639,0]

```js
//为方便理解，使用有符号整数数组
//创建一个4字节的TypedArray
var arr = [127,127,0,0]
// -128(-2^7)~ 127(2^7 - 1)
var u8 = new Int8Array(4arr)
//u8 = [0b01111111,0b01111111,0,0]
//使用Int16Array来表示的话，因为每项最大可以储存2字节，所以长度为4的Int8Array可以表示长度为2的Int16Array，即Int8Array的每两项合并为Int16A rray的一项
//即u16 = [0b0111111101111111,0]
//使用十进制表示 u16 = [32639,0]
```



## ASCII

计算机内部所有信息最终都是一个二进制值，每个二进制位有两种状态`0`和`1`，8个二进制位可以表示有2^8=256种状态，每个状态可以对应一个符号，从`00000000`到`11111111`。

由美国制定的一套字符编码，对英语字符与二进制位之间的关系做了统一的规定，被称为ASCII码。

[ASCII码](https://tool.oschina.net/commons?type=4)一共规定了128个字符的编码（无符号正整数，二进制第一位始终为0），比如空格`SPACE`是32（二进制`00100000`），大写字母`A`是65（二进制`01000001`）。

### 将Buffer转换成字符

`Buffer`储存的是一组由二进制组成的数组，为方便显示使用十六进制显示

现在有一个Buffer数据，在计算机内部是这样的

`001100010011001000110011`

使用`console.log`来在控制台打印，显示的是十六进制格式

`<Buffer 31 32 33>`

将Buffer转换为ASCII编码格式的字符串

```js
//创建长度为3的Uint8Array数组,用来模拟二进制数据
const buf = new Uint8Array(3)
//存入16进制数据
buf[0] = 0x31
buf[1] = 0x32
buf[2] = 0x33
```

使用`String.fromCharCode()`可以传入`unicode`编码返回字符串

使用`charCodeAt()`可以获得字符串所对应的`unicode`编码

`unicode`字符集包含世界上几乎所有字符的标准字符编码系统

```js
String.fromCharCode(...buf) //123
```

## Base64

![](https://i-blog.csdnimg.cn/blog_migrate/6bd937a20b29714171b1669cfca0d4ab.png)

### 转换步骤

1. 将待转换的字符串**每三个字节为一组**，每个字节8bit，总共24bit二进制位（6和8最小公倍数为24）
2. 将24个二进制位**每6个一组**（从左往右分），共分为4组
3. 每组前面添加**两个0**，每组6个变为8个二进制位，共32个二进制位，即**4个字节**
4. 根据Base64编码对照表获得的对应的值

```js
btoa(String.fromCharCode(...u8)) // MTIz
```

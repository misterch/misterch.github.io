---
title: 二进制转换成base64(中文转base64)
date: 2024-12-31
tags:
 - buffer
 - base64
 - TextEncoder
 - TextDecoder
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
> 如果`Uint8Array(4)`的长度是`4byte（4*8=32bit）`，[0b1111111,0b1111111,0,0]=[127,127,0,0]=[0x7f,0x7f，0,0]
>
> 用`Uint16Array`表示长度为`2byte（24bit）`，[0b111111101111111,0,0]=[32639,0]
>
> 用`Uint32Array`表示长度为`1byte（32bit）`，[0b111111101111111]=[32639,0]

```js
//为方便理解，使用有符号整数数组
//创建一个4字节的TypedArray
var arr = [127,127,0,0]
// -128(-2^7)~ 127(2^7 - 1)
var u8 = new Int8Array(4arr)
//u8 = [0b01111111,0b01111111,0,0]
//使用Int16Array来表示的话，因为每项最大可以储存2字节，所以长度为4的Int8Array可以表示长度为2的Int16Array，即Int8Array的每两项合并为Int16Array的一项
//即u16 = [0b0111111101111111,0]
//使用十进制表示 u16 = [32639,0]
```



## ASCII

计算机内部所有信息最终都是一个二进制值，每个二进制位有两种状态`0`和`1`，8个二进制位可以表示有2^8=256种状态，每个状态可以对应一个符号，从`00000000`到`11111111`。

由美国制定的一套字符编码，对英语字符与二进制位之间的关系做了统一的规定，被称为ASCII码。

[ASCII码](https://tool.oschina.net/commons?type=4)一共规定了128个字符的编码（无符号正整数，二进制第一位始终为0），比如空格`SPACE`是32（二进制`00100000`），大写字母`A`是65（二进制`01000001`）。

每个字符占1个字节

## Base64

定义：Base64是一种二进制到文本的编码方案，将任意二进制数据转换为由64个可打印ASCII字符组成的字符串

用途：通常用于文本协议（HTTP、JSON）中安全传输二进制数据

特点：

- 每3字节二进制数据（即3*8=24bit）被编码成4个Base64字符（每个字符占6位）
- 若原始数据长度不足3字节，会用`=`填充

![](https://i-blog.csdnimg.cn/blog_migrate/6bd937a20b29714171b1669cfca0d4ab.png)

### 转换原理

1. 将待转换的字符串**每三个字节为一组**，每个字节8bit，总共24bit二进制位（6和8最小公倍数为24）
2. 将24个二进制位**每6个一组**（从左往右分），共分为4组
3. 每组前面添加**两个0**，每组6个变为8个二进制位，共32个二进制位，即**4个字节**
4. 根据Base64编码对照表获得的对应的值



### btoa—编码为Base64

**功能：**将**二进制字符串**（通常是ASCII或UTF-8文本）编码为Base64字符串

**语法：**`btoa(stringToEncode)`

```javascript
const encoded = btoa('hello')
console.log(encoded) //SGVsbG8=
```

**注意：**

- 只能直接编码ASCII字符（如a-z、A-Z、0-9、+、/）

- 如果字符串包含非 ASCII 字符（如中文、表情符号等），需先转换为 UTF-8 编码的二进制形式

  ```javascript
  btoa('你好') //报错
  ```

  

### atob—解码Base64

**功能**：将Base64字符串解码为原始二进制字符串

**语法**：`atob(encodedStr)`

```javascript
const decoded = atob("SGVsbG8="); // "Hello"
console.log(decoded); // 输出: Hello
```

**注意**：

- 解码结果通常是ASCII或二进制字符串
- 如果原始内容是UTF-8文本（如中文），需要进一步处理

## 将Buffer转换成字符

`Buffer`储存的是一组由二进制组成的数组，为方便显示使用十六进制显示

现在有一个Buffer数据，在计算机内部是这样的

`001100010011001000110011`

使用`console.log`来在控制台打印，显示的是十六进制格式

`<Buffer 31 32 33>`

将Buffer转换为ASCII编码格式的字符串

`Uint8Array`中，每项最大能储存**2^8=256**种状态，刚好能储存整个ASCII字符集

```js
//创建长度为3的Uint8Array数组,用来模拟二进制数据
const buf = new Uint8Array(3)
//存入16进制数据
buf[0] = 0x31
buf[1] = 0x32
buf[2] = 0x33
```

使用`String.fromCharCode(code)`可以传入`unicode`编码返回字符串

使用`charCodeAt(str)`可以获得字符串所对应的`unicode`编码

`unicode`字符集包含世界上几乎所有字符的标准字符编码系统

```js
String.fromCharCode(...buf) //123
```

## 处理非ASCII字符（UTF-8）

- Node环境

  使用`Buffer`

  ```javascript
  const str = '你好'
  //将utf-8字符串转换成buffer
  const buffer = Buffer.from(str)
  // 编码
  const base64 = buffer.toString('base64')
  
  // 解码
  const decodeStr = Buffer.from(base64,'base64').toString()
  ```

  

- 浏览器环境

  使用`TextEncoder`和`TextDecoder`

```javascript
function encodeBase64(str){
  const encoder = new TextEncoder()
	//将utf-8字符串编码成Buffer
  // Uint8Array([228,189,160,229,165,189])
	const arrayBuffer = encoder.encode(str)
  // 接收多个unicode值，返回unicode编码的字符，也可以说是ascii字符
  // 228->ä, 189->½
  const ascii = String.fromCharCode(...arrayBuffer)
	//base64编码
	const base64 = btoa(ascii)
  return base64
}

function decodeBase64(base64){
  // 将base64解码成ascii字符
  const ascii = atob(base64)
  // 将ascii字符串一一对应字符的ascii码值
  const asciiArr = [...ascii].map(c=>c.charCodeAt(0))
  // 将数组转换成Uint8Array
  const buffer = new Uint8Array(asciiArr)
  const decoder = new TextDecoder()
  const str = decoder.decode(buffer)
  return str
}
//解码，将base64编码解码成原始数据
const base64ToBuffer = new Uint8Array([...])
```

`Uint8Array`每项可以表示1字节的数据，而ASCII字符集的每个字符等于1字节，所以`Uint8Array`的每项可以一对一表示一个ASCII字符，转换成base64时不会产生非ASCII字符集转换错误问题

## 总结

1. ASCII是字符集，Base64是编码方案
2. ASCII直接表示字符，Base64表示二进制数据的编码形式
3. Base64编码结果完全有ASCII字符组成
4. 非ASCII字符需通过字符集转为二进制，再Base64编码
5. `Uint8Array`每项能储存**8bit（1Byte）**数据，即一个字节可以表示**2^8=256**种状态
6. 标准ASCII字符集包含128个字符，直范围0到127（00000000-01111111）；拓展ASCII包含剩下的128个拓展字符
7. ASCII每个字符占用1字节（8bit），而`Uint8Array`每位也是储存1字节数据，因此`Uint8Array`可以一对一表示ASCII字符集

## 参考

[Base64编码对照表 - JSON中文网](https://www.json.cn/document/base64/)

[ASCII码对照表，ASCII码一览表（非常详细） - C语言中文网](https://c.biancheng.net/c/ascii/)

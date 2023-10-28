---
title: Node的http模块
date: 2023-10-27
categories:
 - node
tags:
 - http
---

## 客户端

向别的服务器发送请求

`http.request(url[,options][,callback]):http.ClientRequest`

`callback`回调函数的参数是`IncomingMessage`对象，是服务器响应给客户端传过来的信息

返回的是`ClientRequest`对象

```js
const http = require('http')

//创建客户端请求对象并发送请求
const request = http.request(
	"http://www.baidu.com",
  {
    method:'GET'
  },
  resp => {
    console.log('服务器响应的状态码',resp.statusCode)
    let str = ''
    resp.on("data",chunk=>{
      console.log('使用流来接收服务器返回的信息')
      str += chunk.toString('utf-8')
    }) 
    resp.on('end',()=>{
      console.log(str)
    })
  }
)
//发送请求体内容
request.write()
//表示这次的请求结束，服务器就可以返回响应内容
request.end()
```



## 服务端

别的客户端发送来服务端的请求

`http.createServer([options][,requestListener]):http.Server`

`requestListener`参数是一个函数，接收两个参数

- `request:http.IncomingMessage`：接收客户端传过来的请求

- `response:http.ServerResponse`：发送给客户端的响应数据

返回`Server`对象，这是服务器对象

```js
const http = require('http')

const server = http.createServer((req,res)=>{
  console.log('请求的地址',req.url)
})

server.listen(9527)
server.on('liistening',()=>{
  console.log('server listen on prot 9527')
})
```

## 总结

作为客户端

- 请求：`ClientRequest`对象
- 响应：`IncomingMessage`对象

作为服务端

- 请求：`IncomingMessage`对象
- 响应：`ServerResponse`对象
- 返回：`Server`对象，创建的服务器对象
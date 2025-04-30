---
title: 代理客户端解决跨域
date: 2025-04-07
categories:
 - node
tags:
 - 跨域
---

## 服务端

```javascript
const http = require('http')
const server = http.createServer((req,res)=>{
  let arr = []
  req.on('data',data=>{
    arr.push(data)
  })
  req.on('end',()=>{
    console.log(Buffer.concat(arr).toString())
    res.end('接收到客户端的数据,再把处理数据返回到客户端')
  })
})

server.listen(1234,()=>{
  console.log('外部服务端已启动')
})
```

## 代理客户端

代理浏览器作为客户端向服务端发送请求，而且**代理客户端本身也是一个服务端**，只是这个服务端跟浏览器是同源的

```javascript
const http = require('http');
const https = require('https');
const url = require('url');

// 创建本地代理客户端服务器
const proxy = http.createServer((clientReq, clientRes) => {
  // 解析客户端请求的URL
  const targetUrl = url.parse(clientReq.url);
  
  // 配置目标服务器选项
  const options = {
    hostname: targetUrl.hostname,  // 目标服务器主机名
    port: targetUrl.port || (clientReq.url.startsWith('https') ? 443 : 80), // 端口
    path: targetUrl.path,          // 请求路径
    method: clientReq.method,      // 请求方法
    headers: { ...clientReq.headers, host: targetUrl.hostname } // 复制请求头
  };

  // 根据协议选择http/https模块
  const module = clientReq.url.startsWith('https') ? https : http;
  
  // 向目标服务器发起请求
  const proxyReq = module.request(options, (proxyRes) => {
    // 将目标服务器响应头写入本地代理客户端服务器响应
    clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
    // 将外部服务器的响应(proxyRes)经过本地代理服务器处理传递给客户端(clientRes)
    // 目标响应 -> 代理服务器 -> 客户端
    proxyRes.pipe(clientRes);
  });

  // 处理代理请求错误
  proxyReq.on('error', (err) => {
    console.error('Proxy Request Error:', err);
    clientRes.statusCode = 500;
    clientRes.end('Proxy Error');
  });

  // 将客户端（浏览器）请求交给本地代理服务器(clientReq)向外部服务器发送请求(proxyReq)
  // 客户端请求 -> 代理服务器 -> 目标服务器
  clientReq.pipe(proxyReq);
});

// 处理代理服务器错误
proxy.on('error', (err) => {
  console.error('Proxy Server Error:', err);
});

// 启动代理服务器监听指定端口
const PORT = 8080;
proxy.listen(PORT, () => {
  console.log('本地代理服务端已启动')
  console.log(`Proxy server running on port ${PORT}`);
  console.log(`Usage: curl -x http://localhost:${PORT} http://target-url`);
});

```


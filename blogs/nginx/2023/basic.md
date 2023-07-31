---
title: Nginx可以做的事情
date: 2023-07-29
categories:
 - nginx
tags:
 - 反向代理
 - 虚拟主机
 - 负载均衡
---

## 配置文件解析

配置文件主要由三个配置快组成&#x20;

```bash
#全局块

#events块
#服务器与客户端之间网络连接的配置
events {}

#http块
#虚拟主机，反向代理，负载均衡等
http{
	#server块，即虚拟主机
	server{}
	#把servers目录下的所有配置文件包含进来，可以把每个主机的配置文件单独放到一个文件中管理
	include servers/*
}
 
```

```bash
#设置进程数量，一般跟cpu内核数量相同
#设置auto，根据内核数量自动分配
worker_process 6;
http {
	server {
		#将mime.types文件包含进来
		include mime.types;
		#监听的端口
		listen	80;
		server_name	localhost;
		# 匹配浏览器地址栏输入的url
		# /就是匹配根目录
		location / {
			#根目录的文件夹路径，是一个相对地址，相对于nginx的安装目录来说
			root html;
			#在html目录中寻找index.html或者index.htm文件
			#这个文件就是在浏览器输入匹配的url后看到的页面
			index index.html index.htm;
		}
	}
}
```

## 命令

```bash
nginx -s start #启动
nginx -s stop #停止
nginx -s quit #优雅停止
nginx -s reload #重新加载配置文件

nginx -t #检查配置文件

```

## 反向代理

> 正向代理：代理客户端，如vpn代理服务器作为客户端访问网站，将访问结果返回给我的客户端，对服务器是透明的（服务器不知道）
>
> 反向代理：代理服务端，如访问百度，对外暴露的只有一个域名，但是服务器可能会将请求转发到其他的服务器上，隐藏了真实服务器的ip和端口信息，对客户端是透明的（客户端不知道）

> 反向代理常用的指令：`proxy_pass`*,*`proxyset_header`

### proxy\_pass

用来设置被代理服务器地址，可以是主机名称，IP地址加端口号

*   [x] 解决跨域问题

```bash
# 代理到bilibili，访问时会跳转到bilibili
location / {
	root html;
	index	index.html index.htm;
	proxy_pass https://bilibili.com;
}
#反向代理
#当跨域时，nginx拦截/api开头的请求，将其转发到http:localhost:9000;解决跨域问题
location /api {
	proxy_pass	http://localhost:9000;
}
```

## HTTPS

默认端口443

### 证书的申请

> 申请完证书后会得到**密钥文件**和**证书文件**
>
> 这两个文件需要放到服务器中

1.  云平台可以免费申请证书
2.  使用openssl生成自签名证书

    ```bash
    #生成私钥
    openssl general -out private.key 2048
    #根据私钥生成证书签名请求文件CSR
    openssl req -new -key private.key -out cert.csr
    #使用私钥对证书申请进行签名从而生成证书文件pem文件
    openssl x509 -req -in cert.csr -out cacert.pem -signkey private.key
    ```
3.  配置nginx

    ```bash
    server{
        #https服务
        listen 443 ssl;
        server_name your_host_name;
        #证书文件名称，即路径
        ssl_certificate  /etc/nginx/cacert.pem;
        #证书私钥文件名称
        ssl_certificate_key /etc/nginx/private.key;
        #ssl验证配置
        ssl_session_timeout  5m;#缓存有效期
        #安全链接可选的加密协议
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
        #配置加密套件/加密算法，写法遵循openssl标注
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        #使用服务器端的首选算法
        ssl_prefer_server_ciphers on;
    }
    
    server {
      listen 80;
      server_name myblog.a.com;
      #将http请求跳转到https
      return 301 https://$server_name$request_uri;
    }
    ```

## 虚拟主机

可以在一台服务器中部署多个站点，节省服务器资源和成本，充分利用服务器

```bash
#每一个server就是一个虚拟主机
server{
	listen 8080;
	server_name localhost;
	location / {
		root ./vue2;
		index index.html;
	}
}

server{
	listen 5173;
	server_name localhost;
	location / {
		root ./vue3;
		index index.html;
	}
}
```

## vue history 404问题

> 问题原因：服务器时根据页面路由去按照路径寻找资源的，vue项目打包后只有一个html页面，不存在其他资源目录下的html，服务器找不到对应的页面所以会报404

### try\_files

```bash
location / {
	root html;
	index	index.html index.htm;
	# $uri是当前的路径（不包括?后的参数），将$uri拼接到index.html后面
	try_files	$uri $uri/ /index.html;
}
```

## 日志分析器 GoAccess

linux安装GoAccess

```bash
wget 下载地址
tar goaccess.tar.gz
# 进入解压后的目录执行configure文件
# 然后执行make命令安装，再执行一次make install
make
make install
# 查看nginx安装位置
whereis nginx
#进入到nginx的logs目录，access.log就是日志记录

#使用goaccess来将access.log格式化
goaccess ./access.log
```

### 开启实时HTML报告分析

[配置项](https://blog.csdn.net/qq1195566313/article/details/124546293)

1.  在HTML目录中新建report.html文件
2.  执行`goaccess access.log -a -o ../html/report.html --real-time-html --log-format=COMBINED`

    \-a

    \-o 将生成报告输出到指定的文件

    \--real-time-html  实时生成html报告
3.  输入localhost/report.html浏览报告结果

## 负载均衡

### upstream

```bash
upstream node {
	#根据客户端的ip进行hash，同一个客户端的请求分配到同一个服务器上，解决session的问题
	ip_hash;
	# weight越大，分配到的压力越大
	# 访问超时后使用备用服务器
	server 127.0.0.1:9001 weight=3 fail_timeout=60;
	server 127.0.0.1:9002 weight=2 fail_timeout=20;
	server 127.0.0.1:9003 weight=1 backup;
}
server {
	location / {
		#http://node的node就是upstream配置中的node
		proxy_pass http://node;
	}
}
```


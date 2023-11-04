---
title: 作为CA机构颁发https证书
date: 2023-10-28
categories:
 - node
tags:
 - openssl
 - https
---

## 颁发证书流程

证书中含有服务器公钥，证书签名，由于CA机构的公钥是公开的，可以通过CA机构的公钥解密读取，但是由于没有CA私钥，无法重新加密伪造（只能解密读取，不能修改伪造）

### 证书签名

> 证书签名 = 服务器域名 + 服务器公钥 + CA公钥

证书签名的算法是公开的，它出现的目的，是为了让每一个拿到证书的终端，可以验证签名是否被篡改

CA机构：有公钥和私钥还有证书

服务器：准备好服务器域名、公钥

## 服务器申请https证书

### 生成服务器私钥

```bash
openssl genrsa -out server-key.pem 1024
```

可以直接生成，无需再加密

### 生成服务器公钥

根据生成的私钥生成公钥

```bash
openssl req -new -key server-key.pem -out server-scr.pem
```

## 成为CA机构

生成公钥私钥需要安装使用`openssl`

### 生成CA私钥

```bash
openssl genrsa -des3 -out ca-pri-key.pem 1024
# 这个过程需要设置私钥的密码，一定要填写
```

`genrsa`：密钥对生成算法

`-des3`：使用堆成加密算法des3对私钥进异步加密

`-out ca-pri-key.pem`：将加密后的私钥保存到当前目录的ca-pri-key.pem文件中

`1024`：私钥的字节数

### 生成CA公钥（证书请求）

**使用CA公钥来颁发CA证书**

```bash
openssl req -new -key ca-pri-key.pem -out ca-pub-key.pem
```

通过私钥文件ca-pri-key.pem中的内容，生成对应的公钥，保存到ca-pub-key.pem中

运行过程中药使用之前输入的密码来实现对私钥文件的解密

按需输入提示要输入的信息

### 生成CA证书

```bash
openssl x509 -req -in ca-pub-key.pem -signkey ca-pri-key.pem -out ca-cert.crt
```

使用X.509证书标准，通过证书请求文件ca-pub-key.pem生成证书，并使用私钥ca-pri-key.pem加密，然后把证书保存到ca-cert.crt文件中

### 生成服务器证书

将服务器提交上来的服务器公钥结合CA的公私钥和证书生成服务器的证书

```bash
openssl x509 -req -CA ca-cert.crt -CAkey ca-pri-key.pem -CAcreateserial -in server-scr.pem -out server-cert.crt
```


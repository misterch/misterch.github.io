---
title: SSH生成RSA密钥对
date: 2023-07-31
tags:
 - ssh
 - rsa

---
## SSH配置

```bash
#进入到.ssh目录
cd .ssh
#使用ssh-keygen生成公钥和私钥
# -t 指定协议
# -b 指定生成的大小
ssh-keygen -t rsa -b 4096
#会提示生成的密钥名称，如果第一次生成可以不输入，否则输入名称
#非第一次生成rsa密钥，如填写密钥名称为test
```

新建config文件，用来配置访问不同域名时应该使用哪个私钥

```bash
#在.ssh目录下新建一个config文件
#在文件中配置
#当访问github.com的时候，使用指定的test私钥文件
#github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/test
```

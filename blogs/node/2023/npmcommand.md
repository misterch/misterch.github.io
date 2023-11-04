---
title: npm命令
date: 2023-10-08
categories:
 - node
tag:
 - npm
---

## 配置

### 查看全局配置

```bash
npm config list -g
npm config ls -g

#查看所有配置信息
npm config ls -g -l
```

### 查看全局包的安装位置

```bash
npm root -g
#通过config命令也可以查看得到
```

### 设置某项配置

```bash
npm config set <key> <value>
```



## 源配置

### 查看当前源

```bash
npm config get registry
```

### 设置源

```bash
npm config set registry <url>
```

## 安装

`install`的别名是`i`

### 全局安装

```bash
npm install -g <package>
```

### 使用某个源来安装包

```bash
npm install <package> --registry=<url>
```

## 删除

`uninstall`的别名有`remove`、`rm`、`r`、`un`、`unlink`

```bash
npm rm <packega> [-g]
```



## 查询包

### 查看某个包的信息

查看某个包的信息，这个包不是本地安装的包

```bash
npm view react
#view的别名：v info show 
```

查看包的所有版本和当前稳定版本

```bash
#查看所有版本
npm view react versions

#查看当前稳定版本
npm view react version
```

### 查看安装包

```bash
#查看全局安装的包
npm list -g --depth 0

#查看当前项目中安装的包
npm list --depth 0
```

## 更新

### 检查那些包需要更新

```bash
npm outdated
```

### 更新包

`update`的别名有`up`、`upgrade`

```bash
npm update [-g] [package]
```


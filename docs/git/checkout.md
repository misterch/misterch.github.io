---
title: checkout命令
date: 2023-07-21
---

## 切换分支

checkout会修改HEAD的指向，从一个分支移动到另一个分支上，不会像reset那样会把分支和HEAD同时移动

```bash
git checkout dev
```



## 切换提交

```bash
git checkout <commit-hash>
```



## 创建分支

```bash
git checkout -b feat1
```



## 还原更改

撤销**工作区**的修改

```bash
git checkout -- <filename>
#撤销工作区所有修改
git checkout .
```

## 拉取指定分支

需要本地分支和远程分支建立映射关系

```bash
git checkout -b <本地分支名> origin/<远程分支名>
```


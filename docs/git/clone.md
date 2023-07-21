---
title: clone命令
date: 2023-07-20
---
git clone 默认是克隆Head指向的master分支，如果是多分支，我们可以单个克隆分支项目。

## 克隆分支

### 克隆非默认分支(main分支)

```bash
git clone -b <分支名> <远程仓库url>
```



### 克隆所有分支

```bash
# 默认克隆main分支
git clone <远程仓库url>
#列出所有分支，包括本地和远程仓库
git branch -a
#签出远程分支到本地
#在本地新建一个dev分支用来签出远程仓库的dev分支
git checkout -b dev origin/dev
```


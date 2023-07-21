---
title: 分支和标签
date: 2023-07-20
tags:
 - git
categories:
 - git
---

## branch

### 创建新分支

```bash
git branch <分支名称>
```

这个操作只是创建了新分支，但是仍然在当前分支上，没有切到新分支上

```bash
git checkout <分支名称>
```

如果想新建分支并同时切换到新分支上可以使用[checkout新建分支](#新建分支)

```bash
git checkout -b <分支名称>
```



### 分支重命名

```bash
git branch -m <旧分支名称> <新分支名称>
```



### 删除分支

```bash
git branch -d <分支名称>
```



### 查看分支

查看本地仓库存在的分支

```bash
git branch
# *main 星号代表当前分支
# dev
```

查看远程仓库的所有分支

```bash
git branch -r
#origin/HEAD -> origin main
#origin/main
#origin/dev
```

查看所有分支（包括本地和远程）
```bash
git branch -a
*main
remotes/origin/main
```



### 跟踪远程分支

创建一个本地分支，用来跟踪远程分支

```bash
git branch --track <新的本地分支名称> <远程分支名称>
```



## checkout

:::tip

checkout命令可以在不同分支间切换，还可以**还原文件**所做的更改，还可以**创建新分支**，或者**切换指定提交**

:::

### 切换分支

```bash
git checkout <分支名称>
```

### 新建分支

新建分支并切换到该分支

```bash
git checkout -b <新建分支名称>
```

### 切换到指定提交

```bash
git checkout <commit-hash>
```

### 还原文件更改

放弃**工作区**某个文件的修改

```bash
git checkout -- <filename>
```

放弃工作区**所有文件**的修改

```bash
git checkout .
```



## tag

tag命令可以为仓库历史中的特定点创建标签，实际上就是打版本号。

### 使用场景

1. 标记发布，为版本打上版本号标签

### 创建标签

```bash
git tag v1.0.0
```

:::tip

使用“-a”可为标签添加注释,运行后会打开一个文本编辑器

在创建注释标签时，使用“-m”，为标签添加消息，类似`commit -m`

:::

```bash
#为标签添加注释
git tag -a v1.0.0

#为标签添加注释同时添加消息
git tag -a v1.0.0 -m "发布v1.0.0版本"
```

### 列出标签

列出仓库所有标签

```bash
git tag
```

### 删除标签

```bash
git tag -d v1.0.0
```

### 检出指定标签

这会创建一个新分支在检出标签，这个分支是**只读**的

```bash
git checkout v1.0.0
```

### 推送标签到远程仓库

推送指定标签

```bash
git push origin v1.0.0
```

推送所有标签

```bash
git push --tags
```


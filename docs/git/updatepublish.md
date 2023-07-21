---
title: 更新和发布
date: 2023-07-20
tags:
 - git
categories:
 - git
---

## remote

### 关联一个远程仓库

```bash
git remote add <远程仓库名称> <远程仓库地址>
```

远程仓库名称默认是origin

### 关联多个远程仓库

```bash
git remote add github <远程仓库地址>
git remote add gitee <远程仓库地址>

#提交时
git push [仓库名称] [分支名称]
git push github main
git push gitee main
```

### 共用同一个仓库绑定多个远程仓库

:::tip

使用`set-url`为仓库绑定多个远程仓库地址，提交时会一并提交到多个远程仓库

:::

```bash
git remote add origin <github仓库地址>
git remote set-url --add origin <gitee仓库地址>

#将本地main分支与远程仓库的origin/main分支建立追踪关系，下次直接git push
git push --set-upstream origin main
```



### 查看绑定的远程仓库

```bash
git remote -v
```



### 重命名远程仓库

```bash
git remote rename <旧名> <新名>
```



### 删除远程仓库

```bash
git remote rm <远程仓库名称>
```



## fetch

### 从远程仓库获取

:::tip

只下载远程仓库内容，**不会与本地仓库合并**

:::

`fetch`会从远程仓库下载最新更新并将其储存本地的`仓库名称/分支名称`分支中，可以让用户比较本地仓库与远程仓库中所做的更改，并在需要时合并到本地

```bash
git fetch [远程仓库名称] [分支名称]

#从默认远程仓库获取更改
#将获取所有分支的更新储存在本地
git fetch

#获取指定远程仓库的指定分支的更新
#更新保存在本地的origin/dev分支
git fetch origin dev

#从关联的其他远程仓库获取更改
git fetch gitee
```

### 与本地分支比较(一)

```bash
git fetch origin dev
git log -p dev..origin/dev
git merge origin/dev
```

### 与本地分支比较(二)

```bash
git checkout dev
git fetch origin dev:tmp
git diff tmp
git merge tmp
```



## pull

拉取远程仓库的更新与本地仓库进行合并

:::tip

`git pull`是`git fetch`后跟`git merge FETCH_HEAD`的缩写

给定`--rebase`参数，则运行`git rebase`

:::

### 拉取当前分支的更新

```bash
#如果当前只关联一个远程仓库(主机)，可省略远程仓库名称
git pull

#如果关联多个远程仓库，从指定仓库获取当前分支更新
git pull gitee
```

### 拉取指定分支的更新与当前分支合并

从远程仓库origin拉取feat分支，再与当前分支合并

```bash
# 假如当前在dev分支
git pull origin feat

# 相当于
git fetch origin
git merge origin/feat
```

### 拉取指定分支的更新与本地某个分支合并

```bash
git pull <远程仓库名称> <远程分支名称>:<本地分支名称>
```

### 建立追踪关系(--set-upstream)

默认情况下，git会自动在本地分支与远程分支之间建立追踪关系，比如在clone时，所有本地分支默认与远程主机的同名分支建立追踪关系

手动建立追踪关系

```bash
# 本地分支main追踪远程仓库的dev分支
git branch --set-upstream main origin/dev
#在main分支下，git pull会将本地的main分支与远程仓库dev分支合并
git pull

#将main分支推送到远程仓库的dev分支
git push
```



## push

将本地分支的更新，推送到远程仓库

### 基本语法

```bash
git push <远程仓库名称> <本地分支名称>:<远程分支名称>
```

### 基本操作

默认将本地的main分支推送到远程仓库的main分支，如果不存在，则会新建分支

```bash
git push origin main

#本地分支与远程分支存在跟踪关系，可省略分支名
git push origin

#如果关联了一个远程仓库地址，可省略远程仓库名称
git push
```

### 指定默认推送的仓库

如果关联了多个远程仓库，使用`-u`选项指定默认仓库，这样直接`git push`

```bash
# 设置origin为默认推送仓库
git push -u origin main
git push
```

### 推送的三种方式

`git push`命令默认只按照simple方式推送**当前分支**

```bash
#设置默认推送方式
git config --global push.default.matching
```



#### 默认simple方式

默认值，推送当前分支

#### matching方式

推送所有有对应的远程分支的本地分支

#### all方式

不管是否存在对应的远程分支，将本地的所有分支都推送到远程仓库

如果远程仓库的版本畀本地版本更新，推送会报错，需要先`git pull`合并差异，再推送到远程仓库，如果一定要推送，使用`--force`

```bash
git push --all origin
```



### 删除分支

省略本地分支名称，则表示删除指定的远程分支，因为这相当于推送一个空的本地分支到远程分支

```bash
git push origin :feat1
#等同于
git push origin --delete feat1
#如果本地分支与远程分支存在跟踪关系，可以省略本地和远程分支
git push origin --delete
```

### 推送标签

`git push`不会推送标签，除非使用`--tags`选项，[查看标签tag相关内容](/docs/git/branch.html#tag)

```bash
# 推送所有标签
git push origin --tags

#推送指定标签
git push origin v1.0.0
```

### 删除远程标签

```bash
git push origin :<tagname>
```


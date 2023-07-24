---
title: log命令
date: 2023-07-21
---

## log

### 显示当前分支的版本历史

```bash
git log
```

### 显示每次commit发生变更的文件

```bash
git log --stat
```

### 根据关键词搜索提交历史

```bash
git log -S [keyword]
```

### 显示某个commit之后的所有变动

```bash
git log [tag] HEAD --pretty=format:%s
```

### 显示某个文件的版本历史，包括文件改名

```bash
$ git log --follow [file]
$ git whatchanged [file]
```

### 显示指定文件相关的每一次diff

```bash
git log -p [file]
```

### 显示最近5次的提交

```bash
git log -5 --pretty --oneline
```

## diff

### 显示工作区和暂存区的差异

```bash
git diff
```

### 显示暂存区和上一个commit的差异

```bash
git diff --cached [file]
```

### 显示工作区与当前分支最新commit间的差异

```bash
git diff HEAD
```

### 显示两次提交之间的差异

```bash
git diff [first-branch]...[second-branch]
```

### 显示今天写了多少行代码

```bash
git diff --shortstat "@{0 day ago}"
```

## show

### 显示某次提交的元数据和内容变化

```bash
git show [commit]
```

### 显示某次提交发生变化的文件

```bash
git show --name-only [commit]
```

### 显示某次提交时，某个文件的内容

```bash
git show [commit]:[filename]
```

---
title: reflog命令
date: 2023-07-21
---

## reflog作用

用于管理和查看引用日志，引用日志是储存库中执行的**所有操作的记录**，可以通过改命令秦松跟踪丢失的提交或分支，并**恢复**他们

## 使用场景

1. 意外删除分支
2. 丢失提交等错误操作丢失重要内容

## 命令语法

### 查看引用日志

```bash
git reflog [options] [reference]
```

options常用选项

1. --relative-date：以相对时间打印每个条目的日期
2. --all：显示所有参考的日志
3. --pretty[=format]：输出更漂亮，format需要具体指定

### 恢复已删除的分支

假设删除了名为“feature-report”分支，可以使用`reflog`命令恢复，首先需要找到分支存在的提交

```bash
git reflog | grep feature-report
```

该命令会显示引用已删除分支的所有提交的列表，之后执行以下命令恢复分支

```bash
git branch feature-report <commit-hash>
```

该命令在指定提交出创建名为“feature-report”的新分支

### 恢复已删除的提交

```bash
# 显示最近的操作列表
git reflog
# 在已删除的提交出创建新分支
git checkout -b <branch> <commit-hash>
```


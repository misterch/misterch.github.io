---
title: restore命令
date: 2023-07-21
---

## restore的作用

**恢复**文件到之前的状态，或者完全撤销一次提交

可以撤销**跟踪**或**未跟踪**的文件的更改

## 语法

```bash
git restore [options] [path/to/file]
```

options:

* --staged：恢复对**暂存文件**的更改，取消误添加到提交中的更改
* --worktree：恢复对**未暂存**文件的更改，放弃对文件所做的本地更改
* --source=\<commit\>：将文件恢复到特定提交
* --quiet：在最小化输出下运行git restore，当你想要在脚本或自动化工具中运行git restore时，这很有用。

### 将文件恢复到没修改前的状态

放弃文件的修改，恢复上次提交的状态

```bash
git restore path/to/file
```



### 恢复对暂存文件的更改

对于不小心将文件的更改添加到了暂存区，而又想取消这些更改

```bash
git restore --staged path/to/file
```



### 将文件恢复到特定的提交

```bash
git restore --source=<commit> path/to/file
```

### 恢复未暂存文件的更改

放弃未暂存文件的更改

```bash
git restore --worktree path/to/file
```

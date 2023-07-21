---
title: stash命令
date: 2023-07-21
---

## stash作用

在开发过程中，可能有时会切换到其他分支上，但当前分支已作出了修改，如果功能或者bug没有修改完不想commit，可以使用`stash`命令暂时保存当前分支上没有提交的修改，并在需要的时候恢复它

## 命令语法

```bash
git stash [save [<message>]]
[save [<message>]]：可选参数，用于描述这个暂存
```

## 用法

### 基本用法

对当前分支没有commit的代码进行暂存

```bash
git statsh
```

成功保存后，使用`list`命令查看当前分支上所有被保存的更改

```bash
git stash list

stash@{0}: WIP on master: b0027b0 add new function
```

选择要恢复的更改，使用`apply`

```bash
git stash apply stash@{0}
```

如果直接还原保存的更改并**合并到当前分支**中，使用`pop`

恢复后，可以使用`drop`删除暂存

```bash
git stash drop stash@{0}
```

### 暂存特定的变更

如果需要储存某个**特定文件**的变更，使用`push`

```bash
git stash push filename

#???一定要执行?
git stash push -p hunk
```

### 恢复已删除的文件

如果一个文件已经被commit了，不过后来被删除了，可以使用`stash branch`恢复已删除的文件

```bash
git stash branch <newbranch> stash@{0}
```

这会创建一个新分支，其中包括储存的变更，从新分支恢复已删除的文件，这命令也可以恢复其他变更

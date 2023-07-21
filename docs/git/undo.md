---
title: 撤销
date: 2023-07-20
tags:
 - git
categories:
 - git
---

git 提交修改记录的工作原理

![](/img/workflow.png)

## reset回滚

:::warn

`reset`用于撤销**未被提交(push)到远程仓库**的改动(commit)

如果确实要撤销已经push到远程仓库的更改，撤销后提交到远程仓库时加上`--force`选项强制提交，达到撤销版本号的目的

多人协作时谨慎使用`reset`,可使用[revert](#revert),revert会创建新的提交，保留完整的历史记录

:::

:::tip

使用`git ls-files`查看暂存区的修改

`git reset`回滚到目标位置后，目标位置之后的版本就**不存在**

:::

### 三种模式

1. **软重置（soft）**：回退到某个版本，保留工作区和暂存区的修改
2. **混合重置（mixed）**：默认模式，回退到某个版本，保留工作区的修改，丢弃暂存区
3. **硬重置（hard）**：回退到某个版本，丢弃工作区和暂存区的修改

### 三种模式使用场景

#### soft

如果开发一个功能的时候，每修改一处或新增删除文件都commit，就会造成多个意义不大的commit记录，当整个功能都已经开发完成时，想让commit更加清晰可读，可以使用soft，合并当前HEAD位置到目标commit的记录

`git reset --soft`后可以直接`git commit`，因为暂存区得到保留

```
                                  HEAD
                                   |
---commit1---commit2---commit3---commit4

git reset --soft commit1

    HEAD
     |
---commit1
此时会带上commit2~commit4的修改回到commit1的位置

git commit -m "完成feat功能"
            HEAD,feat
               |
---commit1---commit2'
```

#### hard

放弃目前本地的所有修改，回退到指定版本，不带指定版本之后的修改，即清空工作区和暂存区，恢复到指定版本的文件内容

#### mixed

1. 应用场景与`--soft`差不多，也可以起到合并多个记录，只是需要`add`之后再`commit`
2. 有时add错文件到暂存区，`git reset HEAD`来**unstage**所有加入到暂存区得待提交得文件
3. commit提交了错误的代码，不想修改错误再commit一次（会留下一个错误的commit点），带有当前错误节点的修改回到正确的commit点，修改后再提交commit，这样就能撤销错误的commit（log上会删除掉错误的commit记录）

### 使用HEAD回滚

`HEAD`，当前记录的位置

<CodeGroup>

 <CodeGroupItem title="HEAD^">

```bash
# 回到到当前位置的上一个版本
git reset HEAD^
#回退到当前位置的上两个版本
git reset HEAD^^
```

 </CodeGroupItem>

 <CodeGroupItem title="HEAD~n">

```bash
# 回到到当前位置的上一个版本
git reset HEAD~1
#回退到当前位置的上两个版本
git reset HEAD~2
#回退到当前位置的上n个版本
git reset HEAD~n
```

 </CodeGroupItem>

</CodeGroup>

### 使用commit-hash回滚

```bash
#mixed,保留工作区，丢弃暂存区
git reset <commit-hash>
#保留工作区和暂存区
git reset --soft <commit-hash>
#丢弃工作区和暂存区
git reset --hard <commit-hash>
```

### 回退指定文件到指定版本

:::tip

将某个文件回退到指定版本时，会带上**最新提交的修改(commit)**到指定指定版本，因为默认时mixed模式，工作区得到保留，丢弃暂存区

修改后需要`add`到暂存区再`commit`到本地仓库

:::

```bash
#将文件指定版本的提交，此时文件会带上之前的修改
git reset <commit-hash> <filename>
```

## revert

`revert`用于反做某一个版本，达到撤销该版本的修改重做（这个版本修改的内容全部会丢失），但不会影响这个撤销版本之后提交的版本的内容，遇到冲突解决后提交

`revert`会创建新的提交，保留完整的历史记录

### 基本语法

```bash
git revert <commit-hash>
#撤销不立即提交
git revert -n <commit-hash>

#撤销多个提交
git revert -n <commit-hash1> <commit-hash2> <commit-hash3>
```

![](/img/revert.jpg)

如上图，这样操作

```bash
# 撤销commit1的提交的内容并立即commit新的提交
git revert commit1
# 使用-n选项可以撤销commit1提交的内容但不会立即commit
git revert -n commit1
# 此时已经撤销commit1的提交的内容，可以进行重做,重做完后执行--continue,就会生成新的提交
git revert --continue
# 取消revert
git revert --abort
```

### 撤销merge合并提交

当合并分支时，会创建合并提交，如果想撤销这个合并提交，恢复到未合并之前的状态，可以使用`revert`撤销合并提交，撤销后会保留

:::tip

`-m`选项接收一个数字参数parent-number

parent-number是一个1或者2的数值，代表**保留**第一个还是第二个分支，

一般填1，恢复当前分支没合并前的状态

2，撤销主分支的修改，保留合并进来的修改

:::

```bash
git revert -m  <parent-number> <merge-commit-hash>
git revert -m 2 <合并的commit-hash>
```

## checkout

### 撤销工作区的修改 

<CodeGroup>

 <CodeGroupItem title="指定文件">

```bash
git checkout -- <filename>
```

</CodeGroupItem>

 <CodeGroupItem title="所有修改">

```
git checkout .
```

 </CodeGroupItem>

</CodeGroup>

[查看关于checkout的详细指南](/docs/git/checkout)

## restore

参考链接

[git中git reset /git revert /git checkout的用法](https://blog.csdn.net/ITerated/article/details/106993603)


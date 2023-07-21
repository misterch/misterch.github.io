---
title: 合并与衍合
date: 2023-07-20
tags:
 - git
categories:
 - git
---

## merge

merge命令会找到两个分支的**公共祖先**，并将从公共祖先以来在两个分支上进行的修改合并。通过合并分支，确保分支上的任何修改都包含在代码库的最终版本中

### 基本使用

在合并前，最好先确保本地分支和远程分支同步

```bash
git checkout main
git pull
git merge <将要合并到当前分支的分支>
```

### 快速合并

对于不引入冲突的小更改，使用这种合并非常理想。git只是将**当前分支的指针向前移动到另一个分支上**的最新提交

```bash
git merge -ff-only dev
```

### 三方合并



### 递归合并

创建新的合并提交，组合两个分支上的更改。有冲突发生手动解决

### 章鱼合并

将多个分支合并为一个分支

将多个功能分支一次性将其到当前的开发分支

```bash
git checkout dev
git merge feat1 feat2 feat3
```



## rebase

:::tip

变基可以在**任意分支**上进行，可以变基到**一条分支**

优点：不会新增额外的提交记录，形成线性历史，比较直观干净

缺点：会**改变提交历史**，改变当前分支branch out的节点，避免在共享分支上使用，团队合作时避免使用rebase

变基的时候会找到当前分支和目标分支的**共同祖先**，再把当前分支上**从共同祖先到最新提交记录**的所有提交都移动到**目标分支的最新提交的后面**

:::

创建一个`mywork`分支，并切换到该分支上

```bash
git checkout -b mywork
```

![](/img/rebase1.0.png)

在`mywork`上进行开发，生成两个提交，与此同时`origin`分支上也有新的提交

![](/img/rebase1.1.png)

如果想`mywork`分支历史看起来没有经过任何合并一样，用`rebase`命令

```bash
git checkout mywork
# 获取远程仓库的最新更改
# 或者git fetch
git pull
# 将目标分支origin的提交合并到当前分支中
git merge origin/dev
# 将mywork分支的修改应用到dev分支上
git rebase dev
# 推送修改后的mywork分支到远程仓库
git push origin mywork
```

变基的时候找到`mywork`分支与目标分支的共同祖先（C2），从C2到最新记录提交（C5,C6）移动到目标分支`origin`最新提交（C4）的后面

![](/img/rebase1.2.png)

这样看起来所有的修改都是在目标分支（基础分支）上，使得目标分支更加干净，更线性的历史提交

![](/img/rebase1.3.png)

与`merge`对比的区别

![](/img/rebase1.4.png)

| 命令   | 行为                                                 |
| ------ | ---------------------------------------------------- |
| merge  | 创建新的提交以合并更改，并**保留两个分支的提交历史** |
| rebase | 修改提交历史，看起来显示在基础分支上进行的更改       |

```bash
#有两条分支分别是main和dev
#切换到dev分支（当前分支）
git checkout dev
#变基到main分支（目标分支）
git rebase main
#将dev分支上，从共同祖先到最新的提交记录都会移动到目标分支main的最新提交的后面
```






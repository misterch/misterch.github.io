---
title: 通过merge来升级开发模板
date: 2025-08-13
categories:
 - git
tags:
 - git
---

有这样的一个场景，一个项目使用了别人开发的一个模板来进行开发（如`unibest`），某天`unibest`有了更新，修复了bugs，修改或者新增了新的功能和配置，模板代码发生了变化。那么我如果想要升级到最新的模板代码，应该怎么做呢？

首先要做的就是备份好当前的项目

```bash
git add . && git commit -m "chore: 升级前备份"
```

## 1.将模板仓库添加为远程仓库

项目是在这个模板上进行开发，仓库地址是我们自己的远程仓库，那么首先就要**添加该模板为远程仓库**，为升级模板做好准备

```bash
git remote add upstream <模板仓库地址>
```

## 2.从远程仓库拉取最新代码

本地仓库已经添加了模板的远程仓库，即`upstream`

```bash
# 获取最新模板代码
git fetch upstream
```

## 3.创建一个新的分支

创建的这个分支，目的是合并模板的最新代码

```bash
git checkout -b upgrade-template
```

创建并切换到新建的分支后，合并`stream`仓库的`main`（或其他分支）到`upgrade-template`分支

```bash
git merge --squash upstream/main --allow-unrelated-histories
```

:::tip

合并模板代码时，如果不想模板仓库的提交历史污染我们自己的仓库提交历史，使用`--squash`

`--squash`:  模板的所有更新压缩为单次提交，模板的提交历史不会出现在我们的仓库中

合并时，因为模板仓库和我们的仓库没有任何关联，这时合并的话会出现``fatal: refusing to merge unrelated histories``错误，使用`--allow-unrelated-histories`来解决

`--allow-unrelated-histories`: 允许不相关历史合并

:::

首次合并后，以后再次升级模板不需要`--allow-unrelated-histories`

```bash
# 拉取模板仓库的main分支
git fetch upstream main
# 合并模板仓库的main分支
git merge --squash upstream/main
```

## 4.解决合并冲突

列出所有冲突文件

```bash
git status | grep "unmerged"
```

通过VSCode手动解决冲突

解决冲突后完成合并提交

```bash
git commit -m "upgrade to latest version"
```

## 5.合并到主分支

`upgrade-template`分支经过测试无问题后，合并到主分支中

```bash
git checkout main

#方法1：变基到主分支，可以精简历史
git rebase upgrade-template

#方法2：保留分支结构
git merge upgrade-template --no-ff
```


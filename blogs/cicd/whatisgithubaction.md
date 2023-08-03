---
title: Github actions入门
date: 2023-08-03
tags:
 - CI/CD
 - 自动化部署
 - github
---
## Github Actions是什么

持续集成由很多操作组成，例如抓取代码、运行测试、构建生产版本、登录远程服务器、发布到第三方服务等等。github把这些操作成为actions

很多操作在大多数的项目中是相似的，开发者可以把自己写的action脚本共享到github actions仓库，使用者不用自己编写复杂的脚本，可以直接使用他人写好的action，整个持续集成过程就可以通过actions组合

`action`是一个独立脚本，可以做成代码仓库，使用 `userName/repoName`的语法引用action，如 `actions/setup-node`就表示 `github.com/action/setup-node`这个仓库。官方的actions都放在 `github.com/actions`里面

因为actions是代码仓库，所以就有版本的概念，使用这可以使用指定的action版本。

```bash
actions/setup-node@v1 #指向一个tag
actions/setup-node@master #指向一个分支
actions/setup-node@7as79q #指向一个commit
```

## 基本概念

* workflow（工作流程）：持续集成一次运行的过程
* job（任务）：一个workflow有一个或者多个jobs构成；一次持续集成的运行，可以完成多个任务
* step（步骤）：每个job由多个step构成，一步步完成
* action（动作）：每个step可以一次执行一个或多个命令（action）

## workflow文件

workflow文件是github actions的配置文件。存放在代码仓库 `.github/workflows`目录

workflow采用**YAML格式**，文件名可任意取

一个仓库可以有多个workflow文件，github发现 `.github/workflows`目录里面有**yml**文件就会自动运行这些文件

### 基本字段解释

### name

workflow的名称，省略，默认为当前workflow的文件名

### on

指定触发workflow的条件，通常是某些事件

```yaml
on: push
```

指定 `push`事件触发workflow

```yaml
on:
 - push
 - pull_rrequest

#数组写成这样也行
on: [push,pull_request]
```

`on`字段也可以指定为一个**数组**，`push`或者 `pull_request`都会触发workflow

### on.\<事件名称\>.<tags|branches>

指定触发事件时，可以限定分支或标签

```yaml
on:
 push:
  branches:
   - master
```

上面代码表示当master分支发生push事件时，才会触发workflow

### jobs.\<job_id\>.name

`jobs`字段是workflow文件的主体，表示要执行的一项或多项任务

`jobs`字段里面，需要写出每一项的 `job_id`，名称自定义，`job_id`里面的 `name`字段是对该任务的说明

```yaml
jobs:
 my_first_job:
  name: 第一个任务
 my_second_job:
  name: 第二个任务
```

### jobs.\<job_id\>.needs

needs字段指定当前任务的依赖关系，其实就是job_id执行顺序

```yaml
jobs:
 job1:
 job2:
  needs: job1
 job3:
  needs: [job1,job2]
```

job1必须先于job2完成，job3必须等待job1和job2的完成才能运行。执行顺序为job1，job2，job3

### jobs.\<job_id\>.runs-on

`runs-on`字段指定运行所需要的的虚拟机环境。必须字段。可用的虚拟机有

* ubuntu-latest，ubuntu-18.04或 ubuntu-16.04
* windows-latest，windows-2019或 windows-2016
* macOS-latest或 macOS-10.14

```yaml
jobs:
 job1:
  runs-on: ubuntu-latest
```

### jobs.\<job_id\>.steps

`steps`指定每个job的运行步骤，可以包含一个或多个步骤，每个步骤可以指定以下一些字段

```yaml
jobs:
 build:
  steps:
   - name: 第一步：使用run
     env: 
      NAME: benchan
      AGE: 30
      GENDER: male
     run: |
      echo $NAME $AGE $GENDER
   - name: 第二步：利用uses字段使用action
     uses: userName/repoName@tag
     with:
      job: coder
```

* **uses**

作为作业步骤的一部分运行的操作。操作是一种**可重复使用的**独立代码脚本，即action。

可以使用在与**工作流、公共储存库或以发布的Docker容器镜像**相同的储存库中定义的操作

某些操作可能需要搭配使用 `with`关键字

```yaml
#使用版本化操作
steps:
 - uses: actions/checkout@v2
 - uses: actions/checkout@master

#使用公共操作
#{owner}/{repo}@{ref}
steps:
 - uses: actions/aws@v2.1.1

#使用工作流程所造仓库中操作
#./path/to/dir
steps:
 - uses: ./.github/actions/my-action

#使用docker中枢操作
#docker://{image}:{tag}
steps:
 - uses: docker://alpine:3.8
```

* **with**

由uses指定的操作（action）所定义的输入参数的map（对象）。每个输入参数都是一个键值对。

输入参数被设置为环境变量，变量的前缀为INPUT_，并转换为大写

```yaml
steps:
 - uses: actions/say@master
   with:
    name: benchan
    age: 30
    gender: male
```

这些输入参数将会作为`INPUT_NAME`、`INPUT_AGE`、`INPUT_GENDER`环境变量，由action访问到这些变量

with还有一些属性可以设置

* args：代替Dockerfile中的CMD指令，及那个args传入到容器的ENTRYPOINT，是一个字符串，`${{}}`来使用变量
* enrtypoint：用于Docker容器操作，

## 参考链接

[GitHub Actions 入门教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

[GitHub Actions 文档 - GitHub 文档](https://docs.github.com/zh/actions)

[Github官方市场](https://github.com/marketplace?type=actions)

[awesome-actions](https://github.com/sdras/awesome-actions)

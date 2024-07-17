---
title: 免费部署平台（可CI/CD）
date: 2024-07-17
tags:
 - CI/CD
 - 部署
---

## GitHub Pages

> 前提需要有一个GitHub账号
>
> 只能托管静态项目

1. 新建一个仓库

   - 仓库名称为`[用户名].github.io`，则访问路径为`用户名.github.io`，没有子路径
   - 仓库名称并非用户名，则访问路径为`用户名.github.io/仓库名称`

2. 项目仓库——settings——pages

   - 选择需要作为github pages的分支，以后访问的就是该分支里的静态页面
   - 一般github page的分支是`gh-pages`，配置成这个分支就好

3. 个人--settings--生成一个token

   - 生成的这个token可以拥有设置的权限，例如可以访问仓库
   - 生成的token需要复制下来，因为只会显示一次
   - 在项目仓库——settings——secrets新增ACCESS_TOKEN变量，值为生成的token

4. 在项目中创建`.github/workflows/deploy.yml`

   - 这是持续集成的配置文件，当push（提交）修改到仓库，就会自动执行构建任务并，完成以后就看见更新后的页面，而且这个是临时的系统，构建完毕就会销毁，所以只能构建成静态页面

   - ```yml
     name: GitHub Actions Build and Deploy Demoname
     on:
     	# 上传代码到仓库触发push钩子
     	push:
     		branches:
     			# 只对master分支的代码起效
     			- master
     # 触发push后执行的任务
     jobs:
     	# 任务名称
     	build-and-deploy:
     		runs-on: ubuntu-latest
     		# 步骤
     		steps:
     			# 步骤名称
     		- name: Checkout
     			# 使用的action，把项目拉取下来
     			uses: actions/checkout@master
     		- name: Build and Deploy
     			# 这个action是构建项目
     			uses:JamesIves/github-pages-deploy-action@master
     			# 配置构建项目的环境参数
     			env:
     				# 这个变量是通过在项目settings--secrets中配置，ACCESS_TOKEN就是生成的token
     				ACCESS TOKEN: ${{ secrets.ACCESS_TOKEN }}
     				# 把项目构建完成后push到这个分支
     				BRANCH: gh-pages
     				FOLDER: dist
     				BUILD SCRIPT: npm install && npm run build
     ```

5. 配置项目的`publicPath`，根据实际页面访问路径配置

   - 如果github pages直接通过域名就可以访问得到仓库页面，则publicPath为'/'

   - 如果github pages配置的是域名下的子路径，则publicPath为'/子路径'

   - ```js
     // vue.config.js
     module.exports = {
       publicPath: process.env.NODE_ENV === 'production' ? '/github仓库名称' : '/'
     }
     ```

6. 完成项目，提交到仓库

   - github就会根据`.github/workflows/deploy.yml`的配置来执行构建
   - 构建完成，可通过github给的域名访问生成的静态站点

## Vercel

> 可以部署静态页面，Node等开发的项目，serverless（Faas）



## Serverless
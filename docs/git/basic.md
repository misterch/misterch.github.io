# Git配置

```bash
# --global 全局设置，对所有项目都生效
# --local 默认设置，只对当前项目生效
git config --global user.name "ben chan"
git config --global user.email "395061165@qq.com"
```

# 创建仓库

```bash
# 在当前目录下初始化
git init
# 新建myrepo文件夹并初始化
git init myrepo
```

# 工作区域及文件状态

## 工作区

> 电脑上看到的文件夹目录，实际工作所在的目录

## 暂存区

> 临时存储区域，用于保存即将提交到git仓库的修改内容
>
> 通过`git add <file-path>`命令将文件保存到暂存区

## 本地仓库

> git的本地仓库，包含完整的项目历史和元数据
>
> 通过`git commit`将暂存区的内容提交到本地仓库
>
> `git commit`只会提交**暂存区**的内容

## 文件状态status

```bash
# 查看仓库的状态
git status 
git status -s

# 未跟踪状态 untracked files
```

# 添加到暂存区add

```bash
#添加指定文件到暂存区
git add text1.txt

#添加某类文件到暂存区
git add *.txt

#添加当前目录所有文件
git add .
```

# 提交文件到仓库commit

```bash
#快速添加提交信息提交到仓库
git commit -m "first commit"

#git add 和git commit
git commit -am "git add and commit"

#修改提交信息
git commit --amend -m "change commit"
```

# 查看提交信息log

```bash
# 详细查看提交信息
git log

#一行查看提交信息，只显示提交id和提交信
git log --oneline
git log --pretty=oneline
```

# 回退版本reset

有三种模式

\--mixed默认模式，回退某个版本，保留工作区修改，丢弃暂存区

\--soft,回退某个版本，保留工作区和暂存区

\--hard回退某个版本，丢弃工作区和暂存区的修改

`git ls-files`查看暂存区的修改内容

==reset操作后查看日志时，回退到指定版本之后的提交记录将会丢失，如果提交到远程时，需要强制提交====`git push -f`==

==reset命令需要谨慎使用，可以使用==**==revert==**==操作==

```bash
#有三种模式
# --mixed默认模式
git reset <hash>
# --soft,回退某个版本，保留工作区和暂存区
git reset --soft <hash>
# --hard回退某个版本，丢弃工作区和暂存区的修改
git reset --hard <hash>

# HEAD，当前记录的位置
# HEAD^，HEAD~,上一个版本
git reset --soft HEAD^
# HEAD~1,HEAD~2,HEAD~n,上n个版本
git reset --soft HEAD~3
```

## 回退指定文件到指定版本

`git reset <commitId> <filename>`

==回退时，会带有==**==最新提交的修改内容==**==到指定版本的提交，因为默认是mixed模式，所以==**==工作区得到保留==**==，丢弃暂存区==

==如果要将工作区的修改恢复到该指定版本的内容，使用==**==restore丢弃修改==**

```bash
#回退某个文件到某个版本
#例如从ID为C10的提交回到ID为C5的提交
git reset <commitID> <filename>
#回退到C5版本时，该文本是C10提交的文件，如果要恢复到C5的内容，则使用restore丢弃C10的文件修改
git restore <filename>
```

# 重做某次提交revert

相比reset,revert更加安全，不会影响因回退导致其他提交丢失，导致内容丢失

重做某次提交，会有一个新提交,新的提交跟这个重做的commitid前一次的提交是一样的

==重做会==**==舍弃某次提交的内容==**==，恢复到某次提交的==**==前一次==**==提交的内容，在revert==**==之前已提交的修改不会丢失==**==，==

```bash
#有4次提交
C4 HEAD->master 新建t4加内容
C3 修改t3，新增内容
C2 修改t2和新建t3
C1 新建t1和t2

#想要重做C2,那么相当于舍弃C2的修改，恢复到C1的模样
#即原本C2修改了t2，新建了t3，现在t2恢复到C1时的模样，t3则不存在
#但不会丢失C4中的修改，在revert到某次提交时，可以看到C4提交的内容
#revert时，如此时在C4，其实是在最新的提交处再签出一个C4'的提交
git revert -n C2
#revert后有5次提交
C4'HEAD->master revert "修改t2和新建t3"
C4 新建t4加内容
C3 修改t3，新增内容
C2 修改t2和新建t3
C1 新建t1和t2
```

# 撤销工作区的修改checkout

```bash
#撤销某个文件的修改恢复到没修改之前
# --,消除切换分支的歧义
git checkout -- <filename>
#撤销所有文件的修改
git checkout .
```

**git的所有操作都可以追溯，通过`git reflog`命令查看操作的历史记录**

如果因为之前使用git reset --hard回退导致修改的内容丢失，可以使用git reflog查找那个提交的hash来恢复修改文件，否则因为没有commit那么就无法找回了

```bash
git reflog
```

# 针对暂存区的恢复restore

```bash
#将不再暂存区的文件撤销更改
#即将工作区某个已修改的文件撤销修改
git restore <file>

#将提交add到暂存区的文件恢复到工作区
#即将提交撤回到未提交状态
git restore --staged <file>
```

# 查看差异diff

```bash
# 默认比较工作区和暂存区的差异
git diff

#比较工作区和版本库的差异
git diff HEAD

#比较暂存区和版本库的差异
git diff --cached HEAD

#比较两个版本的差异
git diff <commitID> <commitID>
```

# 删除文件rm

`git rm`用于删除**暂存区**及**工作区**的文件

删除后一定要提交才能保存到仓库

```bash
# 删除工作区文件，需要git add更新暂存区，删除暂存区的文件
rm file1.txt
git add file1.text
#或者
git add .

#删除工作区和暂存区的文件
git rm <file>

#删除暂存区，但保留工作区的文件
git rm --cached <file>

#删除某个目录下的所有子目录和文件
git rm -r *
```

# SSH配置

```bash
#进入到.ssh目录
cd .ssh
#使用ssh-keygen生成公钥和私钥
# -t 指定协议
# -b 指定生成的大小
ssh-keygen -t rsa -b 4096
#会提示生成的密钥名称，如果第一次生成可以不输入，否则输入名称
#非第一次生成rsa密钥，如填写密钥名称为test
```

```bash
#在.ssh目录下新建一个config文件
#在文件中配置
#当访问github.com的时候，使用指定的test私钥文件
#github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/test
```

# 关联远程仓库remote

```bash
# 关联远程仓库
#origin是远程仓库的别名，默认是origin，可自定义远程仓库别名
git remote add origin <url>
# 关联远程分支
# -u，--set-upstream的缩写，关联本地和远程都为main的分支
git push -u origin main
# main:main,将本地的main分支推送到远程的main分支
# git push -u origin <本地分支>:<远程分支>
git push -u origin main:main
```

## 关联多个远程仓库

```bash
# 关联多个远程仓库，分别push
git remote add gitee <url>
git remote add github <url>

# 关联远程origin仓库
git remote add origin <url>
# 在origin中关联多个远程仓库，一次性push到所有远程仓库
# 只能push到多个远程仓库
# 只能从一个仓库pull，因为fetch-url只有一个，可以修改
git remote set-url --add <url>
```

## 查看当前仓库对应的远程仓库的别名和地址

```bash
git remote -v

origin <git@github.com>:mine/myrepo.git(fetch)
origin <git@github.com>:mine/myrepo.git(push)
gitee <gitee@gitee.com>:mine/myrepo.git(fetch)
gitee <gitee@gitee.com>:mine/myrepo.git(push)
```

# 拉取远程仓库到本地仓库pull、fetch

## pull

> 将远程仓库拉取并**与本地分支合并**

```bash
# git pull <远程仓库名> <远程分支名>:<本地分支名>
# git pull默认拉取远程仓库origin的main分支
git pull origin main
```

## fetch

> 将远程分支拉取下来，但**不与本地分支合并，合并使用merge**

```bash
#拉取远程origin仓库的dev分支
git fetch origin dev
#将远程分支origin/dev合并到本地分支
git merge origin/dev
```

# 推送本地分支到远程分支pull

```bash
# git push <远程主机别名> <本地分支名>:<远程分支名>
git push origin dev
#如果当前分支与远程分支建立了追踪关系,--set-upstream
git push origin
#或者，本地只有一个主机的对应分支
git push
```

# 分支操作branch

## 新建分支

```bash
#新建分支
git branch dev
#切换到指定分支
git checkout dev
#或者
git switch dev

#新建并切换到该分支
git checkout -b dev
```

## 查看分支

```bash
#查看【本地】所有分支
git branch

#查看【远程】所有分支
# -r --remotes
git branch -r

#查看【本地】及【远程】所有分支
# -a --all
git branch -a
```

## 删除本地分支

```bash
# -d --delete
git branch -d <branchname>
#强制删除
git branch -D <branchname>
```

## 删除远程分支

```bash
# 删除远程仓库origin的指定分支
git push origin -d <branchname>
#或者
git push origin :<branchname>
```

## 重命名分支

```bash
# 重命名本地oldname分支为newname
git branch -m oldname newname
# 删除远程分支
git push origin :oldname
# 推送新命名的分支
git push newname
```

# 合并分支merge

# 变基rebase

> 变基可以在**任意分支**上进行，可以变基到**一条分支**
>
> 优点：不会新增额外的提交记录，形成线性历史，比较直观干净
>
> 缺点：会改变提交历史，改变当前分支branch out的节点，避免在共享分支上使用，团队合作时避免使用rebase
>
> 变基的时候会找到当前分支和目标分支的**共同祖先**，再把当前分支上**从共同祖先到最新提交记录**的所有提交都移动到**目标分支的最新提交的后面**

```bash
#有两条分支分别是main和dev
#切换到dev分支（当前分支）
git checkout dev
#变基到main分支（目标分支）
git rebase main
#dev分支，从共同祖先到最新的提交记录都会移动到目标分支main的最新提交的后面
```

![image](https://img-blog.csdnimg.cn/20200904144534691.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NjMTg4Njg4NzY4Mzc=,size_16,color_FFFFFF,t_70#pic_center)

import{_ as a,o as e,c as i,a as s,b as n,d as t}from"./app-d4c6289a.js";const l="/img/git-command.png",c={},d=s(`<h2 id="git配置" tabindex="-1"><a class="header-anchor" href="#git配置" aria-hidden="true">#</a> Git配置</h2><h3 id="config" tabindex="-1"><a class="header-anchor" href="#config" aria-hidden="true">#</a> config</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># --global 全局设置，对所有项目都生效</span>
<span class="token comment"># --local 默认设置，只对当前项目生效</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&quot;ben chan&quot;</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">&quot;395061165@qq.com&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="克隆仓库" tabindex="-1"><a class="header-anchor" href="#克隆仓库" aria-hidden="true">#</a> 克隆仓库</h2><h3 id="clone" tabindex="-1"><a class="header-anchor" href="#clone" aria-hidden="true">#</a> clone</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 默认克隆main分支</span>
<span class="token function">git</span> clone <span class="token operator">&lt;</span>远程仓库url<span class="token operator">&gt;</span>
<span class="token comment">#列出所有分支，包括本地和远程仓库</span>
<span class="token function">git</span> branch <span class="token parameter variable">-a</span>
<span class="token comment">#签出远程分支到本地</span>
<span class="token comment">#在本地新建一个dev分支用来签出远程仓库的dev分支</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> dev origin/dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建仓库" tabindex="-1"><a class="header-anchor" href="#创建仓库" aria-hidden="true">#</a> 创建仓库</h2><h3 id="init" tabindex="-1"><a class="header-anchor" href="#init" aria-hidden="true">#</a> init</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在当前目录下初始化</span>
<span class="token function">git</span> init
<span class="token comment"># 新建myrepo文件夹并初始化</span>
<span class="token function">git</span> init myrepo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="工作区域及文件状态" tabindex="-1"><a class="header-anchor" href="#工作区域及文件状态" aria-hidden="true">#</a> 工作区域及文件状态</h2><h3 id="工作区" tabindex="-1"><a class="header-anchor" href="#工作区" aria-hidden="true">#</a> 工作区</h3><blockquote><p>电脑上看到的文件夹目录，实际工作所在的目录</p></blockquote><h3 id="暂存区-add" tabindex="-1"><a class="header-anchor" href="#暂存区-add" aria-hidden="true">#</a> 暂存区--add</h3><blockquote><p>临时存储区域，用于保存即将提交到git仓库的修改内容</p><p>通过<code>git add &lt;file-path&gt;</code>命令将文件保存到暂存区</p></blockquote><h3 id="本地仓库-commit" tabindex="-1"><a class="header-anchor" href="#本地仓库-commit" aria-hidden="true">#</a> 本地仓库--commit</h3><blockquote><p>git的本地仓库，包含完整的项目历史和元数据</p><p>通过<code>git commit</code>将暂存区的内容提交到本地仓库</p><p><code>git commit</code>只会提交<strong>暂存区</strong>的内容</p></blockquote><h3 id="文件状态status" tabindex="-1"><a class="header-anchor" href="#文件状态status" aria-hidden="true">#</a> 文件状态status</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看仓库的状态</span>
<span class="token function">git</span> status 
<span class="token function">git</span> status <span class="token parameter variable">-s</span>

<span class="token comment"># 未跟踪状态 untracked files</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="添加到暂存区" tabindex="-1"><a class="header-anchor" href="#添加到暂存区" aria-hidden="true">#</a> 添加到暂存区</h2><h3 id="add" tabindex="-1"><a class="header-anchor" href="#add" aria-hidden="true">#</a> add</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#添加指定文件到暂存区</span>
<span class="token function">git</span> <span class="token function">add</span> text1.txt

<span class="token comment">#添加某类文件到暂存区</span>
<span class="token function">git</span> <span class="token function">add</span> *.txt

<span class="token comment">#添加当前目录所有文件</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="提交文件到仓库" tabindex="-1"><a class="header-anchor" href="#提交文件到仓库" aria-hidden="true">#</a> 提交文件到仓库</h2><h3 id="commit" tabindex="-1"><a class="header-anchor" href="#commit" aria-hidden="true">#</a> commit</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#快速添加提交信息提交到仓库</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;first commit&quot;</span>

<span class="token comment">#git add 和git commit</span>
<span class="token function">git</span> commit <span class="token parameter variable">-am</span> <span class="token string">&quot;git add and commit&quot;</span>

<span class="token comment">#修改提交信息</span>
<span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;change commit&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看提交信息" tabindex="-1"><a class="header-anchor" href="#查看提交信息" aria-hidden="true">#</a> 查看提交信息</h2><h3 id="log" tabindex="-1"><a class="header-anchor" href="#log" aria-hidden="true">#</a> log</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 详细查看提交信息</span>
<span class="token function">git</span> log

<span class="token comment">#一行查看提交信息，只显示提交id和提交信</span>
<span class="token function">git</span> log <span class="token parameter variable">--oneline</span>
<span class="token function">git</span> log <span class="token parameter variable">--pretty</span><span class="token operator">=</span>oneline
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="回退版本reset" tabindex="-1"><a class="header-anchor" href="#回退版本reset" aria-hidden="true">#</a> 回退版本reset</h2><p>有三种模式</p><p>--mixed默认模式，回退某个版本，保留工作区修改，丢弃暂存区</p><p>--soft回退某个版本，保留工作区和暂存区</p><p>--hard回退某个版本，丢弃工作区和暂存区的修改</p>`,32),r=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,[n("code",null,"git ls-files"),t("查看暂存区的修改内容")])],-1),o=s(`<p>reset操作后查看日志时，回退到指定版本之后的提交记录将会丢失，如果提交到远程时，需要强制提交<code>git push -f</code></p><p>reset命令需要谨慎使用，可以使用revert操作</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#有三种模式</span>
<span class="token comment"># --mixed默认模式</span>
<span class="token function">git</span> reset <span class="token operator">&lt;</span>hash<span class="token operator">&gt;</span>
<span class="token comment"># --soft,回退某个版本，保留工作区和暂存区</span>
<span class="token function">git</span> reset <span class="token parameter variable">--soft</span> <span class="token operator">&lt;</span>hash<span class="token operator">&gt;</span>
<span class="token comment"># --hard回退某个版本，丢弃工作区和暂存区的修改</span>
<span class="token function">git</span> reset <span class="token parameter variable">--hard</span> <span class="token operator">&lt;</span>hash<span class="token operator">&gt;</span>

<span class="token comment"># HEAD，当前记录的位置</span>
<span class="token comment"># HEAD^，HEAD~,上一个版本</span>
<span class="token function">git</span> reset <span class="token parameter variable">--soft</span> HEAD^
<span class="token comment"># HEAD~1,HEAD~2,HEAD~n,上n个版本</span>
<span class="token function">git</span> reset <span class="token parameter variable">--soft</span> HEAD~3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="回退指定文件到指定版本" tabindex="-1"><a class="header-anchor" href="#回退指定文件到指定版本" aria-hidden="true">#</a> 回退指定文件到指定版本</h3><p><code>git reset &lt;commitId&gt; &lt;filename&gt;</code></p><p>回退时，会带有<strong>最新提交的修改内容</strong>到指定版本的提交，因为默认是mixed模式，所以<strong>工作区得到保留</strong>，丢弃暂存区</p><p>如果要将工作区的修改恢复到该指定版本的内容，使用restore丢弃修改</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#回退某个文件到某个版本</span>
<span class="token comment">#例如从ID为C10的提交回到ID为C5的提交</span>
<span class="token function">git</span> reset <span class="token operator">&lt;</span>commitID<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>
<span class="token comment">#回退到C5版本时，该文本是C10提交的文件，如果要恢复到C5的内容，则使用restore丢弃C10的文件修改</span>
<span class="token function">git</span> restore <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重做某次提交revert" tabindex="-1"><a class="header-anchor" href="#重做某次提交revert" aria-hidden="true">#</a> 重做某次提交revert</h2><p>相比reset,revert更加安全，不会影响因回退导致其他提交丢失，导致内容丢失</p><p>重做某次提交，会有一个新提交,新的提交跟这个重做的commitid前一次的提交是一样的</p><p>重做会<strong>舍弃某次提交</strong>的内容，恢复到<strong>某次提交的前一次</strong>提交的内容，在revert<strong>之前已提交的修改不会丢失</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#有4次提交</span>
C4 HEAD-<span class="token operator">&gt;</span>master 新建t4加内容
C3 修改t3，新增内容
C2 修改t2和新建t3
C1 新建t1和t2

<span class="token comment">#想要重做C2,那么相当于舍弃C2的修改，恢复到C1的模样</span>
<span class="token comment">#即原本C2修改了t2，新建了t3，现在t2恢复到C1时的模样，t3则不存在</span>
<span class="token comment">#但不会丢失C4中的修改，在revert到某次提交时，可以看到C4提交的内容</span>
<span class="token comment">#revert时，如此时在C4，其实是在最新的提交处再签出一个C4&#39;的提交</span>
<span class="token function">git</span> revert <span class="token parameter variable">-n</span> C2
<span class="token comment">#revert后有5次提交</span>
C4&#39;HEAD-<span class="token operator">&gt;</span>master revert <span class="token string">&quot;修改t2和新建t3&quot;</span>
C4 新建t4加内容
C3 修改t3，新增内容
C2 修改t2和新建t3
C1 新建t1和t2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="撤销工作区的修改checkout" tabindex="-1"><a class="header-anchor" href="#撤销工作区的修改checkout" aria-hidden="true">#</a> 撤销工作区的修改checkout</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#撤销某个文件的修改恢复到没修改之前</span>
<span class="token comment"># --,消除切换分支的歧义</span>
<span class="token function">git</span> checkout -- <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>
<span class="token comment">#撤销所有文件的修改</span>
<span class="token function">git</span> checkout <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>git的所有操作都可以追溯，通过<code>git reflog</code>命令查看操作的历史记录</strong></p><p>如果因为之前使用git reset --hard回退导致修改的内容丢失，可以使用git reflog查找那个提交的hash来恢复修改文件，否则因为没有commit那么就无法找回了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> reflog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="针对暂存区的恢复restore" tabindex="-1"><a class="header-anchor" href="#针对暂存区的恢复restore" aria-hidden="true">#</a> 针对暂存区的恢复restore</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#将不再暂存区的文件撤销更改</span>
<span class="token comment">#即将工作区某个已修改的文件撤销修改</span>
<span class="token function">git</span> restore <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>

<span class="token comment">#将提交add到暂存区的文件恢复到工作区</span>
<span class="token comment">#即将提交撤回到未提交状态</span>
<span class="token function">git</span> restore <span class="token parameter variable">--staged</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看差异diff" tabindex="-1"><a class="header-anchor" href="#查看差异diff" aria-hidden="true">#</a> 查看差异diff</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 默认比较工作区和暂存区的差异</span>
<span class="token function">git</span> <span class="token function">diff</span>

<span class="token comment">#比较工作区和版本库的差异</span>
<span class="token function">git</span> <span class="token function">diff</span> HEAD

<span class="token comment">#比较暂存区和版本库的差异</span>
<span class="token function">git</span> <span class="token function">diff</span> <span class="token parameter variable">--cached</span> HEAD

<span class="token comment">#比较两个版本的差异</span>
<span class="token function">git</span> <span class="token function">diff</span> <span class="token operator">&lt;</span>commitID<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>commitID<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除文件rm" tabindex="-1"><a class="header-anchor" href="#删除文件rm" aria-hidden="true">#</a> 删除文件rm</h2><p><code>git rm</code>用于删除<strong>暂存区</strong>及<strong>工作区</strong>的文件</p><p>删除后一定要提交才能保存到仓库</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 删除工作区文件，需要git add更新暂存区，删除暂存区的文件</span>
<span class="token function">rm</span> file1.txt
<span class="token function">git</span> <span class="token function">add</span> file1.text
<span class="token comment">#或者</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>

<span class="token comment">#删除工作区和暂存区的文件</span>
<span class="token function">git</span> <span class="token function">rm</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>

<span class="token comment">#删除暂存区，但保留工作区的文件</span>
<span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">--cached</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>

<span class="token comment">#删除某个目录下的所有子目录和文件</span>
<span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">-r</span> *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ssh配置" tabindex="-1"><a class="header-anchor" href="#ssh配置" aria-hidden="true">#</a> SSH配置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#进入到.ssh目录</span>
<span class="token builtin class-name">cd</span> .ssh
<span class="token comment">#使用ssh-keygen生成公钥和私钥</span>
<span class="token comment"># -t 指定协议</span>
<span class="token comment"># -b 指定生成的大小</span>
ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-b</span> <span class="token number">4096</span>
<span class="token comment">#会提示生成的密钥名称，如果第一次生成可以不输入，否则输入名称</span>
<span class="token comment">#非第一次生成rsa密钥，如填写密钥名称为test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#在.ssh目录下新建一个config文件</span>
<span class="token comment">#在文件中配置</span>
<span class="token comment">#当访问github.com的时候，使用指定的test私钥文件</span>
<span class="token comment">#github</span>
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关联远程仓库remote" tabindex="-1"><a class="header-anchor" href="#关联远程仓库remote" aria-hidden="true">#</a> 关联远程仓库remote</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 关联远程仓库</span>
<span class="token comment">#origin是远程仓库的别名，默认是origin，可自定义远程仓库别名</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin <span class="token operator">&lt;</span>url<span class="token operator">&gt;</span>
<span class="token comment"># 关联远程分支</span>
<span class="token comment"># -u，--set-upstream的缩写，关联本地和远程都为main的分支</span>
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin main
<span class="token comment"># main:main,将本地的main分支推送到远程的main分支</span>
<span class="token comment"># git push -u origin &lt;本地分支&gt;:&lt;远程分支&gt;</span>
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin main:main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关联多个远程仓库" tabindex="-1"><a class="header-anchor" href="#关联多个远程仓库" aria-hidden="true">#</a> 关联多个远程仓库</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 关联多个远程仓库，分别push</span>
<span class="token function">git</span> remote <span class="token function">add</span> gitee <span class="token operator">&lt;</span>url<span class="token operator">&gt;</span>
<span class="token function">git</span> remote <span class="token function">add</span> github <span class="token operator">&lt;</span>url<span class="token operator">&gt;</span>

<span class="token comment"># 关联远程origin仓库</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin <span class="token operator">&lt;</span>url<span class="token operator">&gt;</span>
<span class="token comment"># 在origin中关联多个远程仓库，一次性push到所有远程仓库</span>
<span class="token comment"># 只能push到多个远程仓库</span>
<span class="token comment"># 只能从一个仓库pull，因为fetch-url只有一个，可以修改</span>
<span class="token function">git</span> remote set-url <span class="token parameter variable">--add</span> <span class="token operator">&lt;</span>url<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看当前仓库对应的远程仓库的别名和地址" tabindex="-1"><a class="header-anchor" href="#查看当前仓库对应的远程仓库的别名和地址" aria-hidden="true">#</a> 查看当前仓库对应的远程仓库的别名和地址</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> remote <span class="token parameter variable">-v</span>

origin <span class="token operator">&lt;</span>git@github.com<span class="token operator">&gt;</span>:mine/myrepo.git<span class="token punctuation">(</span>fetch<span class="token punctuation">)</span>
origin <span class="token operator">&lt;</span>git@github.com<span class="token operator">&gt;</span>:mine/myrepo.git<span class="token punctuation">(</span>push<span class="token punctuation">)</span>
gitee <span class="token operator">&lt;</span>gitee@gitee.com<span class="token operator">&gt;</span>:mine/myrepo.git<span class="token punctuation">(</span>fetch<span class="token punctuation">)</span>
gitee <span class="token operator">&lt;</span>gitee@gitee.com<span class="token operator">&gt;</span>:mine/myrepo.git<span class="token punctuation">(</span>push<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="拉取远程仓库到本地仓库pull、fetch" tabindex="-1"><a class="header-anchor" href="#拉取远程仓库到本地仓库pull、fetch" aria-hidden="true">#</a> 拉取远程仓库到本地仓库pull、fetch</h2><h3 id="pull" tabindex="-1"><a class="header-anchor" href="#pull" aria-hidden="true">#</a> pull</h3><blockquote><p>将远程仓库拉取并<strong>与本地分支合并</strong></p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># git pull &lt;远程仓库名&gt; &lt;远程分支名&gt;:&lt;本地分支名&gt;</span>
<span class="token comment"># git pull默认拉取远程仓库origin的main分支</span>
<span class="token function">git</span> pull origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fetch" tabindex="-1"><a class="header-anchor" href="#fetch" aria-hidden="true">#</a> fetch</h3><blockquote><p>将远程分支拉取下来，但<strong>不与本地分支合并，合并使用merge</strong></p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#拉取远程origin仓库的dev分支</span>
<span class="token function">git</span> fetch origin dev
<span class="token comment">#将远程分支origin/dev合并到本地分支</span>
<span class="token function">git</span> merge origin/dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="推送本地分支到远程分支pull" tabindex="-1"><a class="header-anchor" href="#推送本地分支到远程分支pull" aria-hidden="true">#</a> 推送本地分支到远程分支pull</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># git push &lt;远程主机别名&gt; &lt;本地分支名&gt;:&lt;远程分支名&gt;</span>
<span class="token function">git</span> push origin dev
<span class="token comment">#如果当前分支与远程分支建立了追踪关系,--set-upstream</span>
<span class="token function">git</span> push origin
<span class="token comment">#或者，本地只有一个主机的对应分支</span>
<span class="token function">git</span> push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分支操作branch" tabindex="-1"><a class="header-anchor" href="#分支操作branch" aria-hidden="true">#</a> 分支操作branch</h2><h3 id="新建分支" tabindex="-1"><a class="header-anchor" href="#新建分支" aria-hidden="true">#</a> 新建分支</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#新建分支</span>
<span class="token function">git</span> branch dev
<span class="token comment">#切换到指定分支</span>
<span class="token function">git</span> checkout dev
<span class="token comment">#或者</span>
<span class="token function">git</span> switch dev

<span class="token comment">#新建并切换到该分支</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看分支" tabindex="-1"><a class="header-anchor" href="#查看分支" aria-hidden="true">#</a> 查看分支</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看【本地】所有分支</span>
<span class="token function">git</span> branch

<span class="token comment">#查看【远程】所有分支</span>
<span class="token comment"># -r --remotes</span>
<span class="token function">git</span> branch <span class="token parameter variable">-r</span>

<span class="token comment">#查看【本地】及【远程】所有分支</span>
<span class="token comment"># -a --all</span>
<span class="token function">git</span> branch <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除本地分支" tabindex="-1"><a class="header-anchor" href="#删除本地分支" aria-hidden="true">#</a> 删除本地分支</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># -d --delete</span>
<span class="token function">git</span> branch <span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>branchname<span class="token operator">&gt;</span>
<span class="token comment">#强制删除</span>
<span class="token function">git</span> branch <span class="token parameter variable">-D</span> <span class="token operator">&lt;</span>branchname<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除远程分支" tabindex="-1"><a class="header-anchor" href="#删除远程分支" aria-hidden="true">#</a> 删除远程分支</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 删除远程仓库origin的指定分支</span>
<span class="token function">git</span> push origin <span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>branchname<span class="token operator">&gt;</span>
<span class="token comment">#或者</span>
<span class="token function">git</span> push origin :<span class="token operator">&lt;</span>branchname<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重命名分支" tabindex="-1"><a class="header-anchor" href="#重命名分支" aria-hidden="true">#</a> 重命名分支</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重命名本地oldname分支为newname</span>
<span class="token function">git</span> branch <span class="token parameter variable">-m</span> oldname newname
<span class="token comment"># 删除远程分支</span>
<span class="token function">git</span> push origin :oldname
<span class="token comment"># 推送新命名的分支</span>
<span class="token function">git</span> push newname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="合并分支merge" tabindex="-1"><a class="header-anchor" href="#合并分支merge" aria-hidden="true">#</a> 合并分支merge</h2><h2 id="变基rebase" tabindex="-1"><a class="header-anchor" href="#变基rebase" aria-hidden="true">#</a> 变基rebase</h2><blockquote><p>变基可以在<strong>任意分支</strong>上进行，可以变基到<strong>一条分支</strong></p><p>优点：不会新增额外的提交记录，形成线性历史，比较直观干净</p><p>缺点：会改变提交历史，改变当前分支branch out的节点，避免在共享分支上使用，团队合作时避免使用rebase</p><p>变基的时候会找到当前分支和目标分支的<strong>共同祖先</strong>，再把当前分支上<strong>从共同祖先到最新提交记录</strong>的所有提交都移动到<strong>目标分支的最新提交的后面</strong></p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#有两条分支分别是main和dev</span>
<span class="token comment">#切换到dev分支（当前分支）</span>
<span class="token function">git</span> checkout dev
<span class="token comment">#变基到main分支（目标分支）</span>
<span class="token function">git</span> rebase main
<span class="token comment">#dev分支，从共同祖先到最新的提交记录都会移动到目标分支main的最新提交的后面</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+l+'" alt="image"></p>',60),p=[d,r,o];function m(u,v){return e(),i("div",null,p)}const b=a(c,[["render",m],["__file","basic.html.vue"]]);export{b as default};

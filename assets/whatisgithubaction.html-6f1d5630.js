import{_ as t,r as o,o as i,c as l,b as n,e as a,d as e,a as c}from"./app-21769845.js";const p={},u=c(`<h2 id="github-actions是什么" tabindex="-1"><a class="header-anchor" href="#github-actions是什么" aria-hidden="true">#</a> Github Actions是什么</h2><p>持续集成由很多操作组成，例如抓取代码、运行测试、构建生产版本、登录远程服务器、发布到第三方服务等等。github把这些操作成为actions</p><p>很多操作在大多数的项目中是相似的，开发者可以把自己写的action脚本共享到github actions仓库，使用者不用自己编写复杂的脚本，可以直接使用他人写好的action，整个持续集成过程就可以通过actions组合</p><p><code>action</code>是一个独立脚本，可以做成代码仓库，使用 <code>userName/repoName</code>的语法引用action，如 <code>actions/setup-node</code>就表示 <code>github.com/action/setup-node</code>这个仓库。官方的actions都放在 <code>github.com/actions</code>里面</p><p>因为actions是代码仓库，所以就有版本的概念，使用这可以使用指定的action版本。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>actions/setup-node@v1 <span class="token comment">#指向一个tag</span>
actions/setup-node@master <span class="token comment">#指向一个分支</span>
actions/setup-node@7as79q <span class="token comment">#指向一个commit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h2><ul><li>workflow（工作流程）：持续集成一次运行的过程</li><li>job（任务）：一个workflow有一个或者多个jobs构成；一次持续集成的运行，可以完成多个任务</li><li>step（步骤）：每个job由多个step构成，一步步完成</li><li>action（动作）：每个step可以一次执行一个或多个命令（action）</li></ul><h2 id="workflow文件" tabindex="-1"><a class="header-anchor" href="#workflow文件" aria-hidden="true">#</a> workflow文件</h2><p>workflow文件是github actions的配置文件。存放在代码仓库 <code>.github/workflows</code>目录</p><p>workflow采用<strong>YAML格式</strong>，文件名可任意取</p><p>一个仓库可以有多个workflow文件，github发现 <code>.github/workflows</code>目录里面有<strong>yml</strong>文件就会自动运行这些文件</p><h3 id="基本字段解释" tabindex="-1"><a class="header-anchor" href="#基本字段解释" aria-hidden="true">#</a> 基本字段解释</h3><h3 id="name" tabindex="-1"><a class="header-anchor" href="#name" aria-hidden="true">#</a> name</h3><p>workflow的名称，省略，默认为当前workflow的文件名</p><h3 id="on" tabindex="-1"><a class="header-anchor" href="#on" aria-hidden="true">#</a> on</h3><p>指定触发workflow的条件，通常是某些事件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">on</span><span class="token punctuation">:</span> push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指定 <code>push</code>事件触发workflow</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">on</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> push
 <span class="token punctuation">-</span> pull_rrequest

<span class="token comment">#数组写成这样也行</span>
<span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>push<span class="token punctuation">,</span>pull_request<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>on</code>字段也可以指定为一个<strong>数组</strong>，<code>push</code>或者 <code>pull_request</code>都会触发workflow</p><h3 id="on-事件名称-tags-branches" tabindex="-1"><a class="header-anchor" href="#on-事件名称-tags-branches" aria-hidden="true">#</a> on.&lt;事件名称&gt;.&lt;tags|branches&gt;</h3><p>指定触发事件时，可以限定分支或标签</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">on</span><span class="token punctuation">:</span>
 <span class="token key atrule">push</span><span class="token punctuation">:</span>
  <span class="token key atrule">branches</span><span class="token punctuation">:</span>
   <span class="token punctuation">-</span> master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示当master分支发生push事件时，才会触发workflow</p><h3 id="jobs-job-id-name" tabindex="-1"><a class="header-anchor" href="#jobs-job-id-name" aria-hidden="true">#</a> jobs.&lt;job_id&gt;.name</h3><p><code>jobs</code>字段是workflow文件的主体，表示要执行的一项或多项任务</p><p><code>jobs</code>字段里面，需要写出每一项的 <code>job_id</code>，名称自定义，<code>job_id</code>里面的 <code>name</code>字段是对该任务的说明</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
 <span class="token key atrule">my_first_job</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> 第一个任务
 <span class="token key atrule">my_second_job</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> 第二个任务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="jobs-job-id-needs" tabindex="-1"><a class="header-anchor" href="#jobs-job-id-needs" aria-hidden="true">#</a> jobs.&lt;job_id&gt;.needs</h3><p>needs字段指定当前任务的依赖关系，其实就是job_id执行顺序</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
 <span class="token key atrule">job1</span><span class="token punctuation">:</span>
 <span class="token key atrule">job2</span><span class="token punctuation">:</span>
  <span class="token key atrule">needs</span><span class="token punctuation">:</span> job1
 <span class="token key atrule">job3</span><span class="token punctuation">:</span>
  <span class="token key atrule">needs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>job1<span class="token punctuation">,</span>job2<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>job1必须先于job2完成，job3必须等待job1和job2的完成才能运行。执行顺序为job1，job2，job3</p><h3 id="jobs-job-id-runs-on" tabindex="-1"><a class="header-anchor" href="#jobs-job-id-runs-on" aria-hidden="true">#</a> jobs.&lt;job_id&gt;.runs-on</h3><p><code>runs-on</code>字段指定运行所需要的的虚拟机环境。必须字段。可用的虚拟机有</p><ul><li>ubuntu-latest，ubuntu-18.04或 ubuntu-16.04</li><li>windows-latest，windows-2019或 windows-2016</li><li>macOS-latest或 macOS-10.14</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
 <span class="token key atrule">job1</span><span class="token punctuation">:</span>
  <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="jobs-job-id-steps" tabindex="-1"><a class="header-anchor" href="#jobs-job-id-steps" aria-hidden="true">#</a> jobs.&lt;job_id&gt;.steps</h3><p><code>steps</code>指定每个job的运行步骤，可以包含一个或多个步骤，每个步骤可以指定以下一些字段</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
 <span class="token key atrule">build</span><span class="token punctuation">:</span>
  <span class="token key atrule">steps</span><span class="token punctuation">:</span>
   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 第一步：使用run
     <span class="token key atrule">env</span><span class="token punctuation">:</span> 
      <span class="token key atrule">NAME</span><span class="token punctuation">:</span> benchan
      <span class="token key atrule">AGE</span><span class="token punctuation">:</span> <span class="token number">30</span>
      <span class="token key atrule">GENDER</span><span class="token punctuation">:</span> male
     <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
      echo $NAME $AGE $GENDER</span>
   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 第二步：利用uses字段使用action
     <span class="token key atrule">uses</span><span class="token punctuation">:</span> userName/repoName@tag
     <span class="token key atrule">with</span><span class="token punctuation">:</span>
      <span class="token key atrule">job</span><span class="token punctuation">:</span> coder
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>uses</strong></li></ul><p>作为作业步骤的一部分运行的操作。操作是一种<strong>可重复使用的</strong>独立代码脚本，即action。</p><p>可以使用在与<strong>工作流、公共储存库或以发布的Docker容器镜像</strong>相同的储存库中定义的操作</p><p>某些操作可能需要搭配使用 <code>with</code>关键字</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#使用版本化操作</span>
<span class="token key atrule">steps</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2
 <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@master

<span class="token comment">#使用公共操作</span>
<span class="token comment">#{owner}/{repo}@{ref}</span>
<span class="token key atrule">steps</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/aws@v2.1.1

<span class="token comment">#使用工作流程所造仓库中操作</span>
<span class="token comment">#./path/to/dir</span>
<span class="token key atrule">steps</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> ./.github/actions/my<span class="token punctuation">-</span>action

<span class="token comment">#使用docker中枢操作</span>
<span class="token comment">#docker://{image}:{tag}</span>
<span class="token key atrule">steps</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker<span class="token punctuation">:</span>//alpine<span class="token punctuation">:</span><span class="token number">3.8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>with</strong></li></ul><p>由uses指定的操作（action）所定义的输入参数的map（对象）。每个输入参数都是一个键值对。</p><p>输入参数被设置为环境变量，变量的前缀为INPUT_，并转换为大写</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">steps</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/say@master
   <span class="token key atrule">with</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> benchan
    <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">30</span>
    <span class="token key atrule">gender</span><span class="token punctuation">:</span> male
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些输入参数将会作为<code>INPUT_NAME</code>、<code>INPUT_AGE</code>、<code>INPUT_GENDER</code>环境变量，由action访问到这些变量</p><p>with还有一些属性可以设置</p><ul><li>args：代替Dockerfile中的CMD指令，及那个args传入到容器的ENTRYPOINT，是一个字符串，<code>\${{}}</code>来使用变量</li><li>enrtypoint：用于Docker容器操作，</li></ul><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h2>`,53),d={href:"https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html",target:"_blank",rel:"noopener noreferrer"},r={href:"https://docs.github.com/zh/actions",target:"_blank",rel:"noopener noreferrer"},k={href:"https://github.com/marketplace?type=actions",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/sdras/awesome-actions",target:"_blank",rel:"noopener noreferrer"};function b(v,h){const s=o("ExternalLinkIcon");return i(),l("div",null,[u,n("p",null,[n("a",d,[a("GitHub Actions 入门教程 - 阮一峰的网络日志 (ruanyifeng.com)"),e(s)])]),n("p",null,[n("a",r,[a("GitHub Actions 文档 - GitHub 文档"),e(s)])]),n("p",null,[n("a",k,[a("Github官方市场"),e(s)])]),n("p",null,[n("a",m,[a("awesome-actions"),e(s)])])])}const y=t(p,[["render",b],["__file","whatisgithubaction.html.vue"]]);export{y as default};
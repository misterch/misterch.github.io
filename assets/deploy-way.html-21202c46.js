import{_ as n,o as s,c as a,a as e}from"./app-21769845.js";const t={},p=e(`<h2 id="github-pages" tabindex="-1"><a class="header-anchor" href="#github-pages" aria-hidden="true">#</a> GitHub Pages</h2><blockquote><p>前提需要有一个GitHub账号</p><p>只能托管静态项目</p></blockquote><ol><li><p>新建一个仓库</p><ul><li>仓库名称为<code>[用户名].github.io</code>，则访问路径为<code>用户名.github.io</code>，没有子路径</li><li>仓库名称并非用户名，则访问路径为<code>用户名.github.io/仓库名称</code></li></ul></li><li><p>项目仓库——settings——pages</p><ul><li>选择需要作为github pages的分支，以后访问的就是该分支里的静态页面</li><li>一般github page的分支是<code>gh-pages</code>，配置成这个分支就好</li></ul></li><li><p>个人--settings--生成一个token</p><ul><li>生成的这个token可以拥有设置的权限，例如可以访问仓库</li><li>生成的token需要复制下来，因为只会显示一次</li><li>在项目仓库——settings——secrets新增ACCESS_TOKEN变量，值为生成的token</li></ul></li><li><p>在项目中创建<code>.github/workflows/deploy.yml</code></p><ul><li><p>这是持续集成的配置文件，当push（提交）修改到仓库，就会自动执行构建任务并，完成以后就看见更新后的页面，而且这个是临时的系统，构建完毕就会销毁，所以只能构建成静态页面</p></li><li><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> GitHub Actions Build and Deploy Demoname
<span class="token key atrule">on</span><span class="token punctuation">:</span>
	<span class="token comment"># 上传代码到仓库触发push钩子</span>
	<span class="token key atrule">push</span><span class="token punctuation">:</span>
		<span class="token key atrule">branches</span><span class="token punctuation">:</span>
			<span class="token comment"># 只对master分支的代码起效</span>
			<span class="token punctuation">-</span> master
<span class="token comment"># 触发push后执行的任务</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
	<span class="token comment"># 任务名称</span>
	<span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>
		<span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
		<span class="token comment"># 步骤</span>
		<span class="token key atrule">steps</span><span class="token punctuation">:</span>
			<span class="token comment"># 步骤名称</span>
		<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout
			<span class="token comment"># 使用的action，把项目拉取下来</span>
			<span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@master
		<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build and Deploy
			<span class="token comment"># 这个action是构建项目</span>
			uses<span class="token punctuation">:</span>JamesIves/github<span class="token punctuation">-</span>pages<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>action@master
			<span class="token comment"># 配置构建项目的环境参数</span>
			<span class="token key atrule">env</span><span class="token punctuation">:</span>
				<span class="token comment"># 这个变量是通过在项目settings--secrets中配置，ACCESS_TOKEN就是生成的token</span>
				<span class="token key atrule">ACCESS TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
				<span class="token comment"># 把项目构建完成后push到这个分支</span>
				<span class="token key atrule">BRANCH</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
				<span class="token key atrule">FOLDER</span><span class="token punctuation">:</span> dist
				<span class="token key atrule">BUILD SCRIPT</span><span class="token punctuation">:</span> npm install <span class="token important">&amp;&amp;</span> npm run build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>配置项目的<code>publicPath</code>，根据实际页面访问路径配置</p><ul><li><p>如果github pages直接通过域名就可以访问得到仓库页面，则publicPath为&#39;/&#39;</p></li><li><p>如果github pages配置的是域名下的子路径，则publicPath为&#39;/子路径&#39;</p></li><li><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// vue.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">publicPath</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">?</span> <span class="token string">&#39;/github仓库名称&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;/&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>完成项目，提交到仓库</p><ul><li>github就会根据<code>.github/workflows/deploy.yml</code>的配置来执行构建</li><li>构建完成，可通过github给的域名访问生成的静态站点</li></ul></li></ol><h2 id="vercel" tabindex="-1"><a class="header-anchor" href="#vercel" aria-hidden="true">#</a> Vercel</h2><blockquote><p>可以部署静态页面，nuxt、next和Node等开发的项目，serverless（Faas）</p></blockquote><ol><li><p>全局安装vercel</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> global <span class="token function">add</span> vercel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>创建配置文件now.json或者vercel.json</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">&quot;builds&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;src&quot;</span><span class="token operator">:</span> <span class="token string">&quot;nuxt.config.js&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;use&quot;</span><span class="token operator">:</span><span class="token string">&quot;@nuxtjs/now-builder&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>.nowignore</p><p>nuxt构建的文件（.nuxt）要忽略上传到vercel</p></li><li><p>发布</p><p>登录vercel，如果通过github登录，那么就通过github的邮箱接收邮件登录</p><p><code>vercel</code>或者 <code>vercel --prod</code>进行发布</p></li></ol><h2 id="serverless" tabindex="-1"><a class="header-anchor" href="#serverless" aria-hidden="true">#</a> Serverless</h2><ul><li><p>Serverless是一种架构模式，无服务器架构</p><p>对于使用Serverless架构进行开发的项目，开发者最明显的感受就是更关注应用的业务本身，不必再过多去关心服务器和运行平台的一系列问题</p></li><li><p>无服务器，并不是真的没有服务器，只是开发人员眼中不需要关注服务器。开发人员只需要按照一定的要求完成开发工作，剩下的所有事情全部交给Serverless容器完成</p></li><li><p>我们的引用主要由两大块组成，分别是逻辑与存储。Serverless中就通过两种方式解决了这两块的需求</p><ul><li>函数即服务（Faas）</li><li>后端即服务（Baas）</li></ul></li><li><p>Serverless的优势</p><ul><li>不需要再考虑物理机/虚拟机，结合工作流的情况下，代码提交自动部署，直接运行</li><li>没有服务器，维护成本自然大大降低，安全性稳定性更高</li><li>都是弹性伸缩云，硬件资源需要多少分配多少，不用担心性能问题</li><li>大多数Serverless服务商的计价方式都是按使用情况来收费</li></ul></li></ul><h3 id="vercel-serverless" tabindex="-1"><a class="header-anchor" href="#vercel-serverless" aria-hidden="true">#</a> Vercel Serverless</h3><p>支持多种语言的<strong>云函数</strong>，每个云函数就是一个接口</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//使用node编写云函数</span>
<span class="token comment">// hello.js</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>name <span class="token operator">=</span> <span class="token string">&quot;World&quot;</span><span class="token punctuation">}</span> <span class="token operator">=</span> req<span class="token punctuation">.</span>query
  res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过服务端渲染html模板</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>data<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;https://xxx.io/api/tags&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">let</span> html <span class="token operator">=</span> <span class="token string">&#39;&lt;ul&gt;&#39;</span>
  data<span class="token punctuation">.</span>tags<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    html<span class="token operator">+=</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;li&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/li&gt;</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  html<span class="token operator">+=</span><span class="token string">&#39;&lt;/ul&gt;&#39;</span>
  res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>无数据库，可以使用json文件来储存数据</p><p>使用<code>json-server</code>可以操作json文件的增删，<code>json-server</code>可以当工具（命令行）或者模块（代码中）使用</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// db.json</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;posts&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token property">&quot;title&quot;</span><span class="token operator">:</span><span class="token string">&quot;标题&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;author&quot;</span><span class="token operator">:</span><span class="token string">&quot;ben&quot;</span><span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;comments&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token string">&quot;id&quot;</span>：<span class="token number">1</span><span class="token punctuation">,</span><span class="token property">&quot;content&quot;</span><span class="token operator">:</span><span class="token string">&quot;some comments&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;postId&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;profile&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;kjjkh&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过命令行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>json-server <span class="token parameter variable">--watch</span> db.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样就会创建3个接口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://localhost:3000/posts
http://localhost:3000/comments
http://localhost:3000/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过模块来使用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> jsonServer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;json-server&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> server <span class="token operator">=</span> jsonServer<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> jsonServer<span class="token punctuation">.</span><span class="token function">router</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">&#39;../db.json&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> middlewares <span class="token operator">=</span> jsonServer<span class="token punctuation">.</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

server<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>middlewares<span class="token punctuation">)</span>
server<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span>
module<span class="token punctuation">.</span>export <span class="token operator">=</span> server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>now.json</code>或者<code>vercel.json</code>配置路由</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">&quot;routes&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token comment">// src就是访问的api规则，dest就是将匹配到的api转发到server.js文件中</span>
    <span class="token punctuation">{</span><span class="token property">&quot;src&quot;</span><span class="token operator">:</span><span class="token string">&quot;/api/server/(.*)&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;dest&quot;</span><span class="token operator">:</span><span class="token string">&quot;/api/server.js&quot;</span><span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本地调试</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>vercel dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,26),o=[p];function l(i,c){return s(),a("div",null,o)}const r=n(t,[["render",l],["__file","deploy-way.html.vue"]]);export{r as default};
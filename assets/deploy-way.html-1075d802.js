import{_ as n,o as s,c as a,a as e}from"./app-b8fe5879.js";const t={},l=e(`<h2 id="github-pages" tabindex="-1"><a class="header-anchor" href="#github-pages" aria-hidden="true">#</a> GitHub Pages</h2><blockquote><p>前提需要有一个GitHub账号</p><p>只能托管静态项目</p></blockquote><ol><li><p>新建一个仓库</p><ul><li>仓库名称为<code>[用户名].github.io</code>，则访问路径为<code>用户名.github.io</code>，没有子路径</li><li>仓库名称并非用户名，则访问路径为<code>用户名.github.io/仓库名称</code></li></ul></li><li><p>项目仓库——settings——pages</p><ul><li>选择需要作为github pages的分支，以后访问的就是该分支里的静态页面</li><li>一般github page的分支是<code>gh-pages</code>，配置成这个分支就好</li></ul></li><li><p>个人--settings--生成一个token</p><ul><li>生成的这个token可以拥有设置的权限，例如可以访问仓库</li><li>生成的token需要复制下来，因为只会显示一次</li><li>在项目仓库——settings——secrets新增ACCESS_TOKEN变量，值为生成的token</li></ul></li><li><p>在项目中创建<code>.github/workflows/deploy.yml</code></p><ul><li><p>这是持续集成的配置文件，当push（提交）修改到仓库，就会自动执行构建任务并，完成以后就看见更新后的页面，而且这个是临时的系统，构建完毕就会销毁，所以只能构建成静态页面</p></li><li><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> GitHub Actions Build and Deploy Demoname
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>完成项目，提交到仓库</p><ul><li>github就会根据<code>.github/workflows/deploy.yml</code>的配置来执行构建</li><li>构建完成，可通过github给的域名访问生成的静态站点</li></ul></li></ol><h2 id="vercel" tabindex="-1"><a class="header-anchor" href="#vercel" aria-hidden="true">#</a> Vercel</h2><blockquote><p>可以部署静态页面，Node等开发的项目，serverless（Faas）</p></blockquote><h2 id="serverless" tabindex="-1"><a class="header-anchor" href="#serverless" aria-hidden="true">#</a> Serverless</h2>`,6),p=[l];function i(c,o){return s(),a("div",null,p)}const d=n(t,[["render",i],["__file","deploy-way.html.vue"]]);export{d as default};

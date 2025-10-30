import{_ as e,r as i,o as t,c as l,b as n,d as c,e as p,a as s}from"./app-d4c6289a.js";const o={},r=s(`<h2 id="配置文件解析" tabindex="-1"><a class="header-anchor" href="#配置文件解析" aria-hidden="true">#</a> 配置文件解析</h2><p>配置文件主要由三个配置快组成 </p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#全局块</span>

<span class="token comment">#events块</span>
<span class="token comment">#服务器与客户端之间网络连接的配置</span>
events <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">#http块</span>
<span class="token comment">#虚拟主机，反向代理，负载均衡等</span>
http<span class="token punctuation">{</span>
	<span class="token comment">#server块，即虚拟主机</span>
	server<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">#把servers目录下的所有配置文件包含进来，可以把每个主机的配置文件单独放到一个文件中管理</span>
	include servers/*
<span class="token punctuation">}</span>
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#设置进程数量，一般跟cpu内核数量相同</span>
<span class="token comment">#设置auto，根据内核数量自动分配</span>
worker_process <span class="token number">6</span><span class="token punctuation">;</span>
http <span class="token punctuation">{</span>
	server <span class="token punctuation">{</span>
		<span class="token comment">#将mime.types文件包含进来</span>
		include mime.types<span class="token punctuation">;</span>
		<span class="token comment">#监听的端口</span>
		listen	<span class="token number">80</span><span class="token punctuation">;</span>
		server_name	localhost<span class="token punctuation">;</span>
		<span class="token comment"># 匹配浏览器地址栏输入的url</span>
		<span class="token comment"># /就是匹配根目录</span>
		location / <span class="token punctuation">{</span>
			<span class="token comment">#根目录的文件夹路径，是一个相对地址，相对于nginx的安装目录来说</span>
			root html<span class="token punctuation">;</span>
			<span class="token comment">#在html目录中寻找index.html或者index.htm文件</span>
			<span class="token comment">#这个文件就是在浏览器输入匹配的url后看到的页面</span>
			index index.html index.htm<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> start <span class="token comment">#启动</span>
nginx <span class="token parameter variable">-s</span> stop <span class="token comment">#停止</span>
nginx <span class="token parameter variable">-s</span> quit <span class="token comment">#优雅停止</span>
nginx <span class="token parameter variable">-s</span> reload <span class="token comment">#重新加载配置文件</span>

nginx <span class="token parameter variable">-t</span> <span class="token comment">#检查配置文件</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理" aria-hidden="true">#</a> 反向代理</h2><blockquote><p>正向代理：代理客户端，如vpn代理服务器作为客户端访问网站，将访问结果返回给我的客户端，对服务器是透明的（服务器不知道）</p><p>反向代理：代理服务端，如访问百度，对外暴露的只有一个域名，但是服务器可能会将请求转发到其他的服务器上，隐藏了真实服务器的ip和端口信息，对客户端是透明的（客户端不知道）</p></blockquote><blockquote><p>反向代理常用的指令：<code>proxy_pass</code><em>,</em><code>proxyset_header</code></p></blockquote><h3 id="proxy-pass" tabindex="-1"><a class="header-anchor" href="#proxy-pass" aria-hidden="true">#</a> proxy_pass</h3><p>用来设置被代理服务器地址，可以是主机名称，IP地址加端口号</p><ul class="contains-task-list"><li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> 解决跨域问题</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 代理到bilibili，访问时会跳转到bilibili</span>
location / <span class="token punctuation">{</span>
	root html<span class="token punctuation">;</span>
	index	index.html index.htm<span class="token punctuation">;</span>
	proxy_pass https://bilibili.com<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">#反向代理</span>
<span class="token comment">#当跨域时，nginx拦截/api开头的请求，将其转发到http:localhost:9000;解决跨域问题</span>
location /api <span class="token punctuation">{</span>
	proxy_pass	http://localhost:9000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="https" tabindex="-1"><a class="header-anchor" href="#https" aria-hidden="true">#</a> HTTPS</h2><p>默认端口443</p><h3 id="证书的申请" tabindex="-1"><a class="header-anchor" href="#证书的申请" aria-hidden="true">#</a> 证书的申请</h3><blockquote><p>申请完证书后会得到<strong>密钥文件</strong>和<strong>证书文件</strong></p><p>这两个文件需要放到服务器中</p></blockquote><ol><li><p>云平台可以免费申请证书</p></li><li><p>使用openssl生成自签名证书</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#生成私钥</span>
openssl general <span class="token parameter variable">-out</span> private.key <span class="token number">2048</span>
<span class="token comment">#根据私钥生成证书签名请求文件CSR</span>
openssl req <span class="token parameter variable">-new</span> <span class="token parameter variable">-key</span> private.key <span class="token parameter variable">-out</span> cert.csr
<span class="token comment">#使用私钥对证书申请进行签名从而生成证书文件pem文件</span>
openssl x509 <span class="token parameter variable">-req</span> <span class="token parameter variable">-in</span> cert.csr <span class="token parameter variable">-out</span> cacert.pem <span class="token parameter variable">-signkey</span> private.key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>配置nginx</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server<span class="token punctuation">{</span>
    <span class="token comment">#https服务</span>
    listen <span class="token number">443</span> ssl<span class="token punctuation">;</span>
    server_name your_host_name<span class="token punctuation">;</span>
    <span class="token comment">#证书文件名称，即路径</span>
    ssl_certificate  /etc/nginx/cacert.pem<span class="token punctuation">;</span>
    <span class="token comment">#证书私钥文件名称</span>
    ssl_certificate_key /etc/nginx/private.key<span class="token punctuation">;</span>
    <span class="token comment">#ssl验证配置</span>
    ssl_session_timeout  5m<span class="token punctuation">;</span><span class="token comment">#缓存有效期</span>
    <span class="token comment">#安全链接可选的加密协议</span>
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3<span class="token punctuation">;</span>
    <span class="token comment">#配置加密套件/加密算法，写法遵循openssl标注</span>
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:<span class="token operator">!</span>aNULL:<span class="token operator">!</span>MD5:<span class="token operator">!</span>RC4:<span class="token operator">!</span>DHE<span class="token punctuation">;</span>
    <span class="token comment">#使用服务器端的首选算法</span>
    ssl_prefer_server_ciphers on<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

server <span class="token punctuation">{</span>
  listen <span class="token number">80</span><span class="token punctuation">;</span>
  server_name myblog.a.com<span class="token punctuation">;</span>
  <span class="token comment">#将http请求跳转到https</span>
  <span class="token builtin class-name">return</span> <span class="token number">301</span> https://<span class="token variable">$server_name</span><span class="token variable">$request_uri</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="虚拟主机" tabindex="-1"><a class="header-anchor" href="#虚拟主机" aria-hidden="true">#</a> 虚拟主机</h2><p>可以在一台服务器中部署多个站点，节省服务器资源和成本，充分利用服务器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#每一个server就是一个虚拟主机</span>
server<span class="token punctuation">{</span>
	listen <span class="token number">8080</span><span class="token punctuation">;</span>
	server_name localhost<span class="token punctuation">;</span>
	location / <span class="token punctuation">{</span>
		root ./vue2<span class="token punctuation">;</span>
		index index.html<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

server<span class="token punctuation">{</span>
	listen <span class="token number">5173</span><span class="token punctuation">;</span>
	server_name localhost<span class="token punctuation">;</span>
	location / <span class="token punctuation">{</span>
		root ./vue3<span class="token punctuation">;</span>
		index index.html<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-history-404问题" tabindex="-1"><a class="header-anchor" href="#vue-history-404问题" aria-hidden="true">#</a> vue history 404问题</h2><blockquote><p>问题原因：服务器时根据页面路由去按照路径寻找资源的，vue项目打包后只有一个html页面，不存在其他资源目录下的html，服务器找不到对应的页面所以会报404</p></blockquote><h3 id="try-files" tabindex="-1"><a class="header-anchor" href="#try-files" aria-hidden="true">#</a> try_files</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>location / <span class="token punctuation">{</span>
	root html<span class="token punctuation">;</span>
	index	index.html index.htm<span class="token punctuation">;</span>
	<span class="token comment"># $uri是当前的路径（不包括?后的参数），将$uri拼接到index.html后面</span>
	try_files	<span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="日志分析器-goaccess" tabindex="-1"><a class="header-anchor" href="#日志分析器-goaccess" aria-hidden="true">#</a> 日志分析器 GoAccess</h2><p>linux安装GoAccess</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> 下载地址
<span class="token function">tar</span> goaccess.tar.gz
<span class="token comment"># 进入解压后的目录执行configure文件</span>
<span class="token comment"># 然后执行make命令安装，再执行一次make install</span>
<span class="token function">make</span>
<span class="token function">make</span> <span class="token function">install</span>
<span class="token comment"># 查看nginx安装位置</span>
<span class="token function">whereis</span> nginx
<span class="token comment">#进入到nginx的logs目录，access.log就是日志记录</span>

<span class="token comment">#使用goaccess来将access.log格式化</span>
goaccess ./access.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="开启实时html报告分析" tabindex="-1"><a class="header-anchor" href="#开启实时html报告分析" aria-hidden="true">#</a> 开启实时HTML报告分析</h3>`,29),d={href:"https://blog.csdn.net/qq1195566313/article/details/124546293",target:"_blank",rel:"noopener noreferrer"},u=s(`<ol><li><p>在HTML目录中新建report.html文件</p></li><li><p>执行<code>goaccess access.log -a -o ../html/report.html --real-time-html --log-format=COMBINED</code></p><p>-a</p><p>-o 将生成报告输出到指定的文件</p><p>--real-time-html 实时生成html报告</p></li><li><p>输入localhost/report.html浏览报告结果</p></li></ol><h2 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h2><h3 id="upstream" tabindex="-1"><a class="header-anchor" href="#upstream" aria-hidden="true">#</a> upstream</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>upstream <span class="token function">node</span> <span class="token punctuation">{</span>
	<span class="token comment">#根据客户端的ip进行hash，同一个客户端的请求分配到同一个服务器上，解决session的问题</span>
	ip_hash<span class="token punctuation">;</span>
	<span class="token comment"># weight越大，分配到的压力越大</span>
	<span class="token comment"># 访问超时后使用备用服务器</span>
	server <span class="token number">127.0</span>.0.1:9001 <span class="token assign-left variable">weight</span><span class="token operator">=</span><span class="token number">3</span> <span class="token assign-left variable">fail_timeout</span><span class="token operator">=</span><span class="token number">60</span><span class="token punctuation">;</span>
	server <span class="token number">127.0</span>.0.1:9002 <span class="token assign-left variable">weight</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">fail_timeout</span><span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">;</span>
	server <span class="token number">127.0</span>.0.1:9003 <span class="token assign-left variable">weight</span><span class="token operator">=</span><span class="token number">1</span> backup<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
server <span class="token punctuation">{</span>
	location / <span class="token punctuation">{</span>
		<span class="token comment">#http://node的node就是upstream配置中的node</span>
		proxy_pass http://node<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function v(m,b){const a=i("ExternalLinkIcon");return t(),l("div",null,[r,n("p",null,[n("a",d,[c("配置项"),p(a)])]),u])}const h=e(o,[["render",v],["__file","basic.html.vue"]]);export{h as default};

import{_ as s,r as t,o as e,c as p,b as a,e as o,d as c,a as l}from"./app-b4fd65c5.js";const u={},i=l(`<h2 id="什么事静态资源" tabindex="-1"><a class="header-anchor" href="#什么事静态资源" aria-hidden="true">#</a> 什么事静态资源</h2><blockquote><p>静态资源：一般是客户端发送请求到web服务器，web服务器从内存中渠道相应的文件，返回给客户端，客户端解析并渲染显示出来</p><p>动态资源：一般是客户端请求的动态资源，先将请求交给web容器，web容器连接<strong>数据库</strong>，数据库处理数据后，将内容交给web服务器，web服务器返回给客户端解析渲染处理</p></blockquote><p>站在vue项目的角度可以这样理解：</p><p><strong>静态资源就是直接存放在项目中的资源</strong>，这些资源不需要我们发送专门的请求进行获取，比如assets目录下的图片，音频，视频，CSS样式，JS文件等等</p><p>动态资源就是需要发送请求获取到的资源。</p><h2 id="为什么动态添加的src会被当做静态资源" tabindex="-1"><a class="header-anchor" href="#为什么动态添加的src会被当做静态资源" aria-hidden="true">#</a> 为什么动态添加的src会被当做静态资源</h2><p>回答这个问题之前，我们需要了解一下，浏览器是怎么能运行一个vue项目的。</p><p>我们知道浏览器打开一个网页，实际上运行的是html，css，js三种类型的文件。当我们本地启动一个vue项目的时候，实际上是先将vue项目进行打包，打包的过程就是将项目中的一个个vue文件转编译成html，css，js文件的过程，而后再在浏览器上运行的。</p><p>那动态添加的src如果我们没有使用require引入，最终会打包成什么样子呢，我带大家实验一波。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>// vue文件中动态引入一张图片
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>home<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token comment">&lt;!-- 通过v-bind引入资源的方式就称之为动态添加 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&#39;</span>../assets/logo.png&#39;<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>logo<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

//最终编译的结果(浏览器上运行的结果)
//这张图片是无法被正确打开的
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>../assets/logo.png<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>logo<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看出，<strong>动态添加的src最终会编译成一个静态的字符串地址。程序运行的时候，会按照这个地址去项目目录中引入资源。而去项目目录中引入资源的这种方式，就是将该资源当成了静态资源</strong>。所以这也就回答了我们的问题2。</p><p>看到这里估计就有小伙伴疑惑了，这个最终被编译的地址有什么问题吗？我项目中的图片就是这个地址，为什么无法引入？别急，我们继续往下看。</p><h2 id="没有进行编译-是指什么没有被编译" tabindex="-1"><a class="header-anchor" href="#没有进行编译-是指什么没有被编译" aria-hidden="true">#</a> 没有进行编译，是指什么没有被编译</h2><p>这句话其实是错的，动态引入的图片资源最终是被编译了，只是编译后无法正确引入图片资源而已，正确的答案应该是</p><p><strong>因为动态添加src被当做静态资源处理了，而被编译过后的静态路径无法正确引入资源，所以要使用require</strong></p><p>那为什么被编译过后的<strong>静态路径</strong>无法正确地引入资源呢？</p><p>要得到这个答案，我们可以先静态引入图片资源，这肯定能正确引入，vue文件也会被编译，主要看看打包编译后的静态引入的图片会被编译成什么样</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>// vue文件中静态的引入一张图片
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>home<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token comment">&lt;!-- 直接引入图片静态地址， 不再使用v-bind --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>../assets/logo.png<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>logo<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

//最终编译的结果
//这张图片是可以被正确打开的
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/img/logo.6c137b82.png<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>logo<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从最终编译后的代码来看，静态引入的资源的<strong>路径和名称都发生了改变</strong>，并且可以成功引入资源。原因是，src目录下面的所有文件都会被打包，src下面的图片等静态资源也会被打包在新的文件夹下并生成新的文件名，<strong>编译过后的静态资源地址引入的是打包后的图片地址</strong>，从而可以正确的引入资源</p><p><img src="https://mmbiz.qpic.cn/mmbiz/mshqAkialV7FR66u2vicp9oqzhopEkiaBASxLpqEPETmVedRYozICmEPCQcEujKUTH60vFEo6cooEGI0jKEibatYXA/640?wx_fmt=jpeg&amp;tp=wxpic&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt=""></p><p>可以发现，编译过后的静态地址确实是和dist下编译后图片地址是一致的</p><p>这样就可以解析动态添加的src，被编译后的静态路径无法正确引入资源的问题</p><p><strong>因为动态添加src编译后的地址，与图片资源编译过后的资源地址不一致，导致无法正确引入资源</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> 动态添加编译过后的src地址：../assets/logo.png
 静态添加编译过后的src地址：/img/logo.6c137b82.png
 
 编译过后的图片资源地址：/img/logo.6c137b82.png
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="加上require为什么能正确引入资源" tabindex="-1"><a class="header-anchor" href="#加上require为什么能正确引入资源" aria-hidden="true">#</a> 加上require为什么能正确引入资源</h2><p>无论加不加<code>require</code>，vue文件中引入的资源都会被编译</p><p><code>require</code>是node的方法，用于引入模块，JSON或本地文件</p><p>vue2是通过<code>webpack</code>打包的，使用<code>require</code>引入的资源就是一个模块，那么<code>webpack</code>就会根据配置文件中的规则进行打包。<strong>我们可以将require当成一个桥梁，使用<code>require</code>方法引入资源，该资源就会被当成模块并根据配置文件进行打包，并得到最终的打包结果</strong></p><p>Q：调用<code>require</code>方法引入一张图片之后发生了什么？</p><p>A：</p><ol><li><p>如果图片小于<code>webpack</code>配置中的资源限制大小，则会返回图片的<code>base64</code>插入到<code>require</code>方法的调用处</p></li><li><p>如果图片大于<code>webpack</code>配置中的资源限制大小，则会将这个图片编译成一个新的图片资源，<code>require</code>方法返回新的图片路径和文件名</p></li></ol><p>Q：为什么加上<code>require</code>能正确的引入资源</p><p>A：因为<code>require</code>方法拿到的文件地址，是资源文件编译过后的文件地址（即打包后dist目录下生成的文件），而不是我们在开发时资源的路径</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>// vue文件中使用require动态的引入一张图片
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>home<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token comment">&lt;!-- 使用require动态引入图片 --&gt;</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>require(&#39;../assets/logo.png&#39;)<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>logo<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

//最终编译的结果
//这张图片是可以被正确打开的
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/img/logo.6c137b82.png<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>logo<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>因为动态添加的src，编译过后的文件地址和被编译过后的资源文件地址不一致，从而无法正确引入资源。而使用require，返回的就是资源文件被编译后的文件地址，从而可以正确的引入资源</strong></p><h3 id="为什么静态引入不使用require也能返回编译过后的资源地址呢" tabindex="-1"><a class="header-anchor" href="#为什么静态引入不使用require也能返回编译过后的资源地址呢" aria-hidden="true">#</a> 为什么静态引入不使用require也能返回编译过后的资源地址呢</h3><p>因为<code>webpack</code>编译vue文件时，<strong>遇见src等属性会默认地使用require引入资源</strong>，vue-cli的官方解析是这样的</p><blockquote><p>当你在 JavaScript、CSS 或 <code>*.vue</code> 文件中使用相对路径 (必须以 <code>.</code> 开头) 引用一个静态资源时，该资源将会被包含进入 webpack 的依赖图中。在其编译过程中，所有诸如 <code>&lt;img src=&quot;...&quot;&gt;</code>、<code>background: url(...)</code> 和 CSS <code>@import</code> 的资源 URL <strong>都会被解析为一个模块依赖</strong>。</p><p>例如，<code>url(./image.png)</code> 会被翻译为 <code>require(&#39;./image.png&#39;)</code>，而：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./image.png<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将会被编译到：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">attrs</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">src</span><span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./image.png&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><h3 id="为什么动态引入的资源不能正确返回编译后的资源地址呢" tabindex="-1"><a class="header-anchor" href="#为什么动态引入的资源不能正确返回编译后的资源地址呢" aria-hidden="true">#</a> 为什么动态引入的资源不能正确返回编译后的资源地址呢</h3><p>因为动态引入资源时，src后面的属性值，实际上是一个<strong>变量</strong>，webpack会根据v-bind指令去解析src后面的属性值，并<strong>不会通过require引入资源</strong>，这就需要使用require来正确引入了</p><h2 id="public目录下面的文件不会被编译-如何使用" tabindex="-1"><a class="header-anchor" href="#public目录下面的文件不会被编译-如何使用" aria-hidden="true">#</a> public目录下面的文件不会被编译，如何使用</h2><p>官方解释</p><blockquote><p>任何放置在 <code>public</code> 文件夹的静态资源都会被简单的复制，而不经过 webpack。你需要通过<strong>绝对路径</strong>来引用它们。</p></blockquote><p>静态引入public下的资源时，因为public目录不会经过webpack编译，也就不会使用到require，需要使用绝对路径静态引用</p><p>打包时默认会将<code>public</code>文件夹里的资源打包到dist的根目录下，使用public下的资源时使用绝对路径引入如<code>/logo.png</code></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ol><li>静态资源是请求项目中的资源文件，无需发请求就可获取；动态资源需要发送请求到服务器获取资源返回给前端</li><li>使用相对路径静态引入的静态资源在编译过程中会被webpack当做一个模块依赖，编译成使用require这个相对路径来引入静态资源</li><li>动态添加的静态资源，是一个变量，使用v-bind指令解析属性值，不会使用require引入资源。需要使用require方法才能正确引入</li><li>无论静态添加还是动态添加，都会被编译，只是动态添加不使用require会编译一个错误的资源地址</li><li>public下的资源不会被编译，只是复制到打包后的根目录下，需要使用绝对路径静态引用</li></ol><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h2>`,48),r={href:"https://juejin.cn/post/7159921545144434718",target:"_blank",rel:"noopener noreferrer"};function d(k,g){const n=t("ExternalLinkIcon");return e(),p("div",null,[i,a("p",null,[a("a",r,[o("vue中动态引入图片为什么要是require， 你不知道的那些事 - 掘金 (juejin.cn)"),c(n)])])])}const m=s(u,[["render",d],["__file","dynamic-require-img.html.vue"]]);export{m as default};

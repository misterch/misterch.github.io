import{_ as p,r as e,o as c,c as o,b as n,e as s,d as i,a}from"./app-b4fd65c5.js";const u={},l=a(`<h2 id="去掉了vue构造函数" tabindex="-1"><a class="header-anchor" href="#去掉了vue构造函数" aria-hidden="true">#</a> 去掉了Vue构造函数</h2><p>在vue2中，如果遇到一个页面有多个vue应用时，会遇到一些问题</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">//这些都会影响所有的Vue应用</span>
  Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  Vue<span class="token punctuation">.</span><span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
	<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app1&#39;</span><span class="token punctuation">)</span>
	<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app2&#39;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在vue3中，去掉了<code>Vue</code>构造函数，通过<code>createApp</code>创建vue应用</p><p>vue3将vue2的Vue构造函数的静态方法放到了实例中</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
	<span class="token function">createApp</span><span class="token punctuation">(</span>根组件<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app1&#39;</span><span class="token punctuation">)</span>
	<span class="token function">createApp</span><span class="token punctuation">(</span>根组件<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app2&#39;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="应用实例的api" tabindex="-1"><a class="header-anchor" href="#应用实例的api" aria-hidden="true">#</a> 应用实例的API</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">unmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">directive</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">privide</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">runWithContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span>config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="面试题" tabindex="-1"><a class="header-anchor" href="#面试题" aria-hidden="true">#</a> 面试题</h3>`,9),d=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"面试题"),n("p",null,"Q：为什么vue3中去掉vue构造函数？"),n("p",null,"A："),n("p",null,"vue2的全局构造函数带来了住多问题"),n("ol",null,[n("li",null,"调用构造函数的静态方法会对所有vue应用生效，不利于隔离不同应用"),n("li",null,"vue2的构造函数集成了太多功能，不利于tree shaking，vue3把这些功能使用普通函数导出，能够充分利用tree shaking优化打包体积"),n("li",null,"vue2没有把组件实例和vue应用两个概念区分开，通过new Vue创建的对象，既是一个vue应用，同时又时一个特殊的vue组件。vue3中，把两个概念区别开，通过createApp创建的对象是一个vue应用，它内部提供的方法正对整个应用，而不再是一个特殊的组件")])],-1),r=a(`<h2 id="组件实例中的api" tabindex="-1"><a class="header-anchor" href="#组件实例中的api" aria-hidden="true">#</a> 组件实例中的API</h2><p>组件实例中的API是除了应用实例外的属性和方法</p><h3 id="选项式api" tabindex="-1"><a class="header-anchor" href="#选项式api" aria-hidden="true">#</a> 选项式API</h3><p>只有在组件创建之后（created）才能通过this获取到组件实例上的属性和方法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>$data
$props
$el
$options
$parent
$root
$slots
$attrs
<span class="token function">$watch</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">$emit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组合式api" tabindex="-1"><a class="header-anchor" href="#组合式api" aria-hidden="true">#</a> 组合式API</h3><h4 id="setup" tabindex="-1"><a class="header-anchor" href="#setup" aria-hidden="true">#</a> setup</h4><p>在<code>setup</code>函数中，<strong>返回的对象会暴露给模板和组件实例</strong></p><p><code>setup</code>自身不含有对组件实例的访问权，<strong>即在<code>setup</code>中访问<code>this</code>是<code>undefined</code></strong></p><p><code>setup(props,context)</code>有两个参数</p><p><strong>props</strong>：传给组件的响应式对象，解构<code>props</code>可以使用<code>toRefs()</code>和<code>toRef()</code>，否则直接解构失去响应性</p><p><strong>context</strong>：<code>setup</code>上下文对象，非响应式，可直接解构</p><p><code>context</code>对象含有的属性：<code>attrs</code>、<code>slots</code>、<code>emit</code>、<code>expose</code>等</p><h4 id="生命周期钩子" tabindex="-1"><a class="header-anchor" href="#生命周期钩子" aria-hidden="true">#</a> 生命周期钩子</h4>`,14),k={href:"https://cn.vuejs.org/api/composition-api-lifecycle.html",target:"_blank",rel:"noopener noreferrer"},v=a('<h2 id="对比数据响应式" tabindex="-1"><a class="header-anchor" href="#对比数据响应式" aria-hidden="true">#</a> 对比数据响应式</h2><p>vue2和vue3都在相同的生命周期完成数据响应式，但做法不一样</p><p>vue2使用<code>Object.defineProperty()</code>对data对象中的属性逐个遍历实现响应式</p><p>vue3使用<code>proxy</code>代理<code>data</code>对象，无需遍历每个属性套上<code>Object.defineProperty</code>，效率极高</p><h3 id="面试题-1" tabindex="-1"><a class="header-anchor" href="#面试题-1" aria-hidden="true">#</a> 面试题</h3>',5),h=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"面试"),n("p",null,"Q：对vue3数据响应式的理解"),n("p",null,"A："),n("p",null,[s("vue3不再使用"),n("code",null,"Object.defineProperty()"),s("的方式定义完成数据响应式，而是使用"),n("code",null,"Proxy")]),n("p",null,[s("除了Proxy本身效率比"),n("code",null,"Object.defineProperty()"),s("更高之外，由于不必递归遍历所有属性，而是直接得到一个proxy对象。所以在vue3中，对数据的访问是动态的，当访问某个属性的时候，再动态获取和设置，这就几大地提升了在组件初始阶段的效率")]),n("p",null,"同时，由于Proxy可以监控到成员的新增和删除，因此在vue3中新增成员、删除成员、索引访问等均可以触发重新渲染，而在vue2中难以做到")],-1);function m(g,b){const t=e("ExternalLinkIcon");return c(),o("div",null,[l,d,r,n("p",null,[n("a",k,[s("组合式 API：生命周期钩子 | Vue.js (vuejs.org)"),i(t)])]),v,h])}const x=p(u,[["render",m],["__file","vue3apiresponse.html.vue"]]);export{x as default};

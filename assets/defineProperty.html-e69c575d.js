import{_ as a,r as p,o as t,c as e,b as n,d as o,e as c,a as i}from"./app-d4c6289a.js";const l={},u=i(`<h2 id="propertyresponse实现数据拦截" tabindex="-1"><a class="header-anchor" href="#propertyresponse实现数据拦截" aria-hidden="true">#</a> propertyResponse实现数据拦截</h2><p>传递两个参数，分别是需要监听的对象和监听对象的属性</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">propertyResponse</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">let</span> val <span class="token operator">=</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span>key<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// 在获取对象属性时收集依赖</span>
      <span class="token keyword">return</span> val
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>_val<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// 在设置属性时执行收集的依赖</span>
      val <span class="token operator">=</span> _val
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当访问<code>get</code>对象某个属性时需要<code>收集依赖</code>，设置<code>set</code>某个对象属性时触发<code>收集依赖</code></p><h2 id="依赖收集" tabindex="-1"><a class="header-anchor" href="#依赖收集" aria-hidden="true">#</a> 依赖收集</h2><p>在<code>get</code>中<code>收集函数</code>，称为依赖收集，意思是<code>收集依赖该属性的函数</code></p><p><code>依赖</code>就是<code>函数中用到了对象的哪些属性</code>，那么就称为函数依赖于哪些属性</p><p>与之相对应的是<code>派发更新</code>，就是<code>将收集的函数重新执行一遍</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">propertyResponse</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">let</span> val <span class="token operator">=</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token keyword">let</span> dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span>key<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// 在获取对象属性时收集依赖</span>
      dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> val
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>_val<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// 在设置属性时执行收集的依赖</span>
      val <span class="token operator">=</span> _val
      dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 监听器，监听一个对象的所有属性和子属性</span>
<span class="token keyword">class</span> <span class="token class-name">Observer</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> obj
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">walk</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">walk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token function">propertyResponse</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">,</span>key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 依赖收集，收集的是一个个watcher，watcher中存放的副作用函数，当监听的属性变化时执行watcher</span>
<span class="token keyword">class</span> <span class="token class-name">Dep</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">addSub</span><span class="token punctuation">(</span><span class="token parameter">sub</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>sub<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 将window.target收集近集合中，target中存放的就是watcher</span>
  <span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>globalThis<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addSub</span><span class="token punctuation">(</span>globalThis<span class="token punctuation">.</span>target<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 触发收集到的所有依赖，触发的是watcher的update方法，以触发副作用函数</span>
  <span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> sub <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">)</span><span class="token punctuation">{</span>
      sub<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 观察器，window.target中存放的就是观察器</span>
<span class="token keyword">class</span> <span class="token class-name">Watcher</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span>vm<span class="token punctuation">,</span><span class="token operator">...</span>args</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>fn <span class="token operator">=</span> fn
    <span class="token keyword">this</span><span class="token punctuation">.</span>vm <span class="token operator">=</span> vm
    <span class="token keyword">this</span><span class="token punctuation">.</span>args <span class="token operator">=</span> args
    globalThis<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>args<span class="token punctuation">)</span>
    globalThis<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>
  <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>args<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;ben&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">22</span>
<span class="token punctuation">}</span>
<span class="token keyword">new</span> <span class="token class-name">Observer</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">sayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello,my name is &#39;</span> <span class="token operator">+</span> obj<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">sayAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello,my age is &#39;</span> <span class="token operator">+</span> obj<span class="token punctuation">.</span>age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>sayName<span class="token punctuation">)</span>
<span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>sayAge<span class="token punctuation">)</span>
obj<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;benjjj&#39;</span>
obj<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">22</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,10),k={href:"https://blog.csdn.net/qq_46244470/article/details/136047244",target:"_blank",rel:"noopener noreferrer"};function d(r,v){const s=p("ExternalLinkIcon");return t(),e("div",null,[u,n("p",null,[n("a",k,[o("js通过Object.defineProperty实现数据响应式_defineproperty 响应式-CSDN博客"),c(s)])])])}const b=a(l,[["render",d],["__file","defineProperty.html.vue"]]);export{b as default};

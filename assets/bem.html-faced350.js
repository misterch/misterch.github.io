import{_ as n,o as s,c as a,a as e}from"./app-d4c6289a.js";const p={},t=e(`<blockquote><p>B:block</p><p>E:element</p><p>M:modify</p></blockquote><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code>//BEM.scss
$<span class="token property">namespace</span><span class="token punctuation">:</span><span class="token string">&#39;ben&#39;</span>!default<span class="token punctuation">;</span>
//块使用-连接
$<span class="token property">block-sel</span><span class="token punctuation">:</span><span class="token string">&#39;-&#39;</span>!default<span class="token punctuation">;</span>
//块里面的元素使用__连接
$<span class="token property">ele-sel</span><span class="token punctuation">:</span><span class="token string">&#39;__&#39;</span>!default<span class="token punctuation">;</span>
//块中的修饰使用--
$<span class="token property">mod-sel</span><span class="token punctuation">:</span><span class="token string">&#39;--&#39;</span>!default<span class="token punctuation">;</span>


// ben-link
<span class="token atrule"><span class="token rule">@mixin</span> <span class="token function">b</span><span class="token punctuation">(</span>$block<span class="token punctuation">)</span></span><span class="token punctuation">{</span>
  <span class="token selector">.#</span><span class="token punctuation">{</span>$namespace+$block_sel+$block<span class="token punctuation">}</span><span class="token punctuation">{</span>
    <span class="token atrule"><span class="token rule">@content</span><span class="token punctuation">;</span></span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

// ben-link__main
// ben-link__inner
<span class="token atrule"><span class="token rule">@mixin</span> <span class="token function">e</span><span class="token punctuation">(</span>$el<span class="token punctuation">)</span></span><span class="token punctuation">{</span>
  $<span class="token property">selector</span><span class="token punctuation">:</span> &amp;<span class="token punctuation">;</span>
  //<span class="token atrule"><span class="token rule">@at-root</span><span class="token punctuation">,</span>将其包裹的css脱离父级，这样减少多编译一个父级类名
  // 不用@at-root包裹：.ben-para .ben-para__main</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
  // 使用<span class="token atrule"><span class="token rule">@at-root</span>包裹：.ben-para__main</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token atrule"><span class="token rule">@at-root</span></span><span class="token punctuation">{</span>
    <span class="token selector">#</span><span class="token punctuation">{</span>$selector+$elem-sel+$el<span class="token punctuation">}</span><span class="token punctuation">{</span>
      <span class="token atrule"><span class="token rule">@content</span><span class="token punctuation">;</span></span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

// ben-link--success
<span class="token atrule"><span class="token rule">@mixin</span> <span class="token function">m</span><span class="token punctuation">(</span>$mod<span class="token punctuation">)</span></span><span class="token punctuation">{</span>
  $<span class="token property">selector</span><span class="token punctuation">:</span>&amp;<span class="token punctuation">;</span>
  <span class="token selector">#</span><span class="token punctuation">{</span>$selector+$mod-sel+$mod<span class="token punctuation">}</span><span class="token punctuation">{</span>
    <span class="token atrule"><span class="token rule">@content</span><span class="token punctuation">;</span></span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将这个scss文件变为全局的文件，配置vite.config文件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">css</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">preprocessorOptions</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token literal-property property">scss</span><span class="token operator">:</span><span class="token punctuation">{</span>
		<span class="token comment">//在scss模块中插入以下的值，用来导入bem文件</span>
        <span class="token literal-property property">additionalData</span><span class="token operator">:</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">@import &quot;./src/style/bem.scss&quot;;</span><span class="token template-punctuation string">\`</span></span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在vue文件中使用bem规范来定义样式</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code>//ben-para
<span class="token atrule"><span class="token rule">@include</span> <span class="token function">b</span><span class="token punctuation">(</span>para<span class="token punctuation">)</span></span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  //ben-para__main
  <span class="token atrule"><span class="token rule">@include</span> <span class="token function">e</span><span class="token punctuation">(</span>main<span class="token punctuation">)</span></span><span class="token punctuation">{</span>
    <span class="token property">background</span><span class="token punctuation">:</span> #99999944<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  //ben-para__footer
  <span class="token atrule"><span class="token rule">@include</span> <span class="token function">e</span><span class="token punctuation">(</span>footer<span class="token punctuation">)</span></span><span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">justify-content</span><span class="token punctuation">:</span> space-between<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> #c09d9d<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  //ben-para--success
  <span class="token atrule"><span class="token rule">@include</span> <span class="token function">m</span><span class="token punctuation">(</span>success<span class="token punctuation">)</span></span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  //ben-para--fail
  <span class="token atrule"><span class="token rule">@include</span> <span class="token function">m</span><span class="token punctuation">(</span>fail<span class="token punctuation">)</span></span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),c=[t];function l(i,o){return s(),a("div",null,c)}const r=n(p,[["render",l],["__file","bem.html.vue"]]);export{r as default};

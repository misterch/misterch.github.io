import{_ as n,o as s,c as a,a as e}from"./app-d4c6289a.js";const p={},t=e(`<h2 id="config-scss" tabindex="-1"><a class="header-anchor" href="#config-scss" aria-hidden="true">#</a> config.scss</h2><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$namespace</span></span><span class="token punctuation">:</span> <span class="token string">&#39;tn&#39;</span> <span class="token statement keyword">!default</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$common-separator</span></span><span class="token punctuation">:</span> <span class="token string">&#39;-&#39;</span> <span class="token statement keyword">!default</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$element-separator</span></span><span class="token punctuation">:</span> <span class="token string">&#39;__&#39;</span> <span class="token statement keyword">!default</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$modifier-separator</span></span><span class="token punctuation">:</span> <span class="token string">&#39;--&#39;</span> <span class="token statement keyword">!default</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$state-prefix</span></span><span class="token punctuation">:</span> <span class="token string">&#39;is-&#39;</span> <span class="token statement keyword">!default</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="functions-scss" tabindex="-1"><a class="header-anchor" href="#functions-scss" aria-hidden="true">#</a> functions.scss</h2><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;config&#39;</span><span class="token punctuation">;</span> <span class="token comment">//导入config文件内定义的变量</span>

<span class="token comment">// BEM support Func</span>
<span class="token comment">// 块（Block）：代表一个独立的组件或页面中的一个大型部分。块可以看作是一个命名空间，用于包含相关元素和修饰符。例如，一个导航栏可以被视为一个块。</span>
<span class="token comment">// 元素（Element）：代表块的一部分，但不能独立存在。元素总是属于一个块，并且与该块紧密相关。元素由块名称和元素名称组成，中间由双下划线（__）连接。例如，一个导航栏可以包含多个链接，链接可以被视为导航栏块的元素。</span>
<span class="token comment">// 修饰符（Modifier）：代表块或元素的变体或状态。修饰符用于修改块或元素的外观或行为。修饰符由块名称或元素名称，连字符（-）和修饰符名称组成。例如，一个导航栏可以具有活动状态或浅色主题，这些状态可以通过添加修饰符类进行实现。</span>

<span class="token keyword">@function</span> <span class="token function">selectorToString</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$selector</span></span><span class="token punctuation">:</span> <span class="token function">inspect</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property"><span class="token variable">$selector</span></span><span class="token punctuation">:</span> <span class="token function">str-slice</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">,</span> 2<span class="token punctuation">,</span> -2<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">@return</span> <span class="token variable">$selector</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">@function</span> <span class="token function">containsModifier</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$selector</span></span><span class="token punctuation">:</span> <span class="token function">selectorToString</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">@if</span> str_<span class="token function">index</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">,</span> config.<span class="token variable">$modifier-separator</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">@return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else</span> <span class="token punctuation">{</span>
    <span class="token keyword">@return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">@function</span> <span class="token function">containWhenFlag</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$selector</span></span><span class="token punctuation">:</span> <span class="token function">selectorToString</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">@if</span> <span class="token function">str-index</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">,</span> <span class="token string">&#39;.&#39;</span> <span class="token operator">+</span> config.<span class="token variable">$state-prefix</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">@return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else</span> <span class="token punctuation">{</span>
    <span class="token keyword">@return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">@function</span> <span class="token function">containPseudoClass</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$selector</span></span><span class="token punctuation">:</span> <span class="token function">selectorToString</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">@if</span> <span class="token function">str-index</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">,</span> <span class="token string">&#39;:&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">@return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else</span> <span class="token punctuation">{</span>
    <span class="token keyword">@return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">@function</span> <span class="token function">hitAllSpecialNestRule</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">@return</span> <span class="token function">containsModifier</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">)</span> <span class="token operator">or</span> <span class="token function">containWhenFlag</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">)</span> <span class="token operator">or</span>
    <span class="token function">containPseudoClass</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// join var name</span>
<span class="token comment">// joinVarName((&#39;button&#39;, &#39;text-color&#39;)) =&gt; &#39;--tn-button-text-color&#39;</span>
<span class="token keyword">@function</span> <span class="token function">joinVarName</span><span class="token punctuation">(</span><span class="token variable">$list</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$name</span></span><span class="token punctuation">:</span> <span class="token string">&#39;--&#39;</span> <span class="token operator">+</span> config.<span class="token variable">$namespace</span><span class="token punctuation">;</span>
  <span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$item</span> in <span class="token variable">$list</span> </span><span class="token punctuation">{</span>
    <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$item</span> != &#39;&#39; </span><span class="token punctuation">{</span>
      <span class="token property"><span class="token variable">$name</span></span><span class="token punctuation">:</span> <span class="token variable">$name</span> <span class="token operator">+</span> <span class="token string">&#39;-&#39;</span> <span class="token operator">+</span> <span class="token variable">$item</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">@return</span> <span class="token variable">$name</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// getCssVarName(&#39;button&#39;, &#39;text-color&#39;) =&gt; &#39;--tn-button-text-color&#39;</span>
<span class="token keyword">@function</span> <span class="token function">getCssVarName</span><span class="token punctuation">(</span><span class="token variable">$args</span>...<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">@return</span> <span class="token function">joinVarName</span><span class="token punctuation">(</span><span class="token variable">$args</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// getCssVar(&#39;button&#39;, &#39;text-color&#39;) =&gt; var(--tn-button-text-color)</span>
<span class="token keyword">@function</span> <span class="token function">getCssVar</span><span class="token punctuation">(</span><span class="token variable">$args</span>...<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">@return</span> <span class="token function">var</span><span class="token punctuation">(</span>#<span class="token punctuation">{</span><span class="token function">joinVarName</span><span class="token punctuation">(</span><span class="token variable">$args</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// getCssVarWithDefault(&#39;button&#39;, &#39;text-color&#39;, &#39;red&#39;) =&gt; var(--tn-button-text-color, red)</span>
<span class="token keyword">@function</span> <span class="token function">getCssVarWithDefault</span><span class="token punctuation">(</span><span class="token variable">$args</span><span class="token punctuation">,</span> <span class="token variable">$default</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">@return</span> <span class="token function">var</span><span class="token punctuation">(</span>#<span class="token punctuation">{</span><span class="token function">joinVarName</span><span class="token punctuation">(</span><span class="token variable">$args</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token variable">#{$default}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// bem(&#39;block&#39;, &#39;element&#39;, &#39;&#39;modifier) =&gt; &#39;tn-block__element--modifier&#39;</span>
<span class="token keyword">@function</span> <span class="token function">bem</span><span class="token punctuation">(</span><span class="token variable">$block</span><span class="token punctuation">,</span> <span class="token property"><span class="token variable">$element</span></span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token property"><span class="token variable">$modifier</span></span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$name</span></span><span class="token punctuation">:</span> config.<span class="token variable">$namespace</span> <span class="token operator">+</span> config.<span class="token variable">$common-separator</span> <span class="token operator">+</span> <span class="token variable">$block</span><span class="token punctuation">;</span>

  <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$element</span> != &#39;&#39; </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$name</span></span><span class="token punctuation">:</span> <span class="token variable">$name</span> <span class="token operator">+</span> config.<span class="token variable">$element-separator</span> <span class="token operator">+</span> <span class="token variable">$element</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$modifier</span> != &#39;&#39; </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$name</span></span><span class="token punctuation">:</span> <span class="token variable">$name</span> <span class="token operator">+</span> config.<span class="token variable">$modifier-separator</span> <span class="token operator">+</span> <span class="token variable">$modifier</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">@return</span> <span class="token variable">$name</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 字符串替换</span>
<span class="token keyword">@function</span> <span class="token function">str-replace</span><span class="token punctuation">(</span><span class="token variable">$string</span><span class="token punctuation">,</span> <span class="token variable">$search</span><span class="token punctuation">,</span> <span class="token variable">$replace</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$index</span></span><span class="token punctuation">:</span> <span class="token function">str-index</span><span class="token punctuation">(</span><span class="token variable">$string</span><span class="token punctuation">,</span> <span class="token variable">$search</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$index</span> </span><span class="token punctuation">{</span>
    <span class="token keyword">@return</span> <span class="token function">str-slice</span><span class="token punctuation">(</span><span class="token variable">$string</span><span class="token punctuation">,</span> 1<span class="token punctuation">,</span> <span class="token variable">$index</span> <span class="token operator">-</span> 1<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token variable">$replace</span> <span class="token operator">+</span>
      <span class="token function">str-replace</span><span class="token punctuation">(</span>
        <span class="token function">str-slice</span><span class="token punctuation">(</span><span class="token variable">$string</span><span class="token punctuation">,</span> <span class="token variable">$index</span> <span class="token operator">+</span> <span class="token function">str-length</span><span class="token punctuation">(</span><span class="token variable">$search</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token variable">$search</span><span class="token punctuation">,</span>
        <span class="token variable">$replace</span>
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">@return</span> <span class="token variable">$string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mixins-scss" tabindex="-1"><a class="header-anchor" href="#mixins-scss" aria-hidden="true">#</a> mixins.scss</h2><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;function&#39;</span> <span class="token module-modifier keyword">as</span> *<span class="token punctuation">;</span>
<span class="token comment">// forward mixins</span>
<span class="token keyword">@forward</span> <span class="token string">&#39;config&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">@forward</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">@use</span> <span class="token string">&#39;config&#39;</span> <span class="token module-modifier keyword">as</span> *<span class="token punctuation">;</span>

<span class="token comment">// BEM</span>
<span class="token keyword">@mixin</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token variable">$block</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$B</span></span><span class="token punctuation">:</span> <span class="token variable">$namespace</span> <span class="token operator">+</span> <span class="token string">&#39;-&#39;</span> <span class="token operator">+</span> <span class="token variable">$block</span> !global<span class="token punctuation">;</span>

  <span class="token selector">.<span class="token variable">#{$B}</span> </span><span class="token punctuation">{</span>
    <span class="token keyword">@content</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">@mixin</span> <span class="token function">e</span><span class="token punctuation">(</span><span class="token variable">$element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$E</span></span><span class="token punctuation">:</span> <span class="token variable">$element</span> !global<span class="token punctuation">;</span>
  <span class="token property"><span class="token variable">$selector</span></span><span class="token punctuation">:</span> &amp;<span class="token punctuation">;</span>
  <span class="token property"><span class="token variable">$currentSelector</span></span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$unit</span> in <span class="token variable">$element</span> </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$currentSelector</span></span><span class="token punctuation">:</span> #<span class="token punctuation">{</span><span class="token variable">$currentSelector</span> <span class="token operator">+</span>
      <span class="token string">&#39;.&#39;</span> <span class="token operator">+</span>
      <span class="token variable">$B</span> <span class="token operator">+</span>
      <span class="token variable">$element-separator</span> <span class="token operator">+</span>
      <span class="token variable">$unit</span> <span class="token operator">+</span>
      <span class="token string">&#39;,&#39;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">@if</span> <span class="token function">hitAllSpecialNestRule</span><span class="token punctuation">(</span><span class="token variable">$selector</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token atrule"><span class="token rule">@at-root</span></span> <span class="token punctuation">{</span>
      <span class="token selector"><span class="token variable">#{$selector}</span> </span><span class="token punctuation">{</span>
        <span class="token selector"><span class="token variable">#{$currentSelector}</span> </span><span class="token punctuation">{</span>
          <span class="token keyword">@content</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else</span> <span class="token punctuation">{</span>
    <span class="token atrule"><span class="token rule">@at-root</span></span> <span class="token punctuation">{</span>
      <span class="token selector"><span class="token variable">#{$currentSelector}</span> </span><span class="token punctuation">{</span>
        <span class="token keyword">@content</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">@mixin</span> <span class="token function">m</span><span class="token punctuation">(</span><span class="token variable">$modifier</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$selector</span></span><span class="token punctuation">:</span> &amp;<span class="token punctuation">;</span>
  <span class="token property"><span class="token variable">$currentSelector</span></span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$unit</span> in <span class="token variable">$modifier</span> </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$currentSelector</span></span><span class="token punctuation">:</span> #<span class="token punctuation">{</span><span class="token variable">$currentSelector</span> <span class="token operator">+</span>
      <span class="token variable">$selector</span> <span class="token operator">+</span>
      <span class="token variable">$modifier-separator</span> <span class="token operator">+</span>
      <span class="token variable">$unit</span> <span class="token operator">+</span>
      <span class="token string">&#39;,&#39;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token atrule"><span class="token rule">@at-root</span></span> <span class="token punctuation">{</span>
    <span class="token selector"><span class="token variable">#{$currentSelector}</span> </span><span class="token punctuation">{</span>
      <span class="token keyword">@content</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">@mixin</span> <span class="token function">configurable-m</span><span class="token punctuation">(</span><span class="token variable">$modifier</span><span class="token punctuation">,</span> <span class="token property"><span class="token variable">$E-flag</span></span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$selector</span></span><span class="token punctuation">:</span> &amp;<span class="token punctuation">;</span>
  <span class="token property"><span class="token variable">$interpolation</span></span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>

  <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$E-flag</span> </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$interpolation</span></span><span class="token punctuation">:</span> <span class="token variable">$element-separator</span> <span class="token operator">+</span> <span class="token variable">$E-flag</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token atrule"><span class="token rule">@at-root</span></span> <span class="token punctuation">{</span>
    <span class="token selector"><span class="token variable">#{$selector}</span> </span><span class="token punctuation">{</span>
      .#<span class="token punctuation">{</span><span class="token variable">$B</span> <span class="token operator">+</span> <span class="token variable">$interpolation</span> <span class="token operator">+</span> <span class="token variable">$modifier-separator</span> <span class="token operator">+</span> <span class="token variable">$modifier</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
        <span class="token keyword">@content</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">@mixin</span> <span class="token function">spec-selector</span><span class="token punctuation">(</span>
  <span class="token property"><span class="token variable">$specSelector</span></span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
  <span class="token property"><span class="token variable">$element</span></span><span class="token punctuation">:</span> <span class="token variable">$E</span><span class="token punctuation">,</span>
  <span class="token property"><span class="token variable">$modifier</span></span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property"><span class="token variable">$block</span></span><span class="token punctuation">:</span> <span class="token variable">$B</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$modifierCombo</span></span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token property"><span class="token variable">$elementCombo</span></span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>

  <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$modifier</span> </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$modifierCombo</span></span><span class="token punctuation">:</span> <span class="token variable">$modifier-separator</span> <span class="token operator">+</span> <span class="token variable">$modifier</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$element</span> </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$elementCombo</span></span><span class="token punctuation">:</span> <span class="token variable">$element-separator</span> <span class="token operator">+</span> <span class="token variable">$element</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token atrule"><span class="token rule">@at-root</span></span> <span class="token punctuation">{</span>
    #<span class="token punctuation">{</span>&amp;<span class="token punctuation">}</span><span class="token variable">#{$specSelector}</span>.#<span class="token punctuation">{</span><span class="token variable">$block</span> <span class="token operator">+</span> <span class="token variable">$elementCombo</span> <span class="token operator">+</span> <span class="token variable">$modifierCombo</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
      <span class="token keyword">@content</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">@mixin</span> <span class="token function">meb</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$modifier</span></span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token property"><span class="token variable">$element</span></span><span class="token punctuation">:</span> <span class="token variable">$E</span><span class="token punctuation">,</span> <span class="token property"><span class="token variable">$block</span></span><span class="token punctuation">:</span> <span class="token variable">$B</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$selector</span></span><span class="token punctuation">:</span> &amp;<span class="token punctuation">;</span>
  <span class="token property"><span class="token variable">$modifierCombo</span></span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>

  <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$modifier</span> </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$modifierCombo</span></span><span class="token punctuation">:</span> <span class="token variable">$modifier-separator</span> <span class="token operator">+</span> <span class="token variable">$modifier</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token atrule"><span class="token rule">@at-root</span></span> <span class="token punctuation">{</span>
    <span class="token selector"><span class="token variable">#{$selector}</span> </span><span class="token punctuation">{</span>
      .#<span class="token punctuation">{</span><span class="token variable">$block</span> <span class="token operator">+</span> <span class="token variable">$element-separator</span> <span class="token operator">+</span> <span class="token variable">$element</span> <span class="token operator">+</span> <span class="token variable">$modifierCombo</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
        <span class="token keyword">@content</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">@mixin</span> <span class="token function">when</span><span class="token punctuation">(</span><span class="token variable">$state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token atrule"><span class="token rule">@at-root</span></span> <span class="token punctuation">{</span>
    &amp;.#<span class="token punctuation">{</span><span class="token variable">$state-prefix</span> <span class="token operator">+</span> <span class="token variable">$state</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
      <span class="token keyword">@content</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">@mixin</span> <span class="token function">pseudo</span><span class="token punctuation">(</span><span class="token variable">$pseudo</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token atrule"><span class="token rule">@at-root</span> #<span class="token punctuation">{</span>&amp;<span class="token punctuation">}</span><span class="token selector">#</span><span class="token punctuation">{</span><span class="token string">&#39;:#{$pseudo}&#39;</span><span class="token punctuation">}</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">@content</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[t];function l(c,i){return s(),a("div",null,o)}const r=n(p,[["render",l],["__file","bem-advanced.html.vue"]]);export{r as default};

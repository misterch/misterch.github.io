import{_ as c,r as o,o as l,c as i,d as a,w as t,a as u,b as n,e as s}from"./app-b4fd65c5.js";const r={},k=u(`<h2 id="数组去重的几种方法" tabindex="-1"><a class="header-anchor" href="#数组去重的几种方法" aria-hidden="true">#</a> 数组去重的几种方法</h2><h3 id="利用-set-去重" tabindex="-1"><a class="header-anchor" href="#利用-set-去重" aria-hidden="true">#</a> 利用 Set 去重</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 
  1.返回值是一个去重的数组 
  2.注意 Number 和 String 类型
*/</span>
<span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;one&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;two&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;three&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;one&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;three&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;two&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;four&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> el <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;one&#39;,&#39;two&#39;,&#39;three&#39;,&#39;four&#39;];</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="利用-indexof-和-lastindexof-去重" tabindex="-1"><a class="header-anchor" href="#利用-indexof-和-lastindexof-去重" aria-hidden="true">#</a> 利用 indexOf() 和 lastIndexOf() 去重</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/*
  indexOf：从左往右查找目标字符串，是否包含 Value;
           如果包含，返回第一次出现的索引;
           如果不包含，返回 -1
  indexOf 和 lastIndexOf() 方法一样
  步骤：
  1. 先声明一个空数组，用来存放去重后的数据
  2. 遍历数组，判断每一项
*/</span>
<span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;one&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;two&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;three&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;one&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;three&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;two&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;four&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> indexArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>indexArr<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token operator">===</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      indexArr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>indexArr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;one&#39;,&#39;two&#39;,&#39;three&#39;,&#39;four&#39;];</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="利用-filter去重" tabindex="-1"><a class="header-anchor" href="#利用-filter去重" aria-hidden="true">#</a> 利用 filter去重</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;one&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;two&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;three&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;one&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;three&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;two&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;four&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> el <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span>index</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span>arr<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token operator">===</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;one&#39;,&#39;two&#39;,&#39;three&#39;,&#39;four&#39;];</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="利用对象特性去重" tabindex="-1"><a class="header-anchor" href="#利用对象特性去重" aria-hidden="true">#</a> 利用对象特性去重</h3><p>使用<code>Object.keys</code></p>`,9),d=n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},`/*
  1.声明一个对象 obj,利用对象特性
  2.循环每一项复印，使用 keys(values) 方法取出 key 值
*/`),s(`
`),n("span",{class:"token keyword"},"var"),s(" arr "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},"'one'"),n("span",{class:"token punctuation"},","),n("span",{class:"token string"},"'two'"),n("span",{class:"token punctuation"},","),n("span",{class:"token string"},"'three'"),n("span",{class:"token punctuation"},","),n("span",{class:"token string"},"'one'"),n("span",{class:"token punctuation"},","),n("span",{class:"token string"},"'three'"),n("span",{class:"token punctuation"},","),n("span",{class:"token string"},"'two'"),n("span",{class:"token punctuation"},","),n("span",{class:"token string"},"'four'"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token keyword"},"var"),s(" obj "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token keyword"},"for"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"var"),s(" i"),n("span",{class:"token operator"},"="),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s("i"),n("span",{class:"token operator"},"<"),s("arr"),n("span",{class:"token punctuation"},"."),s("length"),n("span",{class:"token punctuation"},";"),s("i"),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),s(`
    obj`),n("span",{class:"token punctuation"},"["),s("arr"),n("span",{class:"token punctuation"},"["),s("i"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},"="),s(" arr"),n("span",{class:"token punctuation"},"["),s("i"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token keyword"},"var"),s(" el "),n("span",{class:"token operator"},"="),s("  Object"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"keys"),n("span",{class:"token punctuation"},"("),s("obj"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),s("el"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// ['one','two','three','four'];"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),v=n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},`/* 
   1. 和上面方法一致，只不过是使用了 forEach
*/`),s(`
`),n("span",{class:"token keyword"},"var"),s(" arr "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},"'one'"),n("span",{class:"token punctuation"},","),n("span",{class:"token string"},"'two'"),n("span",{class:"token punctuation"},","),n("span",{class:"token string"},"'three'"),n("span",{class:"token punctuation"},","),n("span",{class:"token string"},"'one'"),n("span",{class:"token punctuation"},","),n("span",{class:"token string"},"'three'"),n("span",{class:"token punctuation"},","),n("span",{class:"token string"},"'two'"),n("span",{class:"token punctuation"},","),n("span",{class:"token string"},"'four'"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token keyword"},"var"),s(" obj "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
arr`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"forEach"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"function"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("ele"),n("span",{class:"token punctuation"},","),s("index"),n("span",{class:"token punctuation"},","),s("arr")]),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),s(`
    obj`),n("span",{class:"token punctuation"},"["),s("arr"),n("span",{class:"token punctuation"},"["),s("index"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},"="),s(" arr"),n("span",{class:"token punctuation"},"["),s("index"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token keyword"},"var"),s(" el "),n("span",{class:"token operator"},"="),s("  Object"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"keys"),n("span",{class:"token punctuation"},"("),s("obj"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),s("el"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// ['one','two','three','four'];"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1);function m(b,g){const e=o("CodeGroupItem"),p=o("CodeGroup");return l(),i("div",null,[k,a(p,null,{default:t(()=>[a(e,{title:"for循环"},{default:t(()=>[d]),_:1}),a(e,{title:"forEach循环"},{default:t(()=>[v]),_:1})]),_:1})])}const f=c(r,[["render",m],["__file","duplicate.html.vue"]]);export{f as default};

import{_ as e,o as p,c as t,a,b as n,d as s}from"./app-d4c6289a.js";const o={},l=a(`<h2 id="typeof" tabindex="-1"><a class="header-anchor" href="#typeof" aria-hidden="true">#</a> typeof</h2><p>在TS中，书写的位置在类型约束的位置上，表示获取某个数据的类型</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> users <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    name<span class="token operator">:</span><span class="token string">&#39;ben&#39;</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span><span class="token number">22</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span><span class="token string">&#39;kelly&#39;</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span><span class="token number">12</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token keyword">type</span> <span class="token class-name">Users</span> <span class="token operator">=</span> <span class="token keyword">typeof</span> users
<span class="token comment">//即</span>
<span class="token keyword">type</span> <span class="token class-name">User</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span><span class="token builtin">string</span>
  age<span class="token operator">:</span><span class="token builtin">number</span>
<span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),c=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,[s("当"),n("strong",null,"typeof作用于类"),s("的时候，得到的类型，是该"),n("strong",null,"类的构造函数")])],-1),i=a(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">User</span><span class="token punctuation">{</span>
  username<span class="token operator">:</span><span class="token builtin">string</span>
  gender<span class="token operator">:</span><span class="token string">&#39;male&#39;</span><span class="token operator">|</span><span class="token string">&#39;female&#39;</span>
  age<span class="token operator">:</span><span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token comment">//需要传一个类作为参数给函数，由函数创建一个实例</span>
<span class="token keyword">function</span> <span class="token function">createUser</span><span class="token punctuation">(</span>cls<span class="token operator">:</span> <span class="token keyword">typeof</span> User<span class="token punctuation">)</span><span class="token operator">:</span>User<span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">cls</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="keyof" tabindex="-1"><a class="header-anchor" href="#keyof" aria-hidden="true">#</a> keyof</h2><p>作用于类、接口、类型别名。用于获取其他类型中的所有<strong>成员名组成的联合类型</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span><span class="token builtin">string</span>
  age<span class="token operator">:</span><span class="token builtin">number</span>
  gender<span class="token operator">:</span><span class="token string">&#39;male&#39;</span><span class="token operator">|</span><span class="token string">&#39;string&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">unionType</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> User
<span class="token comment">//即</span>
<span class="token keyword">type</span> <span class="token class-name">unionType</span> <span class="token operator">=</span> <span class="token string">&#39;name&#39;</span><span class="token operator">|</span><span class="token string">&#39;age&#39;</span><span class="token operator">|</span><span class="token string">&#39;gender&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="应用" tabindex="-1"><a class="header-anchor" href="#应用" aria-hidden="true">#</a> 应用</h3><p>限制是某个类型所有字段当中的一个</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span><span class="token builtin">string</span>
  age<span class="token operator">:</span><span class="token builtin">number</span>
  gender<span class="token operator">:</span><span class="token string">&#39;male&#39;</span><span class="token operator">|</span><span class="token string">&#39;string&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">getUserProp</span><span class="token punctuation">(</span>obj<span class="token operator">:</span>User<span class="token punctuation">,</span>prop<span class="token operator">:</span><span class="token keyword">keyof</span> User<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> obj<span class="token punctuation">[</span>prop<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">//keyof User</span>
<span class="token comment">//相当于 &#39;name&#39;|&#39;age&#39;|&#39;gender&#39;</span>

<span class="token keyword">const</span> ben<span class="token operator">:</span>User<span class="token operator">=</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span><span class="token string">&#39;ben&#39;</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span><span class="token number">12</span><span class="token punctuation">,</span>
  gender<span class="token operator">:</span><span class="token string">&#39;male&#39;</span>
<span class="token punctuation">}</span>
<span class="token comment">//第二个参数在TS的检查下，只能使用User类型中的字段</span>
<span class="token function">getUserProp</span><span class="token punctuation">(</span>ben<span class="token punctuation">,</span><span class="token string">&#39;age&#39;</span><span class="token punctuation">)</span>


<span class="token comment">//通用方法</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">getProp</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span><span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>obj<span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">,</span>prop<span class="token operator">:</span><span class="token constant">K</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> obj<span class="token punctuation">[</span>prop<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="in" tabindex="-1"><a class="header-anchor" href="#in" aria-hidden="true">#</a> in</h2><p>通常和<code>keyof</code>联用，限制某个索引类型的取值范围</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span><span class="token builtin">string</span>
  gender<span class="token operator">:</span> <span class="token string">&#39;male&#39;</span><span class="token operator">|</span><span class="token string">&#39;string&#39;</span>
  age<span class="token operator">:</span><span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token comment">//将Person类型的所有属性类型变成string类型产生新的PersonString类型</span>
<span class="token keyword">type</span> <span class="token class-name">PersonString</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>key <span class="token keyword">in</span> <span class="token keyword">keyof</span> Person<span class="token punctuation">]</span><span class="token operator">:</span><span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">//可以保持原来类型的属性类型，但现在要求所有属性是只读的</span>
<span class="token keyword">type</span> <span class="token class-name">CopyPerson</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//Person[key]=&gt;Person[&#39;age&#39;]=number</span>
  <span class="token keyword">readonly</span> <span class="token punctuation">[</span>key <span class="token keyword">in</span> <span class="token keyword">keyof</span> Person<span class="token punctuation">]</span><span class="token operator">:</span>Person<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="应用-1" tabindex="-1"><a class="header-anchor" href="#应用-1" aria-hidden="true">#</a> 应用</h3><ol><li>将类型的属性修改为只读</li></ol><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span><span class="token builtin">string</span>
  gender<span class="token operator">:</span> <span class="token string">&#39;male&#39;</span><span class="token operator">|</span><span class="token string">&#39;string&#39;</span>
  age<span class="token operator">:</span><span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">PersonReadonly</span> <span class="token punctuation">{</span>
	<span class="token keyword">readonly</span> <span class="token punctuation">[</span>key <span class="token keyword">in</span> <span class="token keyword">keyof</span> Person<span class="token punctuation">]</span><span class="token operator">:</span> Person<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">//由此可以得出一个通用的只读方法</span>
<span class="token keyword">type</span> <span class="token class-name">ReadOnly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> <span class="token punctuation">[</span>key <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>将类型的属性修改为可选</li></ol><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span><span class="token builtin">string</span>
  gender<span class="token operator">:</span> <span class="token string">&#39;male&#39;</span><span class="token operator">|</span><span class="token string">&#39;string&#39;</span>
  age<span class="token operator">:</span><span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">PersonPartial</span> <span class="token punctuation">{</span>
	<span class="token punctuation">[</span>key <span class="token keyword">in</span> <span class="token keyword">keyof</span> Person<span class="token punctuation">]</span><span class="token operator">?</span><span class="token operator">:</span> Person<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">//由此可以得出一个通用的可选方法</span>
<span class="token keyword">type</span> <span class="token class-name">Partial<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
	<span class="token punctuation">[</span>key <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),r=[l,c,i];function d(u,k){return p(),t("div",null,r)}const m=e(o,[["render",d],["__file","keywords.html.vue"]]);export{m as default};

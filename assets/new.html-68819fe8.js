import{_ as n,o as s,c as a,a as e}from"./app-b4fd65c5.js";const t={},o=e(`<p>new操作符用于创建一个给定构造函数的对象实例</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">.</span>age</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
	<span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
<span class="token punctuation">}</span>
<span class="token keyword">const</span> ben <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&#39;ben&#39;</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span>
ben <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;ben&#39;</span><span class="token punctuation">,</span>
	<span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">20</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="new关键字进行的操作" tabindex="-1"><a class="header-anchor" href="#new关键字进行的操作" aria-hidden="true">#</a> new关键字进行的操作</h2><ol><li>创建一个空对象 <code>obj</code></li><li>将 <code>obj</code>的 <code>__proto__</code>指向构造函数的原型对象，即 <code>obj.proto__=constrc.prototype</code></li><li>将构造函数内部的 <code>this</code>绑定到新建的对象 <code>obj</code>,相当于 <code>obj.constrc()</code></li><li>如果构造函数没有返回引用类型的值，则返回新建的对象（默认会添加 <code>return this</code>）；否则返回引用类型的值</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">myNew</span><span class="token punctuation">(</span><span class="token parameter">constrc<span class="token punctuation">,</span><span class="token operator">...</span>args</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">//Object.create()可以根据提供的对象的【原型对象】创建新对象，修改目标对象的隐式原型，可以达到原型式继承</span>
	<span class="token comment">//obj.__proto__ = constrc.prototype</span>
	obj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>constrc<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
	<span class="token comment">//将构造函数的this绑定到新对象</span>
	<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">constrc</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span>args<span class="token punctuation">)</span>
	<span class="token comment">//构造函数返回的是对象，则使用构造函数执行的结果，否则返回新创建的对象</span>
	<span class="token keyword">return</span> result <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token operator">?</span>result<span class="token operator">:</span>obj
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),p=[o];function c(l,i){return s(),a("div",null,p)}const u=n(t,[["render",c],["__file","new.html.vue"]]);export{u as default};

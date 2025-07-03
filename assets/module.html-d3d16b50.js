import{_ as a,r as e,o as t,c as o,b as n,d as p,e as c,a as i}from"./app-7c24af46.js";const l={},u=i(`<h2 id="common-js" tabindex="-1"><a class="header-anchor" href="#common-js" aria-hidden="true">#</a> Common.js</h2><h3 id="基本数据类型" tabindex="-1"><a class="header-anchor" href="#基本数据类型" aria-hidden="true">#</a> 基本数据类型</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// a.js</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span>count<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./b.js&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./b.js&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;a---load&#39;</span><span class="token punctuation">,</span>count<span class="token punctuation">)</span>
count<span class="token operator">=</span><span class="token number">22</span>
b<span class="token punctuation">.</span>num2 <span class="token operator">=</span> <span class="token number">33</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;a---modifiy-count,a的修改是否会影响b导出count的值&#39;</span><span class="token punctuation">,</span>count<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;在b对象新增属性&#39;</span><span class="token punctuation">,</span>b<span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;观察b文件修改count是否影响a导入count的值&#39;</span><span class="token punctuation">,</span>count<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;b文件修改输出--modify&#39;</span><span class="token punctuation">,</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">1500</span><span class="token punctuation">)</span>

<span class="token comment">// b.js</span>
<span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>num<span class="token operator">=</span><span class="token number">11</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  count<span class="token operator">++</span>
  module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>num <span class="token operator">=</span> num
  module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>count <span class="token operator">=</span> count
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;b---modify-count&#39;</span><span class="token punctuation">,</span>count<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  count
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="结果" tabindex="-1"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>a---load 0
a---modifiy-count,a的修改是否会影响b导出count的值 22
输出对象--load { count: 0, num2: 33 }
b---modify-count 1
观察b修改count是否影响a导入count的值 22
输出对象--modify { count: 1, num2: 33, num: 11 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于基本数据类型，无论在导出位置修改导出值还是在导入位置修改导入值，都不会影响到两个文件中导出导入值的变化</p><h4 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h4><p>在Common.js中，导出的是<code>module.exports</code>，导入的是变量赋值。当<code>module.exports</code>的值是字符串、数字等原始数据类型时，赋值是<strong>值拷贝</strong>，所以无论在哪里修改都<strong>不会影响</strong>到其他地方导入该值的改变</p><h3 id="引用数据类型" tabindex="-1"><a class="header-anchor" href="#引用数据类型" aria-hidden="true">#</a> 引用数据类型</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// a.js</span>
<span class="token keyword">const</span> objM <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./b.js&#39;</span><span class="token punctuation">)</span>
<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./c.js&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span>obj<span class="token punctuation">,</span>changeName<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./b.js&#39;</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;a模块--obj&#39;</span><span class="token punctuation">,</span>obj<span class="token punctuation">)</span>
<span class="token function">changeName</span><span class="token punctuation">(</span><span class="token string">&#39;ken&#39;</span><span class="token punctuation">)</span>
obj<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">222</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;a模块-obj-update&#39;</span><span class="token punctuation">,</span>obj<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;a模块-objM-update&#39;</span><span class="token punctuation">,</span>objM<span class="token punctuation">.</span>obj<span class="token punctuation">)</span>

<span class="token comment">// b.js</span>
<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;ben&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">20</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">changeName</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  obj<span class="token punctuation">.</span>name <span class="token operator">=</span> name
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;changeName&#39;</span><span class="token punctuation">,</span>obj<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> constant <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  obj<span class="token punctuation">,</span>
  changeName
<span class="token punctuation">}</span>

<span class="token comment">// c.js</span>
<span class="token keyword">const</span> objM <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./b.js&#39;</span><span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;c---module&#39;</span><span class="token punctuation">,</span>objM<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;c---module---基本数据类型&#39;</span><span class="token punctuation">,</span>objM<span class="token punctuation">.</span>constant<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="结果-1" tabindex="-1"><a class="header-anchor" href="#结果-1" aria-hidden="true">#</a> 结果</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>a模块--obj { name: &#39;ben&#39;, age: 20 }
changeName { name: &#39;ken&#39;, age: 20 }
a模块-obj-update { name: &#39;ken&#39;, age: 222 }
a模块-objM-update { name: &#39;ken&#39;, age: 222 }
c---module {
  obj: { name: &#39;ken&#39;, age: 222 },
  changeName: [Function: changeName],
  constant: &#39;hello&#39;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="结论-1" tabindex="-1"><a class="header-anchor" href="#结论-1" aria-hidden="true">#</a> 结论</h4><p>在Common.js中，如果导出的引用数据类型，导入的是该数据的<strong>引用</strong>，无论在该对象所在的模块还是在导入该对象的模块修改引用数据类型中的数据，都会对别处<strong>导入该对象的模块产生影响</strong></p><h2 id="esm" tabindex="-1"><a class="header-anchor" href="#esm" aria-hidden="true">#</a> ESM</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//a.js</span>
<span class="token keyword">import</span> bModule<span class="token punctuation">,</span><span class="token punctuation">{</span>b<span class="token punctuation">,</span>modify<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./b.js&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./c.js&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;a模块--before&#39;</span><span class="token punctuation">,</span>bModule<span class="token punctuation">.</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span>
<span class="token function">modify</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span><span class="token number">22</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;a模块--after&#39;</span><span class="token punctuation">,</span>bModule<span class="token punctuation">.</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  bModule<span class="token punctuation">.</span>a<span class="token operator">=</span><span class="token string">&#39;a模块修改了b导出的对象的属性a&#39;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;a模块--修改bModule对象的a属性&#39;</span><span class="token punctuation">,</span>bModule<span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">500</span><span class="token punctuation">)</span>


<span class="token comment">//b.js</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span>
a<span class="token operator">=</span><span class="token number">111</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  a
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">modify</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value1<span class="token punctuation">,</span>value2</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  a<span class="token operator">=</span>value1
  b<span class="token operator">=</span>value2
<span class="token punctuation">}</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token function">modify</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span><span class="token number">22</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">)</span>

<span class="token comment">//c.js</span>
<span class="token keyword">import</span> bModule<span class="token punctuation">,</span><span class="token punctuation">{</span>b<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./b.js&#39;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;c模块---bModule&#39;</span><span class="token punctuation">,</span>bModule<span class="token punctuation">,</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">2000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="结果-2" tabindex="-1"><a class="header-anchor" href="#结果-2" aria-hidden="true">#</a> 结果</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>a模块--before 111 2
a模块--after 111 22
a模块--修改bModule对象的a属性 a模块修改了b导出的对象的属性a
c模块---bModule a模块修改了b导出的对象的属性a 22
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="结论-2" tabindex="-1"><a class="header-anchor" href="#结论-2" aria-hidden="true">#</a> 结论</h3><ol><li><code>export</code>或<code>export default</code>的任何类型的数据，<code>import</code>后都<strong>不可重新赋值</strong>，数据是<code>只读</code>的</li><li><code>export default</code>导出的是一个<strong>对象的引用</strong>，<strong>任何模块可修改这个对象</strong>，<strong>导入该值使用时也会发生改变</strong></li><li><code>export</code>基本数据类型，因为数据是只读的，只能通过导出该数据的模块中进行修改，可通过导出一个修改该数据的方法来修改基本数据类型。与common.js不同，修改后其他模块导入该数据也会改变</li><li>无论基本数据类型还是引用数据类型，导出的值发生改变，其他模块导入该值使用时也会发生改变</li></ol><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>Common.js导出的是<code>module.exports</code>对象，Common.js的导入就是变量赋值，当<code>module.exports</code>的值是字符串、数字等原始数据类型时，赋值是值拷贝，所以才会产生修改导出的值不会导致</p><p>Common.js导出的值是对象时，导入的是对象的引用，无论哪个模块修改该对象，使用该对象的模块的数据也会发生改变</p><p><code>export</code>导出的所有数据都是<strong>只读</strong>的</p><p>修改<code>export</code>导出的数据，如基本数据类型，可以通过导出一个方法来修改</p><p><code>export default</code>导出的是一个<strong>对象的引用</strong>，可以对引用对象进行修改，但不能重新赋值</p><p><code>export</code>导出的数据发生改变（无论基本数据类型还是引用数据类型），其他模块<code>import</code>数据使用时也会发生改变</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,28),r={href:"https://juejin.cn/post/6844904052841512973?from=search-suggest",target:"_blank",rel:"noopener noreferrer"};function d(k,m){const s=e("ExternalLinkIcon");return t(),o("div",null,[u,n("p",null,[n("a",r,[p("commonjs的导出是值拷贝吗?近期学习nodejs时，我发现不少网上比较commonjs和esmodule不同之处的 - 掘金"),c(s)])])])}const b=a(l,[["render",d],["__file","module.html.vue"]]);export{b as default};

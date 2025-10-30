import{_ as n,o as s,c as a,a as t}from"./app-d4c6289a.js";const e={},p=t(`<h2 id="递归将链表逆置" tabindex="-1"><a class="header-anchor" href="#递归将链表逆置" aria-hidden="true">#</a> 递归将链表逆置</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Node</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> val
  <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> n1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> n2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> n3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> n4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> n5 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>

n1<span class="token punctuation">.</span>next <span class="token operator">=</span> n2
n2<span class="token punctuation">.</span>next <span class="token operator">=</span> n3
n3<span class="token punctuation">.</span>next <span class="token operator">=</span> n4
n4<span class="token punctuation">.</span>next <span class="token operator">=</span> n5

<span class="token keyword">function</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;结束&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">// 如上面的链表，n4.next.next == n5.next == null</span>
    <span class="token comment">// 这样就能知道n4和n5，就可以将n5的next指向n4，达到逆置</span>
    root<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">=</span> root
    <span class="token comment">//root是n4，root.next是n5</span>
    <span class="token keyword">return</span> root<span class="token punctuation">.</span>next
  <span class="token punctuation">}</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;进来&#39;</span><span class="token punctuation">,</span>root<span class="token punctuation">)</span>
  <span class="token comment">//达到结束条件，返回最后一个值给r</span>
  <span class="token keyword">const</span> r <span class="token operator">=</span> <span class="token function">reverse</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>next<span class="token punctuation">)</span>
  <span class="token comment">//修改指向，例如n3.next.next == n4.next =n3</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">修改指向，将n</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>root<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.next.next===n</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>root<span class="token punctuation">.</span>value<span class="token operator">+</span><span class="token number">1</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.next=n</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>root<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
  root<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">=</span> root
  root<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token comment">// 逐级修改指向并返回最终的r值</span>
  <span class="token keyword">return</span> r
<span class="token punctuation">}</span>

<span class="token comment">// 进来 n1</span>
<span class="token comment">// 进来 n2</span>
<span class="token comment">// 进来 n3</span>
<span class="token comment">// 结束  返回逆置后的终点的值</span>
<span class="token comment">// 修改指向，将n3.next.next===n4.next=n3</span>
<span class="token comment">// 修改指向，将n2.next.next===n3.next=n2</span>
<span class="token comment">// 修改指向，将n1.next.next===n2.next=n1</span>
<span class="token comment">// 最后返回 n5</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><div class="highlight-line"> </div><br><div class="highlight-line"> </div><br><br><br><div class="highlight-line"> </div><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[p];function c(l,i){return s(),a("div",null,o)}const u=n(e,[["render",c],["__file","link-reverse.html.vue"]]);export{u as default};

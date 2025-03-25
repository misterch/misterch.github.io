import{_ as m,r as a,o as v,c as x,b as p,d as n,w as s,e as t,a as c}from"./app-b4fd65c5.js";const h={},b=p("h2",{id:"选择排序",tabindex:"-1"},[p("a",{class:"header-anchor",href:"#选择排序","aria-hidden":"true"},"#"),t(" 选择排序")],-1),_=p("p",null,"嵌套2层循环，时间复杂度：",-1),f={class:"katex-display"},g={class:"katex"},y={class:"katex-mathml"},I=c('<span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.8641079999999999em;"></span><span class="strut bottom" style="height:1.1141079999999999em;vertical-align:-0.25em;"></span><span class="base displaystyle textstyle uncramped"><span class="mord mathit" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord"><span class="mord mathit">n</span><span class="vlist"><span style="top:-0.413em;margin-right:0.05em;"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span><span class="reset-textstyle scriptstyle uncramped"><span class="mord mathrm">2</span></span></span><span class="baseline-fix"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span>​</span></span></span><span class="mclose">)</span></span></span>',1),w=c(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span>b</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>a<span class="token operator">&gt;</span>b<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">exchange</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span>a<span class="token punctuation">,</span>b</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token punctuation">[</span>arr<span class="token punctuation">[</span>a<span class="token punctuation">]</span><span class="token punctuation">,</span>arr<span class="token punctuation">[</span>b<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>arr<span class="token punctuation">[</span>b<span class="token punctuation">]</span><span class="token punctuation">,</span>arr<span class="token punctuation">[</span>a<span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  	<span class="token keyword">let</span> maxIndex <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> j<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>j<span class="token operator">&lt;</span>arr<span class="token punctuation">.</span>length<span class="token operator">-</span>i<span class="token punctuation">;</span>j<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">compare</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span>arr<span class="token punctuation">[</span>maxIndex<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        maxIndex <span class="token operator">=</span> j
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">exchange</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span>maxIndex<span class="token punctuation">,</span>arr<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token operator">-</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><br><div class="highlight-line"> </div><br><br><div class="highlight-line"> </div><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>i是循环的次数，j是循环数组下标</p><p>每次循环下标，可以得到最大值的下标，第i次循环结束后，就将本轮的最大值右移到指定的位置</p><p>数组：[7,4,1,9,3,0,8,2,5,6]</p><p><strong>第一次循环：i=0，maxIndex=0</strong></p><p>循环数组下标，逐个对比</p><p>arr[0]和arr[maxIndex]对比结果false</p><p>arr[1]和arr[maxIndex]对比结果true，maxIndex = 1</p><p>arr[2]和arr[maxIndex]对比结果false</p><p>arr[3]和arr[maxIndex]对比结果true,maxIndex = 3</p><p>......</p><p>i=0，这轮对比结束，得出maxIndex=3</p><p>移动最大值的位置，<code>arr.length-1</code>是数组最后一个的下标位置 [7,4,1,3,0,8,2,5,6,9]</p><p><strong>第二次循环：i=1，maxIndex=0</strong></p><p>上次排序后的结果 [7,4,1,3,0,8,2,5,6,9]</p><p>循环数组下标，逐个对比</p><p>因为<code>arr.length-i</code>位已经排好了，要忽略不能参与排序</p><p>arr[0]和arr[maxIndex]对比结果false</p><p>arr[1]和arr[maxIndex]对比结果true，maxIndex = 1</p><p>arr[2]和arr[maxIndex]对比结果false</p><p>arr[3]和arr[maxIndex]对比结果true,maxIndex = 3</p><p>......</p><p>直到<code>arr.length-i</code>停止</p><p>i=1，这轮对比结束，得出maxIndex=5</p><p>移动最大值的位置，9已经排好了，应该排在9的前一个位置即<code>arr.length-1-i</code>[7,4,1,3,0,2,5,6,8,9]</p>`,25);function j(z,N){const e=a("mi"),o=a("mo"),l=a("mn"),i=a("msup"),r=a("mrow"),u=a("annotation"),d=a("semantics"),k=a("math");return v(),x("div",null,[b,_,p("p",null,[p("span",f,[p("span",g,[p("span",y,[n(k,null,{default:s(()=>[n(d,null,{default:s(()=>[n(r,null,{default:s(()=>[n(e,null,{default:s(()=>[t("O")]),_:1}),n(o,null,{default:s(()=>[t("(")]),_:1}),n(i,null,{default:s(()=>[n(e,null,{default:s(()=>[t("n")]),_:1}),n(l,null,{default:s(()=>[t("2")]),_:1})]),_:1}),n(o,null,{default:s(()=>[t(")")]),_:1})]),_:1}),n(u,{encoding:"application/x-tex"},{default:s(()=>[t("O(n^2) ")]),_:1})]),_:1})]),_:1})]),I])])]),w])}const B=m(h,[["render",j],["__file","select-sort.html.vue"]]);export{B as default};

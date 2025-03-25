import{_ as n,o as s,c as a,a as p}from"./app-b4fd65c5.js";const t={},e=p(`<h2 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式" aria-hidden="true">#</a> 工厂模式</h2><h3 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h3><p>工厂模式定义创建对象的接口，但是让子类去正真地实例化。也就是工厂方法将类的实例化延迟到子类</p><h3 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h3><ol><li>工厂类集中了所有对象的创建，便于对象创建的统一管理</li><li>对象的使用者仅仅是使用产品，实现了单一职责</li><li>便于扩展，如果新增了一种业务，只需要增加相关的业务对象类和工厂类中的生产业务对象的方法，不需要修改其他的地方（违反了开闭原则）</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">SmallPlane</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>blood<span class="token operator">=</span><span class="token number">100</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;SmallPlane&#39;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">touch</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>blood <span class="token operator">-=</span> <span class="token number">50</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>blood<span class="token operator">&lt;=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;dead&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">BigPlane</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>blood<span class="token operator">=</span><span class="token number">200</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;BigPlane&#39;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">touch</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>blood <span class="token operator">-=</span> <span class="token number">50</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>blood<span class="token operator">&lt;=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;dead&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//创建一个工厂函数，用来实例化子类</span>
<span class="token keyword">function</span> <span class="token function">PlaneFactory</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">let</span> newPlane
  <span class="token keyword">switch</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;SmallPlane&#39;</span><span class="token operator">:</span>
      newPlane <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SmallPlane</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;BigPlane&#39;</span><span class="token operator">:</span>
      newPlane <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigPlane</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">break</span>
  <span class="token punctuation">}</span>
  newPlane<span class="token punctuation">.</span><span class="token function-variable function">die</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;boom!!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> newPlane
<span class="token punctuation">}</span>


<span class="token keyword">const</span> bigPlane <span class="token operator">=</span> <span class="token function">PlaneFactory</span><span class="token punctuation">(</span><span class="token string">&#39;BigPlane&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="工厂方法模式" tabindex="-1"><a class="header-anchor" href="#工厂方法模式" aria-hidden="true">#</a> 工厂方法模式</h2><h3 id="定义-1" tabindex="-1"><a class="header-anchor" href="#定义-1" aria-hidden="true">#</a> 定义</h3><p>不再有一个唯一的工厂类去创建产品，而是将不同的产品交给对应的工厂子类去实现。每个产品有负责生产的子工厂来创造。如果添加新的产品，需要做的是添加新的子工厂和产品，而不需要修改其他的工厂代码</p><h3 id="组成" tabindex="-1"><a class="header-anchor" href="#组成" aria-hidden="true">#</a> 组成</h3><ol><li>抽象工厂类：负责定义创建产品的公共接口</li><li>产品子工厂：继承抽象工厂类，实现抽象工厂类提供的接口</li><li>每一种产品有各自的产品类</li></ol><h3 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//抽象工厂，提供公共接口</span>
<span class="token keyword">function</span> <span class="token function">PlaneFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  
<span class="token punctuation">}</span>

<span class="token comment">//创建子类工厂的方法</span>
PlaneFactory<span class="token punctuation">.</span><span class="token function-variable function">create</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">PlaneFactory</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">不存在</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>type<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">类型</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token comment">//继承抽象工厂类</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">PlaneFactory</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">!==</span> <span class="token class-name">PlaneFactory</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">PlaneFactory</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PlaneFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//产品类需要的参数</span>
  <span class="token keyword">const</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">PlaneFactory<span class="token punctuation">.</span>prototype</span><span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
<span class="token punctuation">}</span> 
<span class="token comment">//抽象工厂公共接口</span>
<span class="token class-name">PlaneFactory</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">touch</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>blood<span class="token operator">-=</span><span class="token number">50</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>blood<span class="token operator">&lt;=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">die</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//抽象工厂公共接口</span>
<span class="token class-name">PlaneFactory</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">die</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;boom&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//产品类</span>
<span class="token class-name">PlaneFactory</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">SmallPlane</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span>y</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x
  <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y
  <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token number">100</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token number">100</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>blood<span class="token operator">=</span><span class="token number">100</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;SmallPlane&#39;</span>
<span class="token punctuation">}</span>
<span class="token comment">//产品类</span>
<span class="token class-name">PlaneFactory</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">BigPlane</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span>y</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x
  <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y
  <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token number">150</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token number">150</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>blood<span class="token operator">=</span><span class="token number">200</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;BigPlane&#39;</span>
<span class="token punctuation">}</span>
<span class="token comment">//产品类</span>
<span class="token class-name">PlaneFactory</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">AttachPlane</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span>y</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x
  <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y
  <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token number">120</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token number">120</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>blood<span class="token operator">=</span><span class="token number">150</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;AttachPlane&#39;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">attach</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;attach&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">const</span> osp <span class="token operator">=</span> PlaneFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">&#39;SmallPlane&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> obp <span class="token operator">=</span> PlaneFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">&#39;BigPlane&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> oap <span class="token operator">=</span> PlaneFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">&#39;AttachPlane&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>代码比简单工厂模式复杂，引入了抽象层，还有子工厂，这会增加代码的复杂度和理解难度。但是相比简单工厂模式，代码的维护性和扩展性提高了，新增产品时，只需要增加对应的产品类和产品工厂类，不需要修改到抽象工厂类，不需要修改到抽象工厂类和其他子工厂。更符合面向对象的开放封闭原则</p>`,15),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","factory.html.vue"]]);export{k as default};

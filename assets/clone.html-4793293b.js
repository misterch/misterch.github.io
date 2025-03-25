import{_ as a,o as n,c as e,a as s}from"./app-b4fd65c5.js";const t={},i=s(`<p>git clone 默认是克隆Head指向的master分支，如果是多分支，我们可以单个克隆分支项目。</p><h2 id="克隆分支" tabindex="-1"><a class="header-anchor" href="#克隆分支" aria-hidden="true">#</a> 克隆分支</h2><h3 id="克隆非默认分支-main分支" tabindex="-1"><a class="header-anchor" href="#克隆非默认分支-main分支" aria-hidden="true">#</a> 克隆非默认分支(main分支)</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone <span class="token parameter variable">-b</span> <span class="token operator">&lt;</span>分支名<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>远程仓库url<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="克隆所有分支" tabindex="-1"><a class="header-anchor" href="#克隆所有分支" aria-hidden="true">#</a> 克隆所有分支</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 默认克隆main分支</span>
<span class="token function">git</span> clone <span class="token operator">&lt;</span>远程仓库url<span class="token operator">&gt;</span>
<span class="token comment">#列出所有分支，包括本地和远程仓库</span>
<span class="token function">git</span> branch <span class="token parameter variable">-a</span>
<span class="token comment">#签出远程分支到本地</span>
<span class="token comment">#在本地新建一个dev分支用来签出远程仓库的dev分支</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> dev origin/dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),c=[i];function r(l,o){return n(),e("div",null,c)}const p=a(t,[["render",r],["__file","clone.html.vue"]]);export{p as default};

import{_ as a,o as i,c as t,a as s,b as e,e as n}from"./app-21769845.js";const r="/img/rebase1.0.png",d="/img/rebase1.1.png",c="/img/rebase1.2.png",o="/img/rebase1.3.png",l="/img/rebase1.4.png",p={},m=s(`<h2 id="merge" tabindex="-1"><a class="header-anchor" href="#merge" aria-hidden="true">#</a> merge</h2><p>merge命令会找到两个分支的<strong>公共祖先</strong>，并将从公共祖先以来在两个分支上进行的修改合并。通过合并分支，确保分支上的任何修改都包含在代码库的最终版本中</p><h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h3><p>在合并前，最好先确保本地分支和远程分支同步</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> checkout main
<span class="token function">git</span> pull
<span class="token function">git</span> merge <span class="token operator">&lt;</span>将要合并到当前分支的分支<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="快速合并" tabindex="-1"><a class="header-anchor" href="#快速合并" aria-hidden="true">#</a> 快速合并</h3><p>对于不引入冲突的小更改，使用这种合并非常理想。git只是将<strong>当前分支的指针向前移动到另一个分支上</strong>的最新提交</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> merge -ff-only dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="三方合并" tabindex="-1"><a class="header-anchor" href="#三方合并" aria-hidden="true">#</a> 三方合并</h3><h3 id="递归合并" tabindex="-1"><a class="header-anchor" href="#递归合并" aria-hidden="true">#</a> 递归合并</h3><p>创建新的合并提交，组合两个分支上的更改。有冲突发生手动解决</p><h3 id="章鱼合并" tabindex="-1"><a class="header-anchor" href="#章鱼合并" aria-hidden="true">#</a> 章鱼合并</h3><p>将多个分支合并为一个分支</p><p>将多个功能分支一次性将其到当前的开发分支</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> checkout dev
<span class="token function">git</span> merge feat1 feat2 feat3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rebase" tabindex="-1"><a class="header-anchor" href="#rebase" aria-hidden="true">#</a> rebase</h2>`,16),u=e("div",{class:"custom-container tip"},[e("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[e("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("circle",{cx:"12",cy:"12",r:"9"}),e("path",{d:"M12 8h.01"}),e("path",{d:"M11 12h1v4h1"})])]),e("p",{class:"custom-container-title"},"TIP"),e("p",null,[n("变基可以在"),e("strong",null,"任意分支"),n("上进行，可以变基到"),e("strong",null,"一条分支")]),e("p",null,"优点：不会新增额外的提交记录，形成线性历史，比较直观干净"),e("p",null,[n("缺点：会"),e("strong",null,"改变提交历史"),n("，改变当前分支branch out的节点，避免在共享分支上使用，团队合作时避免使用rebase")]),e("p",null,[n("变基的时候会找到当前分支和目标分支的"),e("strong",null,"共同祖先"),n("，再把当前分支上"),e("strong",null,"从共同祖先到最新提交记录"),n("的所有提交都移动到"),e("strong",null,"目标分支的最新提交的后面")])],-1),h=s(`<p>创建一个<code>mywork</code>分支，并切换到该分支上</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> mywork
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+r+'" alt=""></p><p>在<code>mywork</code>上进行开发，生成两个提交，与此同时<code>origin</code>分支上也有新的提交</p><p><img src="'+d+`" alt=""></p><p>如果想<code>mywork</code>分支历史看起来没有经过任何合并一样，用<code>rebase</code>命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> checkout mywork
<span class="token comment"># 获取远程仓库的最新更改</span>
<span class="token comment"># 或者git fetch</span>
<span class="token function">git</span> pull
<span class="token comment"># 将目标分支origin的提交合并到当前分支中</span>
<span class="token function">git</span> merge origin/dev
<span class="token comment"># 将mywork分支的修改应用到dev分支上</span>
<span class="token function">git</span> rebase dev
<span class="token comment"># 推送修改后的mywork分支到远程仓库</span>
<span class="token function">git</span> push origin mywork
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变基的时候找到<code>mywork</code>分支与目标分支的共同祖先（C2），从C2到最新记录提交（C5,C6）移动到目标分支<code>origin</code>最新提交（C4）的后面</p><p><img src="`+c+'" alt=""></p><p>这样看起来所有的修改都是在目标分支（基础分支）上，使得目标分支更加干净，更线性的历史提交</p><p><img src="'+o+'" alt=""></p><p>与<code>merge</code>对比的区别</p><p><img src="'+l+`" alt=""></p><table><thead><tr><th>命令</th><th>行为</th></tr></thead><tbody><tr><td>merge</td><td>创建新的提交以合并更改，并<strong>保留两个分支的提交历史</strong></td></tr><tr><td>rebase</td><td>修改提交历史，看起来显示在基础分支上进行的更改</td></tr></tbody></table><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#有两条分支分别是main和dev</span>
<span class="token comment">#切换到dev分支（当前分支）</span>
<span class="token function">git</span> checkout dev
<span class="token comment">#变基到main分支（目标分支）</span>
<span class="token function">git</span> rebase main
<span class="token comment">#将dev分支上，从共同祖先到最新的提交记录都会移动到目标分支main的最新提交的后面</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),g=[m,u,h];function v(b,k){return i(),t("div",null,g)}const _=a(p,[["render",v],["__file","merge.html.vue"]]);export{_ as default};
import{_ as e,o as t,c as a,a as r,b as n}from"./app-21769845.js";const i={},o=r('<h2 id="什么是flip" tabindex="-1"><a class="header-anchor" href="#什么是flip" aria-hidden="true">#</a> 什么是FLIP？</h2><p>FLIP不是动画插件库，不是方法，而是一个实现动画的思想。</p><p>通过FLIP思想可以更容易实现<strong>队列动画</strong>，vue的 <code>&lt;TransitionGroup&gt;</code>添加<code>move-class</code>实现平滑过渡就是基于FLIP思想</p><h3 id="核心思想" tabindex="-1"><a class="header-anchor" href="#核心思想" aria-hidden="true">#</a> 核心思想</h3><p>flip核心思想是把动画翻转invert过来，先获取元素first动画开始前的DOM和last动画结束后的DOM，然后动态计算first和last差值invert，在play配置invert动画平滑过渡，以低成本动画播放，提升动画性能</p><p>F：First；记录起始位置，使用getBoundingClientRect方法获取元素位置</p><p>L：Last；记录结束位置</p><p>I：Invert；翻转元素到起始位置，计算first和last之间的位置变化</p><p>P：Play；播放动画回到结束位置，调用元素animate方法，设置动画</p><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3>',10),s=n("iframe",{height:"300",style:{width:"100%"},scrolling:"no",title:"flip实现动画demo1",src:"https://codepen.io/misterch/embed/gOQZjme?default-tab=html%2Cresult",frameborder:"no",loading:"lazy",allowtransparency:"true",allowfullscreen:"true"},`
  See the Pen <a href="https://codepen.io/misterch/pen/gOQZjme">
  flip实现动画demo1</a> by Ben (<a href="https://codepen.io/misterch">@misterch</a>)
  on <a href="https://codepen.io">CodePen</a>.
`,-1),c=[o,s];function l(d,h){return t(),a("div",null,c)}const f=e(i,[["render",l],["__file","flip.html.vue"]]);export{f as default};
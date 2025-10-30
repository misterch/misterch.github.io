import{_ as e,o as a,c as d,a as n}from"./app-d4c6289a.js";const i={},s=n(`<h2 id="笛卡尔积" tabindex="-1"><a class="header-anchor" href="#笛卡尔积" aria-hidden="true">#</a> 笛卡尔积</h2><p>比赛赛程</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select t1.name 主场,t2.name 客场
from team as t1,team as t2
where t1.id!=t2.id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>皇马 曼联、 巴萨 曼联、 阿森纳 曼联、 尤文图斯 曼联</p><p>曼联 皇马、 巴萨 皇马 、阿森纳 皇马、 尤文图斯 皇马</p><p>皇马 巴萨、曼联 巴萨、阿森纳 巴萨、尤文图斯 巴萨</p><p>...</p><h2 id="左连接" tabindex="-1"><a class="header-anchor" href="#左连接" aria-hidden="true">#</a> 左连接</h2><p><code>表1 left join 表二 on</code></p><p>以左表为基准匹配逐个匹配右表的记录</p><p>当左表（表1）有没有匹配上右表（表二）任一个记录，也会至少有一行</p><p>查询员工表和部门表，查询每个员工所属的部门</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from
department as d left join employee as e
on d.id=e.deptId;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="右连接" tabindex="-1"><a class="header-anchor" href="#右连接" aria-hidden="true">#</a> 右连接</h2><p><code>表1 right join 表2 on</code></p><p>同左连接</p><h2 id="内连接" tabindex="-1"><a class="header-anchor" href="#内连接" aria-hidden="true">#</a> 内连接</h2><p><code>表1 inner join 表2 on</code></p><p>必须满足条件才能出现在结果中</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from
department as d inner join employee as e
on d.id=e.deptId;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询每个员工所属部门和所属公司</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from employee as e
inner join department as d on d.id=e.deptId
inner join company as c on c.id=d.company
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),l=[s];function r(c,t){return a(),d("div",null,l)}const m=e(i,[["render",r],["__file","multiTableQuery.html.vue"]]);export{m as default};

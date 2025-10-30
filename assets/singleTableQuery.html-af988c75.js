import{_ as e,o as a,c as i,a as d}from"./app-d4c6289a.js";const n={},s=d(`<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select ...
from ...
where ...
order by ...
limit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="select" tabindex="-1"><a class="header-anchor" href="#select" aria-hidden="true">#</a> select</h2><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> *</h3><p>查询users表中<strong>所有字段</strong>的所有数据</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from empoloyee;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="别名" tabindex="-1"><a class="header-anchor" href="#别名" aria-hidden="true">#</a> 别名</h3><p>查询users表中<strong>指定字段</strong>的所有数据</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select \`name\`,age from empoloyee;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>给查询的字段起别名</p><p>可以使用as也可以不用</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select \`name\` as 名字,age 年龄 from empoloyee;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="case子句" tabindex="-1"><a class="header-anchor" href="#case子句" aria-hidden="true">#</a> case子句</h3><p>形式：<code>case 字段 when 条件 then 新的查询值 else 新的查询值 end 别名</code></p><p>或者：<code>case when 字段+条件 then 新的查询值 else 新的查询值 end 别名</code></p><p>根据某个字段中的<strong>值</strong>查询出新的一列</p><p>例如 gender中，1表示男，0表示女</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select \`name\`,
case gender
when 1 then &#39;男&#39;
else &#39;女&#39;
end genderText
from empoloyee
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把薪水按照高中低输出</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select \`name\`,
case
when salary &gt;= 10000 then &#39;高&#39;
when salary &gt;= 5000 then &#39;中&#39;
else &#39;低&#39;
end \`level\`
from empoloyee
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="distinct" tabindex="-1"><a class="header-anchor" href="#distinct" aria-hidden="true">#</a> distinct</h3><p>去重</p><p>distinct要写在最前面</p><p>查询所有员工的所在位置</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select distinct location from employee;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="where" tabindex="-1"><a class="header-anchor" href="#where" aria-hidden="true">#</a> where</h2><h3 id="比较运算" tabindex="-1"><a class="header-anchor" href="#比较运算" aria-hidden="true">#</a> 比较运算</h3><h4 id="、-、-、-、" tabindex="-1"><a class="header-anchor" href="#、-、-、-、" aria-hidden="true">#</a> &gt;、&lt;、&gt;=、&lt;=、=</h4><h3 id="逻辑运算" tabindex="-1"><a class="header-anchor" href="#逻辑运算" aria-hidden="true">#</a> 逻辑运算</h3><h4 id="between-and" tabindex="-1"><a class="header-anchor" href="#between-and" aria-hidden="true">#</a> between...and...</h4><p>在一个范围之间，包含10000和12000，[10000,12000]</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from employee
where salary between 10000 and 12000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="and" tabindex="-1"><a class="header-anchor" href="#and" aria-hidden="true">#</a> and</h4><p>在一个范围之间(10000,12000)</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from employee
where salary&gt;10000 and salary&lt;12000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="or" tabindex="-1"><a class="header-anchor" href="#or" aria-hidden="true">#</a> or</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from employee
where age&gt;18 or salary&gt;10000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="not" tabindex="-1"><a class="header-anchor" href="#not" aria-hidden="true">#</a> not</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from employee
where not age&gt;18 or salary&gt;10000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="范围查询" tabindex="-1"><a class="header-anchor" href="#范围查询" aria-hidden="true">#</a> 范围查询</h3><h4 id="in-选定的值" tabindex="-1"><a class="header-anchor" href="#in-选定的值" aria-hidden="true">#</a> in（选定的值）</h4><p>查询20和30岁的员工</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select \`name\`,age from empoloyee
where age in(20,30);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="not-in" tabindex="-1"><a class="header-anchor" href="#not-in" aria-hidden="true">#</a> not in()</h4><h3 id="空判断" tabindex="-1"><a class="header-anchor" href="#空判断" aria-hidden="true">#</a> 空判断</h3><p>通常用来比较null，null不能用<code>=</code>来做比较</p><h4 id="is" tabindex="-1"><a class="header-anchor" href="#is" aria-hidden="true">#</a> is</h4><p>查询没有地址信息的员工</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from employee
where location is null;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="is-not" tabindex="-1"><a class="header-anchor" href="#is-not" aria-hidden="true">#</a> is not</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from employee
where location is not null;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模糊查询" tabindex="-1"><a class="header-anchor" href="#模糊查询" aria-hidden="true">#</a> 模糊查询</h3><p>语法：<code>where 字段 like 查询的字符串</code></p><h4 id="替换任意个" tabindex="-1"><a class="header-anchor" href="#替换任意个" aria-hidden="true">#</a> %替换任意个</h4><h4 id="替换一个" tabindex="-1"><a class="header-anchor" href="#替换一个" aria-hidden="true">#</a> _替换一个</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 查询以陈开头的名字
select \`name\` from employee
where \`name\` like &quot;陈%&quot;

-- 查询名字含有志的名字
select \`name\` from employee
where \`name\` like &quot;%志%&quot;

-- 查询姓陈，且只有两个字的名字
select \`name\` from employee
where \`name\` like &quot;陈_&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="order-by" tabindex="-1"><a class="header-anchor" href="#order-by" aria-hidden="true">#</a> order by</h2><p>语法：<code>order by 字段 desc</code></p><h3 id="从小到大" tabindex="-1"><a class="header-anchor" href="#从小到大" aria-hidden="true">#</a> 从小到大</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select \`name\`,age from employee
order by age asc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="从大到小" tabindex="-1"><a class="header-anchor" href="#从大到小" aria-hidden="true">#</a> 从大到小</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select \`name\`,age from employee
order by age desc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="根据多个字段排序" tabindex="-1"><a class="header-anchor" href="#根据多个字段排序" aria-hidden="true">#</a> 根据多个字段排序</h3><p>当一个字段相等，则根据下一个字段比较排序</p><p>多个字段排序以<code>,</code>隔开</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select \`name\`,age,height from employee
order by age desc,height desc;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="limit" tabindex="-1"><a class="header-anchor" href="#limit" aria-hidden="true">#</a> limit</h2><p>分页查询</p><p>语法：<code>limit start,count</code></p><p>start：从第几条开始，包括start</p><p>count：取出多少条记录</p><p>分页公式：每页的数量*(显示第几页-1)</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 第一页
select * from employee
limit 0,5;
-- 第二页
select * from employee
limit 5,5;
-- 第三页
select * from employee
limit 10,5;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="执行顺序" tabindex="-1"><a class="header-anchor" href="#执行顺序" aria-hidden="true">#</a> 执行顺序</h2><p><strong>from &gt; where &gt; select&gt;order by&gt;limit</strong></p>`,74),l=[s];function r(c,m){return a(),i("div",null,l)}const h=e(n,[["render",r],["__file","singleTableQuery.html.vue"]]);export{h as default};

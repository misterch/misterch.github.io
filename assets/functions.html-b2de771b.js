import{_ as n,o as i,c as r,a as d,b as e,e as a}from"./app-21769845.js";const s={},o=d(`<h2 id="内置函数" tabindex="-1"><a class="header-anchor" href="#内置函数" aria-hidden="true">#</a> 内置函数</h2><h3 id="数学" tabindex="-1"><a class="header-anchor" href="#数学" aria-hidden="true">#</a> 数学</h3><p>ABS(x)返回x的绝对值</p><p>CEILING(x)返回大于x的最小整数值</p><p>FLOOR(x)返回小于x的最大整数值</p><p>MOD(x,y)返回x/y的模（余数）</p><p>PI()返回pi的值</p><p>RAND()返回0到1内的随机值</p><p>ROUND(x,y)返回x的四舍五入的有y位小数的值</p><p>TRUNCATE(x,y)返回数字x截断为y位小数的值</p><h3 id="聚合" tabindex="-1"><a class="header-anchor" href="#聚合" aria-hidden="true">#</a> 聚合</h3><p>AVG(col)返回指定列的平均值</p><p>COUNT(col)返回指定列中非NULL值的个数</p><p>MIN(col)返回指定列的最小值</p><p>MAX(col)返回指定列的最大值</p><p>SUM(col)返回指定列的值的和</p><h3 id="字符" tabindex="-1"><a class="header-anchor" href="#字符" aria-hidden="true">#</a> 字符</h3><p>CONCAT(s1,s2...sn)将s1,s2...sn连接成字符串</p><p>CONCAT_WS(sep,s1,s2...sn)将s1,s2...sn连接成字符串，并用sep字符间隔</p><p>TRIM(str)去除字符串首部和尾部的所有空格</p><p>LTRIM(str)从字符串str中切掉开头的空格</p><p>RTRIM(str)从字符串str中切掉尾部的空格</p><h3 id="日期" tabindex="-1"><a class="header-anchor" href="#日期" aria-hidden="true">#</a> 日期</h3><p>CURDATE()或CURRENT_DATE()返回当前的日期</p><p>CURTIME或CURRENT_TIME()返回当前的时间</p><p>TIMESTAMPDIFF(part,date1,date2)返回date1到date2之间间隔part值，part是用于指定的相隔的年月日</p><p>part：<code>MICROSECEND</code> <code>SECEND</code> <code>MINUTE</code> <code>HOUR</code> <code>DAY</code> <code>WEEK</code> <code>MONTH</code> <code>QUARTER</code> <code>YEAR</code></p><h2 id="分组" tabindex="-1"><a class="header-anchor" href="#分组" aria-hidden="true">#</a> 分组</h2><h3 id="group-by" tabindex="-1"><a class="header-anchor" href="#group-by" aria-hidden="true">#</a> group by</h3><p>语法：<code>group by 分组字段</code></p><p>以什么字段分组就以什么字段作为第一列</p><p>查询员工分布的居住地，和每个居住地的人数</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select location,count(id) as 员工数量
from employee
group by location;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="having" tabindex="-1"><a class="header-anchor" href="#having" aria-hidden="true">#</a> having</h3><p>对分组后的数据进行筛选</p>`,35),c=e("div",{class:"custom-container tip"},[e("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[e("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("circle",{cx:"12",cy:"12",r:"9"}),e("path",{d:"M12 8h.01"}),e("path",{d:"M11 12h1v4h1"})])]),e("p",{class:"custom-container-title"},"TIP"),e("p",null,[e("code",null,"having"),a("与"),e("code",null,"group by"),a("连用，"),e("code",null,"having"),a("后通常也要跟聚合函数")]),e("p",null,[a("分组条件使用"),e("code",null,"having")]),e("p",null,[e("strong",null,"聚合函数不能和where配合使用，可以和having配合来分组查询")])],-1),t=d(`<p>查询员工数量大于等于40人的居住地及员工数量</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select location,count(id) as empnum
from employee
group by location
having empnum&gt;=40;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分组的运行顺序" tabindex="-1"><a class="header-anchor" href="#分组的运行顺序" aria-hidden="true">#</a> 分组的运行顺序</h3><p><code>from&gt;join...on...&gt;where&gt;group by&gt;select&gt;having&gt;order by&gt;limit</code></p>`,4),l=[o,c,t];function p(h,u){return i(),r("div",null,l)}const m=n(s,[["render",p],["__file","functions.html.vue"]]);export{m as default};
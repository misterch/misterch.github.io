import{_ as a,o as t,c as p,a as s,b as n}from"./app-b4fd65c5.js";const e={},o=s(`<h2 id="常见flag操作符" tabindex="-1"><a class="header-anchor" href="#常见flag操作符" aria-hidden="true">#</a> 常见flag操作符</h2><p><code>r</code>:可读</p><p><code>w</code>:可写</p><p><code>s</code>:同步</p><p><code>+</code>:执行相反操作</p><p><code>x</code>:排他操作</p><p><code>a</code>:追加操作</p><p><code>u</code>：只有超级用户才能修修改</p><p><code>i</code>：不可修改</p><h2 id="权限表示" tabindex="-1"><a class="header-anchor" href="#权限表示" aria-hidden="true">#</a> 权限表示</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>drwxr-xrwr-x
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="权限字符表示" tabindex="-1"><a class="header-anchor" href="#权限字符表示" aria-hidden="true">#</a> 权限字符表示</h3><table><thead><tr><th>权限符号表示</th><th>说明</th><th>八进制</th><th>二进制</th></tr></thead><tbody><tr><td>r--</td><td>只读</td><td>4</td><td>100</td></tr><tr><td>-w-</td><td>仅可写</td><td>2</td><td>010</td></tr><tr><td>--x</td><td>仅可执行</td><td>1</td><td>001</td></tr><tr><td>rw-</td><td>可读可写</td><td>6</td><td>110</td></tr><tr><td>-wx</td><td>可写可执行</td><td>3</td><td>011</td></tr><tr><td>r-x</td><td>可读可执行</td><td>5</td><td>101</td></tr><tr><td>rwx</td><td>可读可写可执行</td><td>7</td><td>111</td></tr><tr><td>---</td><td>无权限</td><td>0</td><td>000</td></tr></tbody></table><h3 id="用户角色" tabindex="-1"><a class="header-anchor" href="#用户角色" aria-hidden="true">#</a> 用户角色</h3><p>根据用户所属角色分配文件操作权限，分为文件所有者、用户组和其他用户</p><table><thead><tr><th>访问者</th><th>文件所有者</th><th>组用户</th><th>其他用户</th></tr></thead><tbody><tr><td>权限</td><td>drwx</td><td>r-x</td><td>r-x</td></tr><tr><td>权限意义</td><td>文件夹可读可写可执行</td><td>可读可执行</td><td>可读可执行</td></tr><tr><td>八进制表示</td><td>7</td><td>5</td><td>5</td></tr></tbody></table><table><thead><tr><th>组权限</th><th>八进制</th><th>十进制</th></tr></thead><tbody><tr><td>rwxrwxrwx</td><td>777</td><td>511</td></tr><tr><td>rwxr-xr-x</td><td>755</td><td>493</td></tr><tr><td>rw-rw-rw-</td><td>666</td><td>438</td></tr></tbody></table><h2 id="文件操作api" tabindex="-1"><a class="header-anchor" href="#文件操作api" aria-hidden="true">#</a> 文件操作API</h2><h3 id="readfile" tabindex="-1"><a class="header-anchor" href="#readfile" aria-hidden="true">#</a> readFile</h3><blockquote><p>从指定文件中读取数据</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;data.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="writefile" tabindex="-1"><a class="header-anchor" href="#writefile" aria-hidden="true">#</a> writeFile</h3><blockquote><p>向指定文件中写入数据</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;data.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;写入成功&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置</p><p>flag</p><p>默认w+：可读写并且清空内容再写入</p><p>r+：可读写文件，在已有内容前写入</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span>
  path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;data.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token string">&#39;hello world&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token number">438</span><span class="token punctuation">,</span> <span class="token comment">//权限位，用八进制是666（用户、用户组、其他用户都只有读写权限），转换成十进制就是438</span>
    <span class="token literal-property property">flag</span><span class="token operator">:</span> <span class="token string">&#39;r+&#39;</span><span class="token punctuation">,</span><span class="token comment">//写入方式</span>
    <span class="token literal-property property">encoding</span><span class="token operator">:</span> <span class="token string">&#39;utf-8&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;写入成功&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="appendfile" tabindex="-1"><a class="header-anchor" href="#appendfile" aria-hidden="true">#</a> appendFile</h3><blockquote><p>追加的方式向指定文件中写入数据</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
fs<span class="token punctuation">.</span><span class="token function">appendFile</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;data.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">&#39;拉勾教育&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;追加写入成功&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="copyfile" tabindex="-1"><a class="header-anchor" href="#copyfile" aria-hidden="true">#</a> copyFile</h3><blockquote><p>将某个文件中的数据拷贝至另一文件</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
fs<span class="token punctuation">.</span><span class="token function">copyFile</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;data.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;copy.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token parameter">err</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;拷贝成功&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,35),c=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,"以上的文件操作API是一次性操作，即一次性将所有数据读到内存中，然后再一次性从内存中写进文件中，不适用大文件操作，因为可能会导致内存占满或溢出")],-1),i=s(`<h3 id="watchfile" tabindex="-1"><a class="header-anchor" href="#watchfile" aria-hidden="true">#</a> watchFile</h3><blockquote><p>对指定文件进行监控</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>fs<span class="token punctuation">.</span><span class="token function">watchFile</span><span class="token punctuation">(</span><span class="token string">&#39;data.txt&#39;</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">interval</span><span class="token operator">:</span><span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">cur<span class="token punctuation">,</span>prev</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token comment">// mtime=modify修改时间</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>mtime <span class="token operator">===</span> prev<span class="token punctuation">.</span>mtime<span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;文件被修改&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">//取消监听</span>
    fs<span class="token punctuation">.</span><span class="token function">unwatchFile</span><span class="token punctuation">(</span><span class="token string">&#39;data.txt&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="open和read" tabindex="-1"><a class="header-anchor" href="#open和read" aria-hidden="true">#</a> open和read</h3><blockquote><p>所谓的读操作就是将数据从磁盘文件中写入到buffer缓冲区中</p></blockquote><p><code>fs.read(fd,buffer,offset,length,position,callback)</code></p><p>从<strong>当前打开的文件</strong>中从position位置开始读取length长度的数据，将数据<strong>从buffer偏移offset个位置</strong>开始写入到buffer缓冲区中</p><p><code>fd</code>：定位当前被打开的文件</p><p><code>buffer</code>：用于表示当前缓冲区</p><p><code>offset</code>：表示当前从buffer的哪个位置开始执行写入</p><p><code>length</code>：表示当前次写入的长度</p><p><code>position</code>：表示当前从文件的哪个位置开始读取操作</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//data.txt的数据时1234567890</span>
<span class="token keyword">const</span> buf <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
fs<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.txt&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>rfd</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>rfd<span class="token punctuation">)</span> <span class="token comment">//打开成功为3</span>
  fs<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>rfd<span class="token punctuation">,</span>buf<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>readBytes<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>readBytes<span class="token punctuation">)</span> <span class="token comment">// 4</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token comment">// &lt;Buffer 00 34 35 36 37 00 00 00 00 00&gt;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// [空]4567</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="write" tabindex="-1"><a class="header-anchor" href="#write" aria-hidden="true">#</a> write</h3><blockquote><p>所谓的写（就是读）就是将缓冲区里的内容读出来，写入到磁盘文件中</p></blockquote><p><code>fs.write(fd,buffer,offset,length,position,callback)</code></p><p>将缓冲区的数据偏移offset个位置开始读取length长度的数据，将数据从文件的position个位置开始写入到文件中</p><p><code>fd</code>：定位当前被打开的文件</p><p><code>buffer</code>：用于表示当前缓冲区</p><p><code>offset</code>：表示当前从buffer的哪个位置开始读取数据</p><p><code>length</code>：表示当前次写入的长度</p><p><code>position</code>：表示当前从文件的哪个位置开始写入操作，一般不动（0），会出现乱码</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> buf <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;1234567890&#39;</span><span class="token punctuation">)</span>
fs<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;new_data.txt&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;w&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>wfd</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  fs<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>wfd<span class="token punctuation">,</span>buf<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>written<span class="token punctuation">,</span>buffer</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>written<span class="token punctuation">)</span> <span class="token comment">// 4，写入文件的长度</span>
    <span class="token comment">// new_data.txt内容 === 2345</span>
    fs<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>wfd<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实现大文件的拷贝" tabindex="-1"><a class="header-anchor" href="#实现大文件的拷贝" aria-hidden="true">#</a> 实现大文件的拷贝</h3><p>针对大文件的拷贝，利用buffer缓冲区，实现边读边写，边写边读，减轻内存的消耗，提高性能</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> buf <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token constant">BUFFER_SIZE</span> <span class="token operator">=</span> buf<span class="token punctuation">.</span>length
<span class="token keyword">let</span> readOffset <span class="token operator">=</span> <span class="token number">0</span>
fs<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;a.txt&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>rfd</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  fs<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;b.txt&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;w&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>wfd</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">//将a文件的数据读取BUFFER_SIZE长度到buf缓冲区中</span>
      fs<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>rfd<span class="token punctuation">,</span>buf<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token constant">BUFFER_SIZE</span><span class="token punctuation">,</span>readOffset<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>readBytes</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>readBytes<span class="token punctuation">)</span><span class="token punctuation">{</span>
          fs<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>rfd<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
          fs<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>wfd<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;拷贝完成&#39;</span><span class="token punctuation">)</span>
          <span class="token keyword">return</span> 
        <span class="token punctuation">}</span>
        <span class="token comment">//每次读取完后需要移动readOffset来更新从文件中哪个位置开始读取数据</span>
        readOffset<span class="token operator">+=</span>readBytes
        <span class="token comment">//将缓冲区的数据取出BUFFER_SIZE长度写入到文件中</span>
        fs<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>wfd<span class="token punctuation">,</span>buf<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token constant">BUFFER_SIZE</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>written</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
          <span class="token comment">//写完之后递归调用，直至数据复制完为止</span>
          <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="目录操作api" tabindex="-1"><a class="header-anchor" href="#目录操作api" aria-hidden="true">#</a> 目录操作API</h2><h3 id="access" tabindex="-1"><a class="header-anchor" href="#access" aria-hidden="true">#</a> access</h3><blockquote><p>判断文件或目录是否具有操作权限</p></blockquote><h3 id="stat" tabindex="-1"><a class="header-anchor" href="#stat" aria-hidden="true">#</a> stat</h3><blockquote><p>获取目录及文件信息</p></blockquote><h3 id="mkdir" tabindex="-1"><a class="header-anchor" href="#mkdir" aria-hidden="true">#</a> mkdir</h3><blockquote><p>创建目录</p></blockquote><h3 id="rmdir" tabindex="-1"><a class="header-anchor" href="#rmdir" aria-hidden="true">#</a> rmdir</h3><blockquote><p>删除目录</p></blockquote><h3 id="readdir" tabindex="-1"><a class="header-anchor" href="#readdir" aria-hidden="true">#</a> readdir</h3><blockquote><p>读取目录中内容</p></blockquote><h3 id="unlink" tabindex="-1"><a class="header-anchor" href="#unlink" aria-hidden="true">#</a> unlink</h3><blockquote><p>删除指定文件</p></blockquote><h2 id="基本操作类" tabindex="-1"><a class="header-anchor" href="#基本操作类" aria-hidden="true">#</a> 基本操作类</h2><h3 id="stat-1" tabindex="-1"><a class="header-anchor" href="#stat-1" aria-hidden="true">#</a> stat</h3><h3 id="read" tabindex="-1"><a class="header-anchor" href="#read" aria-hidden="true">#</a> read</h3><h3 id="write-1" tabindex="-1"><a class="header-anchor" href="#write-1" aria-hidden="true">#</a> write</h3><p>createWriteStream()</p><h3 id="watcher" tabindex="-1"><a class="header-anchor" href="#watcher" aria-hidden="true">#</a> watcher</h3><p>watch()</p><h2 id="常用方法" tabindex="-1"><a class="header-anchor" href="#常用方法" aria-hidden="true">#</a> 常用方法</h2><h3 id="权限操作" tabindex="-1"><a class="header-anchor" href="#权限操作" aria-hidden="true">#</a> 权限操作</h3><ol><li>chmod</li><li>chgrp</li></ol><h3 id="文件增删改查" tabindex="-1"><a class="header-anchor" href="#文件增删改查" aria-hidden="true">#</a> 文件增删改查</h3><p>打开/关闭</p><p>读取</p><p>写入</p><p>删除</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2><p>拉勾大前端高薪训练营--Node全栈开发--模块一--核心模块</p>`,56),l=[o,c,i];function u(r,d){return t(),p("div",null,l)}const h=a(e,[["render",u],["__file","fs.html.vue"]]);export{h as default};

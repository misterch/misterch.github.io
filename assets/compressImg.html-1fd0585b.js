import{_ as n,o as s,c as a,a as p}from"./app-21769845.js";const t={},e=p(`<h2 id="图片压缩" tabindex="-1"><a class="header-anchor" href="#图片压缩" aria-hidden="true">#</a> 图片压缩</h2><ol><li>先将图片的file文件转成baseURL</li><li>创建一个image标签去接收文件获取图片的宽高和比例。</li><li>创建canvas画布设置画布的大小。</li><li>将图片绘制到canvas上面。</li><li>对canvas进行压缩处理，获得新的baseURL</li><li>将baseURL转化回文件。</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Message <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;element-ui&#39;</span>
<span class="token keyword">class</span> <span class="token class-name">Compress</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">file<span class="token punctuation">,</span>width <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>quality <span class="token operator">=</span> <span class="token number">0.92</span><span class="token punctuation">,</span>targetSize <span class="token operator">=</span> <span class="token number">3</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>file <span class="token operator">=</span> file<span class="token comment">//文件</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> width<span class="token comment">//不传初始赋值-1，等比缩放不用传高度</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>quality <span class="token operator">=</span> quality<span class="token comment">//不传初始赋值0.92。值范围0~1</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>targetSize <span class="token operator">=</span> targetSize<span class="token comment">//目标大小，控制上传图片大小 传值方式：targetSize:1 * 1024 * 1024的值默认3m</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 压缩</span>
    <span class="token function">compressUpload</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> rawImage <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>file<span class="token comment">//获取文件</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>rawImage<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isImage</span><span class="token punctuation">(</span>rawImage<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            Message<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;图片只支持.jpg, .png, .bmp, .jpeg, .webp格式!&#39;</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isLimitSize</span><span class="token punctuation">(</span>rawImage<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">// 需压缩</span>
                <span class="token keyword">let</span> imageFile <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">readImage</span><span class="token punctuation">(</span>rawImage<span class="token punctuation">)</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;imageFile&#39;</span><span class="token punctuation">,</span>imageFile<span class="token punctuation">)</span>
                <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                    <span class="token literal-property property">file</span><span class="token operator">:</span>imageFile<span class="token punctuation">.</span>file
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;压缩后上传&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                <span class="token comment">// 无需压缩</span>
                <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                    <span class="token literal-property property">file</span><span class="token operator">:</span>rawImage
                <span class="token punctuation">}</span><span class="token punctuation">)</span> 
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;原图上传&#39;</span><span class="token punctuation">)</span>       
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
        * <span class="token keyword">@desc</span> 图片压缩
        * <span class="token keyword">@param</span> <span class="token parameter">image</span> 被压缩的img对象
        * <span class="token keyword">@param</span> <span class="token parameter">type</span> 压缩后转换的文件类型
    **/</span>
    <span class="token comment">// 对图片进行处理</span>
    <span class="token function">readImage</span><span class="token punctuation">(</span><span class="token parameter">file</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token comment">//保存地址 </span>
            <span class="token keyword">const</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token comment">// 读取文件并将文件以URL的形式保存在resulr属性中 base64格式 </span>
            reader<span class="token punctuation">.</span><span class="token function">readAsDataURL</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span>
            <span class="token comment">// 文件读取完成时触发  </span>
            reader<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">const</span> image <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token comment">// 把Array Buffer转化为blob 如果是base64不需要</span>
                    data <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                    data <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token comment">//base64格式图片地址  </span>
                <span class="token punctuation">}</span>
                image<span class="token punctuation">.</span>src <span class="token operator">=</span> data
                image<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;canvas&#39;</span><span class="token punctuation">)</span>
                    <span class="token keyword">const</span> context <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&#39;2d&#39;</span><span class="token punctuation">)</span>
                    <span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token literal-property property">width</span><span class="token operator">:</span> originWidth<span class="token punctuation">,</span> <span class="token literal-property property">height</span><span class="token operator">:</span> originHeight <span class="token punctuation">}</span> <span class="token operator">=</span> image
                    <span class="token comment">// 目标尺寸</span>
                    <span class="token keyword">let</span> targetWidth <span class="token operator">=</span> originWidth
                    <span class="token keyword">let</span> targetHeight <span class="token operator">=</span> originHeight
                    <span class="token comment">// 获得长宽比例</span>
                    <span class="token keyword">const</span> scale <span class="token operator">=</span> targetWidth <span class="token operator">/</span> targetHeight<span class="token punctuation">;</span>
                    <span class="token comment">//获取压缩后的图片宽度,如果width为-1，默认原图宽度</span>
                    targetWidth <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">?</span> targetWidth <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width<span class="token punctuation">;</span>
                    <span class="token comment">//获取压缩后的图片高度,如果width为-1，默认原图高度</span>
                    targetHeight <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">?</span> targetHeight <span class="token operator">:</span> <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">/</span> scale<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> targetWidth
                    canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> targetHeight
                    context<span class="token punctuation">.</span><span class="token function">clearRect</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> targetWidth<span class="token punctuation">,</span> targetHeight<span class="token punctuation">)</span>
                    context<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> <span class="token string">&#39;#fff&#39;</span>
                    <span class="token comment">// 图片绘制</span>
                    context<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span>image<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> targetWidth<span class="token punctuation">,</span> targetHeight<span class="token punctuation">)</span>
                    <span class="token keyword">let</span> dataUrl <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">toDataURL</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span>type<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>quality <span class="token operator">||</span> <span class="token number">0.92</span><span class="token punctuation">)</span><span class="token comment">//0.92为压缩比，可根据需要设置，设置过小会影响图片质量  </span>
                    <span class="token keyword">let</span> fileObj <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">dataURItoBlob</span><span class="token punctuation">(</span>dataUrl<span class="token punctuation">,</span>file<span class="token punctuation">.</span>type<span class="token punctuation">,</span>file<span class="token punctuation">)</span>
                    <span class="token function">resolve</span><span class="token punctuation">(</span>fileObj<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            reader<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                Message<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;图片读取出错!&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// base64转为Blob</span>
    <span class="token keyword">async</span> <span class="token function">dataURItoBlob</span><span class="token punctuation">(</span>dataurl<span class="token punctuation">,</span>type <span class="token operator">=</span> <span class="token string">&quot;image/png&quot;</span><span class="token punctuation">,</span>file<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> filename <span class="token operator">=</span> <span class="token string">&#39;file&#39;</span>
            <span class="token keyword">let</span> arr <span class="token operator">=</span> dataurl<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span>
            <span class="token keyword">let</span> mime <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">:(.*?);</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
            <span class="token keyword">let</span> suffix <span class="token operator">=</span> mime<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
            <span class="token keyword">let</span> bstr <span class="token operator">=</span> <span class="token function">atob</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token keyword">let</span> n <span class="token operator">=</span> bstr<span class="token punctuation">.</span>length
            <span class="token keyword">let</span> u8arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>n<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                u8arr<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token operator">=</span> bstr<span class="token punctuation">.</span><span class="token function">charCodeAt</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">const</span> miniFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token punctuation">[</span>u8arr<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>filename<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>suffix<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> mime<span class="token punctuation">}</span><span class="token punctuation">)</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">file</span><span class="token operator">:</span>miniFile<span class="token punctuation">,</span>
                <span class="token literal-property property">origin</span><span class="token operator">:</span>file<span class="token punctuation">,</span>
                <span class="token literal-property property">beforeKB</span><span class="token operator">:</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span>size <span class="token operator">/</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token literal-property property">afterKB</span><span class="token operator">:</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">(</span>miniFile<span class="token punctuation">.</span>size <span class="token operator">/</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">file</span><span class="token operator">:</span>miniFile<span class="token punctuation">,</span>
                <span class="token literal-property property">origin</span><span class="token operator">:</span>file<span class="token punctuation">,</span>
                <span class="token literal-property property">beforeKB</span><span class="token operator">:</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span>size <span class="token operator">/</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token literal-property property">afterKB</span><span class="token operator">:</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">(</span>miniFile<span class="token punctuation">.</span>size <span class="token operator">/</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 判断上传的图片格式是否符合要求</span>
    <span class="token function">isImage</span><span class="token punctuation">(</span><span class="token parameter">image</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(jpg|png|bmp|jpeg|webp|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>image<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 判断图片是否过大</span>
    <span class="token function">isLimitSize</span><span class="token punctuation">(</span><span class="token parameter">image</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> isLimitSize <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>targetSize <span class="token operator">&lt;</span> <span class="token punctuation">(</span>image<span class="token punctuation">.</span>size <span class="token operator">/</span> <span class="token number">1024</span> <span class="token operator">/</span> <span class="token number">1024</span><span class="token punctuation">)</span>
        <span class="token comment">// console.log(&#39;size&#39;,image.size)</span>
        <span class="token comment">// console.log(&#39;isLimitSize&#39;,isLimitSize)</span>
        <span class="token comment">// console.log(&#39;targetSize&#39;,this.targetSize)</span>
        <span class="token comment">// console.log(image)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>isLimitSize<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Compress
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","compressImg.html.vue"]]);export{r as default};
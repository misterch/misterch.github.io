import{_ as s,o as n,c as e,a}from"./app-d4c6289a.js";const i={},c=a(`<h2 id="ssh配置" tabindex="-1"><a class="header-anchor" href="#ssh配置" aria-hidden="true">#</a> SSH配置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#进入到.ssh目录</span>
<span class="token builtin class-name">cd</span> .ssh
<span class="token comment">#使用ssh-keygen生成公钥和私钥</span>
<span class="token comment"># -t 指定协议</span>
<span class="token comment"># -b 指定生成的大小</span>
ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-b</span> <span class="token number">4096</span>
<span class="token comment">#会提示生成的密钥名称，如果第一次生成可以不输入，否则输入名称</span>
<span class="token comment">#非第一次生成rsa密钥，如填写密钥名称为test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建config文件，用来配置访问不同域名时应该使用哪个私钥</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#在.ssh目录下新建一个config文件</span>
<span class="token comment">#在文件中配置</span>
<span class="token comment">#当访问github.com的时候，使用指定的test私钥文件</span>
<span class="token comment">#github</span>
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),l=[c];function t(d,r){return n(),e("div",null,l)}const o=s(i,[["render",t],["__file","ssh.html.vue"]]);export{o as default};

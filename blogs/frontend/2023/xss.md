---
title: XSS攻击原理及防御方法
date: 2023-08-02
categories:
 - 面试
tags:
 - 安全
---
## XSS概念

Cross Site Scripting（跨站脚本），它是利用web应用的漏洞对网页注入可执行脚本（javascript），使得恶意代码在该应用中被执行，达到攻击效果

### 原理

比较常见的方式是利用**未做好过滤的参数传入一些脚本**语言代码块通常是 JavaScript, PHP, Java, ASP, Flash, ActiveX等等, 直接传入到页面或直接存入数据库通过用户浏览器阅读此数据时可以修改当前页面的一些信息或窃取会话和 Cookie等, 这样完成一次 XSS攻击

```js
http://example.com/list?q=<script>alert('你已被我控制了'))</script>

http://example.com/list?q=<p onclick='alert('你中招了'))'>点我啊点我啊</p>

http://example.com/list?q=<img src="./logo.jpg" onclick="location.href='www.baidu.com'"></img>
```

## 危害

* 盗取用户cookie
* 钓鱼攻击
* 挂木马
* 删除目标文章，恶意篡改数据
* 劫持用户web行为，甚至进一步渗透内网
* 蠕虫式DDos攻击
* 蠕虫式挂马攻击，刷广告，刷流量，破坏网上数据

## XSS分类

### 反射型XSS

XSS代码常常出现在**URL请求**中，当用户访问带有XSS代码的URL请求时，服务器端接收请求并处理，然后将带有XSS代码的数据返回给浏览器，浏览器解析该段带有XSS代码的数据并执行，整个过程就像一次反射，故称为反射型XSS。

该类攻击的主要特点是它的及时性和一次性，即用户提交请求后，响应信息会立即反馈给用户。

**应用场景**：该类攻击常发生在搜索引擎、错误提示页面等对用户的输入做出直接反应的场景中。

正常在URL请求中带上参数，这个name参数会显示在前端页面中

```js
http://example.com?name=ben
```

在URL中植入脚本代码

```js
http://example.com?name=<script>alert('你被我攻击了')</script>
```

因为这个参数会通过浏览器显示在页面中，浏览器会识别HTML标签和javascript代码，在没有对用户输入的内容做过滤时，当用户提交的内容存在javascript代码时会直接被浏览器识别并执行

### 存储型XSS

用户提交的表单一POST形式提交到数据库中（例如提交文章），因为没有对用户提交的内容进行过滤，当用户上传恶意的javascript代码，代码就会储存到数据库中

当其他用户访问该文章的页面时，因为该文章含有javascript代码，浏览器识别到这些恶意的javascript代码就会被执行

上传给服务器的数据，内容没有被过滤

```js
{
  title:'文章标题',
  content: 'hello,这里有一个js脚本，当打开这篇文章就会弹窗<script>alert('xss')</script>'
}
```

### DOM型XSS

DOM可以允许程序动态的访问和更新文档的内容、结构等。客户端JavaScript可以访问浏览器的文档对象模型。也就是说，通过JavaScript代码控制DOM节点就可以不经过服务器端的参与重构HTML页面。

该类攻击是反射型XSS的变种。它通常是由于客户端接收到的脚本代码存在逻辑错误或者使用不当导致的。比如Javascript代码不正确地使用各种DOM方法(如document.write)和Javascript内部函数(如eval函数)，**动态拼接HTML代码和脚本代码**就容易引发DOM型的跨站脚本攻击。

因此，DOM型XSS与前面两种XSS的区别就在于DOM型XSS攻击的代码**不需要与服务器端进行交互**，DOM型XSS的触发基于浏览器端对DOM数据的解析来完成，也就是完全是客户端的事情。

```html
<div id="xssd_main">
    <script>
        function domxss(){
            var str=document.getElementByla("text").value;
            document.getElementById("dom").innerHTML = "<a href=' " +str+ " '>what do you see?</a>"
        }
    </script>
    <input id="text" name="text" type="text" value="" />
    <input id="button" type="button" value="click me" onclick="domxss()" />
    <div id="dom"></div>
</div>
```

将用户输入的内容，点击click me按钮后，显示在DOM元素中。domxss方法将用户输入的内容放到 `<a>`标签中，`<a>`因为没有对标签转义过滤，将会将这个标签插入到DOM中，这是一个真实的标签，当用户输入javascript代码，是可以被执行的

当用户输入 `'><img src="#" οnclick="alert(document.cookie)" >`获得cookie。

`<a href=' '><img src="#" οnclick="alert(document.cookie)" /> '>what do you see?</a>`

## 判断是哪一种XSS

发送一次带XSS代码的请求，若只能在当前返回的数据包里发现XSS代码，则是反射型；若以后这个页面的返回包里都会有XSS代码，则是存储型；若在返回包里找不到XSS代码，则是DOM型。

## XSS漏洞的检测与防御

### 手工检测

手工检测重点要考虑数据输入的地方，且需要清楚输入的数据输出到什么地方。

在检测的开始，可以输入一些敏感字符，比如“<、>、（）”等，提交后查看网页源代码的变化以发现输入被输出到什么地方，且可以发现相关敏感字符是否被过滤。

手工检测结果相对准确，但效率较低。

### 工具检测

常用工具有AVWS（Acunetix Web Vulnerability Scanner）、BurpSuite等。还有一些专门针对XSS漏洞的检测工具，如：XSSer、XSSF（跨站脚本攻击框架）、BeEF(The Browser Exploitation Framework)等。

### 防御

* 不要相信用户输入，过滤所有的HTTP Request参数。对HTML标签或特殊字符进行过滤
* http-only，禁止js读取某些cookie。
* 避免拼接html
* 避免内联事件。如 `<button onclick="load('{{ data }}')">点</button>`

### 输入检查

输入检查，服务端和客户端都要做

输入XSS的地方

* 页面中所有的input框
* window.location（href、hash等）
* window.name
* document.referrer
* document.cookie
* localstorage
* XMLHttpRequest返回的数据

### 输出检查

一般就是在变量输出到HTML页面时，使用**编码或转义的方式来防御XSS攻击**。XSS的本质就是**HTML注入**，用户的数据被当成了HTML代码一部分来执行，从而混淆了原本的语义，产生了新的语义。

触发XSS的地方

* document.write
* xxx.innerHTML
* xxx.outerHTML
* innerHTML.replace
* document.attachEvent
* window.attachEvent
* document.location.replace
* document.location.assign

## 编码转义

### javascriptEncode

```js
//使用“\”对特殊字符进行转义，除数字字母之外，小于127使用16进制“\xHH”的方式进行编码，大于用unicode（非常严格模式）。
var JavaScriptEncode = function(str){
  var hex=new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');
  function changeTo16Hex(charCode){
    return "\\x" + charCode.charCodeAt(0).toString(16);
  }
  function encodeCharx(original) {
    var found = true;
    var thecharchar = original.charAt(0);
    var thechar = original.charCodeAt(0);
    switch(thecharchar) {
      case '\n': return "\\n"; break; //newline
      case '\r': return "\\r"; break; //Carriage return
      case '\'': return "\\'"; break;
      case '"': return "\\\""; break;
      case '\&': return "\\&"; break;
      case '\\': return "\\\\"; break;
      case '\t': return "\\t"; break;
      case '\b': return "\\b"; break;
      case '\f': return "\\f"; break;
      case '/': return "\\x2F"; break;
      case '<': return "\\x3C"; break;
      case '>': return "\\x3E"; break;
      default:
        found=false;
        break;
    }
    if(!found){
      if(thechar > 47 && thechar < 58){ //数字
        return original;
      }
  
      if(thechar > 64 && thechar < 91){ //大写字母
        return original;
      }

      if(thechar > 96 && thechar < 123){ //小写字母
        return original;
      }
      if(thechar>127) { //大于127用unicode
        var c = thechar;
        var a4 = c%16;
        c = Math.floor(c/16); 
        var a3 = c%16;
        c = Math.floor(c/16);
        var a2 = c%16;
        c = Math.floor(c/16);
        var a1 = c%16;
        return "\\u"+hex[a1]+hex[a2]+hex[a3]+hex[a4]+"";  
      }
      else {
        return changeTo16Hex(original);
      }
    }
  }   

  var preescape = str;
  var escaped = "";
  var i=0;
  for(i=0; i < preescape.length; i++){
    escaped = escaped + encodeCharx(preescape.charAt(i));
  }
  return escaped;
}
```

### **HtmlEncode**

```js
var HtmlEncode = function(str){
  var hex = new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');
  var preescape = str;
  var escaped = "";
  for(var i = 0; i < preescape.length; i++){
    var p = preescape.charAt(i);
    escaped = escaped + escapeCharx(p);
  }
  return escaped;
  function escapeCharx(original){
    var found=true;
    var thechar=original.charCodeAt(0);
    switch(thechar) {
      case 10: return "<br/>"; break; //newline
      case 32: return " "; break; //space
      case 34:return """; break; //"
      case 38:return "&"; break; //&
      case 39:return "'"; break; //'
      case 47:return "/"; break; // /
      case 60:return "<"; break; //<
      case 62:return ">"; break; //>
      case 198:return "Æ"; break;
      case 193:return "Á"; break;
      case 194:return "Â"; break; 
      case 192:return "À"; break; 
      case 197:return "Å"; break; 
      case 195:return "Ã"; break; 
      case 196:return "Ä"; break; 
      case 199:return "Ç"; break; 
      case 208:return "Ð"; break;
      case 201:return "É"; break; 
      case 202:return "Ê"; break; 
      case 200:return "È"; break; 
      case 203:return "Ë"; break;
      case 205:return "Í"; break;
      case 206:return "Î"; break; 
      case 204:return "Ì"; break; 
      case 207:return "Ï"; break;
      case 209:return "Ñ"; break; 
      case 211:return "Ó"; break;
      case 212:return "Ô"; break; 
      case 210:return "Ò"; break; 
      case 216:return "Ø"; break; 
      case 213:return "Õ"; break; 
      case 214:return "Ö"; break;
      case 222:return "Þ"; break; 
      case 218:return "Ú"; break; 
      case 219:return "Û"; break; 
      case 217:return "Ù"; break; 
      case 220:return "Ü"; break; 
      case 221:return "Ý"; break;
      case 225:return "á"; break; 
      case 226:return "â"; break; 
      case 230:return "æ"; break; 
      case 224:return "à"; break; 
      case 229:return "å"; break; 
      case 227:return "ã"; break; 
      case 228:return "ä"; break; 
      case 231:return "ç"; break; 
      case 233:return "é"; break;
      case 234:return "ê"; break; 
      case 232:return "è"; break; 
      case 240:return "ð"; break; 
      case 235:return "ë"; break; 
      case 237:return "í"; break; 
      case 238:return "î"; break; 
      case 236:return "ì"; break; 
      case 239:return "ï"; break; 
      case 241:return "ñ"; break; 
      case 243:return "ó"; break;
      case 244:return "ô"; break; 
      case 242:return "ò"; break; 
      case 248:return "ø"; break; 
      case 245:return "õ"; break;
      case 246:return "ö"; break; 
      case 223:return "ß"; break; 
      case 254:return "þ"; break; 
      case 250:return "ú"; break; 
      case 251:return "û"; break; 
      case 249:return "ù"; break; 
      case 252:return "ü"; break; 
      case 253:return "ý"; break; 
      case 255:return "ÿ"; break;
      case 162:return "¢"; break; 
      case '\r': break;
      default:
        found=false;
        break;
    }
    if(!found){
      if(thechar>127) {
        var c=thechar;
        var a4=c%16;
        c=Math.floor(c/16); 
        var a3=c%16;
        c=Math.floor(c/16);
        var a2=c%16;
        c=Math.floor(c/16);
        var a1=c%16;
        return "&#x"+hex[a1]+hex[a2]+hex[a3]+hex[a4]+";";  
      }
      else{
        return original;
      }
    }  
  }
}
```

## 参考链接

[XSS漏洞_花拾八的博客-CSDN博客](https://blog.csdn.net/qq_48947141/article/details/120578530)

[XSS攻击的解决方法 - 海角在眼前 - 博客园 (cnblogs.com)](https://www.cnblogs.com/lovesong/p/5223989.html)

[干货：XSS跨站攻击原理+常见攻击方法汇总 (qq.com)](https://mp.weixin.qq.com/s?__biz=MzIyNTgwOTIyOQ==&mid=2247488847&idx=1&sn=bb4a6d3fe80946ee2eab10dc871b9bd0&chksm=e87b536ddf0cda7ba525e5a691fec8cea78fa73151ceb321bc051e552d88eba2105604e21bc9&scene=27)

[HtmlEncode和JavaScriptEncode（预防XSS） - 海角在眼前 - 博客园 (cnblogs.com)](https://www.cnblogs.com/lovesong/p/5211667.html)

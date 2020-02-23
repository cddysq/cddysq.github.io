---
title: Hexo-NexT 主题美化记录
categories:
  - Hexo
tags:
  - 美化
top: true
abbrlink: 15baca53
date: 2019-12-20 00:00:00
---
{% note info %}
## 修改文内链接样式
{% endnote %}

未修改时，文内链接颜色和普通文本没有区别：

![初始样式](https://s2.ax1x.com/2019/12/24/lCB73n.png)

为了突出区别性，我们在`themes\next\source\css\_common\components\post\post.styl`文件中添加下列的代码：
```css
.post-body p a {
    color: #0593d3;
    border-bottom: none;
    border-bottom: 1px solid #0593d3;
    &:hover {
        color: #fc6423;
        border-bottom: none;
        border-bottom: 1px solid #fc6423;
    }
}
```
![改后样式](https://s2.ax1x.com/2019/12/24/lCDCg1.png)

<!-- more -->

{% note info %}
## 添加文章置顶功能
{% endnote %}

在站点根目录执行命令：

```shell
npm uninstall hexo-generator-index --save
npm install hexo-generator-index-pin-top --save
```

找到`themes\next\layout\_macro\post.swig`文件，定位到`<div class="post-meta">`标签下，插入如下代码：

```diff
<div class="post-meta">
+    {% if post.top %}
+   	<i class="fa fa-thumb-tack"></i>
+    	<font color="RED">置顶</font>
+    	<span class="post-meta-divider">|</span>
+    {% endif %}
```

接下来在需要置顶的文章头部添加 `top: true` 或者 `top: n`，这里的n是数字，数字越大表示置顶等级越高：

```diff
title: xxx
date: xxx
categories:
  - xx
tags:
  - xx
+top: true
```

{% note info %}

## 文章添加阴影效果

{% endnote %}

找到`themes\next\source\css\_common\components\post\post.styl`文件，将`post-block`代码进行如下更改：
```css
if (hexo-config('motion.transition.post_block')) {
    .post-block{
		margin-top: 60px;
	    margin-bottom: 60px;
	    padding: 25px;
	    background:rgba(255,255,255,0.9) none repeat scroll !important; //添加透明效果
	    -webkit-box-shadow: 0 0 5px rgba(202, 203, 203, .5);
	    -moz-box-shadow: 0 0 5px rgba(202, 203, 204, .5);
	}
	.pagination, .comments {
      opacity: 0;
    }
  }
```

{% note info %}

## 首页文章折叠

{% endnote %}

这里通过文章模板进行实现：
```markdown
---
title: Hexo美化
date: 2019-12-19
categories:
- Hexo
tags:
  - study
---
<img src="/img/haha.png" width = "900" height = "600" alt="git" align=center />
摘要内容......
<!-- more -->
以下为隐藏内容
```


{% note info %}

## 点击小爱心特效

{% endnote %}

1. 在`themes\next\source\js\src`下新建文件`clicklove.js`，接着把如下代码拷贝粘贴到`clicklove.js`文件中。
```js
!function(e,t,a){function n(){c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),o(),r()}function r(){for(var e=0;e<d.length;e++)d[e].alpha<=0?(t.body.removeChild(d[e].el),d.splice(e,1)):(d[e].y--,d[e].scale+=.004,d[e].alpha-=.013,d[e].el.style.cssText="left:"+d[e].x+"px;top:"+d[e].y+"px;opacity:"+d[e].alpha+";transform:scale("+d[e].scale+","+d[e].scale+") rotate(45deg);background:"+d[e].color+";z-index:99999");requestAnimationFrame(r)}function o(){var t="function"==typeof e.onclick&&e.onclick;e.onclick=function(e){t&&t(),i(e)}}function i(e){var a=t.createElement("div");a.className="heart",d.push({el:a,x:e.clientX-5,y:e.clientY-5,scale:1,alpha:1,color:s()}),t.body.appendChild(a)}function c(e){var a=t.createElement("style");a.type="text/css";try{a.appendChild(t.createTextNode(e))}catch(t){a.styleSheet.cssText=e}t.getElementsByTagName("head")[0].appendChild(a)}function s(){return"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"}var d=[];e.requestAnimationFrame=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)}}(),n()}(window,document);
```
> 如没有src目录直接新建一个即可，这里只是为了后期统一进行管理。
2. 在`themes\next\layout\_layout.swig`文件末尾添加如下代码：
```js
<!-- 页面点击小红心 -->
{% if theme.clicklove %}
      <script type="text/javascript" src="/js/src/clicklove.js"></script>
{% endif %}
```
3. 在主题配置文件`_config.yml`合适的位置（一般是最后一行）添加`clicklove : true`启用刚才的配置。

{% note info %}

## 添加动态背景

{% endnote %}

1. 找到`themes\next\layout\_layout.swig`文件，在 `<body>`里添加内容(不清楚放哪里就放最后吧)：
```html
<div class="bg_content">
  <canvas id="canvas"></canvas>
</div>
{% if theme.canvas %}
   <script type="text/javascript" src="/js/src/dynamic_bg.js"></script>
{% endif %}
```
2. 在`themes\next\source\js\src中新建文件dynamic_bg.js`，代码链接中可见：[dynamic_bg.js](https://github.com/CodeHaotian/CodeHaotian.github.io/blob/HexoNexT/themes/next/source/js/src/dynamic_bg.js)
3. 在`themes\next\source\css\_custom\main.styl`文件末尾添加内容：
```css
.bg_content {
  position: fixed;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}
```
4. 在主题配置文件`_config.yml`合适的位置（一般是最后一行）添加`canvas: true`启用刚才的配置。
4. 在主题配置文件`_config.yml`合适的位置（一般是最后一行）添加`canvas: true`启用刚才的配置。

{% note info %}

## 开启站内搜索

{% endnote %}

1.在博客根目录执行以下命令

```shell
npm install hexo-generator-searchdb --save
```

2.在站点配置文件中加入以下内容：

```yml
#搜索配置   
search:
  path: search.xml 
  field: post # 指定搜索范围，可选 post | page | all
  format: html # 指定页面内容形式，可选 html | raw (Markdown) | excerpt | more
  limit: 10000 #限定搜索结果
```

3.在主题配置文件`themes\next\_config.yml`中 → 搜索`local_search`，开启搜索

```yml
# Local Search
# Dependencies: https://github.com/theme-next/hexo-generator-searchdb
local_search:
  enable: true #默认为false,设置为true
  # If auto, trigger search by changing input.
  # If manual, trigger search by pressing enter key or search button.
  trigger: auto
  # Show top n results per article, show all results by setting to -1
  top_n_per_article: 1
  # Unescape html strings to the readable one.
  unescape: false
  # Preload the search data when the page loads.
  preload: true
```

{% note info %}

## 添加图片灯箱

{% endnote %}

灯箱功能，实现点击图片后放大聚焦图片，并支持幻灯片播放、全屏播放、缩略图、快速分享到社交媒体等，该功能由 [fancyBox](https://github.com/fancyapps/fancybox) 提供。

在博客根目录执行以下命令安装相关依赖：

```shell
git clone https://github.com/theme-next/theme-next-fancybox3 themes/next/source/lib/fancybox
```

在主题配置文件中搜索 `fancybox`设置为`true`

``` yml themes\next\_config.yml
# FancyBox is a tool that offers a nice and elegant way to add zooming functionality for images.
# For more information: https://fancyapps.com/fancybox
fancybox: true
```

{% note info %}

## 给每篇文章后添加结束标语

{% endnote %}

1. 在`themes\next\layout\_macro`中新建`passage-end-tag.swig`文件，添加代码至该文件中：
```swig
<div>
    {% if not is_index %}
      <div style="text-align:center;color: #ccc;font-size:20px;">------------- 本 文 结 束 <i class="fa fa-paw"></i> 感 谢 您 的 阅 读 -------------</div>
    {% endif %}
</div>
```

2. 打开`themes\next\layout\_macro\post.swig`文件，在`post-body`后，`post-footer`前，添加下面内容：
```swig
<div>
  {% if not is_index %}
    {% include 'passage-end-tag.swig' %}
  {% endif %}
</div>
```
![大概位置](https://s2.ax1x.com/2019/12/24/lCDlKP.png)

3. 在主题配置文件`_config.yml`在末尾添加：
```yml
# 文章末尾添加“本文结束”标记
passage_end_tag:
  enabled: true
```

{% note info %}

## 给网页title添加一些搞怪特效

{% endnote %}

1. 在`themes\next\source\js\src`文件夹下创建`funny_title.js`，添加代码：
```js
/*离开当前页面时修改网页标题，回到当前页面时恢复原来标题 */
window.onload = function () {
  let OriginTitle = document.title;
  let titleTime;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      document.title = '╭(°A°`)╮ 页面崩溃啦 ~';
      clearTimeout(titleTime);
    } else {
      // $('[rel="icon"]').attr('href', "/uploads/favicon-32x32.png"); 换图测试失败
      document.title = '(ฅ>ω<*ฅ) 噫又好了鸭~' + OriginTitle;
      titleTime = setTimeout(function () {
        document.title = OriginTitle;
      }, 4000);
    }
  });
};
```

2. 在`themes\next\layout\_layout.swig`文件中，添加引用（注：在swig末尾添加）：
```swig
<!--搞怪欺骗-->
<script type="text/javascript" src="/js/src/funny_title.js"></script>
```

{% note info %}

## 开启不蒜子访问统计

{% endnote %}

1. 在`themes\next\_config.yml`主题配置文件中，开启配置：
```yml
busuanzi_count:
  enable: true #开启不蒜子访问统计，默认是false
  total_visitors: true #站点总访问量
  total_visitors_icon: user #icon皆为对应图标
  total_views: true #所有页面的总浏览量
  total_views_icon: eye
  post_views: false #文章浏览量
  post_views_icon: eye
```
2. 为了更加美观，我们在`themes\next\layout\_third-party\statistics\busuanzi-counter.swig`文件中，添加如下提示文字：

![显示优化](https://s2.ax1x.com/2020/01/27/1uWgGd.png)

最终效果：

![底部效果](https://s2.ax1x.com/2020/01/28/1KSYnK.png)

{% note info %}

## 页脚增加网站运行时间统计

{% endnote %}

1. 在`themes\next\layout\_partials\footer.swig`文件，如下图位置加入倒计时代码：
```js
{%- if theme.footer.powered.enable and theme.footer.theme.enable %}
  {#<span class="post-meta-divider">|</span>#}
{%- endif %}
//此位置插入代码
{%- if theme.footer.theme.enable %}
  .....
{%- endif %}
```
倒计时代码：
```js
<span id="sitetime"></span>
<script language=javascript>
	function siteTime(){
		window.setTimeout("siteTime()", 1000);
		var seconds = 1000;
		var minutes = seconds * 60;
		var hours = minutes * 60;
		var days = hours * 24;
		var years = days * 365;
		var today = new Date();
		var todayYear = today.getFullYear();
		var todayMonth = today.getMonth()+1;
		var todayDate = today.getDate();
		var todayHour = today.getHours();
		var todayMinute = today.getMinutes();
		var todaySecond = today.getSeconds();
		/* Date.UTC() -- 返回date对象距世界标准时间(UTC)1970年1月1日午夜之间的毫秒数(时间戳)
		year - 作为date对象的年份，为4位年份值
		month - 0-11之间的整数，做为date对象的月份
		day - 1-31之间的整数，做为date对象的天数
		hours - 0(午夜24点)-23之间的整数，做为date对象的小时数
		minutes - 0-59之间的整数，做为date对象的分钟数
		seconds - 0-59之间的整数，做为date对象的秒数
		microseconds - 0-999之间的整数，做为date对象的毫秒数 */
		var t1 = Date.UTC(2017,01,04,00,00,00); //你的建站时间
		var t2 = Date.UTC(todayYear,todayMonth,todayDate,todayHour,todayMinute,todaySecond);
		var diff = t2-t1;
		var diffYears = Math.floor(diff/years);
		var diffDays = Math.floor((diff/days)-diffYears*365);
		var diffHours = Math.floor((diff-(diffYears*365+diffDays)*days)/hours);
		var diffMinutes = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours)/minutes);
		var diffSeconds = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours-diffMinutes*minutes)/seconds);
		document.getElementById("sitetime").innerHTML=" Run for "+diffYears+" Year "+diffDays+" Days "+diffHours+" Hours "+diffMinutes+" m "+diffSeconds+" s";
	}
	siteTime();
</script>
```

2. 在`themes\next\source\css\main.styl`文件中给倒计时添加样式：
```css
#sitetime {
  background-image: -webkit-linear-gradient(left, #aa4b6b, #6b6b83, #3b8d99);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

{% note info %}

## Hexo新建文章时自动打开编辑器

{% endnote %}

首先在Hexo目录下的scripts目录中创建一个JavaScript脚本文件。
如果没有这个scripts目录，则新建一个。
scripts目录新建的JavaScript脚本文件可以任意取名。
通过这个脚本，我们用其来监听hexo new这个动作，并在检测到hexo new之后，执行编辑器打开的命令。

如果你是windows平台的Hexo用户，则将下列内容写入你的脚本：

```js
var spawn = require('child_process').exec;
hexo.on('new', function(data){
  spawn('start  "markdown编辑器绝对路径.exe" ' + data.path);
});
```

如果你是Mac平台的Hexo用户，则将下列内容写入你的脚本：

```js
var exec = require('child_process').exec;
hexo.on('new', function(data){
    exec('open -a "markdown编辑器绝对路径.app" ' + data.path);

});
```


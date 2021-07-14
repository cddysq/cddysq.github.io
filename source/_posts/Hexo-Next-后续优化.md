---
title: Hexo-NexT 后续优化
categories:
  - Hexo
tags:
  - 美化
abbrlink: 15baca53
date: 2019-12-20 00:00:00
---

{% note info %}

## 侧边栏添加近期文章

{% endnote %}

打开`blog\source\_data\sidebar.swig`文件，加入以下代码：

```js
{% if theme.recent_posts %}
    <div class="links-of-blogroll motion-element {{ "links-of-blogroll-" + theme.recent_posts_layout  }}">
      <div class="links-of-blogroll-title">
        <!-- 选择合适的icon -->
        <i class="fa fa-history fa-{{ theme.recent_posts_icon | lower }}" aria-hidden="true"></i>
 		<!-- 这里对应下文主题配置文件的recent_posts_title值 -->
        {{ theme.recent_posts_title }}
      </div>
      <ul class="links-of-blogroll-list"> 
         <!-- 设置排序规格，此处我采用按照文章更新时间排序 -->
        {% set posts = site.posts.sort('-updated').toArray() %}
        <!-- 显示三条近期文章，请自信合理配置 -->
        {% for post in posts.slice('0', '3') %}
          <li>
            <a href="{{ url_for(post.path) }}" title="{{ post.title }}" target="_blank">{{ post.title }}</a>
          </li>
        {% endfor %}
      </ul>
    </div>
{% endif %}
```

打开主题配置文件，在最后添加如下内容：

```yml next.yml
# 近期文章配置  
recent_posts_title: 近期文章
recent_posts_layout: block
recent_posts: true
```

<!-- more -->

重启博客效果如下：

![近期文章默认效果](https://s2.ax1x.com/2020/02/25/3t3br9.png)

> 有点low，开始美化下

打开主题配置文件，搜索`social_icons`选项，进行如下修改：

```yml next.yml
social_icons:
  enable: true # 显示社交图标
  icons_only: true # 只显示社交图标
  transition: true # 过渡动画
```

打开`blog\source\_data\styles.styl`文件，加入如下样式：

```css styles.styl
//近期文章样式
.links-of-blogroll-title {
	font-size: 15px;
}
.links-of-blogroll-list a {
	font-weight: bold;
	border-bottom: none;
  &:hover{
	color: #428bca;
	font-weight: bold;
	border-bottom: 1px solid #428bca;
  }
}
```

优化后效果如下：

![近期文章效果改](https://s2.ax1x.com/2020/02/25/3tBqqf.png)

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

在`blog\source\js`下新建文件`clicklove.js`，接着把如下代码拷贝粘贴到`clicklove.js`文件中。

```js
!function(e,t,a){function n(){c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),o(),r()}function r(){for(var e=0;e<d.length;e++)d[e].alpha<=0?(t.body.removeChild(d[e].el),d.splice(e,1)):(d[e].y--,d[e].scale+=.004,d[e].alpha-=.013,d[e].el.style.cssText="left:"+d[e].x+"px;top:"+d[e].y+"px;opacity:"+d[e].alpha+";transform:scale("+d[e].scale+","+d[e].scale+") rotate(45deg);background:"+d[e].color+";z-index:99999");requestAnimationFrame(r)}function o(){var t="function"==typeof e.onclick&&e.onclick;e.onclick=function(e){t&&t(),i(e)}}function i(e){var a=t.createElement("div");a.className="heart",d.push({el:a,x:e.clientX-5,y:e.clientY-5,scale:1,alpha:1,color:s()}),t.body.appendChild(a)}function c(e){var a=t.createElement("style");a.type="text/css";try{a.appendChild(t.createTextNode(e))}catch(t){a.styleSheet.cssText=e}t.getElementsByTagName("head")[0].appendChild(a)}function s(){return"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"}var d=[];e.requestAnimationFrame=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)}}(),n()}(window,document);
```
> 如没有 js 目录直接新建一个即可，这里只是为了后期统一进行管理。

在 `body-end.swig` 文件中加入如下代码：

```js
{# 页面点击小红心 #}
{% if theme.clicklove %}
      <script type="text/javascript" src="/js/clicklove.js"></script>
{% endif %}
```
> `body-end.swig` 文件需要在主题配置文件的 `custom_file_path` 选项中取消注释

在主题配置文件（一般是最后一行）添加`clicklove : true`启用刚才的配置。

{% note info %}

## 添加动态背景

{% endnote %}

找到 `body-end.swig` 文件，加入以下内容：

```html
<div class="bg_content">
  <canvas id="canvas"></canvas>
</div>
{% if theme.canvas %}
   <script type="text/javascript" src="/js/dynamic_bg.js"></script>
{% endif %}
```
在`blog\source\js`中新建文件`dynamic_bg.js`，代码链接中可见：[dynamic_bg.js](https://github.com/CodeHaotian/CodeHaotian.github.io/blob/HexoNexT/themes/next/source/js/src/dynamic_bg.js)

在 `styles.styl` 文件末尾添加如下内容：

```css
.bg_content {
  position: fixed;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}
```
在主题配置文件`_config.yml`合适的位置（一般是最后一行）添加`canvas: true`启用刚才的配置。


{% note info %}

## 添加图片灯箱

{% endnote %}

灯箱功能，实现点击图片后放大聚焦图片，并支持幻灯片播放、全屏播放、缩略图、快速分享到社交媒体等，该功能由 [fancyBox](https://github.com/fancyapps/fancybox) 提供。

在主题配置文件中搜索 `fancybox`设置为`true`。

``` yml themes\next\_config.yml
# FancyBox is a tool that offers a nice and elegant way to add zooming functionality for images.
# For more information: https://fancyapps.com/fancybox
fancybox: true
```

{% note info %}

## 给网页title添加一些搞怪特效

{% endnote %}

在`blog\source\js`文件夹下创建`funny_title.js`，添加代码：

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

在`head.swig`文件中，添加引用：

```js head.swig
<!--搞怪欺骗-->
<script type="text/javascript" src="/js/funny_title.js"></script>
```

{% note info %}

## 开启不蒜子访问统计

{% endnote %}

在主题配置文件中，开启配置：

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
为了更加美观，我们在`themes\next\layout\_third-party\statistics\busuanzi-counter.swig`文件中，添加如下提示文字：

![显示优化](https://s2.ax1x.com/2020/01/27/1uWgGd.png)

最终效果：

![底部效果](https://s2.ax1x.com/2020/01/28/1KSYnK.png)

{% note info %}

## 页脚增加网站运行时间统计

{% endnote %}

在`footer.swig`文件，加入倒计时代码：

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

在`styles.styl`文件中给倒计时添加样式：

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

### 文章加密

使用插件：[hexo-blog-encrypt](https://github.com/MikeCoder/hexo-blog-encrypt)

1.在博客根目录执行安装命令

```bash
npm install hexo-blog-encrypt --save
```

2.在站点配置文件中加入以下内容：

```yaml
# Security
encrypt:
  abstract: 本文章已加密🐇, 请输入密码查看.
  message: ( ⓛ ω ⓛ *), 请在此处输入密码，查看加密内容.
  wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
  wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容. 
```

3.在需要加密的文章`Front-matter`里加入`password: 访问密码`即可。

> 已知问题，解密后初次访问文章，极小部分布局错乱，代码块复制功能失效。刷新页面都可解决。更多高阶用法自行查阅官方文档。

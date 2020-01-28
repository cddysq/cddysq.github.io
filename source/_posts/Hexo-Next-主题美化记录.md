---
title: Hexo Next 主题美化记录
date: 2019-12-20
categories:
- Hexo
tags:
  - 美化
---
## 修改文内链接样式

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

## 文章添加阴影效果

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

## 首页文章折叠
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

## 回到顶部按钮显示百分比

找到`themes\next\_config.yml`修改如下配置：
```yml
back2top:
    # 回到顶部按钮
    enable: true
    # true，按钮显示在侧边栏；false，按钮显示在右下角
    sidebar: false
    # 按钮上显示百分比
    scrollpercent: true
```

## 点击小爱心特效
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

## 添加动态背景

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

## 给每篇文章后添加结束标语

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

## 给网页title添加一些搞怪特效

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

## 开启不蒜子访问统计

1. 在`themes\next\_config.yml`主题配置文件中，开启配置：
```yml
busuanzi_count:
  enable: true  #开启不蒜子访问统计，默认是false
  total_visitors: true
  total_visitors_icon: user
  total_views: true
  total_views_icon: eye
  post_views: true
  post_views_icon: eye
```
2. 为了更加美观，我们在`themes\next\layout\_third-party\statistics\busuanzi-counter.swig`文件中，添加如下提示文字：

![显示优化](https://s2.ax1x.com/2020/01/27/1uWgGd.png)

最终效果：

![底部效果](https://s2.ax1x.com/2020/01/28/1KSYnK.png)

## 给代码块添加复制功能

在`themes\next\_config.yml`文件中，搜索`codeblock`开启复制，如下图：

![开启代码块复制](https://s2.ax1x.com/2020/01/28/1Kusv8.png)

## 文章底部的#号标签改为字体图标

在`themes\next\_config.yml`文件中，搜索`tag_icon`将`false`改成`true`。

## 去除底部页脚`powered By Hexo / 强力驱动......`

在`themes/next/layout/_partials/footer.swig`文件中，删除或者注释掉`<div class="powered-by">`、`<span class="post-meta-divider">`、`<div class="theme-info">`，如下图：

![注释页脚](https://s2.ax1x.com/2020/01/28/1KSsjP.png)

## 设置网站启用时间

在`themes\next\_config.yml`文件中，修改`since`后的值即可。

## 添加版权信息

在`themes\next\_config.yml`文件中搜索`creative_commons`开启版权声明，如下图：

![开启版权](https://s2.ax1x.com/2020/01/28/1KeBCV.png)

在博客根目录的`source`目录下，新建`_data`目录，创建`styles.styl`文件添加如下代码：
```css
//版权声明侧边栏颜色
.post-copyright {
    margin: 2em 0 0;
    padding: 0.5em 1em;
    border-left: 3px solid #81a6ed;
    background-color: #f9f9f9;
    list-style: none;
}
```
回到主题配置文件中搜索`custom_file_path:`开启加载自定义样式文件：

![加载自定义样式](https://s2.ax1x.com/2020/01/28/1KesvF.png)

> 新版的自定义样式都是在`sourse`资源文件夹下新建自定义文件 `_data/xxx` 文件实现功能，并在主题配置文件进行开启加载。

## 底部跳动爱心

效果图：

![跳动爱心](https://s2.ax1x.com/2020/01/28/1KSWNQ.png)

1. 前往[图标库](https://fontawesome.com/v4.7.0/icons/)找到心仪的图标(我这里选择`heartbeat`)
2. 在`themes\next\_config.yml`文件中，搜索 `footer` →  将 `name` 后面的 `user` 替换成 `fas fa-heartbeat` → 将 `animated` 设置成 `true` → 将 `color` 修改为 `#ff0000`，如下图：

![爱心设置](https://s2.ax1x.com/2020/01/28/1KSoj0.png)

## 页脚增加网站运行时间统计

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

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
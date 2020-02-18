---
title: Hexo 添加全局 APlayer 播放器
date: 2020-02-18 14:21:15
categories:
- Hexo
tags:
  - 美化
  - Aplayer
---

## 介绍

[hexo-tag-aplayer](https://github.com/MoePlayer/hexo-tag-aplayer) 是 [APlayer](https://github.com/MoePlayer/APlayer) 播放器的 Hexo 标签插件（现已支持 [MetingJS](https://github.com/metowolf/MetingJS)），可以十分方便地在文章内插入音乐播放器。

## 配置

- 此处未采用单文章插入方式，而改用整站加载方式。

  <!-- more-->

找到`\theme\next\layout\_layout.swig`文件，将以下代码黏贴到body体内即可，如果你需要修改参数，[点击此处查看](https://github.com/metowolf/MetingJS#option)

```html
<body>
<!-- require APlayer -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css">
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
<!-- require MetingJS -->
<script src="https://cdn.jsdelivr.net/npm/meting@1.2.0/dist/Meting.min.js"></script>
</body>
<!--如果将本体放在body里面，导致页面加载出现问题，请尝试放到body体后面-->
<div class="aplayer" 
	data-id="3778678" 
	data-server="netease" 
	data-type="playlist" 
	data-fixed="true"	
	data-order="random"
	data-volume="0.65"
	data-autoplay="false"   
	date-preload="auto"
	data-theme="#cc543a">
</div>
```

> **注意：** 如果你使用上述代码，请以`data-xxx`格式书写参数名

## 优化

[网易云音乐网页版](https://music.163.com/)底部的播放器，无论在网易云里如何跳转页面，只要还在当前标签页都是不重新加载的，这样就可以使正在播放中的音乐不随页面跳转中断。

在我们的博客中可以使用`pjax`实现迷你音乐播放器全站无刷新加载。

### 以下为`NexT`启用`pjax`功能：

- 项目地址：https://github.com/theme-next/theme-next-pjax

- 过程演示

  - 在博客根目录执行以下命令

    ```shell
    cd themes/next
    git clone https://github.com/theme-next/theme-next-pjax source/lib/pjax
    ```

  - 找到主题配置文件 → 搜索 `pjax` 设置为 `true` 即可

    ```yml
    # Easily enable fast Ajax navigation on your website.
    # Dependencies: https://github.com/theme-next/theme-next-pjax
    pjax: true
    ```

  - 到此重新运行博客，切换页面，播放器歌曲已不再自动刷新

## 参考

- [添加全局APlayer播放器](https://hakurei.red/2019/11/25/为Hexo博客添加全局APlayer播放器/#APlayer)
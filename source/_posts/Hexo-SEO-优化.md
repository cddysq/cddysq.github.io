---
title: Hexo SEO 优化
categories:
  - Hexo
tags:
  - SEO
abbrlink: '1e319277'
date: 2020-02-22 12:34:13
---

## 什么是SEO

SEO（Search Engine Optimization）即搜索引擎优化，[维基百科](https://zh.wikipedia.org/wiki/搜尋引擎最佳化) 上给出的定义如下：

> 搜索引擎优化是一种通过了解搜索引擎的运作规则来调整网站，以及提高目的网站在有关搜索引擎内排名的方式。

<!-- more-->

## SEO 优化

在谷歌或者百度的搜索链接中，使用以下格式可以直接搜索自己的域名， 如果能搜索到就说明已经被收录，反之则没有。可以直接搜索自己的域名，或者加一些关键词来更好地判断，例如：`site:https://www.yileaf.com/`

### Google

#### 向搜索引擎提交网站

前往地址：[Google Search Console](https://search.google.com/search-console/about?hl=zh-CN)，登录谷歌账号。

#### 验证域名所有权

谷歌搜索有多种验证方式，这里我选择谷歌推荐的 HTML 文件上传方式。下载 HTML 验证文件，拷贝到 `博客根目录/sources/` 文件夹下。为了使 Hexo 不处理此验证文件，并且不生成关于此文件的 `sitemap`，我们需要打开验证文件，在最上面添加以下代码：

```html
layout: false
---
```

然后重新部署博客

```shell
hexo clean & hexo g & hexo d
```

部署成功后回到[Google Search Console](https://search.google.com/search-console/about?hl=zh-CN)点击验证即可。

##### 参考图如下：

![Google 所有权验证方式](https://s2.ax1x.com/2020/02/22/3MmTyj.png)

![验证html存放位置](https://s2.ax1x.com/2020/02/22/3MnVfO.png)

![Google验证成功](https://s2.ax1x.com/2020/02/22/3MnshT.png)

#### 添加站点地图

作用：告诉搜索引擎你的网站结构等信息，让搜索引擎更智能抓取内容。

##### 第一步

在博客根目录安装[hexo-generator-sitemap](https://github.com/hexojs/hexo-generator-sitemap)插件

```shell
npm install hexo-generator-sitemap --save
```

##### 第二步

打开Hexo站点配置文件，添加如下配置：

```yml _config.yml
# Google sitemap
sitemap:
    path: sitemap.xml #填写你想放的路径
```

##### 第三步

重新部署博客。登录[Google Search Console](https://search.google.com/search-console/about?hl=zh-CN) -选择已经验证过的站点，依次点击索引 → 站点地图，右上角「添加新的站点地图」，添加 `sitemap.xml` 的链接即可。若无报错则站点地图提交成功。

![添加Google站点地图](https://s2.ax1x.com/2020/02/22/3M1l7j.png)

#### 添加robots.txt

`robots.txt`（统一小写）是一种存放于网站根目录下的ASCII编码的文本文件，它的作用是告诉搜索引擎此网站中哪些内容是可以被爬取的，哪些是禁止爬取的。
在 `source` 目录下增加 `rebots.txt` 文件，网站生成后在网站的根目录(`站点目录/public/`)下

```markdown
User-agent: *
Allow: /
Allow: /archives/
Allow: /categories/
Allow: /tags/
Allow: /about/
Allow: /links/

Disallow: /js/
Disallow: /css/
Disallow: /lib/

Sitemap: https://你的域名/sitemap.xml
Sitemap: https://你的域名/baidusitemap.xml
```

- Allow 表示允许被访问的
- Disallow 是不允许的意思。
- 后面两个 Sitemap 就是网站地图了。而网站地图前面说了是给爬虫用的。这里配置在 robots 中。

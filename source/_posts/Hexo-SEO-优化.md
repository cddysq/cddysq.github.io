---
title: Hexo SEO 优化
categories:
  - Hexo
tags:
  - SEO
abbrlink: 1e319277
date: 2020-02-22 12:34:13
---

## 什么是SEO

SEO（Search Engine Optimization）即搜索引擎优化，[维基百科](https://zh.wikipedia.org/wiki/搜尋引擎最佳化) 上给出的定义如下：

> 搜索引擎优化是一种通过了解搜索引擎的运作规则来调整网站，以及提高目的网站在有关搜索引擎内排名的方式。

<!-- more-->

## SEO 优化

在谷歌或者百度的搜索链接中，使用以下格式可以直接搜索自己的域名， 如果能搜索到就说明已经被收录，反之则没有。可以直接搜索自己的域名，或者加一些关键词来更好地判断，例如：`site:https://yileaf.com`

## 站点地图

作用：告诉搜索引擎你的网站结构等信息，让搜索引擎更智能抓取内容。

### Google

#### 本地配置

1.在博客根目录安装[hexo-generator-sitemap](https://github.com/hexojs/hexo-generator-sitemap)插件

```bash
npm install hexo-generator-sitemap --save
```

2.打开Hexo站点配置文件，添加如下配置：

```yaml
# Google sitemap
sitemap:
    path: seo/sitemap.xml #替换成你想存放的路径
```

#### 向搜索引擎提交网站

1.前往地址：[Google Search Console](https://search.google.com/search-console/about?hl=zh-CN)，登录谷歌账号。

2.添加网站：我这里选择采用网址前缀的方式

![添加网址](https://cdn.jsdelivr.net/gh/moyuhs/images/20210723144500.png)

3.验证域名所有权

- 谷歌搜索有多种验证方式，这里我选择谷歌的HTML标记法：

  ![标记验证法](https://cdn.jsdelivr.net/gh/moyuhs/images/20210723144918.png)

- Next 已提供了该验证方式,打开主题配置文件搜索`google_site_verification `,填入谷歌提供的`Content`内容。

   ![Next head 源码](https://cdn.jsdelivr.net/gh/moyuhs/images/20210723150134.png)

   ![配置Google验证码](https://cdn.jsdelivr.net/gh/moyuhs/images/20210723145341.png)

- 重新部署博客成功后，回到[Google Search Console](https://search.google.com/search-console/about?hl=zh-CN)点击验证即可。

  ```bash
  hexo clean & hexo g & hexo d
  ```

  ![绑定成功](https://cdn.jsdelivr.net/gh/moyuhs/images/20210723152824.png)

4.绑定站点地图

- 打开[Google Search Console](https://search.google.com/search-console/about?hl=zh-CN) -选择已经验证过的站点，依次点击索引 → 站点地图，右上角「添加新的站点地图」，添加 `sitemap.xml` 的链接即可。若无报错则站点地图提交成功。

  ![添加Google站点地图](https://cdn.jsdelivr.net/gh/moyuhs/images/20210723153709.png)

#### 添加谷歌统计分析

1.登录[Google Analytics](https://analytics.google.com/)，根据提示添加一个新的媒体资源，最后会给你一个跟踪id。

2.复制该id，打开主题配置文件搜索`google_analytics`，配置id即可。

#### 添加robots.txt

`robots.txt`（统一小写）是一种存放于网站根目录下的ASCII编码的文本文件，它的作用是告诉搜索引擎此网站中哪些内容是可以被爬取的，哪些是禁止爬取的。
在 `source` 目录下增加 `robots.txt` 文件，网站生成后在网站的根目录(`blog/public/`)下

```tex
User-agent: *
Allow: /
Allow: /posts/
Allow: /overviews/
Allow: /about/
Allow: /links/

Disallow: /js/
Disallow: /css/
Disallow: /lib/
Disallow: /images/

Sitemap: https://你的域名/sitemap.xml
Sitemap: https://你的域名/baidusitemap.xml
```

- Allow 表示允许被访问的
- Disallow 是不允许的意思。
- 后面两个 Sitemap 就是网站地图了。而网站地图前面说了是给爬虫用的。这里配置在 robots 中。

### Baidu

> 百度这方面是真的 🌶️🐤 ，Say no to Baidu.

百度站长平台sitemap提交是邀请制的，并没有对所有站长开放，只有网站到一定等级百度才会在你后台开放提交sitemap的入口。

登录[百度站长平台](https://ziyuan.baidu.com/site/siteadd)进行网站验证，官方已有说明文档，和Google也类似，不过多赘述。

#### 安装插件

- 插件地址：[hexo-generator-baidu-sitemap](https://github.com/coneycode/hexo-generator-baidu-sitemap)

```bash
npm install hexo-generator-baidu-sitemap --save
```

打开站点配置文件添加如下内容：

```yaml
# 百度站点地图
baidusitemap:
  path: seo/baidusitemap.xml
```

#### 百度主动推送

- 插件地址：[Hexo Baidu URL Submit](https://github.com/huiwang/hexo-baidu-url-submit)

```bash
npm install hexo-baidu-url-submit --save
```

打开站点配置文件添加如下内容：

```yaml
# 百度主动推送
baidu_url_submit:
  count: 5 				     # 提交最新的五个链接
  host: blog.yileaf.com 	 # 百度站长平台中注册的域名
  token:  	                 # 秘钥
  path: seo/baidu_urls.txt   # 文本文档的地址,新链接会保存在此文本文档里  
```

重新部署博客推送即可将站点链接一并推送至百度。

#### 添加百度统计分析

1.登录[百度统计](https://tongji.baidu.com/)后进入侧边栏`账户管理 -> 网站列表`，点击右侧`新增网站`按钮添加你的网站。

2.添加`网站域名/网站首页`信息后，点击`确定`按钮，百度统计会提供一段`JS`脚本用于嵌入。

![百度统计代码](https://cdn.jsdelivr.net/gh/moyuhs/images/20210723171357.png)

3.复制上图`hm.js?` 后面那串统计脚本 id，打开主题配置文件搜索`baidu_analytics`填写统计脚本id即可。
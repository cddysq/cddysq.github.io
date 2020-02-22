---
title: Hexo 集成 Valine 评论系统
categories:
  - Hexo
tags:
  - 美化
  - Valine
abbrlink: 74e90fd6
date: 2020-01-28 17:34:28
---

## 第一步：注册Leancloud，获取 AppID 和 AppKey

推荐使用国际版，点击进入[国际版Leancloud官网](https://leancloud.app/)

<!-- more -->

1. 注册完成后需先创建应用。单击创建应用，如下图：

![创建应用](https://s2.ax1x.com/2020/01/28/1Kb1xS.png)

2. 创建完成后，打开应用，点击左边的存储，查看是否有`Comment`和 `Counter`，如没有则创建，权限设为所有用户。创建完成后，如下图：

![创建class](https://s2.ax1x.com/2020/01/28/1KbdP0.png)

> Comment库：用于存放网站评论 ，Counter库：用于存放文章阅读量。
>
> 如没有创建，那么在显示 post 页面时，请求 LeanCloud 的 api 接口，可能会返回 error code=101

3. 点击设置 → 安全中心 ,将除了数据存储的服务全部关闭，并绑定web安全域名，防止恶意调用。

![安全设置](https://s2.ax1x.com/2020/01/28/1KbrMF.png)

4. 最后点击应用 Keys，获取到`AppID`和`Appkey`。

## 第二步：在Hexo Next主题中配置

1. 打开 [https://www.jsdelivr.com/package/npm/valine](https://www.jsdelivr.com/package/npm/valine) 获取最新的 `valine.min.js` cdn地址：

[![获取valine地址](https://s2.ax1x.com/2020/01/28/1Kbose.md.png)](https://imgchr.com/i/1Kbose)

2. 找到主题配置文件，搜索`valine`，添加cdn链接，大致位置如下图：

![添加cdn](https://s2.ax1x.com/2020/01/28/1KqSsg.png)

3. 还是主题配置文件中，填写`appid`和`appkey`等`valine`参数(语言必须小写)：

![参数配置](https://s2.ax1x.com/2020/02/06/1yaQHS.png)

## 第三步：测试valine评论

在本地博客根目录执行`hexo clean && hexo s --debug`重启博客后，浏览器访问任意文章进行留言如下图：

![输入界面](https://s2.ax1x.com/2020/01/28/1KqIf0.png)

![测试成功](https://s2.ax1x.com/2020/01/28/1KLk0H.png)
> 感兴趣的可以[点击此处查看](https://valine.js.org/avatar.html)如何设置头像

评论的数据存在leancloud应用中，如下图：

![数据](https://s2.ax1x.com/2020/01/28/1KLYhq.png)

## 注意事项

在 Hexo 博客中，评论功能在所有页面都默认开启，但某些页面不需要显示评论功能，例如分类，标记页面我们并不需要评论功能。

解决办法：在 `Front-matter` 中通过`comments`属性设置`true`或`false`控制该页面或者是文章的评论功能是否打开，如下：
```markdown
---
title: Tags
date: 2019-12-19 16:10:19
type: "tags" 
comments: false
---
```
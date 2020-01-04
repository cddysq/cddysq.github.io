---
title: Hexo 集成 Gitalk 评论系统
date: 2020-01-04
categories:
- Hexo
tags:
  - 美化
  - Gitalk
---

### Gitalk是什么

Gitalk 利用了 [GithubAPI](https://developer.github.com/v3/) 基于 GitHub Issue 和 Preact 开发的评论插件，官方网址： [https://gitalk.github.io](https://gitalk.github.io/)

### Gitalk特性

- 使用 GitHub 登录
- 支持多语言 [en, zh-CN, zh-TW, es-ES, fr, ru]
- 支持个人或组织
- 无干扰模式（设置 distractionFreeMode 为 true 开启）
- 快捷键提交评论 （cmd|ctrl + enter）

<!-- more -->	

### 配置Gitalk
1、要使用 Gitalk 需要先在 GitHub 上注册新应用，链接：[https](https://github.com/settings/applications/new) : [//github.com/settings/applications/new](https://github.com/settings/applications/new)

![OAuth Apps](https://s2.ax1x.com/2020/01/04/l0YZ5R.png)

2、点击注册后，页面大致如下，其中`Client ID`和`Client Secret`在后面的配置中需要用到，也是应用访问你 Github 的凭证，到时复制粘贴即可：

![连接密匙](https://s2.ax1x.com/2020/01/04/l0YURP.png)

3、Next 主题 v7.6.0 中已经默认集成了gitalk，只需在`\themes\next\_config.yml`锁定gitalk配置开启使用：

![gitalk](https://s2.ax1x.com/2020/01/04/l0YodJ.png)

```yml
gitalk:
  enable: true  #启用gitalk
  github_id:   #github帐号 例：CodeHaotian
  id: location.pathname  #此设置参照下文常见问题说明
  repo:   #存放评论的仓库名称
  client_id:   #application的id，即上文Client ID
  client_secret:  #application的密码，即上文Client Secret
  admin_user:  #页面显示联系**初始化评论 例：CodeHaotian
  distraction_free_mode: true # Facebook-like distraction free mode
  # Gitalk's display language depends on user's browser or system environment
  # If you want everyone visiting your site to see a uniform language, you can set a force language value
  # Available values: en | es-ES | fr | ru | zh-CN | zh-TW
  language: zh-CN
```
4、重新部署博客，打开页面进入某一博客内容下，评论会出现在页面最下方。

### 常见问题说明

1、未找到相关的issue进行评论，请联系@XXX初始化创建

![初始化](https://s2.ax1x.com/2020/01/04/l0Y0sS.png)

- 解决办法：出现这总情况是因为博主未给文章评论初始化，博主只需要登录 GitHub 账户即可。

2、浏览器进入开发者模式，看见类似https://api.github.com/user 401 (Unauthorized)

- 解决办法：找到主题配置文件， 在 gitalk 配置里添加 `id: location.pathname`

3、Error: Not Found.

![Error: Not Found](https://s2.ax1x.com/2020/01/04/l0tRkd.png)

- 解决办法：未能正确找到仓库 repo，检查一下你的仓库是否配置正确。

> 文章具体为 Hexo Next v7.6.0 环境下集成 Gitalk
---
title: Next主题评论系统由Valine迁移至Waline
categories:
  - Hexo
tags:
  - 美化
  - Waline
  - website
abbrlink: 3368d4d6
date: 2021-07-26 16:29:57
---

由于之前使用的Valine评论系统，在看到网上大量关于Valine垃圾评论的消息后，决定迁移到Waline评论系统。

## 初始化Waline

- 初始化Waline教程请参阅官方教程：[点击访问Waline初始化教程](https://waline.js.org/guide/get-started.html)，关于leancloud的相关操作可参考我的这篇 [Hexo 集成 Valine 评论系统](https://blog.yileaf.com/posts/74e90fd6/)。

- 按照官方文档部署成功后可参照下图所示配置自定义域名。

  ![自定义域名](https://cdn.jsdelivr.net/gh/moyuhs/images/20210729140734.png)

- 上图Domains下的域名即为你的Waline服务地址，请访问 `Waline服务地址/ui/register` 进行注册。首个注册的人会被设定成管理员。

## Next 主题安装 Waline 

- 在博客根目录下执行[Waline插件](https://github.com/rqh656418510/hexo-waline-next)安装命令：

  ```bash
  npm install hexo-waline-next --save
  ```

- 打开主题配置文件填写Waline相关配置。

  ```yaml
  # Waline
  # For more information: https://waline.js.org, https://github.com/lizheming/waline
  waline:
    enable: true #启用Waline
    serverURL:  # Waline服务地址
    avatar: wavatar # 默认头像
    avatarCDN: https://sdn.geekzu.org/avatar/ # 头像cdn加速地址
    meta: [nick, mail, link]  # Custom comment header
    requiredMeta: [nick, mail] # Set required fields: [nick] | [nick, mail]
    pageSize: 10   # Pagination size
    lang: zh-cn  # Language, available values: en, zh-cn
    visitor: true # 文章阅读统计
    comment_count: true # If false, comment count will only be displayed in post page, not in home page
    libUrl: https://cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js # waline client cdn
    # 自定义加载emoji,支持内容参见 https://cdn.jsdelivr.net/gh/walinejs/emojis/
    emoji:  [
      'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo',
      'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/bilibili',
      'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/tw-emoji',
      'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/qq',
    ]
    locale:
      placeholder: ヾﾉ≧∀≦)o来啊，快活啊!   # 默认输入框显示内容older
      admin: 博主
      nick: 昵称
      mail: 邮箱
      link: 网址
    copyright: true # 是否显示页脚版权信息    
    dark: auto # Dark mode css selector, for more information: https://waline.js.org/client/basic.html#dark 
  ```
  
  

